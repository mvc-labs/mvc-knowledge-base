---
sidebar_position: 1
---

# Version

An introduction to the Bitcoin transaction version number field.

## What is a Transaction Version Number?

The transaction version number is a field in the Bitcoin transaction data structure that indicates the version of the
transaction format and rules. It defines the structure of the transaction and supports protocol upgrades and the
introduction of new features.

## Purpose of the Version Number

### 1. Define Transaction Format

The version number indicates the format and interpretation of the transaction. Different versions of transactions may
vary in inputs, outputs, or script syntax. Miners and nodes parse and validate transactions based on the version number.

### 2. Support Protocol Upgrades

The version number allows the Bitcoin protocol to gradually introduce new features and improvements. For example,
Segregated Witness (SegWit) was implemented by increasing the version number. Older nodes can continue to process
transactions in the old format, while newer nodes can understand and process transactions in the new format.

### 3. Backward Compatibility

The version number allows new features to be introduced without breaking old features or transactions. Nodes can
selectively process transactions based on the version number, ensuring backward compatibility.

## Values of the Version Number

The Bitcoin transaction version number is a 4-byte integer. The main version numbers currently in use include:

- **Version 1**: The original transaction version, used since the inception of Bitcoin.
- **Version 2**: Introduced CHECKSEQUENCEVERIFY (BIP 68 and BIP 112), supporting relative time locks.
- **Version 10**: Used in the MVC network, supporting [MetaTxid](../../mvc-improvements/meta-txid.md) calculation.

## Retrieving the Transaction Version Number

Using the Bitcoin Core client, you can obtain detailed transaction information, including the version number, through
the command line interface (CLI).

### Retrieving Transaction Details

```bash
mvc-cli getrawtransaction <txid> 1
```

The JSON data returned by this command includes the transaction's version number.

## Example

Suppose we have a transaction with the transaction ID `<txid>`. Using the command above to retrieve its details, we get
the following result:

```json
{
  "txid": "<txid>",
  "version": 2,
  "locktime": 0,
  "vin": [
    ...
  ],
  "vout": [
    ...
  ]
}
```

In this example, the "version" field is 2, indicating that the transaction uses version 2 format and rules.

## Evolution of the Version Number

The evolution of Bitcoin transaction version numbers reflects the gradual improvements and expansions of the protocol.
For example, BIP 68 and BIP 112 introduced relative time lock functionality and were implemented by increasing the
version number. Future protocol upgrades may further increase the version number, introducing more new features and
improvements.

In the MVC network, version number 10 is used to support MetaTxid calculation, providing new functionality for
transaction verification and processing.

## Summary

The transaction version number is a crucial field in the Bitcoin transaction data structure, used to define the
transaction format and support protocol upgrades. Through the evolution of the version number, the Bitcoin protocol can
gradually introduce new features while maintaining backward compatibility. Understanding the role and retrieval methods
of the transaction version number helps to gain a deeper understanding of the structure of Bitcoin transactions and the
evolution of the protocol.
