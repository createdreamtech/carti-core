import { fstat } from "fs";
import { Bundle, Deps } from "../generated/bundle_config_schema";
import fs from 'fs-extra'
import path from 'path'
import {Storage} from "../storage"
import {binMemEncoder} from "./package_encoders"
import { Fetcher } from "../fetcher";
import { CID } from "multiformats"
import {readableByteStreamToBuffer} from "../encoders";
// bundle takes source path of asset that you'd like to package stores it in 
// default location of ./.bundles/ . and uses disktorage interface to ensure
// consistent representation of assets depending on the downstream use case

type BundleType = "ram" | "rom" | "raw" |"flashdrive"

export interface BundleMeta {
    name: string
    version: string
    bundleType: BundleType 
    deps?: Deps
    uri?: string
    path: string
}

export async function bundle(config: BundleMeta, storage:Storage): Promise<Bundle> {
    
   const file = await fs.readFile(config.path)
   const cid = await storage.put(file, binMemEncoder)
   const fileName = path.basename(config.path)
   return {
       bundleType: config.bundleType,
       name: config.name,
       fileName,
       id : cid.toString(),
       deps:config.deps,
       version: config.version,
   }
}
//TODO eventually install will need to take the cid from the bundle and either 
// liek for like put with cid specification where the raw data 
export async function install(bundle: Bundle, fetcher: Fetcher, storage: Storage) {
    const cid = CID.parse(bundle.id)
    const byteStream = await fetcher.get(cid)
    const content = await readableByteStreamToBuffer(byteStream)
    return storage.provider.put(cid, content, bundle);
}