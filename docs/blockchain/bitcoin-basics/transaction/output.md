---
sidebar_position: 3
---

# Output (Transaction Output)

An introduction to the data structure and function of transaction outputs.

## What is a Transaction Output?

A Bitcoin transaction output (Transaction Output, abbreviated as "vout") refers to the payment destination and amount
included in a Bitcoin transaction. Each output defines the recipient and the amount of Bitcoin they will receive.

## Structure of Transaction Output Fields

Each transaction output contains the following key fields:

### 1. Value

This is an 8-byte integer representing the amount of Bitcoin in the output, measured in satoshis. One Bitcoin equals
100,000,000 satoshis.

### 2. ScriptPubKey

The locking script is a variable-length field that defines how to unlock and use this output. It is usually the
recipient's public key hash (P2PKH) or other complex scripts.

### Example

Here is an example of a Bitcoin transaction output, represented in JSON format:


```json
"vout": [
  {
    "value": 0.01500000,
    "n": 0,
    "scriptPubKey": {
      "asm": "OP_DUP OP_HASH160 89abcdef... OP_EQUALVERIFY OP_CHECKSIG",
      "hex": "76a91489abcdef...",
      "reqSigs": 1,
      "type": "pubkeyhash",
      "addresses": [
        "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
      ]
    }
  }
]
```

In this example:

- **value** indicates the amount of Bitcoin the recipient will receive.
- **scriptPubKey** contains details of the locking script.
- **n** is the index position of the output.
- **reqSigs** indicates the minimum number of signatures required to unlock this output.
- **type** specifies the type of locking script (e.g., P2PKH).
- **addresses** is the Bitcoin address of the recipient.

## Functions of Transaction Outputs

### 1. Specify Recipients

Transaction outputs define the recipients of Bitcoin, ensuring that Bitcoin is correctly transferred to the intended
destination addresses.

### 2. Locking and Unlocking Mechanism

Through locking scripts, transaction outputs can set complex conditions to control the use of Bitcoin. Only by meeting
these conditions can the Bitcoin be unlocked and used.

### 3. Multi-Signature Support

Transaction outputs can support multi-signatures, specifying the number of signatures required to unlock Bitcoin through
the `reqSigs` field, enhancing the security of transactions.

## Types of Transaction Outputs

### 1. Pay-to-PubKeyHash (P2PKH)

The most common output type, where the locking script contains the recipient's public key hash. Unlocking requires
providing the corresponding public key and signature.

### 2. Pay-to-Script-Hash (P2SH)

The output is locked to a script corresponding to a hash value. Unlocking requires providing the script that generates
this hash value along with the necessary inputs.

### 3. Multi-Signature Output

Requires multiple signatures to unlock Bitcoin, typically used for transactions that need joint approval from multiple
parties.

## Summary

Transaction outputs are a key component of Bitcoin transactions, defining the recipients and amounts of Bitcoin. Through
locking scripts, transaction outputs ensure that Bitcoin can only be used by legitimate recipients. Understanding the
structure and function of transaction outputs helps to gain a deeper understanding of the working principles and
security mechanisms of Bitcoin transactions.
