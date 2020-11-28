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

const machineTemplate =
`machine_config = {
    processor = {
      x = {
<% _.forEach(processor.x, function(register) { %>${(' ').repeat(8)}<%-register %>,\n<% }); %>
      },
      iflags = <%- processor.iflags %>,
      ilrsc = <%- processor.ilrsc %>,
      marchid = <%- processor.marchid %>,
      mcause = <%- processor.mcause %>,
      mcounteren = <%- processor.mcounteren %>,
      mcycle = <%- processor.mcycle %>,
      medeleg = <%- processor.medeleg %>,
      mepc = <%- processor.mepc %>,
      mideleg = <%- processor.mideleg %>,
      mie = <%- processor.mie %>,
      mimpid = <%- processor.mimpid %>,
      minstret = <%- processor.minstret %>,
      mip = <%- processor.mip %>,
      misa = <%- processor.misa %>,
      mscratch = <%- processor.mscratch %>,
      mstatus = <%- processor.mstatus %>,
      mtval = <%- processor.mtval %>,
      mtvec = <%- processor.mtvec %>,
      mvendorid = <%- processor.mvendorid %>,
      pc = <%- processor.pc %>,
      satp = <%- processor.satp %>,
      scause = <%- processor.scause %>,
      scounteren = <%- processor.scounteren %>,
      sepc = <%- processor.sepc %>,
      sscratch = <%- processor.sscratch %>,
      stval = <%- processor.stval %>,
      stvec = <%- processor.stvec %>,
    },
    ram = {
      length = <%- ram.length %>,
      image_filename = "<%- ram.image_filename %>",
    },
    rom = {
      image_filename = "<%- rom.image_filename %>",
      bootargs = "<%- rom.bootargs %>",
    },
    htif = {
      tohost = <%- htif.tohost %>,
      fromhost = <%- htif.fromhost %>,
      console_getchar = <%- htif.console_getchar %>,
      yield_progress = <%- htif.yield_progress %>,
      yield_rollup = <%- htif.yield_rollup %>,
    },
    clint = {
      mtimecmp = <%- clint.mtimecmp %>,
    },
    flash_drive = {
<% _.forEach(flash_drive, function(drive){ xx= flashDriveTemplate(drive);%><%= xx %><%}) %>
    },
  }
`


export const generateLuaConfig = (config: MachineConfig): string => {
    const compiled = _.template(machineTemplate);  
    return compiled({...config, flashDriveTemplate})
}