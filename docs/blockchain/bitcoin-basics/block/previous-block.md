---
sidebar_position: 2
---

# Previous Block

Introducing the Previous Block field in the block header.

## What is the Previous Block

The previous block refers to the hash value of the preceding block included in the current block header. This field is
used to link blocks together to form the blockchain. Each block (except the genesis block) contains the hash value of
its previous block, making the blockchain a continuous, immutable record.

## Functions of the Previous Block

### 1. Forming the Blockchain

The previous block field allows each block to link to its preceding block, forming a continuous chain. Each block
determines its position in the blockchain through the hash value of its previous block.

### 2. Validating Block Validity

When a node receives a new block, it checks whether the hash value of its previous block exists and is valid. If the
previous block is invalid or nonexistent, the block will be rejected.

### 3. Preventing Tampering

Since the block's hash value is generated from the block content, including the hash value of the previous block, any
modification to the block content will change its hash value. This makes tampering with any part of the blockchain
extremely difficult and costly, as it would require recalculating and changing the hash values of all subsequent blocks.

## Importance of the Previous Block in the Blockchain

### 1. Ensuring Data Integrity

The hash value of the previous block ensures the integrity and continuity of blockchain data, allowing all blocks to be
sequentially traced.

### 2. Promoting Consensus Mechanism

The hash value of the previous block helps network nodes reach a consensus, ensuring that all nodes recognize the same
version of the blockchain.

## Retrieving Previous Block Information

### Retrieving Block Information

Using the Bitcoin Core client, you can obtain detailed information about a block, including the hash value of the
previous block, with the following command:

```bash
mvc-cli getblock <blockhash>
```

### Retrieving Latest Block Hash

```bash
mvc-cli getbestblockhash
```

## Summary

The previous block field is a crucial part of the blockchain structure. It links each block to form the blockchain,
ensuring data continuity and immutability. Understanding the function of the previous block helps to deeply understand
the working principles and technical details of the blockchain.
