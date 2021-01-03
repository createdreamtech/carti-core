import { CID } from "multiformats"
import { Readable } from "stream"
import https from "https"
import util from "util"
export type { Fetcher } from "./fetcher"
import { Fetcher } from "./fetcher"
const promisify = util.promisify

// makeHttpFetcher returns an interface for retrieving CID based data from a URI
export function makeHttpFetcher(uri: string): Fetcher {
    return {
        get: (cid: CID): Promise<Readable> => {
            return new Promise((resolve) => {
                https.get(uri, (message) => {
                    resolve(message)
                })
            })
        }
    }
}