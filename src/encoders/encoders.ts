import { Hasher } from 'multiformats/hashes/hasher';
import CID from 'multiformats/cid'
import { keccak256 } from './hashers'


export interface EncodedDatum {
    cid: CID;
    content: Uint8Array;
}

// EncodeWith is the public interface for encoding data, it's templated to take data in a format and function to encode it and hash it,
// it returns the contentId and encodedData in an array
export interface Encoder {
    (data: any): Promise<EncodedDatum>;
}

// DataEncoder specifies the definition for a data encoding function
export interface DataEncoder<T> {
    (data: T): Promise<Uint8Array>;
}

// EncodeWith is a type for defining the composition of encoding functions
export interface EncodeWith<T> {
    (data: T, dataEncoder: DataEncoder<T>, hasher: Hasher<string, number>): Promise<EncodedDatum>
}

/* getEncoder composes an encoding function that takes data and returns a function single
parameter function that can be used to encode data when writing to storage
example usage
export const binMemoryEncoder = getEncoder(inMemoryDataEncoder, binaryDataEncoder)
storage.put("mydata", binMemoryEncoder)
*/
export function getEncoder<T>(encoder: EncodeWith<T>, dataEncoder: DataEncoder<T>): Encoder {
    return async (data) => {
        return encoder(data, dataEncoder, keccak256)
    }
}

