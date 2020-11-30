import { CID } from "multiformats";
import { StorageProvider } from "./provider";
import {Readable} from "stream";
import fs from 'fs-extra';

export class DiskProvider implements StorageProvider{

    basePath!: string;
    constructor(dir: string){
        this.basePath = dir
    }
    async put(cid: CID, data: Uint8Array): Promise<any> {
        return fs.writeFile(`${this.basePath}/${cid.toString()}`, data) 
    }

    async get(cid: CID): Promise<Readable> {
        return fs.createReadStream(`${this.basePath}/${cid.toString()}`)
    }
}