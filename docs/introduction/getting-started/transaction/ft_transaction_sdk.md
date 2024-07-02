---
sidebar_position: 4
---

# FT Transaction with SDK

This document introduces how to use the FT SDK to issue tokens, transfer tokens, burn tokens, and query tokens.

> Before using this guide, ensure you have completed the environment setup and received test coins. Please refer
> to [Setting Up an MVC Project](../enviroment/setup-project.md).

This guide is based on the previously configured environment and keys.

## Code Example

Replace the `src/index.ts` file with the following content:

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

// Detect if the mnemonic seed file exists, if not, generate a new one
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

    // sleep for 1 second to wait for the token to be created
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

    // sleep for 1 second to wait for the fee tx to be created
    await new Promise(resolve => setTimeout(resolve, 1000));

    // mint some token to burn
    let {txid} = await ftManager.mint({
        sensibleId,
        genesisWif: privateKey.privateKey.toWIF(),
        receiverAddress,
        tokenAmount: '10000000000',
    })
    console.log('Minted %d %s tokens by txid %s ', 10000000000, tokenSymbol, txid)


    // sleep for 1 second to wait for the token to be minted
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
    console.log('Burned %s tokens by txid %s', tokenSymbol, burnResult.txid)

    // check token balance
    console.log('Your token balance is %s %s tokens', await ftManager.getBalance({
        codehash: codehash,
        genesis: genesis,
        address: receiverAddress.toString()
    }), tokenSymbol)


};


setupMyWalletAndOperateFt().catch(console.error);
```

The above example code demonstrates how to create a new token, transfer tokens (to a burn address), burn tokens, and
query token balances. The waiting operations are to prevent access frequency from being too high and causing program
exceptions due to the indexer not indexing correctly.

## Program Functionality

1. Initialize the wallet and print out the address and balance.
2. Create an FtManager instance and generate (Genesis) a new token. The token name can be specified as desired. The
   token creation process will return information such as codehash, genesis, sensibleId, and genesisTxId.
3. Wait for 1 second to allow the token creation to complete.
4. Prepare some UTXOs for subsequent fee payments.
5. Mint 10,000,000,000 tokens.
6. Wait for 1 second to allow the token minting to complete.
7. Transfer 100,000 tokens twice to the burn address (zero address) to burn them.
8. Wait for 1 second to allow the token transfers to complete.
9. Burn the tokens.
10. Query the token balance to confirm the token burn was successful.

## Running the Program

Run the following commands to execute the program:

```bash
npx tsc
node src/index.js
```

If everything runs correctly, you will see an output similar to the following:

```text
Your balance 9701713 satoshis
Creating token with name: <MintTest - 14:23>, symbol: <MVCTest>, decimal: <8>
Token created with codehash: <c9cc7bbd1010b44873959a8b1a2bcedeb62302b7>, genesis: <a5ec
