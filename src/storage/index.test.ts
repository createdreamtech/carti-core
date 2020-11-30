import {MemoryProvider} from "./memory"
import {DiskProvider} from "./disk"
import { StorageProvider } from "./provider"
import { Storage } from "."
import { getEncoder, inMemoryDataEncoder,binaryDataEncoder } from "../encoders"
import {expect} from "chai"
import { S3Provider } from "./s3"
import awsMock from 'mock-aws-s3';
import { promisify } from 'util';
import rimraf from 'rimraf'
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
const rmAll = promisify(rimraf) 

describe("test all providers", ()=>{
    let s3Provider;
    let storageDir: string;
    let providers: Array<StorageProvider>;
    before(async () => {
        s3Provider = new S3Provider("accessKey",
            "secret",
            "region",
            "bucketName"
        )
        storageDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tmp-carti-bucket'))
        const diskStorageDir = `${storageDir}/disk-provider`
        await fs.mkdirp(diskStorageDir);
        awsMock.config.basePath = storageDir 
            s3Provider.s3 = new awsMock.S3({
                params: { Bucket: s3Provider.bucketName }
            })

        providers = [new MemoryProvider(), s3Provider, new DiskProvider(diskStorageDir)]
    })
    after(async ()=>{
        await rmAll(storageDir)
    })


    const testEncoder = getEncoder(inMemoryDataEncoder, binaryDataEncoder)
    it("should put and get data from storage provider", async ()=>{
        for ( const provider of providers){
            const storage = new Storage(provider)
            const cid = await storage.put("hello", testEncoder)
            expect(cid.toString() === "baenrwic5gakagfyum5usyghneve4rza6bq7xiuougvkdephvzun62zfsxm").true
            const res = await storage.get(cid)
            const chunks = []
            for await (let chunk of res) {
                chunks.push(chunk)
            }
            expect(Buffer.concat(chunks).toString("utf-8") === "hello").true
        }
    })
})