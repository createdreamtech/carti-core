import { Storage } from "../storage"
import * as machineConfig from "../generated/machine_config_schema";
import * as pkgConfig from "../generated/machine_config_pkg_schema";
import { CID } from "multiformats";
import fs from 'fs-extra';
import Ajv from "ajv";
import machinePackageSchema from '../machine-config-package-schema.json';
import { Fetcher } from "../fetcher";
import path from "path"
import { binMemEncoder } from "./package_encoders";
export * as bundle from "./bundle"
export * from "./machine"



const replaceFileName = (obj: any, cid: CID) => {
    const oo = Object.assign({}, obj, { cid: cid.toString() });
    delete oo.image_filename;
    return oo;
}
const createAssetEntry = (fileName: string, cid: CID): pkgConfig.Asset => {
    return { cid: cid.toString(), name: fileName, fileName: fileName }
}
type PathMapping = { [p: string]: string }

// remap helps with virtual remapping of directories in the case of packaging and the 
// original context of the generated config file is different than where the assets are 
// i.e. you aren't running this from the cartesi machine docker context 
export function remap(config: machineConfig.MachineConfig, pathMapping: PathMapping): machineConfig.MachineConfig {

    const newConfig = Object.assign({}, config)
    Object.keys(pathMapping).forEach((p) => {
        newConfig.ram.image_filename = newConfig.ram.image_filename.replace(p, pathMapping[p])
        newConfig.rom.image_filename = newConfig.rom.image_filename.replace(p, pathMapping[p])
        newConfig.flash_drive.forEach((fd) => fd.image_filename = fd.image_filename ? fd.image_filename.replace(p, pathMapping[p]) : fd.image_filename)
    })
    return newConfig
}

function parseLabelsFromBootArgs(bootArgs: string){
    const labels: string[] = [];
    for (const lRegex of bootArgs.matchAll(/-\((?<a>.*?)\)/g)) {
        labels.push(lRegex[1])
    }
    return labels
}
//Note assumes bootargs match format of `prefix -- bootarguments`
function parseArgsFromBootArgs(bootArgs: string){
    return bootArgs.slice(bootArgs.indexOf("--") + 3)
}

// pack converts a lua machine configuration into bundles stored in storage and CartiPackage only 
// useful in context where you are moving from lua config to a CartiPackage 
export async function pack(config: machineConfig.MachineConfig, storage: Storage): Promise<pkgConfig.CartiPackage> {
    const writeAssetFromDisk = async (fileName: string) => {
        const buffer = await fs.readFile(fileName)
        const cid = await storage.put(buffer, binMemEncoder,{fileName})
        return { name: fileName, fileName, cid }
    }
    const convertConfig = async (cfg: object & { image_filename: string }) => {
        const { cid, name, fileName } = await writeAssetFromDisk(cfg.image_filename)
        const asset = createAssetEntry(fileName, cid)
        const config = replaceFileName(cfg, cid)
        return { asset, config }
    }
    // TODO convert for boot arg renaming to get proper labels for flash drive
    const convertFlashDriveConfig = async (cfg: object & { image_filename?: string }, label:string) => {
        if(cfg.image_filename){ 
           const converted = await convertConfig(cfg as object & { image_filename: string })
           converted.config = Object.assign({}, converted.config, { label })
           return converted
        }

        return { asset: undefined, config: Object.assign({}, cfg, { label }) }
    }

    const tmpMachineConfig = Object.assign({}, config)
    let machineConfig: pkgConfig.PackageMachineConfig = {} as pkgConfig.PackageMachineConfig;
    const assets: pkgConfig.Assets = [];
    const version = "0.0.0"

    let converted = await convertConfig(tmpMachineConfig.ram)
    machineConfig.ram = converted.config
    assets.push(converted.asset)

    converted = await convertConfig(tmpMachineConfig.rom)
    console.log(tmpMachineConfig.rom)
    const bootArgs = converted.config.bootargs
    delete converted.config.bootargs
    machineConfig.rom = converted.config; 
    assets.push(converted.asset)
    //NOTE makes assumption there is not a custom prefix in the args
    machineConfig.boot = { args: parseArgsFromBootArgs(bootArgs) }


    const flashDrives = []
    // NOTE hardcoding root to be the first drive EXCEPTIONAL case
    const generatedName=(x: number)=> x ? `generated_label${x}` : 'root'
    // NOTE here we are sorting the drives by start in memory and choosing
    // the first one to be the root drive 
    const sortedDrives = tmpMachineConfig.flash_drive.sort((a, b) => {
        const result = BigInt(a.start) - BigInt(b.start)
        if(result > 0) return 1
        if(result < 0) return -1
        return 0
    })
    
    const labels = parseLabelsFromBootArgs(bootArgs)
    for (const [i, fdrive] of sortedDrives.entries()) {
        const converted = await convertFlashDriveConfig(fdrive, labels[i])
        flashDrives.push(converted.config)
        if(converted.asset)
            assets.push(converted.asset)
    }
    machineConfig.flash_drive = flashDrives;
    machineConfig.processor = tmpMachineConfig.processor;
    machineConfig.htif = tmpMachineConfig.htif;
    machineConfig.clint = tmpMachineConfig.clint;
    const ajv = new Ajv()
    const pkg = { assets, machineConfig, version }
    const isValid = await ajv.validate(machinePackageSchema, pkg)
    if (!isValid)
        throw new Error(`Errors: ${JSON.stringify(ajv.errors)}`)
    return pkg
}

// TODO move to config
const DOCKER_CARTI_PACKAGES_BASE_PATH = "/opt/carti/packages"

// cid to asset resolved container path
type AssetLookup = { [cid: string]: string }
// Note here is how we generate bootargs prefix in accordance to the lua
// https://github.com/cartesi/machine-emulator/blob/9cf2f448e73663ef93724ca5f48ba32e2d60e787/src/cartesi-machine.lua#L771
/*
    local mtdparts = {}
    for i, label in ipairs(flash_label_order) do
        config.flash_drive[#config.flash_drive+1] = {
            image_filename = flash_image_filename[label],
            shared = flash_shared[label],
            start = flash_start[label],
            length = flash_length[label]
        }
        mtdparts[#mtdparts+1] = string.format("flash.%d:-(%s)", i-1, label)

    if #mtdparts > 0 then
        config.rom.bootargs = append(config.rom.bootargs, "mtdparts=" ..
            table.concat(mtdparts, ";"))
    end
*/

// NOTE taken from https://github.com/cartesi/machine-emulator/blob/9cf2f448e73663ef93724ca5f48ba32e2d60e787/src/cartesi-machine.lua#L211
const CARTESI_BOOT_ARG_PREFIX = "console=hvc0 rootfstype=ext2 root=/dev/mtdblock0 rw quiet"
function buildPrefix(drives: pkgConfig.FlashDrive) {
    const mtdparts:string[] = []
    drives.forEach((drive, i) => {
        mtdparts.push(`flash.${i}:-(${drive.label})`)
    })
    return `${CARTESI_BOOT_ARG_PREFIX} mtdparts=${mtdparts.join(';')}`
}

function buildBootArgs(args: string,  drives: pkgConfig.FlashDrive, bootPrefix?: string,) {
    const prefix = bootPrefix || buildPrefix(drives)
    return `${prefix} -- ${args}`
}
// createNewMachineConfig takes a pkg and basePath to prefix all the underlying assets as
// this is contextual so default is /opt/carti/packages but it's up to downstream to define
// where the assets live (in our case docker is a common remapped environment)
export function createNewMachineConfig(pkg: pkgConfig.CartiPackage, basePath: string): machineConfig.MachineConfig {
    const mapping:AssetLookup = {}
    pkg.assets.forEach((asset)=>{
        mapping[asset.cid.toString()]=`${basePath}/${asset.cid.toString()}/${asset.fileName}`
    })
   return resolveNewMachineConfig(pkg, mapping) 
}
// resolveNewMachineConfig takes a cartiPackage and resolves it into a format that can be used to write a lua based cartesi 
// machine config
function resolveNewMachineConfig(pkg: pkgConfig.CartiPackage, assetLookup: AssetLookup): machineConfig.MachineConfig {
    //@ts-ignore
    let machine: machineConfig.MachineConfig = {}
    const {args, bootPrefix} = pkg.machineConfig.boot
    machine.clint = pkg.machineConfig.clint
    machine.htif = pkg.machineConfig.htif
    machine.processor = pkg.machineConfig.processor
    machine.ram = { image_filename: pkg.machineConfig.ram.resolvedPath || assetLookup[pkg.machineConfig.ram.cid], length: pkg.machineConfig.ram.length }
    machine.rom = { 
        image_filename: pkg.machineConfig.rom.resolvedPath || assetLookup[pkg.machineConfig.rom.cid], 
        bootargs: buildBootArgs(args, pkg.machineConfig.flash_drive, bootPrefix)
    }
    machine.flash_drive = pkg.machineConfig.flash_drive.map((drive) => {
        let core = {length: drive.length, shared: drive.shared, start: drive.start}
        const image_filename = !drive.cid ? {} : { image_filename: (drive.resolvedPath || assetLookup[drive.cid]) as string }
        return Object.assign({}, image_filename, core)
    })
    return machine
}


// install takes a CartiPackage and fetcher and installation base path, it will retrieve the CID's specified  
// and install the resulting cids on disk locally in the specified basePath in a basePath/cid/filename directory
// typically not how a bundle is added to bundle storage but used for building a stored machine
export async function install(pkg: pkgConfig.CartiPackage, fetcher: Fetcher, basePath: string, destPath: string): Promise<machineConfig.MachineConfig> {

    const packages = pkg.assets.map((asset) => {
        const cid = CID.parse(asset.cid)
        return { cid, name: asset.name, fileName: asset.fileName, data: fetcher.get(cid) }
    })
    const resolvedPackages = await Promise.all(packages)
    const written = resolvedPackages.map(async (rp) => {
        const filename = path.basename(rp.fileName)
        const dir = `${basePath}/${rp.cid.toString()}`
        await fs.ensureDir(dir)
        const fileLocation = `${dir}/${filename}`;
        const data = await rp.data
        const fws = fs.createWriteStream(fileLocation)
        data.pipe(fws)
        const prom = new Promise<void>((resolve) => {
            data.on("end", () => {
                fws.close()
            })
            fws.on("close", () => {
                resolve()
            })

        })
        return prom
    })
    await Promise.all(written)
    return createNewMachineConfig(pkg, destPath)
}
