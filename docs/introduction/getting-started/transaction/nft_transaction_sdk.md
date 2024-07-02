---
sidebar_position: 6
---

# NFT Transaction with SDK

This article introduces how to construct an NFT (Non-Fungible Token) transaction using the MetaContract SDK.

> Before using this guide, ensure you have completed the environment setup and received test coins. Please refer
> to [Setting Up an MVC Project](../enviroment/setup-project.md).

This guide is based on the previously configured environment and keys.

## Code Example

Replace the `src/index.ts` file with the following content:

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

// Detect if the mnemonic seed file exists, if not, generate a new one
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

    // Create an NftManager instance for the following operations
    const nftManager = new NftManager({
        network: API_NET.TEST,
        apiTarget: API_TARGET.MVC,
        purse: privateKey.privateKey.toWIF(),
        feeb: 1,
    })
    const totalSupply = "10";
    // Genesis the NFT with totalSupply
    const genesisResult = await nftManager.genesis({totalSupply: totalSupply, version: 1})
    console.log("Created NFT with sensibleId: %s, codehash %s, genesis: %s, totalSupply is: ", genesisResult.sensibleId, genesisResult.codehash, genesisResult.genesis, totalSupply);
    const sensibleId = genesisResult.sensibleId;
    const genesis = genesisResult.genesis;
    const codehash = genesisResult.codehash;

    // Mint one NFT
    // The metaTxid is the transaction that you bury your NFT metadata in, if you don't have one, just leave it empty
    const metaTxId = ''
    const metaOutputIndex = 0
    const {txid} = await nftManager.mint({
        version: 1,
        sensibleId: sensibleId!,
        metaTxId,
        metaOutputIndex,
    })
    console.log("Minted NFT with txid: %s", txid);

    // Sleep for 1 second to wait for the mint transaction
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mint another NFT
    const {txid: txid2} = await nftManager.mint({
        version: 1,
        sensibleId: sensibleId!,
        metaTxId,
        metaOutputIndex,
    })
    console.log("Minted another NFT with txid: %s", txid2);

    // Sleep for 1 second to wait for the mint transaction
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Transfer the first NFT to the faucet address
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

This example program creates an NFT collection, mints two NFTs, and then transfers the first NFT to a faucet address.

## Program Functionality

1. Initialize the wallet and print out the address and balance.
2. Create an NFT collection.
3. Mint two NFTs.
4. Transfer the first NFT to the faucet address.
5. Print out the transaction IDs.

## Running the Program

Run the following commands to execute the program:

```bash
npx tsc
node src/index.js
```

If everything runs correctly, you will see an output similar to the following:

```text
......
Your address mmGruHTY1ivexPzmvjz8AxrhhWWE8BbgN9
Your balance 9267082 satoshis
Created NFT with sensibleId: 91776d7db885b9e8c42c4ea4ae24316dea55574bcd017d7e34aeac159645a8ab00000000, codehash e205939ad9956673ce7da9fbd40514b30f66dc35, genesis: 8cbca577f02bc27d9c9f9cfee2d01a37f9ad4230, totalSupply is: 10
Minted NFT with txid: f4d3347a479e9fcb66aab971d8da6b592d83dcc95dd7e1a385a15bc48e8286d2
Minted another NFT with txid: b8312ceb8a4baa5aa09bbcbfa0bd262f6c1975f437985e1b99e1ede1f925b47d
Transferred NFT to mktGt8zJo5qYmXc97SVvCLPvtLExymgBKF with txid: 468fe1f009562fb7a1ae16cb335c42fbaf75c5d84a21a28b5bf145b393645831
```
