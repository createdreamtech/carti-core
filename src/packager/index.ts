import { Encoder } from "multiformats/codecs/codec"


/*
export function pack(paths: []string, storageProvider: StorageProvider){

    assets = []
    for path in paths
        data = readFile(path)
        cid, content = encodeRawAsset(data)
        storageProvider.put(cid,content)
        assets.push({cid, name, size})
        createRelease(machineHash, assets)
        createRelease(machineHash, assets)=> releaseObj 
        {cid, content) encodePackage(releaseObj)
        storageProvider.put(cid,content)
        
     { 
         release: {
            machineHash: string
            assets: [
                {
                    name
                    size
                    cid
                }

            ]
            version: string
        }
        version: string
    })
}
*/