---
sidebar_position: 5 
---

# Coinbase Transactions

Introduction to Coinbase Transactions of MVC.

## Coinbase Transactions

A Coinbase transaction in the Bitcoin and MVC blockchain networks is a special type of transaction created by miners
each time a new block is generated. Specifically, a Coinbase transaction has the following important features and
functions:

1. **Block Reward**: When a miner successfully mines a new block, they receive a block reward through the Coinbase
   transaction. This reward includes newly generated cryptocurrency (such as SPACE) as well as the transaction fees from
   all transactions within the block. This reward is one of the primary sources of income for miners.

2. **New Coin Issuance**: Coinbase transactions are the way new SPACE (or other pow cryptocurrencies) enter the
   circulating market. When a new block is mined, the new SPACE obtained by the miner through the Coinbase transaction
   is added to the circulation.

3. **No Input Transactions**: Unlike regular cryptocurrency transactions, Coinbase transactions have no inputs, only
   outputs. This means that when miners create this transaction, they do not need to provide any previous coins as input
   since it is a process of creating new coins.

4. **Blockchain Verification**: Coinbase transactions are also part of blockchain verification. Every block must contain
   a Coinbase transaction. This is part of the blockchain protocol to ensure the legitimacy of each block and the
   distribution of miners' rewards.

Overall, Coinbase transactions play a crucial role in the blockchain network. They are not only an important source of
income for miners but also key to new coin issuance and the normal operation of the blockchain system.

Additionally, through Coinbase transactions, miners can add special information in the input data, such as commemorating
an event or sending blessings to someone. This information is recorded in the blockchain, becoming a permanent
historical record.

## Constructing a Coinbase Transaction

Constructing and verifying a Coinbase transaction involves several steps and processes, including the following:

1. **Preparation**: Miners need to prepare to mine a new block, which includes collecting pending transactions from the
   blockchain network.

2. **Creating a Coinbase Transaction**:
    - **Version Number**: Set the transaction version number.
    - **Input**: Coinbase transactions have no inputs, so the input part only needs to contain a special input where
      the `previous_output` field points to a non-existent transaction and the index is `0xFFFFFFFF`.
    - **Input Script**: Contains arbitrary data (usually includes extra data from the miner, such as block height).
      Pool-related information can be placed here to facilitate parsing pool information by explorers.
    - **Output**: Contains the miner’s reward address and reward amount. The reward amount includes the current block
      mining reward and the total transaction fees of all transactions.

3. **Output Script**: Defines sending the reward to the miner’s address, usually a standard P2PKH (Pay-to-PubKey-Hash)
   script.

4. **Other Information**: The Coinbase transaction also includes block header information such as block version number,
   previous block hash, Merkle root, timestamp, difficulty target, and nonce.

### Verifying a Coinbase Transaction

1. **Check Format**: Ensure the Coinbase transaction meets the MVC protocol’s format requirements, such as the number
   and format of inputs and outputs.

2. **Verify Input**: Confirm that the input of the Coinbase transaction is valid, i.e., the `previous_output` field
   points to a non-existent transaction and the index is `0xFFFFFFFF`.

3. **Verify Reward Amount**: Confirm that the reward amount of the Coinbase transaction is correct. This includes
   calculating the current block’s reward amount (according to the halving rule) and the total transaction fees of all
   included transactions.

4. **Check Script**: Verify the output script to ensure that the reward can be correctly paid to the address specified
   by the miner.

5. **Verify Block Header**: Confirm the block header information, such as whether the previous block hash is correct,
   whether the Merkle root matches the transaction list, whether the timestamp is valid, and whether the difficulty
   target and nonce meet the requirements.

6. **Merkle Tree Verification**: Construct the Merkle tree of the block and verify that the Coinbase transaction is
   included in the root of the tree. Ensure that the hash of the transaction list matches the Merkle root in the block
   header.

### Example

Below is a simplified example of a Coinbase transaction (using block height 71704 as an example):

```bash
mvc-cli getrawtransaction 1dad179ba3f547fa1412a92cf49e4d02af3fc9d52c9c0f3a00d6600b2818f591 1
```

Resulting output:

```plaintext
{
  "txid": "1dad179ba3f547fa1412a92cf49e4d02af3fc9d52c9c0f3a00d6600b2818f591",
  "hash": "1dad179ba3f547fa1412a92cf49e4d02af3fc9d52c9c0f3a00d6600b2818f591",
  "version": 2,
  "size": 160,
  "locktime": 0,
  "vin": [
    {
      "coinbase": "0318180104eb045466088111bcb8e8d900007a657267706f6f6c2e636f6d00fabe6d6da1e70d1e25b70ccaf051b0382ec890fcc7049609b73dcc9fe2ea586465c7c54b0100000000000000",
      "sequence": 0
    }
  ],
  "vout": [
    {
      "value": 25.00000226,
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 c6beeb1edba75692e4a82dc964a36fb98052aae1 OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a914c6beeb1edba75692e4a82dc964a36fb98052aae188ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": [
          "1K7sWEEYChza2GZa4yNNzTwsXR7wtRwQNH"
        ]
      }
    }
  ],
  "blockhash": "0000000000000000073b37f7e898f755d356905ad4f6ddb44d5b5189021eb7bc",
  "confirmations": 1,
  "time": 1716782315,
  "blocktime": 1716782315,
  "blockheight": 71704,
}
```

In this example:

- **version**: Transaction version number.
- **inputs**: Contains one input, the `previous_output` field points to a non-existent transaction, the index
  is `0xFFFFFFFF`, indicating this is a Coinbase transaction. The coinbase field contains extra data from the miner,
  such as the pool name, block height, etc.
- **script**: The input script contains arbitrary data.
- **outputs**: One output, containing the miner's reward address and reward amount.
- **locktime**: The lock time of the transaction, usually 0.

Through these steps, miners can construct and verify a Coinbase transaction, ensuring it complies with the MVC network
protocol and rules.
