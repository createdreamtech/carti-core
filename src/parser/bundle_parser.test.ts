import { parseBundlesFile } from "./bundle_parser"
import fs from "fs-extra"

describe("bundle parser test", ()=>{

    it("should parse bundles file", async ()=>{
        const content = fs.createReadStream(`${__dirname}/../fixtures/bundles/bundles.json`)
        const parsedBundle = await parseBundlesFile(content)
        console.log(parsedBundle)

    })

})