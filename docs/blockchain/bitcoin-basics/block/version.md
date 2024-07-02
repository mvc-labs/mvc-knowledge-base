---
sidebar_position: 1
---

# Version

Introducing the block version number field.

## What is the Block Version Number

The block version number is a field in the Bitcoin block header that indicates the format of the block and the rules it
follows. It plays an important role in blockchain upgrades and the consensus mechanism. The block version number
consists of 4 bytes and can be used to represent version information and signal new features.

## History and Evolution of the Block Version Number

### Early Version Numbers

In the early days of Bitcoin, the block version number indicated software upgrades and the introduction of new features
through simple increments. The evolution of early version numbers is as follows:

- `0x00000001`: Initial software version
- `0x00000002`: BIP 34, introducing block height in the coinbase
- `0x00000003`: BIP 66, introducing strict DER signatures
- `0x00000004`: BIP 65, introducing OP_CHECKLOCKTIMEVERIFY

These version number upgrades were activated by the consensus of the majority of miners, requiring at least 750 out of
950 blocks to use the new version number within a given period.

### Version Bits

Since 2015, the block version number has adopted the "version bits" mechanism, allowing miners to signal up to 29 new
features simultaneously. The version bits mechanism treats the version number field as a bit field, with each bit
representing a feature signal.

For example, here are some important version bits:

- **Bit 0**: BIP 112 (CHECKSEQUENCEVERIFY)
- **Bit 1**: BIP 141 (Segwit)
- **Bit 2**: BIP 341 (Taproot)

This version bits mechanism allows multiple features to be signaled by miners simultaneously, significantly improving
the efficiency and flexibility of blockchain upgrades.

## Functions of the Version Number

1. **Signaling New Features**: Through the block version number, miners can indicate their readiness to accept and
   implement new blockchain protocol rules.
2. **Consensus Upgrade**: Changes in the version number reflect the network's consensus on new features and protocol
   upgrades, helping to coordinate and manage blockchain upgrades.
3. **Enhancing Compatibility**: By incrementally increasing the version number, it ensures that all nodes can correctly
   decode and execute when processing blocks.

## How to Obtain the Block Version Number

Using the Bitcoin Core client, you can obtain the block version number through the command line interface (CLI).

### Obtaining the Latest Block Information

```bash
mvc-cli getblockchaininfo
```

### Obtaining Specific Block Information

First, get the block hash:

```bash
mvc-cli getblockhash <height>
```

Then, use the block hash to get detailed block information, including the version number:

```bash
mvc-cli getblock <blockhash>
```

## Summary

The block version number is an important field in the Bitcoin blockchain. It signals miner support for new features and
helps achieve blockchain upgrades and consensus. Understanding the history and mechanism of the block version number
helps to better comprehend the operation and development of the Bitcoin network.
