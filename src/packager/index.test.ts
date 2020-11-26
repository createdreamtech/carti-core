import { pack } from "../packager"
import * as luaParser from '../parser/lua_parser';
import fs from 'fs-extra';
import {Storage} from "../storage"
import {expect} from "chai";
import { MemoryProvider } from "../storage/memory";


const asLua=fs.readFileSync(__dirname + "/../fixtures/parser/test_template_config.lua")


//TODO fix test to not look for hardcoded template location
describe("packing function test", ()=>{

    it("should package a MachineConfig return a package Object",async ()=>{
        let machineConfig = await luaParser.parseLuaMachineConfig(asLua.toString())
        const storage = new Storage(new MemoryProvider())
        const pkgConfig = await pack(machineConfig, storage);
        console.log(pkgConfig)
    })

})