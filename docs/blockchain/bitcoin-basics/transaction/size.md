---
sidebar_position: 6
---

# Transaction Size

An introduction to calculating the size of a transaction, which is used to determine the transaction fee.

Transaction size is usually measured in bytes and is determined by calculating the size of the transaction's inputs,
outputs, and other fields.

## Components of Transaction Size

A Bitcoin transaction consists of the following parts:

### 1. Version Number

- Size: 4 bytes
- Purpose: Indicates the transaction format and protocol version.

### 2. Input Counter

- Size: 1-9 bytes (variable-length integer)
- Purpose: Indicates the number of inputs included in the transaction.

### 3. Inputs

Each input consists of the following fields:

- **Previous Transaction Hash**: 32 bytes
- **Previous Output Index**: 4 bytes
- **Unlocking Script Length** (scriptSig length): 1-9 bytes (variable-length integer)
- **Unlocking Script** (scriptSig): Typically 107 bytes (usual size of a signature and public key)
- **Sequence Number**: 4 bytes

### 4. Output Counter

- Size: 1-9 bytes (variable-length integer)
- Purpose: Indicates the number of outputs included in the transaction.

### 5. Outputs

Each output consists of the following fields:

- **Value**: 8 bytes
- **Locking Script Length** (scriptPubKey length): 1-9 bytes (variable-length integer)
- **Locking Script** (scriptPubKey): Typically 25 bytes (usual size for P2PKH)

### 6. Lock Time

- Size: 4 bytes
- Purpose: Specifies the time or block height when the transaction can be added to the blockchain.

## Steps to Calculate Transaction Size

### 1. Calculate the Size of Fixed Fields

- Version Number: 4 bytes
- Lock Time: 4 bytes

### 2. Calculate the Size of Input and Output Counters

Assuming we have `n` inputs and `m` outputs, the size of the input and output counters depends on the values of `n`
and `m`, typically 1 byte each.

### 3. Calculate the Size of All Inputs

Each input size is:

```plaintext
Previous Transaction Hash (32 bytes) + Previous Output Index (4 bytes) + Unlocking Script Length (1-9 bytes) + Unlocking Script (approximately 107 bytes) + Sequence Number (4 bytes)
```

### 4. Calculate the Size of All Outputs

Each output size is:

```plaintext
Value (8 bytes) + Locking Script Length (1-9 bytes) + Locking Script (approximately 25 bytes)
```

### 5. Calculate Total Transaction Size

Add the sizes of the above components to get the total transaction size.

## Example

Assume a transaction with 2 inputs and 2 outputs:

- Version Number: 4 bytes
- Input Counter: 1 byte
- Each Input: 148 bytes
- Output Counter: 1 byte
- Each Output: 34 bytes
- Lock Time: 4 bytes

Calculation:

```plaintext
Total Size = 4 (Version Number) + 1 (Input Counter) + 2 * 148 (Inputs) + 1 (Output Counter) + 2 * 34 (Outputs) + 4 (Lock Time)
Total Size = 4 + 1 + 296 + 1 + 68 + 4 = 374 bytes
```

By following these steps, you can accurately calculate the size of a Bitcoin transaction. This is crucial for setting
appropriate fees and ensuring the transaction is confirmed quickly.
