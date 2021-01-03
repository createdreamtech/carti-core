import { binaryDataEncoder, getEncoder, inMemoryDataEncoder } from "../encoders";
// binMemEncoder simply returns a default kind of encoder that leaves data in the original stat
// and encodes the data in memory
export const binMemEncoder = getEncoder(inMemoryDataEncoder, binaryDataEncoder)