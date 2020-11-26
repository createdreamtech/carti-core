import { Storage } from "../storage" 
import { getEncoder, inMemoryDataEncoder, binaryDataEncoder } from "../encoders" 
import * as machineConfig from "../generated/machine_config_schema";
import * as pkgConfig from "../generated/machine_config_pkg_schema";
import { CID } from "multiformats";
import fs from 'fs-extra';
import Ajv from "ajv";
import machinePackageSchema from '../machine-config-package-schema.json';


const binMemEncoder = getEncoder(inMemoryDataEncoder,binaryDataEncoder)

const replaceFileName = (obj: any, cid: CID) => {
    const oo = Object.assign({}, obj, { cid: cid.toString()});
    delete oo.image_filename;
    return oo;
}
const createAssetEntry = (fileName: string, cid: CID): pkgConfig.Asset =>{
    return {cid: cid.toString(), name: fileName}
}


export async function pack(config: machineConfig.MachineConfig, storage: Storage): Promise<pkgConfig.CartiPackage>{
    const writeAssetFromDisk = async (fileName: string) => {
        const buffer = await fs.readFile(fileName)
        const cid = await storage.put(buffer, binMemEncoder)
        return {name: fileName, cid }
    }
    const convertConfig = async (cfg: object & { image_filename: string }) => {
        const { cid, name } = await writeAssetFromDisk(cfg.image_filename)
        const asset = createAssetEntry(name, cid)
        const config = replaceFileName(cfg, cid)
        return { asset, config }
    }

    //TODO clean this up
    const tmpMachineConfig = Object.assign({},config)
    let machineConfig:pkgConfig.PackageMachineConfig = {} as pkgConfig.PackageMachineConfig;
    const assets:pkgConfig.Assets = [];
    const version ="0.0.0"

    let converted = await convertConfig(tmpMachineConfig.ram)
    machineConfig.ram = converted.config
    assets.push(converted.asset)

    converted = await convertConfig(tmpMachineConfig.rom)
    machineConfig.rom = converted.config
    assets.push(converted.asset)


    const flashDrives = []
    for (const fdrive of tmpMachineConfig.flash_drive){
        converted = await convertConfig(fdrive)
        flashDrives.push(converted.config)
        assets.push(converted.asset)
    }
    machineConfig.flash_drive = flashDrives;
    machineConfig.processor = tmpMachineConfig.processor;
    machineConfig.htif = tmpMachineConfig.htif;
    machineConfig.clint = tmpMachineConfig.clint;
    const ajv = new Ajv()
    const pkg = {assets, machineConfig, version}
    console.log(JSON.stringify(pkg,null,2))
    const isValid = await ajv.validate(machinePackageSchema, pkg)
    if(!isValid)
        throw new Error(`Errors: ${JSON.stringify(ajv.errors)}`)
    return pkg
}