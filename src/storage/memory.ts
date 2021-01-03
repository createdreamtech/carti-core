import { CID } from "multiformats";
import { StorageProvider } from "./provider";
import { Duplex, Readable, Writable } from "stream";

// MemoryProvider is a Memory based storage provider primarily for testing 
export class MemoryProvider implements StorageProvider {

    storage: { [k: string]: Uint8Array } = {};
    metaStorage: { [k: string]: string } = {}
    constructor() {
        this.storage = {}
    }
    async put(cid: CID, data: Uint8Array, metaData?: any): Promise<any> {
        this.storage[cid.toString()] = data;
        if (metaData && typeof metaData === "object")
            this.metaStorage[cid.toString()] = JSON.stringify(metaData)
    }

    async get(cid: CID): Promise<Readable> {
        let stream = new Duplex();
        stream.push(this.storage[cid.toString()])
        stream.push(null)
        return stream
    }

}