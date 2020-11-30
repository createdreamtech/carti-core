/* Storage Class is puts together the storage providers and encoders
   to ensure cid, and content stored line up when storing the data
i*/ 
import { CID } from "multiformats";
import { Encoder } from "../encoders"
import { Readable } from "stream";
import { Fetcher } from "../fetcher";
import {StorageProvider} from "./provider"

export { DiskProvider } from "./disk"
export { MemoryProvider } from "./memory"
export { S3Provider } from "./s3"
export { StorageProvider } from "./provider"

export class Storage implements Fetcher{

    provider: StorageProvider 

    constructor(provider: StorageProvider){
        this.provider = provider;
    }

    async put<T>(data: T, encoder: Encoder): Promise<CID> {
        const {cid, content} = await encoder(data)
        this.provider.put(cid, content)
        return cid;
    }
    async get(cid: CID): Promise<Readable>{
        return this.provider.get(cid)
    }

}