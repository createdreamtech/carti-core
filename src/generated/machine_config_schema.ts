export type StringGuhVuclw = string;
export type X = StringGuhVuclw[];
export interface Processor {
  x?: X;
  iflags?: StringGuhVuclw;
  ilrsc?: StringGuhVuclw;
  marchid?: StringGuhVuclw;
  mcause?: StringGuhVuclw;
  mcounteren?: StringGuhVuclw;
  mcycle?: StringGuhVuclw;
  medeleg?: StringGuhVuclw;
  mepc?: StringGuhVuclw;
  mideleg?: StringGuhVuclw;
  mie?: StringGuhVuclw;
  mimpid?: StringGuhVuclw;
  minstret?: StringGuhVuclw;
  mip?: StringGuhVuclw;
  misa?: StringGuhVuclw;
  mscratch?: StringGuhVuclw;
  mstatus?: StringGuhVuclw;
  mtval?: StringGuhVuclw;
  mtvec?: StringGuhVuclw;
  mvendorid?: StringGuhVuclw;
  pc?: StringGuhVuclw;
  satp?: StringGuhVuclw;
  scause?: StringGuhVuclw;
  scounteren?: StringGuhVuclw;
  sepc?: StringGuhVuclw;
  sscratch?: StringGuhVuclw;
  stval?: StringGuhVuclw;
  stvec?: StringGuhVuclw;
}
export type StringDoaGddGA = string;
export interface Ram {
  length: StringGuhVuclw;
  image_filename: StringDoaGddGA;
}
export interface Rom {
  image_filename: StringDoaGddGA;
  bootargs: StringDoaGddGA;
}
export type BooleanVyG3AETh = boolean;
export interface Htif {
  tohost: StringGuhVuclw;
  fromhost: StringGuhVuclw;
  console_getchar: BooleanVyG3AETh;
  yield_progress: BooleanVyG3AETh;
  yield_rollup: BooleanVyG3AETh;
}
export interface Clint {
  mtimecmp: StringGuhVuclw;
}
export interface Drive {
  start: StringGuhVuclw;
  length: StringGuhVuclw;
  image_filename: StringDoaGddGA;
  shared: BooleanVyG3AETh;
}
export type FlashDrive = Drive[];
/**
 *
 * Cartesi Machine Configuration
 *
 */
export interface MachineConfig {
  processor?: Processor;
  ram: Ram;
  rom: Rom;
  htif?: Htif;
  clint?: Clint;
  flash_drive: FlashDrive;
}