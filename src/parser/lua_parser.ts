import Ajv from 'ajv';
import { MachineConfig } from '../generated/machine_config_schema'
import machineSchema from '../machine-config-schema.json';
const parser = require('luaparse')

// parseLuaMachineConfig takes a lua cartesi machine configuration and returns a MachineConfig object 
export async function parseLuaMachineConfig(luaConfig: string): Promise<MachineConfig> {
    const entry: any = parser.parse(luaConfig)
    let node: any = {}
    if (!entry || !entry.body || entry.body.length !== 1) {
        throw new Error("Invalid lua based config")
    }
    if (entry.body[0].type === "ReturnStatement") {
        node = entry.body[0].arguments[0]
    }
    else if (entry.body[0].type === "AssignmentStatement") {
        node = entry.body[0].init[0]
    }
    const parsedConfig: MachineConfig = getLuaTableValues(node)
    await new Ajv().validate(machineSchema, parsedConfig)
    return parsedConfig
}

// getLuaTableValues returns table values used with in the lua config
function getLuaTableValues(node: any) {

    if (node.type === "TableConstructorExpression") {
        let t: any = {}
        node.fields.forEach((f: any) => {
            if (f.type === "TableKeyString") {
                t[f.key.name] = getLuaTableValues(f.value)
            }
            if (f.type === "TableValue") {
                t = Array.isArray(t) ? t : []
                t.push(getLuaTableValues(f.value))
            }
        })
        return t
    } else {
        if (node.raw !== undefined) {
            switch (node.type) {
                case "BooleanLiteral":
                    return node.value
                case "StringLiteral":
                    return node.raw.replace(/^['"](.+)['"]$/, '$1')
                default:
                    return node.raw
            }
        }
    }
}
