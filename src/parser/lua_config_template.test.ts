import fs from "fs-extra";
import { parseLuaMachineConfig } from './lua_parser'
import { generateLuaConfig } from './lua_config_template'
import { expect } from 'chai';
import _ from "lodash"
import util from "util";
import rimraf from 'rimraf';
import { MachineConfig } from "../generated/machine_config_schema";
const rmAll = util.promisify(rimraf)

const asLua = fs.readFileSync(__dirname + "/../fixtures/parser/test_assign_config.lua")

// TODO expand testing for return Lua
// const returnLua = fs.readFileSync(__dirname + "/../fixtures/parser/test_return_config.lua")

describe("lua config template test", () => {


    it("generates config from machine config that can be read as equiavalent object", async () => {
        //read machine config
        let machineConfigA = await parseLuaMachineConfig(asLua.toString())
        console.log(machineConfigA)
        const configFile = generateLuaConfig(machineConfigA)
        console.log(configFile)
        // write to disk
        const location = fs.mkdtempSync("machine-config")
        await fs.writeFile(`${location}/lua_test.lua`, configFile)
        let machineConfigB: any = await parseLuaMachineConfig(fs.readFileSync(`${location}/lua_test.lua`).toString())
        const differences = _.reduce(machineConfigA.processor, function (result: any, value: any, key: any) {
            return _.isEqual(value, machineConfigB.processor[key]) ?
                result : result.concat(key);
        }, []);
        console.log(differences)
        console.log(machineConfigA.processor)
        console.log(machineConfigB.processor)
        expect(_.isEqual(machineConfigA, machineConfigB)).equal(true)
        // TODO clean the cleanup up
        await rmAll(location)

    })
    it("parses a minimal configuration", async () => {
        //read machine config
        //let machineConfigA = await parseLuaMachineConfig(asLua.toString())
        //generates proper config file

        const minMachineConfig: MachineConfig = {
            rom: {
                bootargs: "",
                image_filename: "food"
            },
            ram: {
                image_filename: "filename",
                length: "0x4000"
            },
            flash_drive: [{
                image_filename: "foob",
                length: "0x4000",
                shared: false,
                start: "0x80000000"
            }]
        }
        const configFile = generateLuaConfig(minMachineConfig)
        console.log(configFile)
        // write to disk
        /*const location = fs.mkdtempSync("machine-config")
        await fs.writeFile(`${location}/lua_test.lua`, configFile)
        let machineConfigB = await parseLuaMachineConfig(fs.readFileSync(`${location}/lua_test.lua`).toString())
        expect(_.isEqual(machineConfigA,machineConfigB)).equal(true)
        // TODO clean the cleanup up
        await rmAll(location) 
        */

    })

})