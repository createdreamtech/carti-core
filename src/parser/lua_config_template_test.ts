import fs from "fs-extra";
import { parseLuaMachineConfig } from './lua_parser'
import {generateLuaConfig} from './lua_config_template'
import {expect} from 'chai';
import _ from "lodash"
import util from "util";
import rimraf from 'rimraf';
const rmAll = util.promisify(rimraf)

const asLua=fs.readFileSync(__dirname + "/../fixtures/parser/test_assign_config.lua")
const returnLua=fs.readFileSync(__dirname + "/../fixtures/parser/test_return_config.lua")

//TODO move to index.test.ts

describe("lua config template test", ()=>{


    it("generates config from machine config that can be read as equiavalent object", async ()=> {
        //read machine config
        let machineConfigA = await parseLuaMachineConfig(asLua.toString())
        const configFile = generateLuaConfig(machineConfigA)
        // write to disk
        const location = fs.mkdtempSync("machine-config")
        console.log(location)
        await fs.writeFile(`${location}/lua_test.lua`, configFile)
        let machineConfigB = await parseLuaMachineConfig(fs.readFileSync(`${location}/lua_test.lua`).toString())
        expect(_.isEqual(machineConfigA,machineConfigB)).equal(true)
        // TODO clean the cleanup up
        await rmAll(location) 
        
    })

})