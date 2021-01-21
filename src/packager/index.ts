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
        newConfig.flash_drive.forEach((fd) => fd.image_filename = fd.image_filename.replace(p, pathMapping[p]))
    })
    return newConfig
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

    const tmpMachineConfig = Object.assign({}, config)
    let machineConfig: pkgConfig.PackageMachineConfig = {} as pkgConfig.PackageMachineConfig;
    const assets: pkgConfig.Assets = [];
    const version = "0.0.0"

    let converted = await convertConfig(tmpMachineConfig.ram)
    machineConfig.ram = converted.config
    assets.push(converted.asset)

    converted = await convertConfig(tmpMachineConfig.rom)
    machineConfig.rom = converted.config
    assets.push(converted.asset)


    const flashDrives = []
    for (const fdrive of tmpMachineConfig.flash_drive) {
        converted = await convertConfig(fdrive)
        flashDrives.push(converted.config)
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

// resolveNewMachineConfig takes a cartiPackage and resolves it into a format that can be used to write a lua based cartesi 
// machine config
function resolveNewMachineConfig(pkg: pkgConfig.CartiPackage, assetLookup: AssetLookup): machineConfig.MachineConfig {
    //@ts-ignore
    let machine: machineConfig.MachineConfig = {}
    machine.clint = pkg.machineConfig.clint
    machine.htif = pkg.machineConfig.htif
    machine.processor = pkg.machineConfig.processor
    machine.ram = { image_filename: pkg.machineConfig.ram.resolvedPath || assetLookup[pkg.machineConfig.ram.cid], length: pkg.machineConfig.ram.length }
    machine.rom = { image_filename: pkg.machineConfig.rom.resolvedPath || assetLookup[pkg.machineConfig.rom.cid], bootargs: pkg.machineConfig.rom.bootargs }
    machine.flash_drive = pkg.machineConfig.flash_drive.map((drive) => {
        return {
            image_filename: drive.resolvedPath || assetLookup[drive.cid],
            length: drive.length,
            shared: drive.shared,
            start: drive.start
        }
    })
    return machine
}


// install takes a CartiPackage and fetcher and installation base path, it will retrieve the CID's specified  
// and install the resulting cids on disk locally in the specified basePath in a basePath/cid/filename directory
// typically not how a bundle is added to bundle storage but used for building a stored machine
export async function install(pkg: pkgConfig.CartiPackage, fetcher: Fetcher, basePath: string): Promise<machineConfig.MachineConfig> {

    const cidToAssetLookup: AssetLookup = {}
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
        cidToAssetLookup[rp.cid.toString()] = `${DOCKER_CARTI_PACKAGES_BASE_PATH}/${rp.cid.toString()}/${filename}`
        return prom
    })
    await Promise.all(written)
    return resolveNewMachineConfig(pkg, cidToAssetLookup)
}
