import { Bundle } from "../generated/bundle_config_schema";
import { CartiPackage, Ram, Rom } from "../generated/machine_config_pkg_schema";
import type { BundleType } from "./bundle";

export interface PackageEntryOptions {
    start?: string
    label?: string
    length?: string
    bootargs?: string
    shared?: boolean
    resolvedPath?: string
}

export interface BundleDesc {
    id: string,
    bundleType: string
}

// addPackageEntry adds a bundle to CartiPackage  on disk, cfg is assumed to be CartiPackage
export function addPackageEntry(b: Bundle | BundleDesc, cfg: any, options: PackageEntryOptions = {}): CartiPackage {
    if (!cfg || !cfg.assets || !cfg.machineConfig) {
        throw new Error("malformed minimal configuration")
    }
    if (b.hasOwnProperty("name") === true)
        cfg = addAsset(b.id, (b as Bundle).name,(b as Bundle).fileName, cfg)
    return addBundle(b.id, b.bundleType as BundleType, cfg, options)
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

// NOTE might refactor resolved path as it creates an undefined entry in the config 
// which might cause someone downstream isseus if using Object.keys()
function addBundle(cid: string, bundleType: BundleType, cfg: CartiPackage, options: PackageEntryOptions): CartiPackage {
    const config = Object.assign({}, cfg);
    const { machineConfig } = config
    const { start, length, bootargs, resolvedPath, label } = options
    const shared = options.shared || false
    switch (bundleType) {
        case "flashdrive":
            if (!length || !start || !label) {
                throw new Error("flash drive missing length, start, and/or label")
            }
            machineConfig.flash_drive = machineConfig.flash_drive || []
            machineConfig.flash_drive.push({ cid, start, label, length, shared, resolvedPath })
            break
        case "ram":
            if (!length)
                throw new Error("ram missing length")
            machineConfig.ram = { cid, length, resolvedPath }
            break
        case "rom":
            machineConfig.rom = {
                bootargs: bootargs as string,
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
    const newAsset = { cid: id, name, fileName}
    return Object.assign({}, cfg, { assets: cfg.assets.concat(newAsset) })
}

function rmAsset(id: string, cfg: CartiPackage) {
    const config = Object.assign({}, cfg)
    config.assets = config.assets.filter((a) => a.cid !== id)
    return config
}