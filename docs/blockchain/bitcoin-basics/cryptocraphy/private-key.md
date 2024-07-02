---
sidebar_position: 1
---

# Private Key

Introduction to what a private key is and how it is generated.

## Overview of Public and Private Keys

Bitcoin and MVC use a key system to control ownership, with the most important elements being the private key and public
key.

A [public key](public-key.md) is used to generate addresses and lock UTXOs, representing the recipient's identity.

The private key is used to calculate and generate [signatures](signature.md), proving ownership and unlocking UTXOs.

As shown in the diagram, in simple terms, the public key is used to lock UTXOs, while the private key is used to unlock
UTXOs.

![img.png](/img/bitcoin-keys.png)

Public and private keys have a one-to-one relationship. A private key can calculate the public key, but the public key
cannot be used to deduce the private key. Without the corresponding private key, a valid [signature](signature.md)
cannot be generated, and thus the UTXO cannot be unlocked. However, verifying a signature does not require the use of
the private key; it can be done using only the public key and the signature.

## Structure of a Private Key

A private key is a random number, typically a 256-bit random number, which can be generated in various ways, such as
using a random number generator or hardware random numbers. The most primitive and secure method of generating a private
key is by flipping a coin, with heads counting as 0 and tails as 1. By flipping a coin 256 times, the resulting sequence
of 0s and 1s is the private key.

Private keys are usually encoded in [WIF format](wif.md) (Wallet Import Format) for ease of recording and storage, but
they can also be recorded directly in hexadecimal format.
