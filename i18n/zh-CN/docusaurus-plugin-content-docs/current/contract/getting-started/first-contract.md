---
sidebar_position: 2
---
# 编写第一个合约

在上一节中我们使用scrypt-cli工具创建了一个demo工程，并且打入了MVC链的补丁，下面我们使用这个项目来部署合约到MVC测试网。

## 示例合约

demo工程中有生成一个Demo合约，源码位于src/contracts/demo.ts，合约逻辑为使用一段数据的hash值构造并部署合约，合约unlock时需要输入数据原文。

```typescript
import {
    assert,
    ByteString,
    method,
    prop,
    sha256,
    Sha256,
    SmartContract,
} from 'scrypt-ts'

export class Demo extends SmartContract {
    @prop()
    hash: Sha256

    constructor(hash: Sha256) {
        super(...arguments)
        this.hash = hash
    }

    @method()
    public unlock(message: ByteString) {
        assert(sha256(message) == this.hash, 'Hash does not match')
    }
}
```


## 部署并调用合约

原项目中使用项目根目录下的deploy.ts来部署合约，原项目部署适配bsv测试网，下面详述如何改成mvc链

### 安装依赖包

- token-core-ts包封装了MVC链的Wallet和Provider，为scrypt-ts提供MVC链接入功能
- meta-contact封装了MVC数据服务，提供接入的api
- @bitcoin-js/tiny-secp256k1-asmjs，ecpair提供Bitcoin标准的Signer interface

```bash
npm install token-core-ts meta-contract @bitcoin-js/tiny-secp256k1-asmjs ecpair
```

### 更新deploy.ts文件

```typescript
import { Demo } from './src/contracts/demo'
import { bsv, sha256, toByteString } from 'scrypt-ts'
import { MvcWallet, MvcProvider } from 'token-core-ts'
import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs'
import ECPairFactory, { SignerAsync } from 'ecpair'
const ECPair = ECPairFactory(ecc)
import * as dotenv from 'dotenv'
import { API_TARGET } from 'meta-contract'

// Load the .env file
dotenv.config()

if (!process.env.PRIVATE_KEY) {
    throw new Error(
        'No "PRIVATE_KEY" found in .env, Please run "npm run genprivkey" to generate a private key'
    )
}

const network = bsv.Networks.testnet

const mvcProvider = new MvcProvider(API_TARGET.MVC, network, 1000, true)

// Read the private key from the .env file.
// The default private key inside the .env file is meant to be used for the Bitcoin testnet.
// See https://scrypt.io/docs/bitcoin-basics/bsv/#private-keys
const privateKey = bsv.PrivateKey.fromWIF(process.env.PRIVATE_KEY || '')
const bip174Signer = ECPair.fromPrivateKey(privateKey.toBuffer())

const mvcWallet = new MvcWallet(
    bip174Signer as unknown as SignerAsync,
    network,
    mvcProvider
)

async function main() {
    await Demo.loadArtifact()

    // check balance
    const balance = await mvcWallet.getBalance()
    if (balance.confirmed + balance.unconfirmed === 0) {
        console.log('use faucet get mvc testnet coin')
        console.log('https://witnessonchain.com/faucet/tspace')
        console.log(
            'address: ',
            (await mvcWallet.getDefaultAddress()).toString()
        )
        return
    }
    console.log('balance', balance)

    // TODO: Adjust the amount of satoshis locked in the smart contract:
    const amount = 1

    const msg = toByteString('hello world', true)

    const instance = new Demo(
        // TODO: Adjust constructor parameter values:
        sha256(msg)
    )

    // Connect to a signer.
    await instance.connect(mvcWallet)

    // Contract deployment.
    const deployTx = await instance.deploy(amount)
    console.log(
        `Demo contract deployed: https://test.mvcscan.com/tx/${deployTx.id}`
    )
    // Call contract
    const { tx, atInputIndex } = await instance.methods.unlock(msg)
    console.log(
        `Demo contract call at: https://test.mvcscan.com/tx/${tx.id} ${atInputIndex}`
    )
}

main()
```

### 执行deploy.ts

```bash
npm run deploy
```
如果测试地址无测试代币请前往MVC测试网[水龙头](https://witnessonchain.com/faucet/space)领取。

![Alt text](/img/scrypt-first-faucet.png)

执行成功如下

![Alt text](/img/scrypt-first-run-success.png)

实例中合约部署在[baf27c3164aecb1e285ef154c2f802eac69ee17b8cea8eb013da2f9d8890dfca](https://test.mvcscan.com/tx/baf27c3164aecb1e285ef154c2f802eac69ee17b8cea8eb013da2f9d8890dfca)，在[d18d04c19108ae5c7baeefe7183b1ea07847ef58e23b560fc3d32abcf0bd8f17](https://test.mvcscan.com/tx/d18d04c19108ae5c7baeefe7183b1ea07847ef58e23b560fc3d32abcf0bd8f17)中被调用。
