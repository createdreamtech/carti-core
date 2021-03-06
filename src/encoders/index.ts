//import raw from 'multiformats/codecs/raw'
export { getEncoder, Encoder } from "./encoders"
import { DataEncoder, EncodedDatum } from "./encoders"
import { Hasher } from 'multiformats/hashes/hasher';
import { CID } from 'multiformats'
import { Readable } from "stream";
//inMemoryDataEncoder takes a data encoding function and hasher and encodes the data a array to calculate cid
export async function inMemoryDataEncoder<T>(data: T, dataEncoder: DataEncoder<T>, hasher: Hasher<string, number>): Promise<EncodedDatum> {
    const dataArray = await dataEncoder(data);
    const hash = await hasher.encode(dataArray)
    const digest = await hasher.digest(hash)
    const cid = CID.createV1(hasher.code, digest);
    return { cid, content: dataArray }
}
// readableByteStreamToBuffer converts readableByteStream to a Buffer
export const readableByteStreamToBuffer = async (data: Readable): Promise<Uint8Array> => {
    let chunks: any = [];
    return new Promise((resolve) => {

        data.on("data", (data) => {
            chunks.push(data)
        });
        data.on("end", () => {
            resolve(Buffer.concat(chunks))
        })
    })
}

// binaryDataEncoder encodes data to Uint8Array
export const binaryDataEncoder = async (data: string | Buffer | Readable): Promise<Uint8Array> => {
    if (typeof data === "string") {
        return Buffer.from(data)
    }
    if (data instanceof Readable) {
        return readableByteStreamToBuffer(data)
    }
    return data
}
