import { MachineConfig } from "../generated/machine_config_schema";

import * as generated from "../generated/machine_config_schema"
const space = " ";
const baseIndent= space.repeat(2);

export function writeRegisters(indentLevel:number, x: generated.X){
    const indentation = space.repeat(indentLevel * 2)
    const start = `${indentation}x = {\n`
    const registers =x.map((r)=>`${indentation}${baseIndent}${r}`)
    const body  = `${registers.join(`,\n`)},\n`
    const end =`${indentation}}` 
    return `${start}${body}${end}` 
}

type luaType = "hex" | "string";

export function writeTable(indentLevel: number, entry:any){

    const tables = translateTable(entry)
    for( let i =0; i< tables.length; i++) {
        const [k,v] = tables[i]
    //    if(Array.isArray(v))

    }

}

export function translateTable(entry:any):any{
    return Object.keys(entry).map((k:string)=>{
       if( typeof entry[k] === "object"){
           return [k,translateTable(entry[k])]
       }else{
           return [k,entry[k]]
       }
    })
}
