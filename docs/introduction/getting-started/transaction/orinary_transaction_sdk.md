---
sidebar_position: 2
---

# Ordinary Transaction with SDK

This article introduces how to construct a standard transaction (P2PKH) using the MetaContract SDK.

> Before using this guide, ensure you have completed the environment setup and received test coins. Please refer
> to [Setting Up an MVC Project](../enviroment/setup-project.md).

This guide is based on the previously configured environment and keys.

## Modify the Source Code

Replace the `src/index.ts` file with the following content:

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

// Detect if the mnemonic seed file exists, if not, generate a new one
// Then create a wallet with the seed with path WALLET_PATH
const setupMyWalletAndSend = async (): Promise<void> => {
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

    // Send 10000 satoshi back to the faucet
    console.log("Sending 10000 satoshis back to the faucet");
    wallet
        .send("mktGt8zJo5qYmXc97SVvCLPvtLExymgBKF", 10000)
        .then((tx) => {
            console.log("Transaction sent, txid %s, rawHex %s", tx.txId, tx.txHex);
        })
        .then(() => wallet.getBalance())
        .then((balance) => {
            console.log("Your balance now is  %s satoshis", balance);
        });
};

setupMyWalletAndSend().catch(console.error);
```

The above code adds the logic for sending a transaction after initializing the wallet.

## Code Functionality

1. Initialize the wallet and print out the address and balance.
2. Send 10,000 satoshis back to the faucet.
3. Print the transaction ID and the balance after sending the transaction.

If everything runs correctly, you will see an output similar to the following:

```text
Your address mmGruHTY1ivexPzmvjz8AxrhhWWE8BbgN9
Your balance 9928215 satoshis
Sending 10000 satoshis back to the faucet
Transaction sent, txid 602e6d6216dfa059d815c373868f696bf63efee7d798e2f8607213a73148e744, rawHex 0a000000019ed5a08a5dceb21c04faa56529702bd821bb7df9f6ef8a05f4558c34896ca62a010000006a47304402202c202844366d0ea54f0efc297982e19c6e47fd0ac8e94bf9343d304f8bb0da5202203fc50d96855acd27c18c26789362b3a970f7c83dfe2a85e581aaaeb201424648412102b9302409e6a04b5cb8470ef1471e36a894e2676373e51cbcff54e6fa516d12f5ffffffff0210270000000000001976a9143ae0e15c763122be84e4d2d75a9e92b0d8703b2c88ac08569700000000001976a9143f266e0384df8e171b60895832f58aaf4d5b58ab88ac00000000
Your balance now is  9917960 satoshis
```
