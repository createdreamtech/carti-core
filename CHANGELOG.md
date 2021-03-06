## [1.7.2](https://github.com/createdreamtech/carti-core/compare/1.7.1...1.7.2) (2021-02-02)


### Bug Fixes

* this resolves an issue with bundleless flash drives ([022adb9](https://github.com/createdreamtech/carti-core/commit/022adb965e3dd2e96792ad6ba64fa160174ba87d))

## [1.7.1](https://github.com/createdreamtech/carti-core/compare/1.7.0...1.7.1) (2021-01-29)


### Bug Fixes

* this corrects escaping on all fields ([de0d191](https://github.com/createdreamtech/carti-core/commit/de0d19195079d427806ae634ee6023cbf2f45dc7))

# [1.7.0](https://github.com/createdreamtech/carti-core/compare/1.6.2...1.7.0) (2021-01-28)


### Features

* add support for a repo specification within package definition ([f4e2bab](https://github.com/createdreamtech/carti-core/commit/f4e2bab1e7b666988a3a232a83dd1a9dadb7936a))

## [1.6.2](https://github.com/createdreamtech/carti-core/compare/1.6.1...1.6.2) (2021-01-27)


### Bug Fixes

* correct following redirects properly ([d42a8e5](https://github.com/createdreamtech/carti-core/commit/d42a8e5248187ded87627c53f800a375218b88bb))

## [1.6.1](https://github.com/createdreamtech/carti-core/compare/1.6.0...1.6.1) (2021-01-26)


### Bug Fixes

* adds proper support for removing drives by label and test ([3f8970b](https://github.com/createdreamtech/carti-core/commit/3f8970bd1fe52554f0d01d097ad1284111f6d143))

# [1.6.0](https://github.com/createdreamtech/carti-core/compare/1.5.0...1.6.0) (2021-01-25)


### Features

* export configuration creation w/o install and configurable destPath ([5d5b96f](https://github.com/createdreamtech/carti-core/commit/5d5b96f3f27032baeab47900fe3e636d8bd1abaa))

# [1.5.0](https://github.com/createdreamtech/carti-core/compare/1.4.0...1.5.0) (2021-01-25)


### Features

* add support for boot args as a first class entity ([1d390f2](https://github.com/createdreamtech/carti-core/commit/1d390f2354049f7c21f4383bcde7638a33c8538f))

# [1.4.0](https://github.com/createdreamtech/carti-core/compare/1.3.1...1.4.0) (2021-01-22)


### Bug Fixes

* this is a feature allow for dynamic flash drives set at runtime ([f2bed8a](https://github.com/createdreamtech/carti-core/commit/f2bed8a4795b2a1b1035569fbd63799e0b4c5a3c))


### Features

* add support for auto resolving start position for flashdrive ([a07a4a5](https://github.com/createdreamtech/carti-core/commit/a07a4a5c546eea8b4f32eb8290e5cf399c8f7ee0))

## [1.3.1](https://github.com/createdreamtech/carti-lib/compare/1.3.0...1.3.1) (2021-01-14)


### Bug Fixes

* change return to use async for try/await clauses downstream ([3faf78f](https://github.com/createdreamtech/carti-lib/commit/3faf78f84f5071828df8f1a77878e5e29c17260a))

# [1.3.0](https://github.com/createdreamtech/carti-lib/compare/1.2.0...1.3.0) (2021-01-05)


### Features

* add support for filename for machine installation ([67f0e6d](https://github.com/createdreamtech/carti-lib/commit/67f0e6d1aa8b474a6b7250779d48ced6d5f04c3f))

# [1.2.0](https://github.com/createdreamtech/carti-lib/compare/1.1.1...1.2.0) (2021-01-05)


### Features

* refactor assets to explicitly include filename ([643d588](https://github.com/createdreamtech/carti-lib/commit/643d588f921cf0d9ea89e0a4081515cf606cabd4))

## [1.1.1](https://github.com/createdreamtech/carti-lib/compare/1.1.0...1.1.1) (2021-01-04)


### Bug Fixes

* path resolution had additiona bracket breaking downstream ([38aeda7](https://github.com/createdreamtech/carti-lib/commit/38aeda7677837cbd08de29188872e443961ecf1d))

# [1.1.0](https://github.com/createdreamtech/carti-lib/compare/1.0.0...1.1.0) (2021-01-04)


### Features

* rewrite disk provider to respect filename metadata is specified ([2298624](https://github.com/createdreamtech/carti-lib/commit/2298624d01c6305d03104c41b82eb38465e3535c))

# 1.0.0 (2021-01-04)


### Bug Fixes

* add build requirement on test ([bd82139](https://github.com/createdreamtech/carti-lib/commit/bd82139820d29926f1841a95c07734a6b61ae3e6))
* add https direct fetching interface ([f4d4fb3](https://github.com/createdreamtech/carti-lib/commit/f4d4fb3bdfdb6b1cc05e39d481690394348d147c))
* add https direct fetching interface ([a9153bf](https://github.com/createdreamtech/carti-lib/commit/a9153bf95c50dbf52ebfb5d11a4586cd46c0e640))
* add missing generated CartiPackage schema with resolvedPath ([71c812a](https://github.com/createdreamtech/carti-lib/commit/71c812a5da233b59efcff7489d89ca8c5519bca7))
* add missing generated CartiPackage schema with resolvedPath ([9e0e304](https://github.com/createdreamtech/carti-lib/commit/9e0e3048e2926f506173d2692160ae373df3826e))
* add missing non js/json assets to build ([89cbb5c](https://github.com/createdreamtech/carti-lib/commit/89cbb5c76a03a2b01774425afa57efb4001409e1))
* add missing test for carti package management ([d585f5c](https://github.com/createdreamtech/carti-lib/commit/d585f5cd6d210d1bb895e75301ab6d18d27fa3b7))
* add missing test for carti package management ([5f22024](https://github.com/createdreamtech/carti-lib/commit/5f22024a945980b11530a13885b0dbb5950b5084))
* add missing test for disk provider ([e1f3b71](https://github.com/createdreamtech/carti-lib/commit/e1f3b71004f3e634d41fc1d1dd633d0f04126718))
* add optional support for fileName ([728056f](https://github.com/createdreamtech/carti-lib/commit/728056f9ba6f6540d888203473942f78d950d150))
* add optional support for fileName ([86291ff](https://github.com/createdreamtech/carti-lib/commit/86291ff96ed278716d57f328880e17386fc0d000))
* add sketch for translating mirror config ([f08587d](https://github.com/createdreamtech/carti-lib/commit/f08587d28910cacd150ceec60f9e217289f0e0fe))
* add support for ci and semantic release ([2c9021c](https://github.com/createdreamtech/carti-lib/commit/2c9021ca62626877127b0b7d83b70f0ac29aeaaa))
* add support for ci and semantic release ([5f860e7](https://github.com/createdreamtech/carti-lib/commit/5f860e7ccbf93394edcbe759664972f91114d783))
* add support for mocha test temp. until jest fix ([e9eb993](https://github.com/createdreamtech/carti-lib/commit/e9eb993c87fadb94319564ab101f272eea1f35b0))
* add support ofr resolvedPath for generating machine config ([c968201](https://github.com/createdreamtech/carti-lib/commit/c968201214119f1fd97e98defd7aa20f746278f5))
* add support ofr resolvedPath for generating machine config ([c353a52](https://github.com/createdreamtech/carti-lib/commit/c353a520e7692ebf83ae1e35058c534d1f5d53ce))
* adjust storage path to be basepath/cid/cid where second cid is the content, next to metadata for disk ([96d64c8](https://github.com/createdreamtech/carti-lib/commit/96d64c85e737e49c0ccf3b669ffc23566a015729))
* adjust storage path to be basepath/cid/cid where second cid is the content, next to metadata for disk ([051bce7](https://github.com/createdreamtech/carti-lib/commit/051bce70a312c88bd1a5f8b9957b141bab2180ce))
* configuration copy to respect undefined fields for lua config ([4e56d10](https://github.com/createdreamtech/carti-lib/commit/4e56d1096bcc3a6f73af894bddaacdef298ab9c3))
* configuration copy to respect undefined fields for lua config ([ad1265e](https://github.com/createdreamtech/carti-lib/commit/ad1265e9829d7cfb34ab0008b32800c021387ceb))
* correct encoding return type ([cf9b41d](https://github.com/createdreamtech/carti-lib/commit/cf9b41d498b418885a82ba339912236f85e379bf))
* correct mocha dependency in package-lock file ([8d2afe9](https://github.com/createdreamtech/carti-lib/commit/8d2afe9e1e3b525dce8243d32875e3117169f05c))
* correct remapping to save remapping result ([aeb1a72](https://github.com/createdreamtech/carti-lib/commit/aeb1a7298eb5aa2fdd344f5db5fd2284d2c41c29))
* correct schemas on machine configuration to json logic ([698aa76](https://github.com/createdreamtech/carti-lib/commit/698aa7685249aa0e8990aa1a2f61869944558297))
* deps is optional ([8fc9337](https://github.com/createdreamtech/carti-lib/commit/8fc933703b5d907c3cc58af568f40d9e4a17691b))
* deps is optional ([e83ac79](https://github.com/createdreamtech/carti-lib/commit/e83ac791bece4fb45ca829414b2d59b941c60551))
* export s3 provider ([60bba52](https://github.com/createdreamtech/carti-lib/commit/60bba52ba658d04da71f883c526a414c86291793))
* export streamToBuffer ([530148f](https://github.com/createdreamtech/carti-lib/commit/530148f8cbae4d5473c005571eb453318e3b6a89))
* lua parser to resolve array object values properly w/ test ([42e0f71](https://github.com/createdreamtech/carti-lib/commit/42e0f71fd9c442c1d61ecdd845ef6b02c6ad30fa))
* make ci build/test order invariant ([4f10263](https://github.com/createdreamtech/carti-lib/commit/4f1026397c5bfce69028e76850ca03fa42a09407))
* memory storage constructor ([943c6ae](https://github.com/createdreamtech/carti-lib/commit/943c6ae95d1e20b393d30d8ee88e6d546937f4a7))
* missing object type from schema for ram ([3d7910e](https://github.com/createdreamtech/carti-lib/commit/3d7910eac4163670ecf1513cf173d36f864d2135))
* output for the script to respect newlines ([858f847](https://github.com/createdreamtech/carti-lib/commit/858f847ee44acc957904343eae2ce300968fdb23))
* package.json lint and test and rm only ([b1dee97](https://github.com/createdreamtech/carti-lib/commit/b1dee9749b3ebc002a7158e52f8ce72b87bb644f))
* package.json lint and test and rm only ([3349e75](https://github.com/createdreamtech/carti-lib/commit/3349e75b29465d12508bd55ccc5f202c6dd490fe))
* pass through metadata for optional provider specific writing ([9804563](https://github.com/createdreamtech/carti-lib/commit/98045639e0297986530bf8dca7f5690c7d758545))
* pass through metadata for optional provider specific writing ([48ce4eb](https://github.com/createdreamtech/carti-lib/commit/48ce4ebc568b1ff999ecf1c0665898b6a78fac80))
* promise return from storage to return properly ([be70cc9](https://github.com/createdreamtech/carti-lib/commit/be70cc9181946ba8b7cc05ae597dd56e0ca5bbdb))
* reduce s3 storage args to rely only on default aws sdk params ([45e4fbe](https://github.com/createdreamtech/carti-lib/commit/45e4fbed53186ecaef362e7bb29f6a9fd2c9c842))
* reduce s3 storage args to rely only on default aws sdk params ([2bae9a2](https://github.com/createdreamtech/carti-lib/commit/2bae9a2fe8fdc4954aa0f7b2e77073d14f3dbcf8))
* refactor master to main ([4e6982a](https://github.com/createdreamtech/carti-lib/commit/4e6982acde64ff86befd3a7a186c9aa41f3fe5d6))
* refactor test lua config file to be typescript for path resolution during test ([753a31b](https://github.com/createdreamtech/carti-lib/commit/753a31bf274344f3bab922a100259ae488f56585))
* release order ([0711aba](https://github.com/createdreamtech/carti-lib/commit/0711aba2ec4cbb1a8ee8f0760e817f1117abb482))
* releaserc to point to main not master ([542f0e6](https://github.com/createdreamtech/carti-lib/commit/542f0e62ff092e47f1a867092498ad9360d8d580))
* remove dataId in lieu of just id as dataId ([4a54b4e](https://github.com/createdreamtech/carti-lib/commit/4a54b4eba2fbb79e7fb8ed8cf52e7cd0247946a0))
* remove github pages dependency on ci ([79ea124](https://github.com/createdreamtech/carti-lib/commit/79ea124edc5086cae9a77fc4138aef8569f38cd4))
* rexport packages from internal packages ([eb16578](https://github.com/createdreamtech/carti-lib/commit/eb16578b56290c50b57f6be1b4cb3a6d56c28624))
* rexport packages from internal packages ([57de6be](https://github.com/createdreamtech/carti-lib/commit/57de6be76302bd62298e9a55e0ef802de96dfe43))
* rm github pages req ([ffb7540](https://github.com/createdreamtech/carti-lib/commit/ffb75404933f9868347ffbe480d94b49d0040cec))
* rom vs ram for resolved path ([f2c5551](https://github.com/createdreamtech/carti-lib/commit/f2c55512e12e7ad17b267b17c3c9be4321a25813))
* rom vs ram for resolved path ([7996cbd](https://github.com/createdreamtech/carti-lib/commit/7996cbdbbb9d269400ce10addfcc830c607a44f1))
* semantic release ci ([a2815b5](https://github.com/createdreamtech/carti-lib/commit/a2815b5a82edc3cf6c1a9d7757b76837b5af5318))
* update package.json ([7833c09](https://github.com/createdreamtech/carti-lib/commit/7833c094ed9b8ad6256de586c78b33070d9d0ce5))
* update package.json ([5259af4](https://github.com/createdreamtech/carti-lib/commit/5259af4086f8f2f56a8802d7d4706b0bb7974cfb))
* uri is optional ([c159867](https://github.com/createdreamtech/carti-lib/commit/c15986728f238d01dd2e162db727bab89fba1fc4))


### Features

* add encoding framework for handling ipld encoding data ([79317fe](https://github.com/createdreamtech/carti-lib/commit/79317fe19e6a3e907fe6727f1b06a8e6f110c544))
* add example support that demonstrates end 2 end functionality ([5079ee7](https://github.com/createdreamtech/carti-lib/commit/5079ee73d2f6baa1449524c64f69192fb1dec1a0))
* add first pass at machine config to json schema ([435b477](https://github.com/createdreamtech/carti-lib/commit/435b477c6dd85979b3f4cb6a07093043a2f3604f))
* add first pass at mirror type for package hosting spec ([930ff70](https://github.com/createdreamtech/carti-lib/commit/930ff709fc1206b826e82d97c59b1fe96121c274))
* add fix to insure directory existence prior to writing file ([1b745eb](https://github.com/createdreamtech/carti-lib/commit/1b745ebdf175c37d6deaedbaabf9641c502807bf))
* add fix to insure directory existence prior to writing file ([b29dbf2](https://github.com/createdreamtech/carti-lib/commit/b29dbf2ac8a6656811ba659868a28021d260673b))
* add framework for dealign with storage and storage providers ([2c33393](https://github.com/createdreamtech/carti-lib/commit/2c33393774fac3ceff6a8bca0f25f2bc7a4f9b17))
* add imm. commit to support parsing lua file and converting it into machine config ([cfe1aab](https://github.com/createdreamtech/carti-lib/commit/cfe1aab80c675440a6cb9015222f920fae301d96))
* add initial configuration ([69f4a54](https://github.com/createdreamtech/carti-lib/commit/69f4a54c61bc80a847c00c422cca006a2288895d))
* add initial support for bundle schema and config ([456da9f](https://github.com/createdreamtech/carti-lib/commit/456da9f28921ac6df588176ae67b7ff5caed1052))
* add initial support for parsing lua machine config into ts ([34f1607](https://github.com/createdreamtech/carti-lib/commit/34f16079354f48165a0b5ae25c98d61f515c96cf))
* add missing schema used to generate types for the lua config ([4b8fb8c](https://github.com/createdreamtech/carti-lib/commit/4b8fb8c58d216c3fd326e79ca8b7fd4b7476f8f2))
* add scaffolding for fetcher ([ce96a01](https://github.com/createdreamtech/carti-lib/commit/ce96a015d6afee34cf50537531105aec8ac67fa9))
* add sketch for resolving package from mirror config ([1f3153a](https://github.com/createdreamtech/carti-lib/commit/1f3153aba7e497aabe6c6be4c81edc302cf08040))
* add sketch for storage provider layer ([4f0c907](https://github.com/createdreamtech/carti-lib/commit/4f0c9075616bb67891283bd86f92e78d5775c10e))
* add sketch for what a mirror/repository schema might be ([96382d8](https://github.com/createdreamtech/carti-lib/commit/96382d88cb299a112b165243fe798f5bb27fb045))
* add support for alternative lua script generation results ([d8fd55c](https://github.com/createdreamtech/carti-lib/commit/d8fd55c4d40584f2d86ab401b34400d78ce83266))
* add support for bundles test information ([96eaca9](https://github.com/createdreamtech/carti-lib/commit/96eaca90ce48565a068f465f7561ce2e1f6d0741))
* add support for bundles test information ([d067508](https://github.com/createdreamtech/carti-lib/commit/d067508d749ccde526c31719851a6c307352aa25))
* add support for bundling and installing bundles ([0740fcb](https://github.com/createdreamtech/carti-lib/commit/0740fcb20e9d646dd9d3c10486eab6fd259108f3))
* add support for bundling and installing bundles ([368ca32](https://github.com/createdreamtech/carti-lib/commit/368ca327019fd1cba3f8483b235be9d7a23d1863))
* add support for disk storage ([0fbf4dd](https://github.com/createdreamtech/carti-lib/commit/0fbf4ddd6630e7e7c8a383863d54a4239b03f585))
* add support for encoding data in memory and hashing with  keccak256 ([f5ea00c](https://github.com/createdreamtech/carti-lib/commit/f5ea00c31b9835737bcf67d832c5c79e2abc475e))
* add support for existence check for a package ([9c41ee6](https://github.com/createdreamtech/carti-lib/commit/9c41ee6825cb9375176684e0d8038cd3ee24ad97))
* add support for existence check for a package ([8f1a845](https://github.com/createdreamtech/carti-lib/commit/8f1a845f571d987d257b3b86e698135b9b81e060))
* add support for flashdrive as bundleType ([c880a69](https://github.com/createdreamtech/carti-lib/commit/c880a69378736b4be684b369d0d3014a1ee617c0))
* add support for flashdrive as bundleType ([707fb56](https://github.com/createdreamtech/carti-lib/commit/707fb5695571e09350f8748a044efb7fed2be949))
* add support for flashdrive as bundleType ([30c2378](https://github.com/createdreamtech/carti-lib/commit/30c2378be0ca9b54447826b5a28e5cdfca3c2cf3))
* add support for flashdrive as bundleType ([77fff1c](https://github.com/createdreamtech/carti-lib/commit/77fff1c4e982a2c64dce7947c9af62f4ebc9c209))
* add support for generating package config types ([ec0ae43](https://github.com/createdreamtech/carti-lib/commit/ec0ae43497d6755656f168a54a9155e14d6190dd))
* add support for installing and packaging cartesi config ([8974869](https://github.com/createdreamtech/carti-lib/commit/8974869b376345fb18ddebdb55ec09cbae02465d))
* add support for maintaining CartiPackages ([d3675e1](https://github.com/createdreamtech/carti-lib/commit/d3675e1ae90d84be1763a2eca42f9c30f1491d19))
* add support for maintaining CartiPackages ([52eead9](https://github.com/createdreamtech/carti-lib/commit/52eead9a4fbd6338e93c87ef4dea5523fb2300c0))
* add support for optional uri to bundle metadata ([77feb4f](https://github.com/createdreamtech/carti-lib/commit/77feb4fafceb7ba405067d5d5e08389eb433b0a3))
* add support for optional uri to bundle metadata ([eac76ed](https://github.com/createdreamtech/carti-lib/commit/eac76edf95824becedf338452261104528daa73f))
* add support for overriding cid resolution for package defaults downstream ([63db30b](https://github.com/createdreamtech/carti-lib/commit/63db30b7111460a1a00eb894732c2baa9fe589e9))
* add support for overriding cid resolution for package defaults downstream ([b8563ee](https://github.com/createdreamtech/carti-lib/commit/b8563ee7a6923a5ae1aa4c403d2fba5fda10e5dd))
* add support for partial machine configuration ([4b502c3](https://github.com/createdreamtech/carti-lib/commit/4b502c371ee97b0ac98dd1937c039db6e3bda181))
* add support for partial machine configuration ([7cb24b9](https://github.com/createdreamtech/carti-lib/commit/7cb24b92e4cbfa60bea83105f001809bb5812d56))
* add support for remapping path directories ([99c717e](https://github.com/createdreamtech/carti-lib/commit/99c717e5b0a630170313189ba0fdf474e09a7df8))
* add support for resolved paths and updating cartesi-machine-package.json ([dc8bd0e](https://github.com/createdreamtech/carti-lib/commit/dc8bd0ebf7433d6214c021637d845ba1ebe32ca7))
* add support for resolved paths and updating cartesi-machine-package.json ([0c24e9a](https://github.com/createdreamtech/carti-lib/commit/0c24e9acc2f09f778dd5fd07ac3208a72c351e76))
* add support for resolving the path of a CID ([54b9844](https://github.com/createdreamtech/carti-lib/commit/54b9844ab1131b4fbe841279ad712734696fe33d))
* add support for resolving the path of a CID ([4b22674](https://github.com/createdreamtech/carti-lib/commit/4b22674b2e8c8c27d650e92e67812014a579bbb3))
* add support for s3 storage + retrieval ([936c460](https://github.com/createdreamtech/carti-lib/commit/936c46054c0ed96b950ec8ffb9c7445b1797f2fb))
* add support for simple stream to string util ([1ee31fe](https://github.com/createdreamtech/carti-lib/commit/1ee31fe3017e349ed129cb12d9a369e7d5b8540a))
* add support for simple stream to string util ([8a2a77a](https://github.com/createdreamtech/carti-lib/commit/8a2a77aeee78f6a9263336e8ea1ab981a08ef827))
* add support for storing addtional metadata ([d76f70e](https://github.com/createdreamtech/carti-lib/commit/d76f70e14207eb423f9a7d7a47637de919277c18))
* add support for writing a valid lua config file ([3a52c56](https://github.com/createdreamtech/carti-lib/commit/3a52c568c659e4c9e38b4ae9f0bb3acf1c86b601))
* add support for writing bundles file ([ee47087](https://github.com/createdreamtech/carti-lib/commit/ee470875abb04956d8bd696610d277ffdf85c57d))
* add support for writing bundles file ([2edf536](https://github.com/createdreamtech/carti-lib/commit/2edf5369347c8a3114536fc6d7dded456401c35c))
* implement generic fetching interface ([0c85089](https://github.com/createdreamtech/carti-lib/commit/0c85089aa2cc8c6c00ac853213bda766a1d4155f))
* make storage impl Fetcher ([2eb2a7f](https://github.com/createdreamtech/carti-lib/commit/2eb2a7fa1dc9352d97805bc52bf078b2e515140b))
* refactor config to minimal required set of features ([28279aa](https://github.com/createdreamtech/carti-lib/commit/28279aa9466687117d421da1fa3079b7c54aa248))
* refactor config to minimal required set of features ([1c5eae1](https://github.com/createdreamtech/carti-lib/commit/1c5eae13dd6ac9d03f2a2e0577238f78310c574a))
* refactor default encoders to support Readable ([04cbc8d](https://github.com/createdreamtech/carti-lib/commit/04cbc8db71b51667849d777079e9f3d4b5d96327))
* refactor encoder type to have const instantiation ([98cd90c](https://github.com/createdreamtech/carti-lib/commit/98cd90ce29e846840e8c8a9980422a5c9ccb7517))
* wip fixtures and tests for packaging cartesi machine ([7532212](https://github.com/createdreamtech/carti-lib/commit/753221265ee9dcf47ea99456cb45ead42f96e6a7))
