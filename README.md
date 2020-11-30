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
npm install -g @createdreamtech/carti-lib
```

Then require it into any module.
```js
const { Packager} = require("@createdreamtech/cart-lib/packager");
const { FileStorageProvider} = require("@createdreamtech/cart-lib/storage");
const { CBOREncoder } = require("@createdreamtech/cart-lib/encoders");
const { Decoder } = require("@createdreamtech/cart-lib/decoders");
const { DiskOutput } = require("@createdreamtech/cart-lib/output");
const fs = require('fs-extra');
const encoder = new CBOREncoder()
const storageProvider = new FileStorageProvider("/tmp/carti_machines");
const package = Packager.package(["./machines"], encoder, storageProvider)
console.log(package)
console.log('Resolving package')
decoder = new Decoder(new DiskOutput(`./packages/${package.templateHash}`))
Packager.install(package.id, decoder, storageProvider)
console.log(`Successful installation`)
const files = fs.readdirSync(`./packages/${package.templateHash}`)
console.log(files)
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