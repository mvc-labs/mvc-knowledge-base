---
sidebar_position: 6
---

# MetaContract

Introduction to MetaContract standard contracts.

According to previous content, MVC primarily solves the Token tracing issue, making the execution of stateless UTXO
contracts possible. MetaContract represents a series of standard contracts that use MetaTxid technology.

## FT (Fungible Token) Contract

The FT contract is a standard token contract. Unlike Ethereum's global contract ledger state, in MVC, its contract state
is composed of individual UTXOs. These FT UTXOs' states include multiple pieces of information such as token code,
creation information, token quantity, ownership, and more. The contract needs to allow those with FT ownership to unlock
it, while those without control (private key) cannot unlock and transfer FT. The state transition function in the
contract must carry the owner's signature, and only with a correct signature can ownership be transferred.

For detailed contract analysis, refer to [FT Contract](../../contract/mvc-standard/ft-token.md).

Source repository: [https://github.com/mvc-labs/token-core](https://github.com/mvc-labs/token-core)

## NFT (Non-Fungible Token) Contract

The NFT contract is a standard non-fungible token contract. The contract state of an NFT contract is composed of
individual UTXOs. These NFT UTXOs' states include multiple pieces of information such as token code, creation
information, token quantity, ownership, and more. The contract needs to allow those with NFT ownership to unlock it,
while those without control (private key) cannot unlock and transfer NFT. The state transition function in the contract
must carry the owner's signature, and only with a correct signature can ownership be transferred.

For detailed contract analysis, refer to [NFT Contract](../../contract/mvc-standard/nft-token.md).

Source repository: [https://github.com/mvc-labs/nft-core](https://github.com/mvc-labs/nft-core)

## DAO (Decentralized Autonomous Organization) Contract

The DAO contract is a standard decentralized autonomous organization contract. The DAO contract is used for MVCDAO
voting and governance, requiring the staking of sufficient SPACE tokens to vote on proposals.

For detailed contract analysis, refer to [DAO Contract](../../contract/mvc-standard/dao.md).

Source repository: [https://github.com/mvc-labs/mvcdao-core](https://github.com/mvc-labs/mvcdao-core)
