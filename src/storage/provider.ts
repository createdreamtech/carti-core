import CID from "multiformats/cid"
import { Readable } from "stream";

export interface StorageMetadata {
    fileName: string
    [key: string]: any
}

// StorageProvider is the main interface for writing and reading data from Storage local or Remote
export interface StorageProvider {
    put(cid: CID, data: Uint8Array, metaData?: StorageMetadata):Promise<any>
    get(cid: CID): Promise<Readable>
}