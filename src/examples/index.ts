import { install, pack, remap } from "../packager"
import * as luaParser from '../parser/lua_parser';
import fs from 'fs-extra';
import {Storage, S3Provider, DiskProvider} from "../storage"
import {expect} from "chai";
import process from "process"
import os from "os"
import { generateLuaConfig } from "../parser";

const secret = process.env["AWS_SECRET_KEY"] || ""
const apiKey = process.env["AWS_API_KEY"] || ""
const region = process.env["AWS_REGION"] || ""
const bucketName = process.env["BUCKET_NAME"] || ""

const storageType = process.argv[2];
const assetDirectory = process.argv[3];
const installationPath = process.argv[4];

// simple loader for our cartesi machine to run the generated config
const luaRunScript  =`
 -- Load the Cartesi module
local cartesi = require"cartesi"
-- Instantiate machine from configuration
local machine = cartesi.machine(require(arg[1]))
-- Run machine until it halts
while not machine:read_iflags_H() do
    machine:run(math.maxinteger)
end
`
const getStorage = async (storageType: string):Promise<Storage>=> {
    switch (storageType) {
        case "s3": 
            return new Storage(new S3Provider(bucketName))
        case "disk":
            await fs.mkdirp(`${assetDirectory}/_disk_storage/`)
            return new Storage(new DiskProvider(`${assetDirectory}/_disk_storage/`))
        default:
            throw Error("Unsupported storage structure")
    }
}

(async function(){
    // read in a machine config generated from dump-config
    const machineConfigFile = fs.readFileSync(`${assetDirectory}/example_machine_config.lua`)
    // translate this into a machine config object 
    let machineConfig = await luaParser.parseLuaMachineConfig(machineConfigFile.toString('utf-8'))
    // remap any virtual directories to directies in the context the packager is running in
    machineConfig = remap(machineConfig, { "/opt/cartesi/share/images": `${assetDirectory}/images` })
    // get the proper storage type for the type of storage you'd like to use
    const storage = await getStorage(storageType)
    // package/upload assets using the storage type specified 
    const pkgConfig = await pack(machineConfig, storage)
    // write this to disk so you can share it with other people 
    await fs.writeJSON("example_carti_package.json", pkgConfig)
    // read a package file into carti Package Config
    const newPkgConfig = await fs.readJSON("example_carti_package.json")
    // install package file from disk into the installation path, using a fetcher in this case we are fetching the 
    // data from the same place we installed it so we can use the same fetcher to retrieve the package 
    const newConfig = await install(newPkgConfig, storage, installationPath)
    // write an example run script that can be mounted into your cartesi machine directory in the location
    // -v {installationPath}:/opt/cartesi/packages 
    await fs.writeFile(`${installationPath}/example_carti_package_run.lua`,generateLuaConfig(newConfig, "return"))
    //write a little helper lua script
    await fs.writeFile(`${installationPath}/run-config.lua`, luaRunScript)
    //to run the package try the following command
    console.log(`docker run -v ${installationPath}:/opt/carti/packages cartesi/playground /bin/bash -c 'cd /opt/carti/packages; luapp5.3 run-config.lua example_carti_package_run'`)
})()