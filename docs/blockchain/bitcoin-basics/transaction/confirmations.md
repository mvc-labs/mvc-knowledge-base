---
sidebar_position: 8
---

# Confirmations

Introduction to the concept of Bitcoin transaction confirmations and their importance.

## What Are Transaction Confirmations

Transaction confirmations refer to the number of blocks that have been added to the blockchain after a Bitcoin
transaction has been included in a block. Each time a new block is added, the confirmation count increases by one.
Confirmations measure the degree to which a transaction is recognized and immutable on the blockchain.

## The Role of Transaction Confirmations

### 1. Enhancing Transaction Security

The more confirmations a transaction has, the less likely it is to be tampered with. Typically, six confirmations are
considered secure, meaning the transaction is nearly irreversible.

### 2. Validating Transaction Validity

Confirmations provide a trust level for the validity of a transaction. Transactions with fewer confirmations may be
reversed, so merchants and users usually wait for a certain number of confirmations to ensure the reliability of the
transaction.

### 3. Preventing Double-Spending Attacks

By waiting for multiple confirmations, double-spending attacks, where the same Bitcoin is used more than once, can be
effectively prevented.

## How to Check Transaction Confirmations

Using the Bitcoin Core client's command-line interface (CLI), you can check the number of transaction confirmations.

```bash
mvc-cli gettransaction <txid>
```

The returned result includes a "confirmations" field, indicating the number of confirmations for the transaction.

## Summary

Transaction confirmations are a crucial measure of the recognition and immutability of Bitcoin transactions.
Understanding the role of confirmations and how to check them helps ensure the security and reliability of transactions.
