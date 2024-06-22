---
sidebar_position: 1
---
# 搭建一个MVC项目

创建一个typescript项目，并引入`meta-contract`库。

> 备注：以下测试全部使用nodejs v18.20.1 版本。注意本教程使用的密钥和地址仅用于测试，不要用于生产环境。本文作者不承担任何由于密钥泄漏造成的损失。

## 创建nodejs项目

首先初始化一个nodejs项目，

```bash
mkdir mvc-test-project
cd mvc-test-project
npm init -y
```

## 安装typescript

本文测试使用typescript编写程序，建议使用typescript来编写合约。

下面的命令安装typescript相关依赖。

```bash
npm install typescript ts-node @types/node fs-extra --save-dev
```

初始化typescript配置文件

```bash
npx tsc --init
```

## 安装meta-contract

```bash
npm install meta-contract --save
```

## 开始编写程序

创建一个`index.ts`文件，用来执行逻辑。

```bash
mkdir src
touch src/index.ts
```

在`src/index.ts`文件中写入以下代码：

```typescript
import {Mnemonic} from "meta-contract/dist/mvc";
import {promises as fs} from 'fs';
import {API_NET, Wallet} from "meta-contract";

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
const setupMyWallet = async (): Promise<void> => {
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
};


setupMyWallet().catch(console.error);
```

这段代码的功能介绍：
1. 检查项目目录下是否存在`mnemonic-seed.txt`文件，如果不存在则生成一个新的助记词，并将助记词写入文件。请注意，这个助记词是随机生成的，不要用于生产环境。另外请安全保存好这个助记词，因为后续的操作都会用到这个助记词。
2. 读取助记词文件，如果文件存在则读取文件中的助记词。
3. 使用助记词生成一个钱包，并打印出私钥、地址和余额。

## 运行程序

运行以下命令，执行程序：

```bash
npx tsc
node src/index.js
```

如果一切正常，你会看到类似以下输出：

```text
Mnemonic seed exists: <* * * * * * * * * * * *>, will use this one.
Creating wallet with seed: <* * * * * * * * * * * *> and path <m/44'/10001'/0'/0/0>
Your private key *
Your address mi51xGS45itNchtDRdRP3Fbh3vjEQWxh38
Your balance 0 satoshis
```

创建钱包完成。你可以使用这个钱包地址进行后续的操作。

