import { Bundle } from "../generated/bundle_config_schema";
import { Assets, CartiPackage, PackageMachineConfig, Ram, Rom } from "../generated/machine_config_pkg_schema";
import type { BundleType } from "./bundle";

/*

  config = updatePackageEntry(b, getConfig())
  writeConfig(config)
  create tmpDir
  const machineConfig = writeCartesiMachineConfig(CartiPackage, basePath, outputDir)
  //create writing path for it

*/

export interface PackageEntryOptions {
    start?: string
    length?: string
    bootargs?: string
    shared?: boolean
    resolvedPath?: string
}

export interface BundleDesc {
    id: string,
    bundleType: string
}


export function addPackageEntry(b: Bundle | BundleDesc, cfg: any, options: PackageEntryOptions = {}): CartiPackage {
    if(!cfg || !cfg.assets || !cfg.machineConfig){
        throw new Error("malformed minimal configuration")
    }
    if(b.hasOwnProperty("name") === true)
        cfg = addAsset(b.id, (b as Bundle).name, cfg)
    return addBundle(b.id, b.bundleType as BundleType, cfg, options)
}

export function rmPackageEntry(b: BundleDesc, cfg: any): CartiPackage {
    let config = Object.assign({},cfg)
    config = rmBundle(b.id, b.bundleType as BundleType, config)
    return rmAsset(b.id, config)
}

export function updatePackageEntry(b: Bundle | BundleDesc, cfg: any, options: PackageEntryOptions = {}): CartiPackage {
    const config = rmPackageEntry(b,cfg)
    return addPackageEntry(b, config, options)
}

function rmBundle(cid: string, bundleType: BundleType, cfg: CartiPackage){
    const config = Object.assign({},cfg);
    const { machineConfig } = config
    switch(bundleType as BundleType){
        case "flashdrive":
                machineConfig.flash_drive = machineConfig.flash_drive || []
                machineConfig.flash_drive = machineConfig.flash_drive.filter((drive)=>{
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
function addBundle(cid: string, bundleType: BundleType, cfg: CartiPackage, options: PackageEntryOptions): CartiPackage{
    const config = Object.assign({},cfg);
    const { machineConfig } = config
    const {start, length, bootargs, resolvedPath} = options
    const shared = options.shared || false
    switch(bundleType){
        case "flashdrive":
            if(!length || !start){
                throw new Error("flash drive missing length and start")
            }
            machineConfig.flash_drive = machineConfig.flash_drive || []
            machineConfig.flash_drive.push({ cid, start, length, shared, resolvedPath})
            break
        case "ram":
             if(!length)
                throw new Error( "ram missing length")
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

function addAsset(id: string, name: string, cfg: CartiPackage) {
    const newAsset = { cid: id, name }
    return Object.assign({}, cfg, { assets: cfg.assets.concat(newAsset) })
}

function rmAsset(id: string, cfg: CartiPackage) {
    const config = Object.assign({}, cfg)
    config.assets = config.assets.filter((a)=>a.cid !== id) 
    return config
}