import { inMemoryDataEncoder } from "."

import raw from "multiformats/codecs/raw"
import * as hashers from "./hashers"
import { assert } from "console"

describe('encoders should encode data and yield cid', () => {

    it("should encode data in memory", async () => {
        const { content, cid } = await inMemoryDataEncoder(Buffer.from("hello"), async (data) => raw.encode(data), hashers.keccak256)
        assert(content.length === 5)
        assert(cid !== undefined)
        assert(raw.decode(content) === Buffer.from("hello"))
    })

})