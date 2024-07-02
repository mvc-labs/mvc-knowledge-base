---
sidebar_position: 2
---

# Longest Chain

An introduction to the longest chain rule and its role in blockchain consensus.

## 1. What is the Longest Chain Rule

The longest chain rule is a rule used in Bitcoin and other blockchain systems to determine which chain is the valid one.
This rule stipulates that nodes in the network should choose the chain with the greatest accumulated chainwork as the
valid blockchain. This is commonly referred to as the longest chain.

## 2. The Role of the Longest Chain Rule in Blockchain Consensus

### 2.1 Resolving Forks

In a blockchain network, due to the global distribution of nodes, two different blocks might be generated
simultaneously, leading to a fork in the chain. According to the longest chain rule, nodes will choose the chain with
the greatest accumulated chainwork as the main chain. As more blocks are added, one chain will ultimately be chosen as
the valid chain, while the other will be discarded.

### 2.2 Ensuring Transaction Confirmation

The longest chain rule ensures that all nodes will eventually reach consensus on the same chain, thereby ensuring that
transactions on the chain are recognized by the entire network. Once the block containing a transaction is confirmed by
multiple subsequent blocks, the transaction is considered reliable and immutable.

### 2.3 Enhancing Network Security

By ensuring that nodes select the chain with the greatest accumulated chainwork, the longest chain rule increases the
difficulty for an attacker to reorganize the chain. An attacker would need to control more than half of the network's
hash power (i.e., a 51% attack) to reorganize the blockchain and alter transaction records. This high cost significantly
increases the difficulty and expense of an attack, thereby enhancing network security.

## 3. How to Use CLI to Obtain Block Height and Chainwork

### Get the Latest Block Height

```bash
mvc-cli getblockcount
```

### Get Detailed Block Information, Including Chainwork

```bash
mvc-cli getblock <blockhash>
```

### Get Block Hash

```bash
mvc-cli getblockhash <height>
```

## 4. Relationship Between Block Height and Confirmations

Confirmations refer to the number of blocks that have been added on top of the block containing the transaction. For
example, if a transaction is included in a block at height 654318 and the current latest block height is 654321, the
transaction has 4 confirmations (654321 - 654318 + 1).

## Conclusion

The longest chain rule is a crucial mechanism for achieving consensus in blockchain networks. By choosing the chain with
the greatest accumulated chainwork, it resolves fork issues, ensures transaction confirmation, and enhances network
security. Understanding and applying the longest chain rule helps in gaining a deeper understanding of blockchain
technology and its applications in decentralized systems.
