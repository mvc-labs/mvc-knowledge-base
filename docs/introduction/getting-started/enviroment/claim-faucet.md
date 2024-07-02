---
sidebar_position: 2
---

# Claim Faucet

This guide explains how to request test tokens from a faucet.

## Prerequisites

First, ensure you have completed the environment setup and successfully printed your address. Refer
to [Environment Setup](setup-project.md).

```text
Mnemonic seed exists: <* * * * * * * * * * * *>, will use this one.
Creating wallet with seed: <* * * * * * * * * * * *> and path <m/44'/10001'/0'/0/0>
Your private key *
Your address mi51xGS45itNchtDRdRP3Fbh3vjEQWxh38
Your balance 0 satoshis
```

Record your address to request test tokens.

## Request Test Tokens

Currently, the witnessonchain service provides a space testnet faucet.

You can visit: [Space Testnet Faucet](https://witnessonchain.com/faucet/tspace) to request test tokens.

Enter your address, click the `Shoot me the coin` button, and wait a few seconds. Your address will receive a certain
amount of test tokens, as shown below:

![space-faucet](/img/witnessonchain-faucet.png)

You can check your address balance in a browser or run the environment setup code again to check the balance.

```bash
node src/index.js
```

At this point, you should see that your balance is no longer zero.

```text
Your balance 10000000 satoshis
```

## Request Mainnet Test Tokens

If you need to request mainnet test tokens, visit: [Space Mainnet Faucet](https://witnessonchain.com/faucet/space). Note
that the format of mainnet addresses is different from testnet addresses; mainnet addresses start with `1`, while
testnet addresses start with `m` or `n`.
