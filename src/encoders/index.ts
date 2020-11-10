import { Hasher } from 'multiformats/hashes/hasher';
import CID from 'multiformats/cid'

//import raw from 'multiformats/codecs/raw'
export interface EncodedDatum<T extends Uint8Array> {
    cid: CID;
    content: T;
} 

// EncodeWith is the public interface for encoding data, it's templated to take data in a format and function to encode it and hash it,
// it returns the contentId and encodedData in an array
export interface EncodeWith<T> {
    (data: T, dataEncoder: (arg:T)=>Uint8Array, hasher: Hasher<string, number>): Promise<EncodedDatum<Uint8Array>>
}
// DataEncoder specifies the definition for a data encoding function
export interface DataEncoder<T> {
    (data: T): Uint8Array;
}

//TODO stronger typing with EncodeWith
export async function inMemoryDataEncoder<T>(data:T, dataEncoder:DataEncoder<T>, hasher: Hasher<string,number>): Promise<EncodedDatum<Uint8Array>>
{
        const dataArray = dataEncoder(data);
        const hash = await hasher.encode(dataArray)
        const digest = await hasher.digest(hash)
        const cid = CID.createV1(hasher.code, digest);
        return {cid, content:dataArray}
}