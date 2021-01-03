import { hasher } from "multiformats"
import sha3, { Message } from 'js-sha3'
type EncodingFn = (message: Message) => number[]
const encoder = (enc: EncodingFn) => (bb: Message) => new Uint8Array(enc(bb))

// keccak256 defines hashing function used to make cid's from data 
export const keccak256 = hasher.from({
        code: 0x1b,
        name: 'keccak-256',
        encode: encoder(sha3.keccak256.array)
});

