export function testTemplateLuaConfig(basePath: string): string {
  return `machine_config = {
    processor = {
      x = {
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
        0x0, -- default
      },
      iflags = 0x18, -- default
      ilrsc = 0xffffffffffffffff, -- default
      marchid = 0x3, -- default
      mcause = 0x0, -- default
      mcounteren = 0x0, -- default
      mcycle = 0x0, -- default
      medeleg = 0x0, -- default
      mepc = 0x0, -- default
      mideleg = 0x0, -- default
      mie = 0x0, -- default
      mimpid = 0x1, -- default
      minstret = 0x0, -- default
      mip = 0x0, -- default
      misa = 0x8000000000141101, -- default
      mscratch = 0x0, -- default
      mstatus = 0xa00000000, -- default
      mtval = 0x0, -- default
      mtvec = 0x0, -- default
      mvendorid = 0x6361727465736920, -- default
      pc = 0x1000, -- default
      satp = 0x0, -- default
      scause = 0x0, -- default
      scounteren = 0x0, -- default
      sepc = 0x0, -- default
      sscratch = 0x0, -- default
      stval = 0x0, -- default
      stvec = 0x0, -- default
    },
    ram = {
      length = 0x4000000,
      image_filename = "${basePath}/parser/cartesi/images/linux.bin",
    },
    rom = {
      image_filename = "${basePath}/parser/cartesi/images/rom.bin",
      bootargs = "console=hvc0 rootfstype=ext2 root=/dev/mtdblock0 rw quiet mtdparts=flash.0:-(root) -- ls /bin",
    },
    htif = {
      tohost = 0x0, -- default
      fromhost = 0x0, -- default
      console_getchar = false, -- default
      yield_progress = false, -- default
      yield_rollup = false, -- default
    },
    clint = {
      mtimecmp = 0x0, -- default
    },
    flash_drive = {
      {
        start = 0x8000000000000000,
        length = 0x3c00000,
        image_filename = "${basePath}/parser/cartesi/images/rootfs.ext2",
        shared = false, -- default
      },
    },
  }
  `}