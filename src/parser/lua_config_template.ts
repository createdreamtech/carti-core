import { MachineConfig } from "../generated/machine_config_schema";
import _ from "lodash";

const flashDriveTemplate = (drive:any, indent=6):string => {
const bodyIndent = ' '.repeat(indent + 2)
const outerIndent = ' '.repeat(indent)
const fdriveTemplate=`${outerIndent}{
${bodyIndent}start = <%- start %>,
${bodyIndent}length = <%- length %>,
${bodyIndent}image_filename = "<%- image_filename %>",
${bodyIndent}shared = <%- shared %>,
${outerIndent}},
`
    const compiled = _.template(fdriveTemplate)
    return compiled(drive)
}
const condVarTemplate = (val:any, varName:string, indent = 0, quote=false): string => {
  const bodyIndent = ' '.repeat(indent + 2)
  const q= quote ? '"' : ""
  const value = `${bodyIndent}${varName} = ${q}<%- ${varName} %>${q},`
  const condTemplate = `
   <% if (typeof(${varName}) !== "undefined") {%>
     ${value}
    <%}%>
  `
  const compiled = _.template(condTemplate)
  const varMap:any = {} 
  varMap[varName] = val
  return compiled(varMap)
}

const machineTemplate =
`<%- templateSignature %> {
  <% if(typeof(processor) !== "undefined") {%>
    processor = {
      <% if(typeof(processor.x) !== "undefined") {%>
      x = {
<% _.forEach(processor.x, function(register) { %>${(' ').repeat(8)}<%-register %>,\n<% }); %>
      },
      <%}%>
      <%= condVarTemplate(processor.iflags, "iflags") %>
      <%= condVarTemplate(processor.ilrsc, "ilrsc") %>
      <%= condVarTemplate(processor.marchid, "marchid") %>
      <%= condVarTemplate(processor.mcause, "mcause") %>
      <%= condVarTemplate(processor.mcounteren, "mcounteren") %>
      <%= condVarTemplate(processor.mcycle, "mcycle") %>
      <%= condVarTemplate(processor.medeleg, "medeleg") %>
      <%= condVarTemplate(processor.mepc, "mepc") %>
      <%= condVarTemplate(processor.mideleg, "mideleg") %>
      <%= condVarTemplate(processor.mie, "mie") %>
      <%= condVarTemplate(processor.mimpid, "mimpid") %>
      <%= condVarTemplate(processor.minstret, "minstret") %>
      <%= condVarTemplate(processor.mip, "mip") %>
      <%= condVarTemplate(processor.misa, "misa") %>
      <%= condVarTemplate(processor.mscratch, "mscratch") %>
      <%= condVarTemplate(processor.mstatus, "mstatus") %>
      <%= condVarTemplate(processor.mtvec, "mtvec") %>
      <%= condVarTemplate(processor.mtval, "mtval") %>
      <%= condVarTemplate(processor.mvendorid, "mvendorid") %>
      <%= condVarTemplate(processor.pc, "pc") %>
      <%= condVarTemplate(processor.satp, "satp") %>
      <%= condVarTemplate(processor.scause, "scause") %>
      <%= condVarTemplate(processor.scounteren, "scounteren") %>
      <%= condVarTemplate(processor.sepc, "sepc") %>
      <%= condVarTemplate(processor.sscratch, "sscratch") %>
      <%= condVarTemplate(processor.stval, "stval") %>
      <%= condVarTemplate(processor.stvec, "stvec") %>
    },
    <%}%>
    ram = {
      length = <%- ram.length %>,
      image_filename = "<%- ram.image_filename %>",
    },
    rom = {
      image_filename = "<%- rom.image_filename %>",
      <%= condVarTemplate(rom.bootargs, "bootargs",0,true) %>
    },
    <% if( typeof(htif) !== "undefined") {%>
    htif = {
      <%= condVarTemplate(htif.tohost, "tohost") %>
      <%= condVarTemplate(htif.fromhost, "fromhost") %>
      <%= condVarTemplate(htif.console_getchar, "console_getchar") %>
      <%= condVarTemplate(htif.yield_progress, "yield_progress") %>
      <%= condVarTemplate(htif.yield_rollup, "yield_rollup") %>
    },
    <%}%>
    <% if (typeof(clint) !== "undefined") {%>
    clint = {
      <%= condVarTemplate(clint.mtimecmp, "mtimecmp") %>
    },
    <%}%>
    flash_drive = {
<% _.forEach(flash_drive, function(drive){ xx= flashDriveTemplate(drive);%><%= xx %><%}) %>
    },
  }
`
const getTemplateSignature = (signatureType: LuaSignatureType) => {
    if (signatureType === "assignment") {
        return "machine_config ="
    }
    return "return"
}
type LuaSignatureType = "return" | "assignment"

export const generateLuaConfig = (config: MachineConfig, sig:LuaSignatureType = "return"): string => {

    const templateSignature = getTemplateSignature(sig)
    const compiled = _.template(machineTemplate);  
    return compiled({ ...config,flashDriveTemplate, condVarTemplate, templateSignature}).replace(/\s+\n/g,"\n")
}