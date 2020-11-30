## Table of Contents
  - [About The Project](#about-the-project)
  - [Getting Started](#getting-started)
      - [Prerequisites](#prerequisites)
      - [Installation](#installation)
  - [Organization](#organization)
    - [Components](#components)
- [Contributing](#contributing)
- [Resources](#resources)

<!-- about the project -->
## About The Project
Carti lib is a package library that enables [Carti](https://carti) to package, install, and store Cartesi built machines in a discoverable way. It also contains the concrete description of the specification

## Getting Started

### Prerequisites

- node v15.x.x or greater.
- npm v6.10.3 or greater.

### Installation

Install via npm package

```bash
Caveat: Currently not packaged, holding off "for" first official release and more items have been fleshed out
# npm install -g @createdreamtech/carti-lib
```

Then require it into any module.
```ts

import { install, pack, remap } from "../packager"
import * as luaParser from '../parser/lua_parser';
import fs from 'fs-extra';
import {Storage, S3Provider, DiskProvider} from "../storage"
import {expect} from "chai";
import process from "process"
import os from "os"
import { generateLuaConfig } from "../parser";

const secret = process.env["AWS_SECRET_KEY"] || ""
const apiKey = process.env["AWS_API_KEY"] || ""
const region = process.env["AWS_REGION"] || ""
const bucketName = process.env["BUCKET_NAME"] || ""

const storageType = process.argv[2];
const assetDirectory = process.argv[3];
const installationPath = process.argv[4];

// simple loader for our cartesi machine to run the generated config
const luaRunScript  =`
 -- Load the Cartesi module
local cartesi = require"cartesi"
-- Instantiate machine from configuration
local machine = cartesi.machine(require(arg[1]))
-- Run machine until it halts
while not machine:read_iflags_H() do
    machine:run(math.maxinteger)
end
`
const getStorage = async (storageType: string):Promise<Storage>=> {
    switch (storageType) {
        case "s3": 
            return new Storage(new S3Provider(apiKey, secret, region, bucketName))
        case "disk":
            await fs.mkdirp(`${assetDirectory}/_disk_storage/`)
            return new Storage(new DiskProvider(`${assetDirectory}/_disk_storage/`))
        default:
            throw Error("Unsupported storage structure")
    }
}

(async function(){
    // read in a machine config generated from dump-config
    const machineConfigFile = fs.readFileSync(`${assetDirectory}/example_machine_config.lua`)
    // translate this into a machine config object 
    let machineConfig = await luaParser.parseLuaMachineConfig(machineConfigFile.toString('utf-8'))
    // remap any virtual directories to directies in the context the packager is running in
    machineConfig = remap(machineConfig, { "/opt/cartesi/share/images": `${assetDirectory}/images` })
    // get the proper storage type for the type of storage you'd like to use
    const storage = await getStorage(storageType)
    // package/upload assets using the storage type specified 
    const pkgConfig = await pack(machineConfig, storage)
    // write this to disk so you can share it with other people 
    await fs.writeJSON("example_carti_package.json", pkgConfig)
    // read a package file into carti Package Config
    const newPkgConfig = await fs.readJSON("example_carti_package.json")
    // install package file from disk into the installation path, using a fetcher in this case we are fetching the 
    // data from the same place we installed it so we can use the same fetcher to retrieve the package 
    const newConfig = await install(newPkgConfig, storage, installationPath)
    // write an example run script that can be mounted into your cartesi machine directory in the location
    // -v {installationPath}:/opt/cartesi/packages 
    await fs.writeFile(`${installationPath}/example_carti_package_run.lua`,generateLuaConfig(newConfig, "return"))
    //write a little helper lua script
    await fs.writeFile(`${installationPath}/run-config.lua`, luaRunScript)
    //to run the package try the following command
    console.log(`docker run -v ${installationPath}:/opt/carti/packages cartesi/playground /bin/bash -c 'cd /opt/carti/packages; luapp5.3 run-config.lua example_carti_package_run'`)
})()
```
## Organization 
```
.
├── encoders
│   ├── encoders.ts
│   ├── hashers.ts
├── examples
│   ├── README.md
│   ├── generate_package.sh
│   ├── index.ts
│   └── run-config.lua
├── fetcher
│   ├── fetcher.ts
│   ├── index.ts
├── fixtures
├── generated
│   ├── machine_config_pkg_schema.ts
│   ├── machine_config_schema.ts
│   └── mirror_config_schema.ts
├── index.ts
├── machine-config-package-schema.json
├── machine-config-schema.json
├── mirror-config-schema.json
├── packager
│   ├── index.ts
│   ├── fetcher.ts
│   └── utils.ts
├── parser
│   ├── index.ts
│   ├── lua_config_template.ts
│   ├── lua_config_template_test.ts
│   ├── lua_parser.test.ts
│   └── lua_parser.ts
└── storage
    ├── disk.ts
    ├── index.ts
    ├── memory.ts
    ├── provider.ts
    ├── s3.ts
    └── util.ts
```
### Components
#### Encoders
Contains the code to encode data be that CBOR, BASE64, etc... 
#### Packager
Contains the code that bundles together file based assets, encodes, and stores the data
#### Storage
Contains the code to store and retrieve data from storage be that Disk, Memory, IPFS, Git, S3
#### Fetcher
Contains code to resolve package data from URI or other platform, which may or may not intersect with Storage
i.e. HTTP might have fetcher and Storage may just implement retrieval from s3 api
#### Parser
Contains the code to parse lua config files and generate lua config files used to run cartesi machines
#### Examples
Contains an example of how this lib can be used to generate cartesi machines and package machine data
#### Generated
Contains code generated from the schemas that describe the various package formats
#### Utils
Contains code to generate tyepscript types from schemas and produces /generated
#### *-schema.json
##### machine-config-package-schema.json
The schema for carti packages, includes separate section for managing assets and a format that links to them via CIDs it also includes some tenative metadata
##### machine-config-schema.json
The schema that directly translate cartesi machine configurations generated from the cartesi machine lua based output
from dump-configuration
##### mirror-config-schema.json
A tenative description of the actual storage location of the package in question, with this file it becomes possible to
describe where the package can expect to resolve the CIDs( content identifiers ) for the cartesi assets

## Roadmap

See the [open issues](https://github.com/createdreamtech/carti-lib/issues) for a list of proposed features (and known issues).

## Contributing

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.

## License

Apache License 2.0

## Resources
- [Carti.Specification](https://createdreamtech/carti-spec)  - update coming soon
- [Carti](https://github.com/createdreamtech/carti) - the cli package coming soon