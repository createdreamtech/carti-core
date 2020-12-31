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
}

// TODO might have misleading type definition
export function addPackageEntry(b: Bundle, cfg: any, options: PackageEntryOptions = {}): CartiPackage {
    if(!cfg || !cfg.assets || !cfg.machineConfig){
        throw new Error("malformed minimal configuration")
    }
    cfg = addAsset(b.id, b.name, cfg)
    return addBundle(b, cfg, options)
}

export function rmPackageEntry(b: Bundle, cfg: any): CartiPackage {
    let config = Object.assign({},cfg)
    config = rmBundle(b, config)
    return rmAsset(b.id, config)
}

export function updatePackageEntry(b: Bundle, cfg: any, options: PackageEntryOptions = {}): CartiPackage {
    const config = rmPackageEntry(b,cfg)
    return addPackageEntry(b, config, options)
}

function rmBundle(b: Bundle, cfg: CartiPackage){
    const config = Object.assign({},cfg);
    const { machineConfig } = config
    switch(b.bundleType as BundleType){
        case "flashdrive":
                machineConfig.flash_drive = machineConfig.flash_drive || []
                machineConfig.flash_drive = machineConfig.flash_drive.filter((drive)=>{
                   return drive.cid !== b.id
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

function addBundle(b: Bundle, cfg: CartiPackage, options: PackageEntryOptions): CartiPackage{
    const config = Object.assign({},cfg);
    const { machineConfig } = config
    const {start, length, bootargs} = options
    const shared = options.shared || false
    switch(b.bundleType as BundleType){
        case "flashdrive":
            if(!length || !start){
                throw new Error("flash drive missing length and start")
            }
            machineConfig.flash_drive = machineConfig.flash_drive || []
            machineConfig.flash_drive.push({ cid: b.id, start, length, shared})
            break
        case "ram":
             if(!length)
                throw new Error( "ram missing length")
            machineConfig.ram = { cid: b.id, length } 
            break
        case "rom":
              machineConfig.rom = {
                  bootargs: bootargs as string,
                  cid:b.id
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