import { CID } from "multiformats";
import { Readable } from "stream";

export interface Fetcher {
   get(cid: CID): Promise<Readable>
}