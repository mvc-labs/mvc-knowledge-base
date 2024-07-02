---
sidebar_position: 3
---

# Reorg

An introduction to block reorganization from the perspective of blockchain consensus.

Refer to the concept of mining [Block Reorganization](../../../mining/concepts/reorg-orphan-51attack.md).

## What is Block Reorganization

Block reorganization, often referred to simply as "reorg," is the process by which a blockchain network replaces certain
blocks on the current main chain with new blocks when a longer valid chain is discovered. This process is typically
triggered by the consensus mechanism of the blockchain network, such as Bitcoin's Proof of Work mechanism.

## Why Block Reorganization Occurs

Block reorganization can occur due to several reasons:

### 1. Chain Forks

In a distributed blockchain network, different nodes might discover and broadcast two different valid blocks at the same
time, leading to a chain fork. In such cases, different nodes may have different copies of the chain.

### 2. Network Latency

Due to network latency, different nodes might receive new blocks at different times. When a node discovers a longer
chain than the current one, it triggers a block reorganization to follow the longer chain.

### 3. Competing Blocks

When miners simultaneously find blocks, they might broadcast these blocks at the same time. Due to the Proof of Work
mechanism, other nodes will choose the chain with the greater cumulative work, leading to reorganization.

## How Consensus is Achieved After Block Reorganization

During block reorganization, nodes follow these steps to achieve consensus:

### 1. Validate the New Chain

When nodes receive the new blockchain, they validate each block on the new chain to ensure its legality and validity.
This includes verifying each block's hash, the validity of transactions, and the proof of work.

### 2. Compare Chain Lengths

Nodes compare the length (or cumulative work) of the current chain with the new chain. If the new chain is longer (has
greater cumulative work), nodes will adopt the new chain as the main chain.

### 3. Remove Old Blocks

Nodes remove the blocks on the current chain that conflict with the new chain. These removed blocks and their
transactions are placed back into the memory pool, waiting to be re-mined.

### 4. Add New Blocks

Nodes add the blocks from the new chain to the main chain and mark the transactions in these blocks as confirmed.

### 5. Broadcast Consensus

After reorganization, nodes broadcast the new main chain to other nodes, ensuring that the entire network reaches
consensus.

## Impact of Block Reorganization

Block reorganization may cause temporary delays or reversals in transaction confirmations, but it is a necessary
mechanism to maintain consistency and security in the blockchain system. By reorganizing in a timely manner and choosing
the chain with the greatest cumulative work, the blockchain network can effectively resist double-spending attacks and
other malicious behaviors, ensuring the reliability and immutability of transaction records.

## Conclusion

Block reorganization is an important mechanism in blockchain networks for handling chain forks and network latency. It
ensures network consistency and security by validating new chains, comparing chain lengths, removing old blocks, and
adding new blocks. Understanding the principles and processes of block reorganization helps in gaining a deeper
understanding of blockchain technology and its applications in decentralized systems.
