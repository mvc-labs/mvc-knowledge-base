---
sidebar_position: 4
---

# Address

Introduction to what Bitcoin and MVC addresses are.

## Address Overview

An address is an identifier for the recipient of a UTXO, used to represent the recipient's identity. Addresses come in
various types based on their form. Some addresses are generated through [public key hashes](public-key-hash.md), some
through script hashes, and others through [public keys](public-key.md). Depending on the situation, the method of
calculating an address may vary.

A Bitcoin address is the unique identifier for a user to receive Bitcoin, akin to a bank account number. They usually
consist of a string of letters and numbers, used for receiving and sending Bitcoin transactions. Essentially, Bitcoin
addresses are generated from public keys, ensuring user privacy and security.

## Address Calculation

The process of generating a Bitcoin address is as follows:

1. **Generate a Private Key**: Use an encryption algorithm (such as elliptic curve encryption) to generate a random
   private key.
2. **Generate a Public Key**: Use the Elliptic Curve Digital Signature Algorithm (ECDSA) to generate a public key from
   the private key.
3. **Calculate the Address**:
    - The public key is hashed using SHA-256 and RIPEMD-160 to obtain the public key hash (Public Key Hash).
    - The public key hash is prefixed with a version byte (usually `0x00`, indicating a mainnet address) to get a new
      hash value.
    - The new hash value undergoes a double SHA-256 hash, and the first 4 bytes are taken as the checksum.
    - The checksum is appended to the public key hash to get the final Bitcoin address.
4. **Base58 Encoding**: The resulting Bitcoin address is Base58 encoded to generate the final human-readable Bitcoin
   address.

## Address Encoding and Checksum

Bitcoin address encoding uses Base58Check encoding. Base58 is designed to avoid character confusion by removing easily
confused characters (such as 0, O, l, I, etc.). Base58Check encoding consists of two parts:

1. **Base58 Encoding**: Encode the address data using Base58.
2. **Checksum**: Add a 4-byte SHA-256 hash checksum to the end of the address data to ensure its validity.

## Differences Between Mainnet and Testnet Addresses

Bitcoin mainnet and testnet addresses differ in their prefixes:

- **Mainnet Addresses**: Usually start with `1` or `3`, with prefixes `0x00` (P2PKH) or `0x05` (P2SH).
- **Testnet Addresses**: Usually start with `m` or `n`, with prefixes `0x6F` (P2PKH) or `0xC4` (P2SH).

## Main Address Formats

### P2PK (Pay-to-PubKey)

P2PK addresses use the public key directly to receive Bitcoin and are typically not used alone but as a basis for P2PKH.
The P2PK transaction script is:

```
<pubkey> OP_CHECKSIG
```

### P2PKH (Pay-to-PubKeyHash)

P2PKH is the most common address format, generated based on the public key hash. P2PKH addresses usually start with `1`.
The P2PKH transaction script is:

```
OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
```

### P2SH (Pay-to-Script-Hash)

P2SH addresses allow for more complex scripts and conditional payments, generated based on the script hash. P2SH
addresses usually start with `3`. The P2SH transaction script is:

```
OP_HASH160 <scriptHash> OP_EQUAL
```

### P2MS (Pay-to-MultiSig)

P2MS addresses are used for multi-signature payments, requiring multiple private key signatures to unlock Bitcoin. The
P2MS transaction script is:

```
<m> <A_pubKey> <B_pubKey> <C_pubKey> <n> OP_CHECKMULTISIG
```

Where `m` is the minimum number of signatures required, and `n` is the number of public keys.

## Summary

Addresses are a crucial part of the Bitcoin and MVC networks, used to identify transaction recipients. Different types
of addresses suit different use cases, ranging from simple single signatures to complex multi-signature mechanisms.
Understanding the generation, encoding, and verification processes of Bitcoin addresses helps in better comprehending
Bitcoin's security and privacy protection mechanisms.
