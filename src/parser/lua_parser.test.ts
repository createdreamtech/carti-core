import * as luaParser from './lua_parser';
import fs from 'fs-extra';
import { assert } from "console";


const asLua=fs.readFileSync(__dirname + "/../fixtures/parser/test_assign_config.lua")
const returnLua=fs.readFileSync(__dirname + "/../fixtures/parser/test_return_config.lua")


describe("test cartesi config lua testing", async () => {

    it("should parse return and assign based lua config file", async () => {
        let machineConfig = await luaParser.parseLuaMachineConfig(asLua.toString())
        assert(machineConfig !== undefined)
        assert(machineConfig.flash_drive[0].length === "0x3c00000")

        machineConfig = await luaParser.parseLuaMachineConfig(returnLua.toString())
        assert(machineConfig !== undefined)
        assert(machineConfig.flash_drive[0].length === "0x3c00000")
    })

    it("should throw on malformed config", async ()=> {
        // TODO add negative test
        assert(true)
    })

})
