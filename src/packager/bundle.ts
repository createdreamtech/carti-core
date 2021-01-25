import { Bundle, Deps } from "../generated/bundle_config_schema";
import fs from 'fs-extra'
import path from 'path'
import { Storage } from "../storage"
import { binMemEncoder } from "./package_encoders"
import { Fetcher } from "../fetcher";
import { CID } from "multiformats"
import { readableByteStreamToBuffer } from "../encoders";
export type BundleType = "ram" | "rom" | "flashdrive" | "raw" 

export interface BundleMeta {
    name: string
    version: string
    bundleType: BundleType
    deps?: Deps
    uri?: string
    fileName?: string
    path: string
}
// bundle creates a bundle and places the Bundle in storage, typically used for storing 
// bundles on disk 
export async function bundle(config: BundleMeta, storage: Storage): Promise<Bundle> {

    const file = await fs.readFile(config.path)
    const cid = await storage.put(file, binMemEncoder, config)
    const fileName = path.basename(config.path)
    return {
        bundleType: config.bundleType,
        name: config.name,
        fileName,
        id: cid.toString(),
        deps: config.deps,
        version: config.version,
    }
}
// install retrieves a bundle from a remote storage facility and stores it in storage
export async function install(bundle: Bundle, fetcher: Fetcher, storage: Storage) {
    const cid = CID.parse(bundle.id)
    const byteStream = await fetcher.get(cid)
    const content = await readableByteStreamToBuffer(byteStream)
    return storage.provider.put(cid, content, bundle);
}