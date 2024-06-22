---
sidebar_position: 1
---

# Environment Set Up

## [sCrypt](https://scrypt.io/)

MVC smart contract development uses the sCrypt development suite. The sCrypt language is divided into two major
versions.

### [scrypt classic](https://scrypt-ide.readthedocs.io/en/latest/getting_started.html)

Smart contracts are written in scrypt classic with contract source files ending in .scrypt. They are compiled
to [bvm bytecode](https://en.bitcoin.it/wiki/Script#Constants) using scryptc, and instantiated, tested, and deployed
on-chain using scryptlib. The official recommendation is to not use it anymore.
![Alt text](/img/scrypt-to-op.png)

### [scrypt](https://docs.scrypt.io/)

Smart contracts are written in TypeScript with contract source files ending in .ts. The process involves
scrypt-ts-transpiler transpiling .ts to .scrypt, scryptc compiling to bvm bytecode, and scrypt-ts instantiating,
constructing transactions, testing contracts, and deploying them on-chain.

- Log bvm runtime variables
- Write only in TypeScript, facilitating front-end and back-end integration
- Package as npm packages, facilitating contract reuse and distribution

![Alt text](/img/scrypt-ts-to-op.png)

### mvc contracts

The mvc contracts were developed using scrypt classic as scrypt was not yet fully developed. Below are the development
types and project addresses for several contracts.
| Contract | Development Type |
|---|---|
| [token-core](https://github.com/mvc-labs/token-core)  | scrypt classic |
| [nft-core](https://github.com/mvc-labs/nft-core)  | scrypt classic |
| [mvcdao-core](https://github.com/mvc-labs/mvcdao-core)  | scrypt classic |
| [token-core-ts](https://github.com/xiangpengm/token-core-ts)  | scrypt classic + scrypt |

The token-core-ts project translates MVC's original token and NFT contracts into scrypt, but the test cases still use
scrypt classic, so the development type is a mix of both. Since the scrypt-ts library is primarily for BSV and cannot be
directly used on the MVC chain, it is adapted for MVC using [patch-package](https://github.com/ds300/patch-package), as
detailed below.

## The First MVC sCrypt Contract Project

### [Create a Project Using scrypt-cli](https://docs.scrypt.io/installation)

```bash
npx scrypt-cli project demo
cd demo && npm i
```

![Alt text](/img/scrypt-init.png)

### Add Patch Command

Add the patch command to package.json

```
"patch": "sh -c \"$(curl -fsSL https://raw.githubusercontent.com/xiangpengm/token-core-ts/main/patches/patch_1.3.31.sh)\""
```

![Alt text](/img/scrypt-add-patch.png)

### Apply Patch

```bash
npm run patch
```

![Alt text](/img/scrypt-run-patch.png)

### Run scrypt-ts Local Tests

```bash
npm run test
```

![Alt text](/img/scrypt-run-test.png)
