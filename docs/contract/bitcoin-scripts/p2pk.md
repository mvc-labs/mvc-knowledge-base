---
sidebar_position: 3
---

# P2PK

Introduction to P2PK Output.

## What is P2PK Output?

P2PK (Pay-to-PubKey) is an earlier type of output in the Bitcoin network used to pay directly to a specific public key.
Although it is relatively rare in modern Bitcoin transactions, understanding P2PK is important for grasping Bitcoin
transactions and script systems.

### Structure of P2PK Output

The structure of a P2PK output is relatively simple, directly containing the recipient's public key. A typical P2PK
script is as follows:

```
<public key> OP_CHECKSIG
```

In this script:

- `<public key>`: This is the recipient's public key.
- `OP_CHECKSIG`: This is an opcode used to verify the signature.

To better understand the P2PK output, let's break down its script:

1. `<public key>`: This is a compressed or uncompressed Bitcoin public key.
2. `OP_CHECKSIG`: This is an opcode that takes a signature and a public key from the stack and verifies if the signature
   is valid using the public key.

### Characteristics of P2PK Output

1. **Simplicity**: The P2PK output structure is simple, containing only a public key and an opcode. This simplicity made
   it widely used in early versions of Bitcoin.
2. **Direct Payment to Public Key**: Unlike P2PKH (Pay-to-PubKeyHash) outputs, which use a public key hash to find the
   public key, P2PK outputs use the public key directly. This simplifies the verification process but introduces some
   privacy and security issues.
3. **Privacy Issues**: Since P2PK outputs directly contain the public key, anyone can see the recipient's public key.
   This could lead to privacy issues as the public key can be linked to the user's other transactions or identity
   through certain techniques.
4. **Security Issues**: Assuming the threat of quantum computers to public key cryptography, directly exposing the
   public key might reduce security since quantum computers could potentially derive the private key from the public
   key.

### Use Cases for P2PK Output

Although P2PK outputs are uncommon in modern Bitcoin transactions, they played a significant role in Bitcoin's early
development. Here are some possible use cases:

1. **Miner Rewards**: The Bitcoin genesis block and some early blocks used P2PK outputs for miner rewards.
2. **Simple Peer-to-Peer Payments**: In Bitcoin's early days, users might have used P2PK outputs for simple peer-to-peer
   payments.

### Modern Alternatives

Due to the privacy and security issues of P2PK outputs, modern Bitcoin transactions more commonly use P2PKH (
Pay-to-PubKeyHash) outputs and P2SH (Pay-to-ScriptHash) outputs.

- **P2PKH**: P2PKH outputs use public key hashes instead of direct public keys, providing some privacy and security
  protection. A typical P2PKH script is as follows:
  ```
  OP_DUP OP_HASH160 <public key hash> OP_EQUALVERIFY OP_CHECKSIG
  ```

- **P2SH**: P2SH outputs allow more complex scripts, supporting multi-signature and other advanced functions. A typical
  P2SH script is as follows:
  ```
  OP_HASH160 <script hash> OP_EQUAL
  ```

### Conclusion

As an early type of transaction output in the Bitcoin network, P2PK outputs, although less common today, provide an
important foundation for understanding Bitcoin transactions and script systems. As the Bitcoin network has evolved, more
complex and secure output types like P2PKH and P2SH have gradually replaced P2PK outputs, but understanding P2PK outputs
is still essential for a comprehensive grasp of Bitcoin technology.
