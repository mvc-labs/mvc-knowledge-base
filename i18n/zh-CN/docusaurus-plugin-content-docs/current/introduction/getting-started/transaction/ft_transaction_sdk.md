---
sidebar_position: 4
---

# 使用SDK构建FT交易

本文档介绍如何使用FT SDK发行token，转账token，销毁token，查询token等操作。

> 使用之前请确保已经完成环境配置和测试币领取，请参考[搭建一个MVC项目](../enviroment/setup-project)。

本文基于上述已经配置好的环境和密钥进行操作。

## 代码示例

将`src/index.ts`文件替换为以下内容：

```typescript
import {Address, Mnemonic} from "meta-contract/dist/mvc";
import {promises as fs} from 'fs';
import {API_NET, API_TARGET, FtManager, Wallet} from "meta-contract";
import {BURN_ADDRESS} from "meta-contract/dist/mcp02/constants";

const FILE_PATH = 'mnemonic-seed.txt'
const WALLET_PATH = "m/44'/10001'/0'/0/0"
let seed = '';
const generateMnemonic = async (): Promise<string> => {
    console.log("Generating random mnemonic seed: <%s>, use your own if you already have it", Mnemonic.fromRandom().toString())
    const mnemonic = Mnemonic.fromRandom().toString();
    await fs.writeFile(FILE_PATH, mnemonic, 'utf8');
    return mnemonic;
};

const readMnemonic = async (): Promise<string> => {
    return await fs.readFile(FILE_PATH, 'utf8');
};

// Detect if the mnomonic seed file exists, if not, generate a new one
// Then create a wallet with the seed with path WALLET_PATH
const setupMyWalletAndOperateFt = async (): Promise<void> => {
    try {
        await fs.access(FILE_PATH);
        const mnemonic = await readMnemonic();
        console.log('Mnemonic seed exists: <%s>, will use this one.', mnemonic);
        seed = mnemonic;
    } catch (error) {
        const mnemonic = await generateMnemonic();
        console.log('Mnemonic seed not detected, generating new one. <%s> , please keep it safe for future use.', mnemonic);
        seed = mnemonic;
    }
    console.log('Creating wallet with seed: <%s> and path <%s>', seed, WALLET_PATH);
    let mnemonicParsed = Mnemonic.fromString(seed);
    let privateKey = mnemonicParsed.toHDPrivateKey("", API_NET.TEST).deriveChild(WALLET_PATH);
    let wallet = new Wallet(privateKey.privateKey.toWIF(), API_NET.TEST, 1);
    console.log("Your private key %s", privateKey.privateKey.toWIF());
    console.log("Your address %s", privateKey.privateKey.toAddress(API_NET.TEST).toString());
    console.log("Your balance %s satoshis", await wallet.getBalance());

    // create a FtManager instance and generate a new token
    // codehash, genesis, sensibleId, genesisTxId are the results of the genesis operation
    let ftManager = new FtManager({
        network: API_NET.TEST,
        apiTarget: API_TARGET.MVC,
        purse: privateKey.privateKey.toWIF(),
        feeb: 1,
        debug: true,
    })
    let codehash: string
    let genesis: string
    let sensibleId: string
    let genesisTxId: string


    // use time as token name so that it's unique
    // you can change it to any name you like
    const currentDate = new Date().getHours() + ':' + new Date().getMinutes()
    const tokenName = 'MintTest - ' + currentDate
    const tokenSymbol = 'MVCTest'
    const decimalNum = 8
    const receiverAddress = wallet.address

    // create a new token(Genesis)
    console.log("Creating token with name: <%s>, symbol: <%s>, decimal: <%s>", tokenName, tokenSymbol, decimalNum);
    const genesisResult = await ftManager.genesis({
        tokenName: tokenName,
        tokenSymbol: tokenSymbol,
        decimalNum: decimalNum,
        genesisWif: privateKey.privateKey.toWIF(),
    })
    codehash = genesisResult.codehash
    genesis = genesisResult.genesis
    genesisTxId = genesisResult.txid
    sensibleId = genesisResult.sensibleId
    console.log("Token created with codehash: <%s>, genesis: <%s>, genesisTxId: <%s>, sensibleId: <%s>", codehash, genesis, genesisTxId, sensibleId);

    // sleep for 1 seconds to wait for the token to be created
    await new Promise(resolve => setTimeout(resolve, 1000));

    // split utxo for fee preparation
    const receivers = []
    for (let i = 0; i < 4; i++) {
        receivers.push({
            amount: 10000,
            address: wallet.address.toString(),
        })
    }
    const feeTxid = (await wallet.sendArray(receivers)).txId
    console.log('Created fee providing txid ', feeTxid)

    // sleep for 1 seconds to wait for the fee tx to be created
    await new Promise(resolve => setTimeout(resolve, 1000));

    // mint some token to burn
    let {txid} = await ftManager.mint({
        sensibleId,
        genesisWif: privateKey.privateKey.toWIF(),
        receiverAddress,
        tokenAmount: '10000000000',
    })
    console.log('Minted %d %s tokens by txid %s ', 10000000000, tokenSymbol, txid)


    // sleep for 1 seconds to wait for the token to be minted
    await new Promise(resolve => setTimeout(resolve, 1000));

    // transfer and burn token
    const burnTokenAmount = "100000"
    // transfer to zero address in order to burn, you can use this method to transfer to any address
    let transfer = await ftManager.transfer({
        genesis: genesis,
        codehash: codehash,
        receivers: [
            {
                amount: burnTokenAmount,
                address: Address.fromPublicKeyHash(BURN_ADDRESS, API_NET.TEST).toString(),
            },
        ],
        senderWif: privateKey.privateKey.toWIF()

    })
    console.log('Sent %s %s tokens to zero address by txid %s', burnTokenAmount, tokenSymbol, transfer.txid)

    await new Promise(resolve => setTimeout(resolve, 1000));

    // transfer to zero address in order to burn
    let transfer2 = await ftManager.transfer({
        genesis,
        codehash,
        receivers: [
            {
                amount: burnTokenAmount,
                address: Address.fromPublicKeyHash(BURN_ADDRESS, API_NET.TEST).toString(),
            },
        ],
        senderWif: privateKey.privateKey.toWIF()
    })
    console.log('Sent %s %s tokens again to zero address by txid2 %s', burnTokenAmount, tokenSymbol, transfer.txid)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // burn the tokens
    const ftUtxos = [
        {
            txId: transfer.txid,
            outputIndex: 0,
            tokenAddress: Address.fromPublicKeyHash(BURN_ADDRESS, API_NET.TEST).toString(),
            tokenAmount: burnTokenAmount,
        },
        {
            txId: transfer2.txid,
            outputIndex: 0,
            tokenAddress: Address.fromPublicKeyHash(BURN_ADDRESS, API_NET.TEST).toString(),
            tokenAmount: burnTokenAmount,
        },
    ]
    // burn
    const burnResult = await ftManager.burn({
        genesis: genesis,
        codehash: codehash,
        ftUtxos: ftUtxos,
    })
    console.log('Burned %s tokens by txid %s',  tokenSymbol, burnResult.txid)

    // check token balance
    console.log('Your token balance is %s %s tokens', await ftManager.getBalance({
        codehash: codehash,
        genesis: genesis,
        address: receiverAddress.toString()
    }), tokenSymbol)


};


setupMyWalletAndOperateFt().catch(console.error);
```

上面的示例代码展示了如何创建一个新的token，然后转账token（到0地址），销毁token，查询token余额等操作。期间的等待操作是为了防止访问频率过高indexer尚未正确索引导致程序异常。

程序的功能介绍：

1. 初始化钱包并打印出地址和余额。
2. 创建FtManager实例并创造（Genesis）一个新的token，token名称可以任意指定。生成token的过程中会返回codehash, genesis, sensibleId, genesisTxId等信息。
3. 等待1秒，等待token创建完成。
4. 准备一些utxo用于支付后续手续费。
5. 铸造（Mint）一些token用于销毁。
6. 等待1秒，等待token铸造完成。
7. 分两次转账token到0地址，用于销毁。
8. 等待1秒，等待token转账完成。
9. 销毁token。
10. 查询token余额。确认token销毁成功。


## 运行程序

运行以下命令，执行程序：

```bash
npx tsc
node src/index.js
```
