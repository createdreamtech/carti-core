import { CID } from "multiformats";
import { StorageProvider } from "./provider";
import {Readable} from "stream";
import fs from 'fs-extra';

export class DiskProvider implements StorageProvider{

    basePath!: string;
    constructor(dir: string){
        this.basePath = dir
    }
    async put(cid: CID, data: Uint8Array, metaData?: any): Promise<any> {
        const path = `${this.basePath}/${cid.toString()}`
        await fs.ensureDir(path)
        if(typeof metaData === "object")
            await fs.writeJSON(`${path}/carti-meta.json`, metaData)
        return fs.writeFile(`${path}/${cid.toString()}`, data) 
    }

    async get(cid: CID): Promise<Readable> {
        return fs.createReadStream(this.path(cid))
    }

    path(cid:CID): string {
        return `${this.basePath}/${cid.toString()}/${cid.toString()}`
    }

}