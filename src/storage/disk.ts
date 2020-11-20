import { CID } from "multiformats";
import { StorageProvider } from "./provider";

export class DiskProvider implements StorageProvider{
    DiskProvider(){

    }
    put(cid: CID): Promise<any> {
        throw new Error("Method not implemented.");
    }
    get(cid: CID): Promise<any> {
        throw new Error("Method not implemented.");
    }

}