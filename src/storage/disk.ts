import { CID } from "multiformats";
import { StorageProvider } from "./provider";
import { Readable } from "stream";
import fs from 'fs-extra';

// DiskProvider acts as a basic disk storage class it will write Bundle data to disk based off of it's
// cid, metadata is used to provide additional data about the CID data that's written to disk, it's
// useful if we want a fast way to know additional information about potentially large binary data
export class DiskProvider implements StorageProvider {

    basePath!: string;
    constructor(dir: string) {
        this.basePath = dir
    }
    async put(cid: CID, data: Uint8Array, metaData?: any): Promise<any> {
        const path = `${this.basePath}/${cid.toString()}`
        await fs.ensureDir(path)
        if (typeof metaData === "object")
            await fs.writeJSON(`${path}/carti-meta.json`, metaData)
        return fs.writeFile(`${path}/${cid.toString()}`, data)
    }

    async get(cid: CID): Promise<Readable> {
        return fs.createReadStream(this.path(cid))
    }

    async exists(cid: CID): Promise<boolean> {
        return fs.pathExists(`${this.basePath}/${cid.toString()}/${cid.toString()}`)
    }

    path(cid: CID): string {
        return `${this.basePath}/${cid.toString()}/${cid.toString()}`
    }

}