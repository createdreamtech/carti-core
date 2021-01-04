import { CID } from "multiformats";
import { StorageProvider, StorageMetadata } from "./provider";
import { Readable } from "stream";
import fs from 'fs-extra';

const METADATA_FILE="carti-meta.json"
// DiskProvider acts as a basic disk storage class it will write Bundle data to disk based off of it's
// cid, metadata is used to provide additional data about the CID data that's written to disk, it's
// useful if we want a fast way to know additional information about potentially large binary data
// additionally metadata is optional and data can just be stored as named by cid
export class DiskProvider implements StorageProvider {

    basePath!: string;
    constructor(dir: string) {
        this.basePath = dir
    }

    async getMetadata(cid: CID): Promise<StorageMetadata | null>{
        try {
            const md = await fs.readJSON(`${this.basePath}/${cid.toString()}/${METADATA_FILE}`) as Promise<StorageMetadata>
            return md
        }catch(e){
        }
        return null 
    }

    async put(cid: CID, data: Uint8Array, metaData?: StorageMetadata): Promise<any> {
        const path = `${this.basePath}/${cid.toString()}`
        await fs.ensureDir(path)
        if (typeof metaData === "object")
            await fs.writeJSON(`${path}/${METADATA_FILE}`, metaData)
        const fileName = metaData ? metaData.fileName : cid.toString()
        return fs.writeFile(`${path}/${fileName}`, data)
    }

    async get(cid: CID): Promise<Readable> {
        return fs.createReadStream(await this.path(cid))
    }

    async exists(cid: CID): Promise<boolean> {
        return fs.pathExists(`${this.basePath}/${cid.toString()}`)
    }

    async path(cid: CID): Promise<string> {
            const md = await this.getMetadata(cid)
            if(md)
                return `${this.basePath}/${cid.toString()}/${md.fileName}`
            return `${this.basePath}/${cid.toString()}/${cid.toString()}`
    }

}