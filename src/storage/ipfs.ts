import { CID } from "multiformats"
import { Duplex, Readable } from "stream"
import { StorageProvider } from "./provider"
//const IPFS = require('ipfs-core')
import IPFS from 'ipfs-core';
export class IPFSProvider implements StorageProvider{
    node!: Promise<any>;
    constructor(ipfsRepoPath:string, secretAccessKey:string, region:string, bucketName: string){
        
        
    }
    async get(cid: CID): Promise<Readable>{
        const node = await IPFS.create()
        node.add
        const block = this.service.get(cid)
        let stream = new Duplex();
        stream.push(block.data)
        stream.push(null)
 
    }
    // TODO make more efficient don't write to store if data already exists
    // useful for rootfs etc... .
    put(cid: CID, data: Uint8Array):Promise<any> {
        return;
//        const block = new Block(data, cid)
 //       return this.service.put(block)
    }
}