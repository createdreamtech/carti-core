import * as cartiPackage from "./machine"
import { Bundle } from "../generated/bundle_config_schema"
import { BundleType } from "./bundle"
import { expect } from "chai"
describe("tests package config object management", () => {
    const dummyBundle = (bundleType: BundleType, id: string, name?: string): Bundle => {
        return {
            bundleType,
            fileName: `foobar-${bundleType}`,
            id,
            name: name || `foobar-${bundleType}`,
            version: "1.0.0",
            deps: [],
        }
    }
    // TODO add more exhaustive tests
    it("should crud a carti package object", () => {

        const flashBundle1 = dummyBundle("flashdrive", "flash")
        const flashBundle2 = dummyBundle("flashdrive", "flash2")
        const flashBundle3 = dummyBundle("flashdrive", "flash2", "newname")

        const romBundle = dummyBundle("rom", "rom-cid")
        const ramBundle = dummyBundle("ram", "ram-cid",)

        let config = cartiPackage.addPackageEntry(flashBundle1, { assets: [], machineConfig: {}, version: 1.0 }, { length: "0x400", start: "0x800" , label: "root" })
        expect(config.assets.length === 1).true
        expect(config.assets[0].cid === "flash").true
        expect(config.machineConfig.flash_drive[0].cid === "flash").true

        config = cartiPackage.addPackageEntry(flashBundle2, config, { length: "0x400", start: "0x800", label:"flash1" })
        expect(config.assets.length === 2).true
        expect(config.assets.filter((a) => a.cid === "flash2").length === 1)

        config = cartiPackage.updatePackageEntry(flashBundle3, config, { length: "0x900", start: "0x1000", label:"flash2" })
        expect(config.assets.length === 2).true

        const flashDrive = config.machineConfig.flash_drive.filter((a) => a.cid === "flash2")[0]
        expect(flashDrive.length === "0x900").true
        expect(flashDrive.start === "0x1000").true

        config = cartiPackage.updatePackageEntry(romBundle, config, { bootargs: "hello world" })
        config = cartiPackage.updatePackageEntry(ramBundle, config, { length: "0x450" })
        expect(config.assets.length === 4).true
        expect(config.machineConfig.rom.cid === "rom-cid").true
        expect(config.machineConfig.ram.cid === "ram-cid").true
        expect(config.machineConfig.ram.length === "0x450").true
        expect(config.machineConfig.rom.bootargs === "hello world").true
    })
})