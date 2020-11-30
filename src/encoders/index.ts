//import raw from 'multiformats/codecs/raw'
export { getEncoder, Encoder } from "./encoders"
import { DataEncoder, EncodedDatum } from "./encoders"
import { Hasher } from 'multiformats/hashes/hasher';
import { CID } from 'multiformats'

export async function inMemoryDataEncoder<T>(data:T, dataEncoder:DataEncoder<T>, hasher: Hasher<string,number>): Promise<EncodedDatum>
{
        const dataArray = dataEncoder(data);
        const hash = await hasher.encode(dataArray)
        const digest = await hasher.digest(hash)
        const cid = CID.createV1(hasher.code, digest);
        return {cid, content:dataArray}
}


export const binaryDataEncoder= (data: string | Buffer): Uint8Array => {
    if(typeof data === "string"){
        return Buffer.from(data)
    }
    return data 
}
