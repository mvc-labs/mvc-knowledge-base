---
sidebar_position: 6
---

# MetaContract

介绍MetaContract标准合约。

根据前文的内容，MVC主要解决了Token溯源的问题，让无状态UTXO合约的执行成为可能。而MetaContract就是一系列使用MetaTxid技术的标准合约。

## FT（Fungible Token）合约

FT合约是一种标准的代币合约。与以太坊的全局合约账本状态不同的是，在MVC中，它的合约状态是一个个UTXO，这些FT
UTXO的状态包括代币的代号，创始信息，代币数量，所有权等多个信息。合约需要让有FT所有权的人可以解锁，而没有控制权（私钥）的人无法解锁并转账FT。只要在合约中要求状态转移函数携带所有者的签名，并且签名正确才可以转移所有权。

合约详情解析请参考[FT合约](../../contract/mvc-standard/ft-token.md)。

源码仓库：https://github.com/mvc-labs/token-core

## NFT（Non-Fungible Token）合约

NFT合约是一种标准的非同质化代币合约。NFT合约的合约状态是一个个UTXO，这些NFT
UTXO的状态包括代币的代号，创始信息，代币数量，所有权等多个信息。合约需要让有NFT所有权的人可以解锁，而没有控制权（私钥）的人无法解锁并转账NFT。只要在合约中要求状态转移函数携带所有者的签名，并且签名正确才可以转移所有权。

合约详情解析请参考[NFT合约](../../contract/mvc-standard/nft-token.md)。

源码仓库：https://github.com/mvc-labs/nft-core

## DAO（Decentralized Autonomous Organization）合约

DAO合约是一种标准的去中心化自治组织合约。DAO合约用于MVCDAO的投票和治理，需要质押足够的SPACE代币才可以对提案进行投票。

合约详情解析请参考[DAO合约](../../contract/mvc-standard/dao.md)。

源码仓库：https://github.com/mvc-labs/mvcdao-core

