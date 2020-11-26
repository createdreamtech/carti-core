import {MemoryProvider} from "./memory"
import {DiskProvider} from "./disk"
import { Storage } from "."
import { getEncoder, inMemoryDataEncoder,binaryDataEncoder } from "../encoders"
import {expect} from "chai"

const providers =[new MemoryProvider()] 

describe("test all providers", ()=>{
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