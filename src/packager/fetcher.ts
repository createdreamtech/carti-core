import { Fetcher } from "../fetcher";
import { MirrorConfig } from "../generated/mirror_config_schema";
import {Storage, MemoryProvider, DiskProvider} from "../storage"

export async function getFetcherForConfig(mirrorConfig: MirrorConfig): Promise<Fetcher> {
  
    switch(mirrorConfig.locationType){
        case "memory":
            return new Storage(new MemoryProvider())
        case "s3":
            return new Storage(new MemoryProvider())
        case "disk":
            return new Storage(new DiskProvider())
        default:
            throw new Error("Could not resolve mirrorConfig to map to fetching interface")
    }
}