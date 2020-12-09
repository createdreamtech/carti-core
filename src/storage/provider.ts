import CID from "multiformats/cid"
import { Readable } from "stream";
export interface StorageProvider {
    put(cid: CID, data: Uint8Array, metaData?: any):Promise<any>
    get(cid: CID): Promise<Readable>
}