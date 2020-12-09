import { CID } from "multiformats";
import { StorageProvider } from "./provider";
import {Duplex, Readable, Writable} from "stream";


class MemoryStream extends Writable {
    internal!: Array<any>
    data!:Buffer;
    constructor(){
        super()
        this.internal = []
    }

    _write(chunk: any, encoding: string, callback: (error?: Error | null) => void): void {
        this.internal.push(chunk)
        callback()
    }
    _final(callback:(err?: Error)=>void){
        this.data = Buffer.concat(this.internal)
        this.internal = []
        callback()
    }

    _destroy(error: Error | null, callback: (error?: Error | null) => void){
        this.internal=[]
    }

    get(): Readable {
        const r = new Readable()
        r.push(this.data)
        return r;
    }
    
  }

export class MemoryProvider implements StorageProvider{

    storage:{[k:string]:Uint8Array} = {};
    metaStorage:{[k:string]: string} = {}
    constructor(){
        this.storage = {}
    }
    async put(cid: CID, data: Uint8Array, metaData?:any): Promise<any> {
//        const memory = new MemoryStream()
 //       data.pipe(memory)
// memory.get()
        this.storage[cid.toString()] = data;
        if(metaData && typeof metaData === "object")
            this.metaStorage[cid.toString()]= JSON.stringify(metaData)
    }

    async get(cid: CID): Promise<Readable> {
        let stream = new Duplex();
        stream.push(this.storage[cid.toString()])
        stream.push(null)
        return stream
    }

}