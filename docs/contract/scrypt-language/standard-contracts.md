---
sidebar_position: 5
---

# Standard Contracts

# Standard Contracts

This document introduces standard contracts and libraries in the sCrypt language.

Contracts can call each other. You can create an object of another contract within a contract, requiring the other
contract to be unlocked before the current contract can be unlocked.

For example, in a P2PKH contract, you can require the unlocking conditions of P2PKH to simultaneously satisfy the
conditions of HashPuzzle and P2PK contracts. The final form on the blockchain is a large UTXO contract that encapsulates
several smaller contract codes, all of which must be unlocked to unlock the main contract.

## Import

Different contracts or libraries can be encapsulated in different files and then imported using the `import` statement.

## Library

A library is a special type of contract that can only be called by other contracts and cannot contain any public
methods. It is mainly used to organize related parameters and static methods.

Some standard contracts provided by the official documentation handle common scenarios and can be used without
importing.

https://scryptdoc.readthedocs.io/en/latest/contracts.html#full-list

| Contract         | Constructor Parameters | Public Function                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|------------------|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Utils            | None                   | `toLEUnsigned(int n, int l) : bytes`<br/>`fromLEUnsigned(bytes b) : int`<br/>`readVarint(bytes b) : bytes`<br/>`writeVarint(bytes b) : bytes`<br/>`buildOutput(bytes outputScript, int outputSatoshis) : bytes`<br/>`buildPublicKeyHashScript(PubKeyHash pubKeyHash) : bytes`<br/>`buildOpreturnScript(bytes data) : bytes`<br/>`isFirstCall(SigHashPreimage preimage) : bool`                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Tx               | None                   | `checkPreimage(SigHashPreimage preimage) : bool`<br/>`checkPreimageOpt(SigHashPreimage rawTx) : bool`<br/>`checkPreimageOpt_(SigHashPreimage rawTx) : bool`<br/>`checkPreimageSigHashType(SigHashPreimage txPreimage, SigHashType sigHashType) : bool`<br/>`checkPreimageAdvanced(SigHashPreimage rawTx, PrivKey privKey, PubKey pubKey, int inverseK, int r, bytes rBigEndian, SigHashType sigHashType) : bool`<br/>`checkPreimageOCS(SigHashPreimage preimage) : bool`<br/>`checkPreimageOptOCS(SigHashPreimage rawTx) : bool`<br/>`checkPreimageOptOCS_(SigHashPreimage rawTx) : bool`<br/>`checkPreimageSigHashTypeOCS(SigHashPreimage txPreimage, SigHashType sigHashType) : bool`<br/>`checkPreimageAdvancedOCS(SigHashPreimage rawTx, PrivKey privKey, PubKey pubKey, int inverseK, int r, bytes rBigEndian, SigHashType sigHashType) : bool` |
| SigHash          | None                   | `nVersion(SigHashPreimage preimage) : bytes`<br/>`hashPrevouts(SigHashPreimage preimage) : bytes`<br/>`hashSequence(SigHashPreimage preimage) : bytes`<br/>`outpoint(SigHashPreimage preimage) : bytes`<br/>`scriptCode(SigHashPreimage preimage) : bytes`<br/>`valueRaw(SigHashPreimage preimage) : bytes`<br/>`value(SigHashPreimage preimage) : int`<br/>`nSequenceRaw(SigHashPreimage preimage) : bytes`<br/>`nSequence(SigHashPreimage preimage) : int`<br/>`hashOutputs(SigHashPreimage preimage) : bytes`<br/>`nLocktimeRaw(SigHashPreimage preimage) : bytes`<br/>`nLocktime(SigHashPreimage preimage) : int`<br/>`sigHashType(SigHashPreimage preimage) : SigHashType`                                                                                                                                                                      |
| HashedMap\<K, V> | bytes data             | `set(SortedItem\<K> keyWithIdx, V val) : bool`<br/>`canGet(SortedItem\<K> keyWithIdx, V val) : bool`<br/>`delete(SortedItem\<K> keyWithIdx) : bool`<br/>`has(SortedItem\<K> keyWithIdx) : bool`<br/>`clear() : bool`<br/>`size() : int`<br/>`data() : bytes`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| HashedSet\<V>    | bytes data             | `add(SortedItem<\V> entryWithIdx) : bool`<br/>`delete(SortedItem<\V> entryWithIdx) : bool`<br/>`has(SortedItem<\V> entryWithIdx) : bool`<br/>`clear() : bool`<br/>`size() : int`<br/>`data() : bytes`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

## Utils

Utils are some commonly used utility classes and methods. The list of methods is as follows:

![img.png](/img/scrypt-utils.png)

## Tx

The Tx library contains essential content for reading the current transaction information. This is the core
functionality for implementing stateful contracts and constraining subsequent contracts.

The core principle is to use a pseudo-operation OP_PUSH_TX to push the preimage of the current transaction to the
contract runtime for verification. The preimage, as part of the unlocking parameters, allows the contract to perceive
the characteristics of the transaction unlocking itself and to constrain the transaction based on these
characteristics (https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md).

Note that the transaction preimage requires the SIGHASH_FORKID signature type to be effective. Always verify the
signature type SIG_HASH_ALL before verifying the preimage.

The transaction preimage includes the following information:

1. nVersion of the transaction (4-byte little endian)
2. hashPrevouts (32-byte hash)
3. hashSequence (32-byte hash)
4. outpoint (32-byte hash + 4-byte little endian)
5. scriptCode of the input (serialized as scripts inside CTxOuts)
6. value of the output spent by this input (8-byte little endian)
7. nSequence of the input (4-byte little endian)
8. hashOutputs (32-byte hash)
9. nLocktime of the transaction (4-byte little endian)
10. sighash type of the signature (4-byte little endian)

Key preimage checks include:

- checkPreimage(): Original pushTx
- checkPreimageAdvanced(): Advanced version with additional optional parameters
- checkPreimageOCS(): Signature verification with OCS opcodes, verifying only up to the point before checkPreimageOCS,
  allowing partial preimage usage for signature, reducing script size.

## SigHash

The SigHash library is primarily used to access data in the preimage, such as using `SigHash.scriptCode` to get
the `scriptCode` field and `SigHash.value` to get the `value` field.

The transaction preimage includes the following
information (https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md):

1. nVersion of the transaction (4-byte little endian) (version of the SPENDING TX)
2. hashPrevouts (32-byte hash) (hash of all input outpoints of the SPENDING TX)
3. hashSequence (32-byte hash) (hash of all input nSequence of the SPENDING TX)
4. outpoint (32-byte hash + 4-byte little endian) (outpoint corresponding to the current input of the SPENDING TX)
5. scriptCode of the input (serialized as scripts inside CTxOuts) (UTXO script corresponding to the spent TX point)
6. value of the output spent by this input (8-byte little endian) (amount corresponding to the spent TX point)
7. nSequence of the input (4-byte little endian) (sequence corresponding to the spent TX point)
8. hashOutputs (32-byte hash) (hash of all output scripts and amounts of the SPENDING TX, core to restricting the format
   of subsequent transactions)
9. nLocktime of the transaction (4-byte little endian) (nLockTime of the SPENDING TX)
10. sighash type of the signature (4-byte little endian) (SIGHASH type)

## HashedMap

The HashedMap provides map-like functionality, requiring both a key and an index for most functions. Essentially, the
key in this map is an aggregated type containing both the key itself and the index used for sorting, referred to as
SortedItem\<T>.

## HashedSet

The HashedSet provides set-like functionality, similar to HashedMap, also requiring the SortedItem aggregate as the key.

## Constants

Provides some commonly used business constants.

```cpp
// number of bytes to denote input sequence
static const int InputSeqLen = 4;
// number of bytes to denote output value
static const int OutputValueLen = 8;
// number of bytes to denote a public key (compressed)
static const int PubKeyLen = 33;
// number of bytes to denote a public key hash
static const int PubKeyHashLen = 20;
// number of bytes to denote a tx id
static const int TxId

Len = 32;
// number of bytes to denote an outpoint
static const int OutpointLen = 36;
```
