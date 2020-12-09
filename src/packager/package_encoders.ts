import { binaryDataEncoder, getEncoder, inMemoryDataEncoder } from "../encoders";

export const binMemEncoder = getEncoder(inMemoryDataEncoder,binaryDataEncoder)