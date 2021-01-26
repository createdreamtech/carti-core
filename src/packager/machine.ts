import { Bundle } from "../generated/bundle_config_schema";
import { CartiPackage, Drive, Ram, Rom } from "../generated/machine_config_pkg_schema";
import type { BundleType } from "./bundle";

export interface PackageEntryOptions {
    start?: string
    label?: string
    length?: string
    args?: string
    bootPrefix?: string
    shared?: boolean
    resolvedPath?: string
}

export interface BundleDesc {
    id: string,
    bundleType: string
}


// NOTE flash_resolve_starts https://github.com/cartesi/machine-emulator/blob/master/src/cartesi-machine.lua#L659
// this function chooses a start value based off of the pre existing flash drive states it is based off the 
// current machine cli parsing algo
// root is priveledged name for flash and is always first
// secondly because this is different than the cli there may be many iterations
// and the drives must be ordered by starting segment of memory
// not only that the requirement is that there aren't collisions so 
// auto start changes to 1 << 60 from the largest known start position
// this returns a list of reorganized drives to have coherent order and start positions despite condfig
// being a table
function autoResolveStart(cfg: CartiPackage, newDrive?: Drive): CartiPackage {
    // If the new drive does not have a start value then we set it to a magic number -1
    // this is then used to mark that we must auto assign a start number
    if (newDrive) {
        if (newDrive.start === undefined) newDrive.start = "-1"
        if (cfg.machineConfig.flash_drive.find((d) => d.label === newDrive.label))
            throw new Error(`Label must be unique, label already exists,${newDrive.label} `)
    }
    let allDrives = newDrive ? cfg.machineConfig.flash_drive.concat(newDrive) : cfg.machineConfig.flash_drive.concat([])
    let nonRootDrives = allDrives.filter((x) => x.label !== "root")
    const rootDrive = allDrives.filter((x) => x.label === "root")
    allDrives = allDrives.sort((a, b) => {
        if (BigInt(a.start) - BigInt(b.start) > 0)
            return 1
        else if (BigInt(a.start) - BigInt(b.start) < 0)
            return -1
        return 0
    })
    const defaultStart = BigInt(1) << BigInt(63);
    const driveIncrement = (BigInt(1) << BigInt(60))
    const largestDrive = allDrives.slice(-1)[0]
    let autoStart = largestDrive.start === "-1" ? defaultStart : BigInt(largestDrive.start) + driveIncrement
    // auto increment should always start after the already specified largest drive
    const drives = rootDrive.concat(nonRootDrives)
    // it's javscript so BigInt
    const flash_drive = drives.map((drive: Drive) => {
        if (drive.start !== "-1") return drive
        const dr = Object.assign({}, drive, { start: `0x${autoStart.toString(16)}` })
        autoStart = autoStart + driveIncrement
        return dr
    })
    const machineConfig = Object.assign({}, cfg.machineConfig, { flash_drive })
    return Object.assign({}, cfg, { machineConfig })
}


export function setPackageBoot(cfg: CartiPackage, args: string, bootPrefix?: string) {
    const machineConfig =Object.assign({}, cfg.machineConfig, {boot: { args, bootPrefix }})
    return Object.assign({}, cfg, { machineConfig })
}

export function unsetPackageBoot(cfg: CartiPackage) {
    const config = Object.assign({},cfg)
    delete config.machineConfig.boot.bootPrefix
    config.machineConfig.boot.args =""
    return config
}

// addPackageEntry adds a bundle to CartiPackage  on disk, cfg is assumed to be CartiPackage
export function addPackageEntry(b: Bundle | BundleDesc, cfg: any, options: PackageEntryOptions = {}): CartiPackage {
    if (!cfg || !cfg.assets || !cfg.machineConfig) {
        throw new Error("malformed minimal configuration")
    }
    if (b.hasOwnProperty("name") === true)
        cfg = addAsset(b.id, (b as Bundle).name, (b as Bundle).fileName, cfg)
    return addBundle(b.id, b.bundleType as BundleType, cfg, options)
}

export function rmPackageEntryByLabel(label:string, cfg: CartiPackage): CartiPackage {
    let config = Object.assign({}, cfg)
    const drive = cfg.machineConfig.flash_drive.find((d)=>d.label === label)
    if(drive && drive.cid){
        config = rmBundle(drive.cid, "flashdrive", config)
        config = rmAsset(drive.cid, config)
    }
    config.machineConfig.flash_drive = config.machineConfig.flash_drive.filter((d) => d.label !== label)
    return config
}

// rmPackageEntry removes a bundle from a CartiPackage
export function rmPackageEntry(b: BundleDesc, cfg: any): CartiPackage {
    let config = Object.assign({}, cfg)
    config = rmBundle(b.id, b.bundleType as BundleType, config)
    return rmAsset(b.id, config)
}
// updatePackageEntry updates a pre existing bundle with a new entry, partial updates are not respected
export function updatePackageEntry(b: Bundle | BundleDesc, cfg: any, options: PackageEntryOptions = {}): CartiPackage {
    const config = rmPackageEntry(b, cfg)
    return addPackageEntry(b, config, options)
}

function rmBundle(cid: string, bundleType: BundleType, cfg: CartiPackage) {
    const config = Object.assign({}, cfg);
    const { machineConfig } = config
    switch (bundleType as BundleType) {
        case "flashdrive":
            machineConfig.flash_drive = machineConfig.flash_drive || []
            machineConfig.flash_drive = machineConfig.flash_drive.filter((drive) => {
                return drive.cid !== cid
            })
            break
        case "ram":
            machineConfig.ram = {} as Ram
            break
        case "rom":
            machineConfig.rom = {} as Rom
            break
        case "raw":
            break
    }
    return config
}

const defaultArgs = "";
// NOTE might refactor resolved path as it creates an undefined entry in the config 
// which might cause someone downstream isseus if using Object.keys()
function addBundle(cid: string, bundleType: BundleType, cfg: CartiPackage, options: PackageEntryOptions): CartiPackage {
    let config = Object.assign({}, cfg);
    const { machineConfig } = config
    const { start, length, resolvedPath, label } = options
    const shared = options.shared || false
    switch (bundleType) {
        case "flashdrive":
            if (!label) {
                throw new Error("flash drive missing length, start, and/or label")
            }
            machineConfig.flash_drive = machineConfig.flash_drive || []
            config = autoResolveStart(cfg, {
                cid,
                start: start as string,
                label, length: length as string,
                shared, resolvedPath
            })
            //TODO  next recalculate bootargs because label order changed 
            break
        case "ram":
            if (!length)
                throw new Error("ram missing length")
            machineConfig.ram = { cid, length, resolvedPath }
            break
        case "rom":
            machineConfig.rom = {
                cid,
                resolvedPath
            }
            break
        case "raw":
            break
    }
    return config
}

function addAsset(id: string, name: string, fileName: string, cfg: CartiPackage) {
    const newAsset = { cid: id, name, fileName }
    return Object.assign({}, cfg, { assets: cfg.assets.concat(newAsset) })
}

function rmAsset(id: string, cfg: CartiPackage) {
    const config = Object.assign({}, cfg)
    config.assets = config.assets.filter((a) => a.cid !== id)
    return config
}