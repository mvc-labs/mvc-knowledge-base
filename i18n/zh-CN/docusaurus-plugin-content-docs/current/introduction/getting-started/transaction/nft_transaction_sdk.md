---
sidebar_position: 6
---

# 使用SDK构建NFT交易

本文介绍使用MetaContract SDK构建NFT（Non-Fungible Token）交易的方法。

> 使用之前请确保已经完成环境配置和测试币领取，请参考[搭建一个MVC项目](../enviroment/setup-project.md)。

本文基于上述已经配置好的环境和密钥进行操作。

## 代码示例

将`src/index.ts`文件替换为以下内容：

```typescript
import {Mnemonic} from "meta-contract/dist/mvc";
import {promises as fs} from 'fs';
import {API_NET, API_TARGET, NftManager, Wallet} from "meta-contract";

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
const setupMyWalletAndOperateNft = async (): Promise<void> => {
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

    // create an NftManager instance for the following operations
    const nftManager = new NftManager({
        network: API_NET.TEST,
        apiTarget: API_TARGET.MVC,
        purse: privateKey.privateKey.toWIF(),
        feeb: 1,
    })
    const totalSupply = "10";
    // genesis the NFT with totalSupply
    const  genesisResult = await nftManager.genesis({totalSupply: totalSupply,version:1})
    console.log("Created NFT with sensibleId: %s,codehash %s, genesis: %s,  totalSupply is : ", genesisResult.sensibleId, genesisResult.codehash, genesisResult.genesis, totalSupply);
    const sensibleId = genesisResult.sensibleId;
    const genesis = genesisResult.genesis;
    const codehash = genesisResult.codehash;

    // mint one NFT
    // The metaTxid is  the transaction that you bury your NFT metadata in, if you don't have one, just leave it empty
    const metaTxId = ''
    const metaOutputIndex = 0
    const {txid} = await nftManager.mint({
        version: 1,
        sensibleId: sensibleId!,
        metaTxId,
        metaOutputIndex,
    })
    console.log("Minted NFT with txid: %s", txid);

    // sleep for 1 seconds to wait for the mint transaction
    await new Promise(resolve => setTimeout(resolve, 1000));

    // mint Another NFT
    const {txid: txid2} = await nftManager.mint({
        version: 1,
        sensibleId: sensibleId!,
        metaTxId,
        metaOutputIndex,
    })
    console.log("Minted Another NFT with txid: %s", txid2);

    // sleep for 1 seconds to wait for the mint transaction
    await new Promise(resolve => setTimeout(resolve, 1000));

    // transfer the first NFT to faucet address
    let transferResp = await nftManager.transfer({
        tokenIndex: "0",
        genesis: genesis!,
        codehash: codehash!,
        senderWif: privateKey.privateKey.toWIF(),
        receiverAddress: "mktGt8zJo5qYmXc97SVvCLPvtLExymgBKF"
    })
    console.log("Transferred NFT to %s with txid: %s", "mktGt8zJo5qYmXc97SVvCLPvtLExymgBKF", transferResp.txid);

};


setupMyWalletAndOperateNft().catch(console.error);
```

这个示例程序创建了一个NFT集合，然后铸造两个NFT，最后将第一个NFT转移到水龙头地址。

程序的功能介绍：
1. 初始化钱包并打印出地址和余额。
2. 创建一个NFT集合。
3. 铸造两个NFT。
4. 将第一个NFT转移到水龙头地址。
5. 打印出交易ID。

## 运行程序

运行以下命令，执行程序：

```bash
npx tsc
node src/index.js
```

如果一切正常，你会看到类似以下输出：

```text
......
Your address mmGruHTY1ivexPzmvjz8AxrhhWWE8BbgN9
Your balance 9267082 satoshis
Created NFT with sensibleId: 91776d7db885b9e8c42c4ea4ae24316dea55574bcd017d7e34aeac159645a8ab00000000,codehash e205939ad9956673ce7da9fbd40514b30f66dc35, genesis: 8cbca577f02bc27d9c9f9cfee2d01a37f9ad4230,  totalSupply is :  10
Minted NFT with txid: f4d3347a479e9fcb66aab971d8da6b592d83dcc95dd7e1a385a15bc48e8286d2
Minted Another NFT with txid: b8312ceb8a4baa5aa09bbcbfa0bd262f6c1975f437985e1b99e1ede1f925b47d
Transferred NFT to mktGt8zJo5qYmXc97SVvCLPvtLExymgBKF with txid: 468fe1f009562fb7a1ae16cb335c42fbaf75c5d84a21a28b5bf145b393645831
```
