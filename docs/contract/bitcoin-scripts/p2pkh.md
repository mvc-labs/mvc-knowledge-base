---
sidebar_position: 4
---

# P2PKH

Introduction to P2PKH Output.

## What is P2PKH Output?

P2PKH (Pay-to-PubKeyHash) is the most common type of transaction output in the Bitcoin network. It provides better
privacy and security compared to the earlier P2PK (Pay-to-PubKey) output. P2PKH allows Bitcoin to be paid to a public
key hash rather than directly to a public key, thereby protecting the recipient's privacy to some extent.

## Structure of P2PKH Output

The script for a P2PKH output is called the locking script (scriptPubKey), and its typical structure is as follows:

```
OP_DUP OP_HASH160 <public key hash> OP_EQUALVERIFY OP_CHECKSIG
```

To understand this script, let's break down its components:

1. **OP_DUP**: Duplicates the top stack item.
2. **OP_HASH160**: Performs RIPEMD-160 hashing on the top stack item (after SHA-256 hashing).
3. **\<public key hash>**: The recipient's public key hash.
4. **OP_EQUALVERIFY**: Verifies that the two top stack items are equal; if not, the script fails.
5. **OP_CHECKSIG**: Checks if the signature is valid.

In a P2PKH transaction, the sender's unlocking script (scriptSig) needs to provide:

1. Signature: Proves the sender's authorization of the transaction.
2. Public Key: Matches the public key hash in the locking script.

## Characteristics of P2PKH Output

1. **Enhanced Privacy**: P2PKH outputs include only the hash of the public key, not the public key itself. This makes
   tracking the recipient's public key more difficult, thus enhancing privacy.
2. **Improved Security**: Transactions that directly include public keys are more susceptible to potential quantum
   computing attacks. P2PKH outputs provide an additional layer of security by using the public key hash. Cracking a
   hash is harder than cracking a public key for a quantum computer.
3. **Widespread Use**: P2PKH outputs are the most common type of output in Bitcoin transactions, widely used in various
   transaction scenarios.
4. **Support for Lightweight Clients**: P2PKH outputs enable lightweight clients (such as SPV wallets) to verify
   transactions more efficiently, as these clients only need to check the public key hash instead of processing the full
   public key.

## Use Cases for P2PKH Output

P2PKH outputs are widely used in the Bitcoin network, covering almost all everyday transactions for regular users. Here
are some typical use cases:

1. **Personal Wallet Transactions**: Most Bitcoin wallets default to using P2PKH outputs to receive Bitcoin.
2. **Merchant Payments**: Many online merchants and service providers use P2PKH addresses to receive payments from
   customers.
3. **Exchange Transfers**: When users deposit and withdraw Bitcoin on exchanges, they typically use P2PKH outputs.

## Example of a P2PKH Transaction

Here is a simplified example of a P2PKH transaction:

- Locking Script (scriptPubKey):
  ```
  OP_DUP OP_HASH160 <public key hash> OP_EQUALVERIFY OP_CHECKSIG
  ```

- Unlocking Script (scriptSig):
  ```
  <signature> <public key>
  ```

When the recipient wants to spend this Bitcoin, they need to provide the unlocking script, which includes a valid
signature and the public key that matches the public key hash. The verification process is as follows:

1. `OP_DUP`: Duplicates the public key in the unlocking script.
2. `OP_HASH160`: Hashes the public key to generate the public key hash.
3. `OP_EQUALVERIFY`: Verifies that the calculated public key hash matches the one in the locking script.
4. `OP_CHECKSIG`: Uses the provided public key to verify the signature's validity.

## Conclusion

As the most common type of transaction output in the Bitcoin network, P2PKH outputs provide enhanced privacy and
security. Their structure makes Bitcoin payments more secure and private, suitable for various transaction scenarios.
From personal wallets to merchant payments, P2PKH outputs play a crucial role in the Bitcoin ecosystem, driving the
widespread adoption and usage of Bitcoin. Understanding P2PKH outputs is essential for comprehending Bitcoin transaction
mechanisms and improving Bitcoin usage security.
