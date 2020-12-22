import Ajv from "ajv";
import { Readable } from "stream";
import bundleConfigSchema from "../bundle-config-schema.json";
import {fromStreamToStr} from "../utils"
import { BundleConfig, Bundle } from "../generated/bundle_config_schema"
import fs from "fs-extra"

export async function parseBundlesFile(fileContent: Readable): Promise<Bundle[]> {
   const content = await fromStreamToStr(fileContent)
   console.log(content)
   await new Ajv().validate(bundleConfigSchema, content)
   const bundleConfig = JSON.parse(content) as BundleConfig
   return bundleConfig.bundles!
}

export async function writeBundlesFile(filePath: string, config: BundleConfig): Promise<void> {
   await new Ajv().validate(bundleConfigSchema, config)
   return fs.writeFile(filePath, JSON.stringify(config, null, 2))
}