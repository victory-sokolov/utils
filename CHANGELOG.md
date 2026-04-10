# [1.3.0](https://github.com/victory-sokolov/utils/compare/v1.2.1...v1.3.0) (2026-04-10)


### Bug Fixes

* linter issue ([3e75420](https://github.com/victory-sokolov/utils/commit/3e75420873cee3c80254c1da241b62c717c3a201))


### Features

* add zip function for arrays ([2f43a62](https://github.com/victory-sokolov/utils/commit/2f43a628e1a337a3e9eaec9d18c7ae5235c13304))

## [1.2.1](https://github.com/victory-sokolov/utils/compare/v1.2.0...v1.2.1) (2026-04-08)


### Bug Fixes

* export node modules ([d7effa4](https://github.com/victory-sokolov/utils/commit/d7effa4e7094f6ab7fb9940ce4dd588e5e048360))

### Bug Fixes

* export node modules ([d7effa4](https://github.com/victory-sokolov/utils/commit/d7effa4e7094f6ab7fb9940ce4dd588e5e048360))

# [1.2.0](https://github.com/victory-sokolov/utils/compare/v1.1.0...v1.2.0) (2026-04-06)


### Features

* add nanoid function ([cfe5194](https://github.com/victory-sokolov/utils/commit/cfe51944240a000b1c29ab8446ee21d1c9e0671b))

# [1.1.0](https://github.com/victory-sokolov/utils/compare/v1.0.0...v1.1.0) (2026-04-04)


### Bug Fixes

* randomItem ([5c2dc54](https://github.com/victory-sokolov/utils/commit/5c2dc54cb7ed1d392364dfdad5337a7588fcc64b))
* **tests:** remove duplicate code in cache tests ([60b2a61](https://github.com/victory-sokolov/utils/commit/60b2a61c6bd23e6e11688fae9726c19512da5818))


### Features

* **array:** add chunk and groupBy functions ([216589e](https://github.com/victory-sokolov/utils/commit/216589e168cd1773029dbc5a4e8fe44cf49505d5))

# [1.0.0](https://github.com/victory-sokolov/utils/compare/v0.35.0...v1.0.0) (2026-04-04)


### Bug Fixes

* **timestampIso:** convert to function ([605bcaa](https://github.com/victory-sokolov/utils/commit/605bcaac808dbbe11c047ccc673003e726279e82))


### Features

* add http-status codes ([7df1849](https://github.com/victory-sokolov/utils/commit/7df184999ed10d8b57e5f3e7d769523d2bbe6943))
* add http-status codes ([f7fe517](https://github.com/victory-sokolov/utils/commit/f7fe51792b79401b59c3d9bd24a86f6c7aa9c02b))


### BREAKING CHANGES

* **timestampIso:** timestampIso is now a function that returns current ISO string

feat(url): add URL utilities
- add getQueryParams, buildQueryString, removeQueryParam, getUrlDomain
- move isValidUrl from regex module

perf(array): optimize occurrenceCount to O(n) using single-pass loop

feat(object): improve type safety with const type parameter for pick and omit

fix(tests): resolve fake timer issues in cache tests

# [0.35.0](https://github.com/victory-sokolov/utils/compare/v0.34.0...v0.35.0) (2026-03-28)


### Bug Fixes

* update omit with proper types ([f7ee511](https://github.com/victory-sokolov/utils/commit/f7ee5119dd1c3fb666e0128ae069f9c6353e941a))


### Features

* restructure try-catch function and make it more mature ([1b69e2c](https://github.com/victory-sokolov/utils/commit/1b69e2c4efd4001251bfc381925623c74a7134b6))

# [0.34.0](https://github.com/victory-sokolov/utils/compare/v0.33.0...v0.34.0) (2026-03-27)


### Bug Fixes

* use reusable types ([1956a96](https://github.com/victory-sokolov/utils/commit/1956a96a2ce69767a11e055eea8139ce7462f81b))
* use reusable types ([ce81cbd](https://github.com/victory-sokolov/utils/commit/ce81cbd25549288727dcf7ccec3bc14f32143631))


### Features

* **cache:** add LRU cache with TTL support ([d8ddbf7](https://github.com/victory-sokolov/utils/commit/d8ddbf7e739e411ca53c31fbf78109625e47f2f0))

# [0.33.0](https://github.com/victory-sokolov/utils/compare/v0.32.1...v0.33.0) (2026-03-22)


### Bug Fixes

* linter issues ([7a13a90](https://github.com/victory-sokolov/utils/commit/7a13a90d5a25be85693c5c4232e5b28cf4c0e5cd))
* linter issues ([34fbf4f](https://github.com/victory-sokolov/utils/commit/34fbf4f864aabf6eaeb9f9b9d041d39d5d77de4a))
* recursion issues ([518198b](https://github.com/victory-sokolov/utils/commit/518198bdec5a6652b1bdc4d03920d9077f5f3285))
* tests ([d1ee9a7](https://github.com/victory-sokolov/utils/commit/d1ee9a73b62b01ce8322547e9640e28cd6442700))


### Features

* add object manipulation utilities ([18e4785](https://github.com/victory-sokolov/utils/commit/18e47851171dc251f2ae6febe719254651793194))

## [0.32.1](https://github.com/victory-sokolov/utils/compare/v0.32.0...v0.32.1) (2026-02-20)


### Bug Fixes

* cache get drops empty values ([4b6c485](https://github.com/victory-sokolov/utils/commit/4b6c48546af9f7e82f6385570881ea1d0d42f301))
* cronToDateTime adjust dates ([245115e](https://github.com/victory-sokolov/utils/commit/245115e4648ea4b44956ff0005798fc32cec1529))
* edge cases for date, video and cryptography ([e374439](https://github.com/victory-sokolov/utils/commit/e374439a783664fa8ea1ac4596047a8b1be2747a))
* fix add vi test imports and autofix oxlint issue ([64d1385](https://github.com/victory-sokolov/utils/commit/64d138531e21b659ac1e3f227d22a1e1d8125189))
* fix all no-ternary issues ([111cbce](https://github.com/victory-sokolov/utils/commit/111cbce1f2f20d24f977b35f8b5f08bdbaee79b2))
* fix coderabbit issues ([a783be2](https://github.com/victory-sokolov/utils/commit/a783be250862fcd38a208cd359b1c3ddb708f2d0))
* fix few bugs in utils functions ([884782d](https://github.com/victory-sokolov/utils/commit/884782d891ef6b223e048a2e6b834ccac2c04955))
* fix rest linter issues ([838f5a1](https://github.com/victory-sokolov/utils/commit/838f5a14a70f0cf8f28fe26436b95c5651431907))
* fix time interval and types ([f94bd63](https://github.com/victory-sokolov/utils/commit/f94bd636a166425a0a01a16d21d0c6fea10f88a6))
* fix type issues and tests ([52aee88](https://github.com/victory-sokolov/utils/commit/52aee886b6aa15201c1fddc38b343ee6ffff9eca))
* linter issues ([575c412](https://github.com/victory-sokolov/utils/commit/575c412d2f76e15826f6e1a14c7db88a51d071e7))
* refactor cryptography functions ([d4c3906](https://github.com/victory-sokolov/utils/commit/d4c3906dbd7a52ac1f0feb95f2a899c374862d4d))

# [0.32.0](https://github.com/victory-sokolov/utils/compare/v0.31.5...v0.32.0) (2026-02-19)


### Bug Fixes

* fix function name ([17f9c56](https://github.com/victory-sokolov/utils/commit/17f9c5604a1dd164500409ff40a954f5e0373230))


### Features

* isPlainObject - detect if provided object is plain object structure ([eeaea91](https://github.com/victory-sokolov/utils/commit/eeaea912effd33116f953dc83a6904694fc7777a))

## [0.31.5](https://github.com/victory-sokolov/utils/compare/v0.31.4...v0.31.5) (2025-12-23)


### Bug Fixes

* toLongDate display value of passed parameter ([4808638](https://github.com/victory-sokolov/utils/commit/4808638ca382e11e00b44ccc5d3a3e326e973d07))
* use nodeCrypto import ([b8cb9bc](https://github.com/victory-sokolov/utils/commit/b8cb9bcc8ddaecfb72b85cfc71a477a09102b1eb))

## [0.31.4](https://github.com/victory-sokolov/utils/compare/v0.31.3...v0.31.4) (2025-10-22)


### Bug Fixes

* overload filterFalsyFromObject to return proper type ([b8d3cc0](https://github.com/victory-sokolov/utils/commit/b8d3cc0b47073da7ea88392d37e8713bb643c8ad))

## [0.31.3](https://github.com/victory-sokolov/utils/compare/v0.31.2...v0.31.3) (2025-10-21)


### Bug Fixes

* fix tryCatch to handle non-async functions ([35f6d9a](https://github.com/victory-sokolov/utils/commit/35f6d9aff80fbd312bc62b5ac62eae6a0eac721c))
* fix tryCatch to handle non-async functions ([ef9a3b5](https://github.com/victory-sokolov/utils/commit/ef9a3b5467f5d18c2572dbdd2f3471e7b8ff7b63))

## [0.31.2](https://github.com/victory-sokolov/utils/compare/v0.31.1...v0.31.2) (2025-10-12)


### Bug Fixes

* tryCatch types ([93b7aa9](https://github.com/victory-sokolov/utils/commit/93b7aa99e615f984de809a8eda96ca084e589f7e))

## [0.31.1](https://github.com/victory-sokolov/utils/compare/v0.31.0...v0.31.1) (2025-10-12)


### Bug Fixes

* improve formatPrice ([815c90e](https://github.com/victory-sokolov/utils/commit/815c90e7ee4c8510b876dc30be116746a1fe416d))

# [0.31.0](https://github.com/victory-sokolov/utils/compare/v0.30.0...v0.31.0) (2025-10-12)


### Features

* add NonNullable type ([7e0f5fa](https://github.com/victory-sokolov/utils/commit/7e0f5fa911e8466c7f7bb98efa4b8512e046f2eb))
* add tryCatch wrapper that returns Result object ([486252a](https://github.com/victory-sokolov/utils/commit/486252aa0af979b839bc01a3b1f7b984bf8a8ba4))

# [0.30.0](https://github.com/victory-sokolov/utils/compare/v0.29.0...v0.30.0) (2025-10-11)


### Features

* add isTruthyAndNotEmpty - check if value is truthy and is not empty ([620ea33](https://github.com/victory-sokolov/utils/commit/620ea33cb905c107c15645355948e02587caf283))
* filterFalsyFromObject - add ability to filter falsy values form array of objects ([6ffb219](https://github.com/victory-sokolov/utils/commit/6ffb2199d83b330c49a81c944985a251648e8717))

# [0.29.0](https://github.com/victory-sokolov/utils/compare/v0.28.1...v0.29.0) (2025-10-11)


### Bug Fixes

* fix types and improve pipe function ([6097276](https://github.com/victory-sokolov/utils/commit/6097276c29df74b7bbbccdfa4c0ea40aa79bc501))
* omit return type ([6279c23](https://github.com/victory-sokolov/utils/commit/6279c2384a8eab7fbc30af87539eee3651298ba5))


### Features

* add types for cache.ts ([e282d1d](https://github.com/victory-sokolov/utils/commit/e282d1d93e267c81909b3639e9aff35e92c807f2))
* **pencil:** add encryptData and decryptData ([4818e56](https://github.com/victory-sokolov/utils/commit/4818e564bcc6fffec8bfcc9767f53dbdc4051e35))

## [0.28.1](https://github.com/victory-sokolov/utils/compare/v0.28.0...v0.28.1) (2025-01-22)


### Bug Fixes

* fix isAlphaNumeric and update testcase ([ed3da74](https://github.com/victory-sokolov/utils/commit/ed3da74ca7b182f9a4e549bf98a7e02278aa4f46))

# [0.28.0](https://github.com/victory-sokolov/utils/compare/v0.27.0...v0.28.0) (2025-01-19)


### Features

* convert date string or date object ot UTC format ([46e2f28](https://github.com/victory-sokolov/utils/commit/46e2f28331ae69b03f4d50334acc88b91e471f6e))
* isAlphaNumeric - check if provided string is alphanum string ([6e0051e](https://github.com/victory-sokolov/utils/commit/6e0051e5d9951a090162ed273bca3eff4a754f8c))

# [0.27.0](https://github.com/victory-sokolov/utils/compare/v0.26.0...v0.27.0) (2025-01-07)


### Features

* add AnyAsyncFunc type ([160e943](https://github.com/victory-sokolov/utils/commit/160e943eaf039e281349832975e47c11b4322cde))
* add generateNumberWithLength to generate number seequence ([5ea6378](https://github.com/victory-sokolov/utils/commit/5ea6378154c05dcac5bd0aef67167ad8999976b4))

# [0.26.0](https://github.com/victory-sokolov/utils/compare/v0.25.0...v0.26.0) (2025-01-05)


### Features

* get current timestamp ([1c02c43](https://github.com/victory-sokolov/utils/commit/1c02c432b9f9316a36479905f26d6cde3993c0f8))

# [0.25.0](https://github.com/victory-sokolov/utils/compare/v0.24.0...v0.25.0) (2025-01-04)


### Bug Fixes

* camelCase function ([b0081de](https://github.com/victory-sokolov/utils/commit/b0081dedc9b95386ab1253783e19b411431ae4e0))
* update regexes ([6607423](https://github.com/victory-sokolov/utils/commit/66074232f027cce41fa0f355da508dbcebabd97e))
* update types ([9c7c6af](https://github.com/victory-sokolov/utils/commit/9c7c6afd91fdf02bb412ed664fa096caaaceeac4))


### Features

* add FetchResponse response type ([3a2582b](https://github.com/victory-sokolov/utils/commit/3a2582b2770d98ea248e079e04a1dddf977fb341))

# [0.24.0](https://github.com/victory-sokolov/utils/compare/v0.23.0...v0.24.0) (2024-06-13)


### Features

* **pencil:** uppdate omit function to accept array of objects ([2fc7a19](https://github.com/victory-sokolov/utils/commit/2fc7a19c3490d3e06f32bbebef6f0d2c4577fc5c))

# [0.23.0](https://github.com/victory-sokolov/utils/compare/v0.22.1...v0.23.0) (2024-04-13)


### Features

* timestampToDate - convert timestamp to date string ([f382ef3](https://github.com/victory-sokolov/utils/commit/f382ef3d879d8a5a9c0c274b0d60bf2a01b01423))

## [0.22.1](https://github.com/victory-sokolov/utils/compare/v0.22.0...v0.22.1) (2024-04-13)


### Bug Fixes

* formatDate accept and handle undefined value ([3b4e23d](https://github.com/victory-sokolov/utils/commit/3b4e23d6062fa91b0821209a1805963f454d4503))

# [0.22.0](https://github.com/victory-sokolov/utils/compare/v0.21.2...v0.22.0) (2024-04-03)


### Features

* add formatDate ([46077d3](https://github.com/victory-sokolov/utils/commit/46077d3951cec27416677ec6362ce0befa87c1c4))
* add formatPrice ([6f171d2](https://github.com/victory-sokolov/utils/commit/6f171d26e90d53500732a6202cfbc237703b5e75))

## [0.21.2](https://github.com/victory-sokolov/utils/compare/v0.21.1...v0.21.2) (2024-03-16)


### Bug Fixes

* Fix omit and pick types ([c5c1e8c](https://github.com/victory-sokolov/utils/commit/c5c1e8cfffd37ca37da3a534e4c11bb073fb2f30))

## [0.21.1](https://github.com/victory-sokolov/utils/compare/v0.21.0...v0.21.1) (2024-03-13)


### Bug Fixes

* export reusable types and fix Maybe type ([2d97ae6](https://github.com/victory-sokolov/utils/commit/2d97ae6908985b1f08840cc345cf786155e02894))

# [0.21.0](https://github.com/victory-sokolov/utils/compare/v0.20.0...v0.21.0) (2024-03-10)


### Features

* createDirIfNotExists ([aa015b9](https://github.com/victory-sokolov/utils/commit/aa015b9bb0e6e8c3d2b1c9876461332fe543ac0f))
* getCMDArgs ([74136fc](https://github.com/victory-sokolov/utils/commit/74136fc60553aa8f7f24aba17faff467eaffc7bc))

# [0.20.0](https://github.com/victory-sokolov/utils/compare/v0.19.0...v0.20.0) (2024-03-09)


### Features

* add Fn and ElementOf ([c15468f](https://github.com/victory-sokolov/utils/commit/c15468ffcc604f28be77891e54a5b0d3c057e36d))

# [0.19.0](https://github.com/victory-sokolov/utils/compare/v0.18.0...v0.19.0) (2024-03-09)


### Features

* add getUniqueByKey ([60316be](https://github.com/victory-sokolov/utils/commit/60316be47668760baa65629ddbb097ad095d3e5a))

# [0.18.0](https://github.com/victory-sokolov/utils/compare/v0.17.0...v0.18.0) (2024-03-08)


### Features

* getTimeZone from passed language ([1c4a82b](https://github.com/victory-sokolov/utils/commit/1c4a82b0e4f1a36470b9ca6ce277ac7a6b298308))

# [0.17.0](https://github.com/victory-sokolov/utils/compare/v0.16.0...v0.17.0) (2024-03-07)


### Features

* add objectKeys and objectEntries ([26fbca3](https://github.com/victory-sokolov/utils/commit/26fbca3b8fa7eba15aca34777b714ba1db598ebf))

# [0.16.0](https://github.com/victory-sokolov/utils/compare/v0.15.0...v0.16.0) (2024-03-07)


### Features

* tap - Pass the value through the callback, and return the value ([0338904](https://github.com/victory-sokolov/utils/commit/0338904fda361e45aa5e455d14155d0a7573dab6))

# [0.15.0](https://github.com/victory-sokolov/utils/compare/v0.14.0...v0.15.0) (2024-03-06)


### Features

* nFormatter - format 20k, 1m to number ([e89a496](https://github.com/victory-sokolov/utils/commit/e89a4961074ddf2d3adb00d0e858c633b5d7aa5f))
* timeAgo - get string time ago seconds/minutes/hours/days from date object ([1504075](https://github.com/victory-sokolov/utils/commit/1504075da1faa0983d3a80d68c7ef76c600f3114))
* toDollars - convert cents to dollars ([dc632fe](https://github.com/victory-sokolov/utils/commit/dc632fee99a26abcc0883fb0cfa112188feb8610))

# [0.14.0](https://github.com/victory-sokolov/utils/compare/v0.13.2...v0.14.0) (2024-02-05)


### Features

* add getLocation function ([1a4ff83](https://github.com/victory-sokolov/utils/commit/1a4ff83ae9758e77fed0d5c61b0b4369fd7b27e9))
* add NonNegativeInteger type ([6dae863](https://github.com/victory-sokolov/utils/commit/6dae8632661dbcb5140ae02574daae560ebfad30))
* secondsInDays - Convery days to seconds ([fbbb0d0](https://github.com/victory-sokolov/utils/commit/fbbb0d0b8895cb296a7e773abbb8623c1b15b379))

# [0.12.0](https://github.com/victory-sokolov/utils/compare/v0.11.0...v0.12.0) (2023-08-18)


### Features

* Add dateTimeToCron and cronToDateTime ([0bf50e4](https://github.com/victory-sokolov/utils/commit/0bf50e4e792eb4cb4fe9715d1ed5a7a64752d549))

# [0.11.0](https://github.com/victory-sokolov/utils/compare/v0.10.0...v0.11.0) (2023-07-04)


### Features

* **isfileexists:** check if file in specific path exists ([eb301f5](https://github.com/victory-sokolov/utils/commit/eb301f51624ddb5ab7d0112df3d9ae83b139c418))
* **removeinlinestyles:** regex to remove inline css styles ([6986d3b](https://github.com/victory-sokolov/utils/commit/6986d3b0ad852039be69fa564080c5d037cd70f9))
