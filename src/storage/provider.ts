import CID from "multiformats/cid"
export interface StorageProvider {
    put(cid: CID):Promise<any>
    get(cid: CID): Promise<any>
}