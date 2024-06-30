---
sidebar_position: 5
---

# 标准合约

本文档介绍了sCrypt语言的标准合约以及工具库。

合约之间可以互相调用，可以在一个合约中new出一个其他合约的对象，要求其他合约被解锁之后，当前合约才可以被解锁。

比如在P2PKH的合约中，可以要求P2PKH的解锁条件中同时满足HashPuzzle和P2PK两个合约。最终表现在链上的形态是一个大Utxo合约中封装了好几个小的合约代码，要求小合约代码全部被解锁才可以解锁大合约。

## Import

可以将不同的合约或者library封装在不同的文件中，然后使用import语句来导入合约。

## Library

library是一种特殊的合约，它只能被其他合约所调用，不能包含任何public方法。主要用来整理相关的参数和静态方法。

官方提供了一些标准合约，用来处理一些常见的场景，这些标准合约不需要被import就可以使用。

https://scryptdoc.readthedocs.io/en/latest/contracts.html#full-list

| Contract         | Constructor Parameters | Public Function                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|------------------|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Utils            | None                   | `toLEUnsigned(int n, int l) : bytes`<br/>`fromLEUnsigned(bytes b) : int`<br/>`readVarint(bytes b) : bytes`<br/>`writeVarint(bytes b) : bytes`<br/>`buildOutput(bytes outputScript, int outputSatoshis) : bytes`<br/>`buildPublicKeyHashScript(PubKeyHash pubKeyHash) : bytes`<br/>`buildOpreturnScript(bytes data) : bytes`<br/>`isFirstCall(SigHashPreimage preimage) : bool`                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Tx               | None                   | `checkPreimage(SigHashPreimage preimage) : bool`<br/>`checkPreimageOpt(SigHashPreimage rawTx) : bool`<br/>`checkPreimageOpt_(SigHashPreimage rawTx) : bool`<br/>`checkPreimageSigHashType(SigHashPreimage txPreimage, SigHashType sigHashType) : bool`<br/>`checkPreimageAdvanced(SigHashPreimage rawTx, PrivKey privKey, PubKey pubKey, int inverseK, int r, bytes rBigEndian, SigHashType sigHashType) : bool`<br/>`checkPreimageOCS(SigHashPreimage preimage) : bool`<br/>`checkPreimageOptOCS(SigHashPreimage rawTx) : bool`<br/>`checkPreimageOptOCS_(SigHashPreimage rawTx) : bool`<br/>`checkPreimageSigHashTypeOCS(SigHashPreimage txPreimage, SigHashType sigHashType) : bool`<br/>`checkPreimageAdvancedOCS(SigHashPreimage rawTx, PrivKey privKey, PubKey pubKey, int inverseK, int r, bytes rBigEndian, SigHashType sigHashType) : bool` |
| SigHash          | None                   | `nVersion(SigHashPreimage preimage) : bytes`<br/>`hashPrevouts(SigHashPreimage preimage) : bytes`<br/>`hashSequence(SigHashPreimage preimage) : bytes`<br/>`outpoint(SigHashPreimage preimage) : bytes`<br/>`scriptCode(SigHashPreimage preimage) : bytes`<br/>`valueRaw(SigHashPreimage preimage) : bytes`<br/>`value(SigHashPreimage preimage) : int`<br/>`nSequenceRaw(SigHashPreimage preimage) : bytes`<br/>`nSequence(SigHashPreimage preimage) : int`<br/>`hashOutputs(SigHashPreimage preimage) : bytes`<br/>`nLocktimeRaw(SigHashPreimage preimage) : bytes`<br/>`nLocktime(SigHashPreimage preimage) : int`<br/>`sigHashType(SigHashPreimage preimage) : SigHashType`                                                                                                                                                                      |
| HashedMap\<K, V> | bytes data             | `set(SortedItem\<K> keyWithIdx, V val) : bool`<br/>`canGet(SortedItem\<K> keyWithIdx, V val) : bool`<br/>`delete(SortedItem\<K> keyWithIdx) : bool`<br/>`has(SortedItem\<K> keyWithIdx) : bool`<br/>`clear() : bool`<br/>`size() : int`<br/>`data() : bytes`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| HashedSet\<V>    | bytes data             | `add(SortedItem<\V> entryWithIdx) : bool`<br/>`delete(SortedItem<\V> entryWithIdx) : bool`<br/>`has(SortedItem<\V> entryWithIdx) : bool`<br/>`clear() : bool`<br/>`size() : int`<br/>`data() : bytes`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

## Utils

Util 是一些常用的工具类和方法，包含的方法列表如下：

![img.png](/img/scrypt-utils.png)

## Tx

Tx library 包含读取当前交易信息的重要内容。这是实现有状态合约和约束后续合约的核心功能。

核心原理是使用一个伪操作吗OP_PUSH_TX，将当前交易的原像（preImage）推送到合约运行时中进行校验。preImage作为解锁参数的一部分，可以让合约感知到解锁自己的交易所具备的特点，针对这些特点来对交易能否解锁进行约束。（https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md）

注意，交易原像需要SIGHASH_FORKID的签名类型才可以生效，校验原像之前一定要校验签名类型SIG_HASH_ALL

交易原像包括以下信息：

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

校验原像主要包括

- checkPreimage() 原版pushTx
- checkPreImageAdvanced() 高级版，增加更多可选参数
- checkPreImageOCS() 增加了OCS操作码的签名校验，不需要校验所有原像，只需要校验到checkPreimageOCS之前的一段即可，也就是签名使用部分原像的时候可以使用这个操作码，降低脚本体积。

## SigHash

SigHash库主要用来访问原像中的数据，比如Sighash.scriptCode来获取scriptCode字段，使用SigHash.value 来获取value字段等。

交易原像包括以下信息（https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md）：

1. nVersion of the transaction (4-byte little endian) （SPENDING TX的版本）
2. hashPrevouts (32-byte hash) （SPENDING TX所有input outpoint的hash）
3. hashSequence (32-byte hash) （SPENDING TX所有input的nSequence的hash）
4. outpoint (32-byte hash + 4-byte little endian) （SPENDING TX当前input对应的outpoint）
5. scriptCode of the input (serialized as scripts inside CTxOuts) （SPENT TX点位对应的UTXO脚本）
6. value of the output spent by this input (8-byte little endian) （SPENT TX点位对应的金额）
7. nSequence of the input (4-byte little endian) （SPENT TX点位对应的sequence）
8. hashOutputs (32-byte hash) （SPENDING TX当前所有output脚本和金额的hash，这是限制后续交易格式的核心）
9. nLocktime of the transaction (4-byte little endian) （SPENDING TX的nLockTime）
10. sighash type of the signature (4-byte little endian) （SIGHASH类型）

## HashedMap

hashMap
提供一种类似于map的功能，大部分的功能不仅需要key，也需要index。可以简单认为，这种map中的key是一个聚合类型，包含key本身和用来排序的index。称为SortedItem\<T>

## HashedSet

提供类似set的功能，和hashmap类似，也需要SortedItem整体作为key

## Constants

提供一些常用业务常量。

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
static const int TxIdLen = 32;
// number of bytes to denote a outpoint
static const int OutpointLen = 36;
```
