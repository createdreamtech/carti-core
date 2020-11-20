import { CID } from "multiformats";
import { StorageProvider } from "./provider";

class MemoryProvider implements StorageProvider{
    storage:Object = {};
    MemoryProvider(){
    }

    put(cid: CID, ): Promise<any> {

        this.storage[cid.toString()] =
    }
    get(cid: CID): Promise<any> {
        throw new Error("Method not implemented.");
    }


}