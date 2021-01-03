import { CID } from "multiformats";
import { Readable } from "stream";
// Fetcher defines an interface for retrieving content associated with a cid, StorageProviders implement
// this making it possible to and retrieve data from local storage in the same way as remote storage.
export interface Fetcher {
   get(cid: CID): Promise<Readable>
}