import * as bundle from "./bundle"
import fs from 'fs-extra';
import {Storage} from "../storage"
import {readableByteStreamToBuffer} from "../encoders"
import {expect} from "chai";
import { MemoryProvider } from "../storage/memory";
import path from "path"
import os from "os"
import _ from "lodash"
import rimraf from "rimraf"
import util from "util"
import { CID } from "multiformats";
import { install } from ".";
const rmAll = util.promisify(rimraf);



//TODO fix test to be more generic
describe("bundle assets test", ()=>{

    const testPath = __dirname + "/../fixtures/parser/cartesi/images/linux.bin"
    const testAsset = fs.readFileSync(testPath)
    //TODO needs better test to check correct pkg results 

    it("should bundle and install asset into a carti compatible format",async ()=>{
        const bundleProvider = new MemoryProvider()
        const bundleStorage = new Storage(bundleProvider)
        const remoteProvider = new MemoryProvider()
        const remoteStorage = new Storage(remoteProvider)
        const bundleMeta: bundle.BundleMeta = {
            bundleType: "ram",
            name: "testBundle",
            version: "1.0.0",
            path: testPath,
        } 
        const bun = await bundle.bundle(bundleMeta, bundleStorage)         
        console.log(bun)
        const cid = CID.parse(bun.id)
        if(!cid){
            throw "invalid cid"
        }
        const data = await bundleStorage.get(cid)
        const bundledData = await readableByteStreamToBuffer(data)
        let testBundle:any = Object.assign({},bundleMeta,{path: undefined, deps:undefined})
        testBundle.id = cid.toString();
        testBundle.fileName = "linux.bin"
        delete testBundle.path
        expect(JSON.stringify(bundleProvider.metaStorage[testBundle.Id]),JSON.stringify(bun))
        
        expect(_.isEqual(bundledData, testAsset)).true
        expect(_.isEqual(testBundle, bun)).true

        await bundle.install(bun, bundleStorage, remoteStorage) 
        const installedBundle = await remoteStorage.get(CID.parse(bun.id))
        expect(_.isEqual(await readableByteStreamToBuffer(installedBundle), bundledData)).true
        expect(JSON.stringify(remoteProvider.metaStorage[testBundle.Id]),JSON.stringify(bun))
        
    })
})