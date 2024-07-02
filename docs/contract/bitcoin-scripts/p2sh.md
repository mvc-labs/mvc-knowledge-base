---
sidebar_position: 6
---

# P2SH

## What is P2SH Output?

P2SH (Pay-to-Script-Hash) is a powerful type of transaction output in the Bitcoin network. It allows complex conditions
and scripts to be hidden within a hash, only revealing them when the funds are actually spent. This mechanism greatly
enhances the flexibility and privacy of Bitcoin transactions while simplifying user operations.

## Structure of P2SH Output

The locking script (scriptPubKey) for a P2SH output is similar to that of a P2PKH (Pay-to-PubKeyHash) output, but it
includes a script hash instead of a public key hash. A typical P2SH locking script looks like this:

```
OP_HASH160 <script hash> OP_EQUAL
```

In this script:

- `OP_HASH160`: Performs a RIPEMD-160 hash operation (after an initial SHA-256 hash) on the top stack element.
- `<script hash>`: A 20-byte hash representing the locking script.
- `OP_EQUAL`: Checks if the hash on the top of the stack equals the provided script hash.

## Characteristics of P2SH Transactions

1. **Flexibility**: P2SH outputs allow the use of complex scripts and conditions without needing to reveal them at the
   time of transaction creation. The full unlocking script is only provided when the funds are spent.
2. **Privacy**: Since the locking script is hidden in a hash, P2SH outputs enhance transaction privacy. Observers cannot
   directly see the specific conditions and scripts from the transaction output.
3. **Simple Address Format**: P2SH addresses start with "3", distinguishing them from other Bitcoin address types. Users
   only need to provide the P2SH address without understanding the underlying complex scripts.

## Use Cases for P2SH Transactions

P2SH outputs are very useful in transactions requiring complex conditions. Here are some typical use cases:

1. **Multisignature**: P2SH outputs can be used for multisignature accounts, where funds can only be spent if a certain
   number of signers provide their signatures, simplifying multisignature management.
2. **Timelocks**: P2SH outputs can include timelock conditions, preventing funds from being spent until a specific time.
3. **Conditional Payments**: P2SH outputs can set complex conditional payments, such as smart contracts and
   decentralized applications (DApps).

## Example of a P2SH Transaction

Here is a simplified example of a P2SH transaction:

1. **Locking Script (scriptPubKey)**:
   ```
   OP_HASH160 <script hash> OP_EQUAL
   ```

2. **Unlocking Script (scriptSig)**:
   ```
   <unlocking data> <locking script>
   ```

In this example, the locking script contains a script hash. When spending the funds, the unlocking script must provide
the unlocking data and the original locking script that matches the hash.

## Example of a Multisignature P2SH Transaction

Assume we have a 2-of-3 multisignature P2SH transaction:

1. **Locking Script (scriptPubKey)**:
   ```
   OP_HASH160 <multisig script hash> OP_EQUAL
   ```

2. **Multisignature Script**:
   ```
   2 <public key 1> <public key 2> <public key 3> 3 OP_CHECKMULTISIG
   ```

3. **Unlocking Script (scriptSig)**:
   ```
   OP_0 <signature 1> <signature 2> <multisig script>
   ```

In this multisignature transaction, the locking script only contains the hash of the multisignature script. To spend the
funds, the unlocking script must provide two signatures and the original multisignature script.

## Conclusion

P2SH output is a flexible and powerful Bitcoin transaction output type that allows for complex conditions and scripts
while enhancing privacy and security. By hiding complex scripts within a hash, P2SH outputs simplify user operations and
support various advanced use cases, such as multisignature and timelocks. Understanding P2SH outputs is crucial for
comprehensively mastering Bitcoin's script system and transaction mechanisms.
