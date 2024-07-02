---
sidebar_position: 1
---

# Set up a Project

Create a TypeScript project and introduce the `meta-contract` library.

> Note: All tests below use Node.js version 18.20.1. The keys and addresses used in this tutorial are for testing
> purposes only and should not be used in a production environment. The author is not responsible for any losses due to
> key leakage.

## Create a Node.js Project

First, initialize a Node.js project,

```bash
mkdir mvc-test-project
cd mvc-test-project
npm init -y
```

## Install TypeScript

This tutorial uses TypeScript to write the program, and it's recommended to use TypeScript to write contracts.

The following command installs the TypeScript dependencies.

```bash
npm install typescript ts-node @types/node fs-extra --save-dev
```

Initialize the TypeScript configuration file

```bash
npx tsc --init
```

## Install Meta-Contract

```bash
npm install meta-contract --save
```

## Start Writing the Program

Create an `index.ts` file to execute the logic.

```bash
mkdir src
touch src/index.ts
```

Write the following code in the `src/index.ts` file:

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

### Functionality of This Code:

1. Check if the `mnemonic-seed.txt` file exists in the project directory. If not, generate a new mnemonic and write it
   to the file. Note that this mnemonic is randomly generated and should not be used in a production environment. Also,
   keep this mnemonic safe as subsequent operations will use it.
2. Read the mnemonic from the file if it exists.
3. Generate a wallet using the mnemonic, and print the private key, address, and balance.

## Run the Program

Execute the following commands to run the program:

```bash
npx tsc
node src/index.js
```

If everything is correct, you will see an output similar to the following:

```text
Mnemonic seed exists: <* * * * * * * * * * * *>, will use this one.
Creating wallet with seed: <* * * * * * * * * * * *> and path <m/44'/10001'/0'/0/0>
Your private key *
Your address mi51xGS45itNchtDRdRP3Fbh3vjEQWxh38
Your balance 0 satoshis
```

The wallet creation is complete. You can use this wallet address for subsequent operations.
