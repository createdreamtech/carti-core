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
src/
├── decoders
├── encoders
├── index.ts
├── output
├── packager
└── storage
```
### Components
#### Decoders
Contains the code to define a decoder which can then resolve codecs specified by the package
#### Encoders
Contains the code to encode data be that CBOR, BASE64, etc... 
#### Output 
Contains the code associated with installation and how the code should be written to disk
#### Packager
Contains the code that bundles together file based assets, encodes, and stores the data
#### Storage
Contains the code to store and retrieve data from storage be that Disk, Memory, IPFS, Git, S3

## Roadmap

See the [open issues](https://github.com/createdreamtech/carti-lib/issues) for a list of proposed features (and known issues).

## Contributing

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.

## License

Apache License 2.0

## Resources
- [Carti.Specification](https://createdreamtech/carti-spec)
- [Carti](https://github.com/createdreamtech/carti)