---
sidebar_position: 5
---
# MetaTxid and Pure Layer 1

## State Expansion Issue

In our discussion on [BVM and UTXO smart contracts](mvc-bvm-utxo.md), we detailed the fundamental characteristics of MVC smart contracts. One notable aspect is that certain contract states require traceability, meaning the state must be verified back to the genesis state, which could potentially lead to unlimited state expansion.

Let's consider a practical example:

FT, or Fungible Token contracts, are standard token contracts. Unlike Ethereum's global contract ledger state, in MVC, the contract state consists of individual UTXOs. The state of these FT UTXOs includes the token's denomination, origin information, quantity, ownership, and more. The contract must allow people who have ownership of FT to unlock it, while those without control (private keys) cannot unlock and transfer FT. Solving the control issue is straightforward: the contract requires the state transition function to carry the owner's signature, and the ownership can only be transferred if the signature is correct.

However, another issue that cannot be resolved merely through ownership verification is the problem of token authenticity. Since UTXOs are stateless, they cannot perceive information beyond themselves unless external information is passed as a parameter. Additionally, since both the UTXO function's code and state data are publicly available on the chain, anyone can forge a UTXO identical to the original. This UTXO would have correct status and code, but it would not be a genuine FT UTXO. Allowing such behavior would mean that FT could be issued excessively, causing significant losses to both issuers and holders.

In theory, this problem can be addressed in UTXO contracts. When writing the FT contract, we mandatorily require the inclusion of all ancestral transaction information of the current FT in the parameters (whether through recursive or loop methods), and then verify the legality of each ancestor transaction, tracing back to the founding transaction. Only transactions that can completely form a traceability evidence chain are considered legitimate. The aforementioned forged transaction would definitely fail to construct such a traceability evidence chain.

As we can see, as the FT contract changes hands or the number of transactions accumulates, the data volume of the evidence chain for verifying ancestral information grows, requiring increasingly large amounts of data to unlock states. This process can lead to unlimited state expansion, a serious problem in UTXO contracts, significantly impacting the token's usability.

![State Expansion](/img/russian-nesting-dolls.png)

In some competing blockchain solutions, the correctness of tokens is generally addressed in two ways. One is through indexer consensus, which involves establishing an additional layer of indexer mechanisms on top of the Layer 1 UTXO state. The indexer is responsible for verifying the legality of the UTXOs, making it a Layer 2 solution. The main drawback of Layer 2 solutions is their inability to guarantee consistency with the main chain. For example, BRC20 tokens dependent on an indexer might accidentally be spent as ordinary satoshis. Furthermore, contracts that are unlockable on Layer 1 may not be considered legal on the indexer layer, meaning the consensus is not solely maintained by Layer 1 but jointly with the indexer, significantly increasing the potential for bugs and issues. Another method involves using oracles, which rely on external, trustworthy data sources to ensure the correctness of tokens. However, the problem with oracles is their dependence on external data sources; if these sources encounter issues, the correctness of the tokens can be compromised due to potential malicious actions by the oracle.

MVC employs a technology called MetaTxid, which allows for traceability in pure Layer 1 contracts without causing transaction bloat. This technology does not rely on external indexers or oracles to maintain state correctness. Instead, it solely depends on the UTXO itself and a subset of prior transactions to ascertain the legality of a token. This means that all information necessary to verify the legality of the token is contained within the contract itself, eliminating the need for external blockchain state assistance (a key characteristic of Layer 1). This approach enhances the integrity and autonomy of the blockchain, reducing dependency on potentially unreliable external systems and aligning with the decentralized ethos of blockchain technology.

## MetaTxid Technology Overview

Here is a brief introduction to the traceability implementation method of MetaTxid. For detailed technical specifics and security analysis, please refer to the [MetaTxid](/docs/blockchain/mvc-improvements/meta-txid)。

Before diving into MetaTxid, let's introduce a fundamental concept: mathematical induction. This is a method of mathematical proof which essentially starts by proving that a statement holds when n=1. It then assumes the statement holds for n=k and proceeds to prove that it also holds for n=k+1. Thus, if the statement is valid at n=1 and each successive step, it's proved to hold for all n. MetaTxid's implementation is inspired by the principle of mathematical induction.

To prove that a UTXO at n=k+1 is legitimate (where legitimacy entails satisfying the constraints, state transition functions, and ensuring there's no unauthorized tampering, verifiable through script hashes—details will be explained later), consider the following:

At n=1, the token originates from a genesis transaction, which inherently does not require proof.
Assuming n=k is legitimate, given the presence of "descendant constraints" (as defined in the stateful contract documentation), we can invariably prove n=k+1 is also legitimate. Mathematical induction assures that with a legitimate genesis transaction and valid descendant constraints, all transitions in the UTXO chain are legitimate.
When applying this method to assess the legality of the k+1 UTXO, you need not verify the entire chain, only key aspects:

The legitimacy of the genesis transaction (the token will carry information about its genesis transaction).
The legitimacy of n=k (the preceding UTXO). This includes verifying the legality of the code and confirming that k is part of the UTXO evidence chain (by checking that the inputs for k point to the same chain).
The legality of descendant constraints (script code hash).
If a UTXO is forged, it will fail to meet all three conditions simultaneously. These conditions can be integrated as unlocking criteria in the UTXO’s state transition function, thereby enabling traceability.

The role of MetaTxid, in essence, is to refine and simplify the steps involved in proving the legitimacy of preceding transactions. It enables proving condition 2 without causing transaction size bloat, thus realizing true Layer 1 status and traceability functionalities.

## Advantages of Pure Layer 1 Contracts

Compared to oracle and indexer-based Layer 2 solutions, the advantages of a pure Layer 1 contract include:

1. Uniqueness: The contract state exists solely on-chain and does not rely on any off-chain states, ensuring the uniqueness of the contract state. Layer 2 solutions depend on the state of the indexer, and if the indexer encounters issues, the token's state could also be impacted.
2. Security: The security of a Layer 1 solution is ***equivalent to*** the security of the base token space, which is guaranteed by all miners using their substantial computational power. Under the PoW consensus mechanism, the only potential attack is a double-spend ([51% attack](/docs/mining/concepts/reorg-orphan-51attack)), without other issues of state inconsistency. In contrast, the security of Layer 2 solutions depends on the security of the indexer and oracle; if these components fail, the security of the token is compromised.
3. High Performance: The performance of a Layer 1 solution is ***equivalent to*** the performance of the UTXO model, fully utilizing the parallelism benefits of UTXOs to process large volumes of transactions simultaneously. Layer 2 solutions, involving indexers and oracles, require additional computational resources to maintain states and typically use serial verification to ensure state uniqueness, which can easily lead to performance bottlenecks.
