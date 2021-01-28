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
export type Args = string;
export type BootPrefix = string;
export interface Boot {
  args: Args;
  bootPrefix?: BootPrefix;
}
export type StringDoaGddGA = string;
export interface Ram {
  length: StringGuhVuclw;
  cid: StringDoaGddGA;
  resolvedPath?: StringDoaGddGA;
}
export interface Rom {
  cid: StringDoaGddGA;
  resolvedPath?: StringDoaGddGA;
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
  cid?: StringDoaGddGA;
  resolvedPath?: StringDoaGddGA;
  shared: BooleanVyG3AETh;
  label: StringDoaGddGA;
}
export type FlashDrive = Drive[];
export interface PackageMachineConfig {
  processor?: Processor;
  boot: Boot;
  ram: Ram;
  rom: Rom;
  htif?: Htif;
  clint?: Clint;
  flash_drive: FlashDrive;
}
export type Name = string;
export type FileName = string;
export type Cid = string;
export interface Asset {
  name: Name;
  fileName: FileName;
  cid: Cid;
  [k: string]: any;
}
export type Assets = Asset[];
export type Version = any;
export type ProjectName = string;
export interface Metadata {
  projectName?: ProjectName;
  [k: string]: any;
}
export type Repo = string;
export type Repos = Repo[];
/**
 *
 * Cartesi Machine Package Description
 *
 */
export interface CartiPackage {
  machineConfig: PackageMachineConfig;
  assets: Assets;
  version: Version;
  metadata?: Metadata;
  repos?: Repos;
  [k: string]: any;
}