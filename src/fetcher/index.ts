import { CID } from "multiformats"
import { Readable } from "stream"
import {https} from "follow-redirects"
import util from "util"
export type { Fetcher } from "./fetcher"
import { Fetcher } from "./fetcher"
const promisify = util.promisify

// makeHttpFetcher returns an interface for retrieving CID based data from a URI
export function makeHttpFetcher(uri: string): Fetcher {
    return {
        get: (cid: CID): Promise<Readable> => {
            return new Promise((resolve, reject) => {
                https.get(uri, (response) => {
                    if(!response || response.statusCode! >=400){
                        reject(new Error(`error: couldn't retrieve data from ${uri} code:${response.statusCode}`))
                    }
                    resolve(response)
                })
            })
        }
    }
}