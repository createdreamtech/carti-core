import { CID } from "multiformats";
import { StorageProvider } from "./provider";
import {Readable} from "stream";

export class DiskProvider implements StorageProvider{

    basePath!: string;
    DiskProvider(dir: string){
        this.basePath = dir
    }
    put(cid: CID, data: Uint8Array): Promise<any> {
        throw new Error("Method not implemented.");
    }
    get(cid: CID): Promise<Readable> {
        throw new Error("Method not implemented.");
    }
}