---
sidebar_position: 3
---

# Public Key Hash

Introduction to public key hash and its relationship with addresses.

## Introduction to Public Key Hash

As the name implies, a public key hash is the [hash value](../../../mining/concepts/hash-algorithm.md) of a public key. In Bitcoin, a public key hash is a commonly used way to represent addresses for receiving Bitcoin.

Hashing the public key serves two purposes: fixing the length of the public key and protecting its security. A public key hash is a fixed-length string, usually 160 bits, and can be represented in various formats, such as Base58 encoding or Base64 encoding.

The public key hash is the core part of a Bitcoin address. It is a short and secure representation generated through multiple hashing operations. The public key hash avoids exposing the public key directly, enhancing security and privacy. A Bitcoin address is essentially a public key hash processed through additional encoding steps.

## Hash160

The process of calculating a public key hash typically involves hashing the public key and then hashing the result again. This calculation method, called Hash160, is a commonly used hashing algorithm in Bitcoin.

### Calculating a Public Key Hash from a Public Key

The process of calculating a public key hash includes the following steps:

1. **Compute SHA-256 Hash**: First, perform a SHA-256 hash on the public key to obtain a 256-bit hash value.
2. **Compute RIPEMD-160 Hash**: Then, perform a RIPEMD-160 hash on the output of the SHA-256 hash to obtain a 160-bit hash value.

This process is called Hash160 because it combines two different hash functions.

### Detailed Explanation of the Hash160 Process

Assume the public key is denoted as \( K \). The specific steps to calculate Hash160 are as follows:

1. **Compute SHA-256 Hash**:
   $$ H_1 = \text{SHA-256}(K) $$

2. **Compute RIPEMD-160 Hash**:
   $$ H_{160} = \text{RIPEMD-160}(H_1) $$

### Formula for the Hash160 Process

Using KaTeX notation:

1. Compute the SHA-256 hash:
   $$ H_1 = \text{SHA-256}(K) $$

2. Compute the RIPEMD-160 hash:
   $$ H_{160} = \text{RIPEMD-160}(H_1) $$

### Example

Assume the public key \( K \) is:
\[ K = 04b0bd634234abbb1ba1e986e8841855dd45b2a4f7cd9b4c8e0ec6ccf97c71548520b2a6d03cfcc92d5a4a3ac2e4ab7c1b3b9d0b4d43fb2314cd2fce6b81f8d2a \]

The steps are as follows:

1. Compute the SHA-256 hash:
   $$ H_1 = \text{SHA-256}\left(04b0bd634234abbb1ba1e986e8841855dd45b2a4f7cd9b4c8e0ec6ccf97c71548520b2a6d03cfcc92d5a4a3ac2e4ab7c1b3b9d0b4d43fb2314cd2fce6b81f8d2a\right) $$
   Suppose the result is:
   $$ H_1 = 0x68c1f88b3a3f3e52c7f9bcb15708fbbb5b4083a12c67d32d25fbb3a1de0b6e8e $$

2. Compute the RIPEMD-160 hash:
   $$ H_{160} = \text{RIPEMD-160}\left(0x68c1f88b3a3f3e52c7f9bcb15708fbbb5b4083a12c67d32d25fbb3a1de0b6e8e\right) $$
   Suppose the result is:
   $$ H_{160} = 0xb2f37a2391e02b1b01a70c8d6c027d0f431cbdc6 $$

This 160-bit hash value \( H_{160} \) is the public key hash.

Through this process, the public key is converted into a shorter hash value, making it easier to store and use while enhancing security.
