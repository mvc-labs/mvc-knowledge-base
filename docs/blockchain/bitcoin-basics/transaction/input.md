---
sidebar_position: 2
---
# Input (Transaction Input)

Introduction to the data structure and function of transaction inputs.

## What is a Transaction Input

A Bitcoin transaction input (Transaction Input, abbreviated as "vin") refers to the funds used from a previous transaction output (Transaction Output, abbreviated as "vout"). Each Bitcoin transaction input specifies the source of the funds, referencing a previous transaction's output and providing the necessary information to unlock these funds.

## Structure of Transaction Input Fields

Each transaction input contains several key fields:

### 1. Previous Transaction Hash

This is a 32-byte hash value representing the ID of the referenced previous transaction. This field determines the source transaction of the funds.

### 2. Previous Output Index

This is a 4-byte integer indicating the index position of the output in the referenced previous transaction. Since a transaction can have multiple outputs, this index is used to locate the specific output.

### 3. Unlocking Script (scriptSig)

The unlocking script is a variable-length field used to unlock the locking script of the previous transaction output. It typically contains a signature and a public key, verifying the legitimacy of the transaction.

### 4. Sequence Number

This is a 4-byte field used for relative time locking and transaction replacement. It plays a role in advanced use cases such as those described in BIP 68.

## Example

Here is an example of a Bitcoin transaction input represented in JSON format:

```json
"vin": [
  {
    "txid": "previous_transaction_id",
    "vout": 0,
    "scriptSig": {
      "asm": "3045022100... 02b463...",
      "hex": "483045022100..."
    },
    "sequence": 4294967295
  }
]
```

In this example:

- **txid** represents the ID of the previous transaction.
- **vout** is the index position of the output in the previous transaction.
- **scriptSig** contains the details of the unlocking script.
- **sequence** is the sequence number, used for advanced transaction control.

## Functions of Transaction Input

### 1. Determining the Source of Funds

Transaction inputs determine the source of funds by referencing the outputs of previous transactions, ensuring that all Bitcoin transactions have a source.

### 2. Verifying Transaction Legitimacy

Through the unlocking script, transaction inputs verify the transaction initiator's control over the referenced funds. Only by providing the correct signature and public key can the previous transaction's output be unlocked and used.

### 3. Implementing Advanced Features

The combination of the sequence number field and the unlocking script allows for the implementation of advanced features such as relative time locking and transaction replacement, enhancing the flexibility and functionality of Bitcoin transactions.

## Summary

Transaction inputs are a crucial component of Bitcoin transactions, determining the source of funds and verifying transaction legitimacy. Understanding the structure and function of transaction inputs helps to gain a deeper insight into the workings and security mechanisms of Bitcoin transactions.
