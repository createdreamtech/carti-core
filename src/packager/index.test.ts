import { install, pack } from "../packager"
import * as luaParser from '../parser/lua_parser';
import fs from 'fs-extra';
import {Storage} from "../storage"
import {expect} from "chai";
import { MemoryProvider } from "../storage/memory";
import path from "path"
import os from "os"
import rimraf from "rimraf"
import util from "util"
const rmAll = util.promisify(rimraf);

const testLua=fs.readFileSync(__dirname + "/../fixtures/parser/test_template_config.lua")


//TODO fix test to not look for hardcoded template location
describe.only("packing function test", ()=>{

    //TODO needs better test to check correct pkg results 
    it("should package a MachineConfig return a package Object",async ()=>{
        let machineConfig = await luaParser.parseLuaMachineConfig(testLua.toString())
        const storage = new Storage(new MemoryProvider())
        const pkgConfig = await pack(machineConfig, storage);
        expect(pkgConfig.assets.length === 3).true
    })

    //TODO more exhaustive test here for proper installation
    it("should install a package config", async ()=> {
        let machineConfig = await luaParser.parseLuaMachineConfig(testLua.toString())
        const storage = new Storage(new MemoryProvider())
        const pkgConfig = await pack(machineConfig, storage);
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tmp-carti-p'))
        const cfg = await install(pkgConfig,storage,dir)
        console.log(`${dir}/baenrwigfd3thblxcse7nvzwsebphtfre5nsmfl3wymz5n3jgi3aqwhsocy/rom.bin`)
        let example = fs.readFileSync(`${dir}/baenrwigfd3thblxcse7nvzwsebphtfre5nsmfl3wymz5n3jgi3aqwhsocy/rom.bin`)
        expect(cfg.rom.image_filename === '/opt/carti/packages/baenrwigfd3thblxcse7nvzwsebphtfre5nsmfl3wymz5n3jgi3aqwhsocy/rom.bin')
        console.log(Buffer.from(example).toString())
        expect(Buffer.from(example).toString() === "fakerom").true
        await rmAll(dir)        
        return 
    })

})