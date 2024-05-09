---
sidebar_position: 3
---

# BVM and Utxo Smart Contract

Defining the BVM and UTXO smart contracts.

Based on our previous discussion, the [UTXO model is the basis for MVC's infinite scalability](mvc-performance). Using
the UTXO model for standard SPACE transfer transactions is quite straightforward, but implementing smart contracts faces
many restrictions and technical difficulties:

- The UTXO model, lacking a global state, makes managing a global state similar to Ethereum smart contracts very
  challenging.
- The UTXO model is based on pure functional programming, requiring a solid theoretical foundation to master the correct
  programming patterns.
- Public blockchains like BTC limit the number and types of scripts that can be executed, only allowing a few standard
  types of transaction outputs, which restricts the functionality of smart contracts.
- The UTXO ecosystem lacks comprehensive smart contract development tools; developers need to write scripts and manually
  construct transactions, which is very user-unfriendly.
- Due to its technical characteristics, UTXO contracts involve many compile-time constants, making it difficult to
  handle complex logic such as loops and recursion.

MVC has thoroughly considered the advantages and disadvantages of the UTXO model. By drawing on the experiences of
Ethereum and other UTXO public blockchains, it introduced concepts like the Blockchain Virtual Machine (BVM) and
technologies such as MetaTxid to implement truly pure Layer 1 UTXO smart contracts. Additionally, MVC has collaborated
deeply with the [sCrypt](https://scrypt.io/) team to provide more user-friendly smart contract development tools,
significantly lowering the
barriers to writing and deploying BVM smart contracts.

## BVM（Bitcoin Virtual Machine）

BVM is a virtual machine that has expanded the functionality and restored operation codes based
on [Bitcoin's script system](https://en.bitcoin.it/wiki/Script), serving as the execution engine for MVC smart
contracts. Bitcoin's script system is a dual-stack executor, comprising an input stack and an output stack, utilizing a
Forth-like language to perform arbitrary operations on the stack to realize higher-level logic. In fact, the execution
structures of many modern programming languages largely depend on execution stacks, and theoretically, you could
implement any complex program logic with a stack-based structure (provided there is sufficient memory). It can be said
that stack-based structures form the foundation of modern programming languages, possessing limitless potential.

However, due to BTC's limitations, the script system can only perform simple logical judgments, and the available
operation codes are very limited, making it impossible to implement complex smart contract logic. BVM extends the
functionality of the script
system, [introducing more operation codes](/docs/blockchain/mvc-improvements/bvm-opcode-unlocking), supporting more data
types, and providing more
functionalities, enabling MVC smart contracts to implement more complex logic.

The definition and characteristics of BVM and its contracts can be summarized as follows:

1. BVM is a virtual machine that extends the functionality of operation codes based on Bitcoin’s script system.
2. BVM consists of an input stack and an output stack. The output stack can be seen as the function definitions and data
   of
   the smart contract, while the input stack can be viewed as the function calls and parameters of the smart contract.
3. BVM contracts are purely [functional computations](https://www.turing.com/kb/introduction-to-functional-programming),
   possessing the atomicity of functional programming, statelessness,
   no
   side effects, and the capability for parallel execution.
4. The results of BVM contract computations only include TRUE or FALSE, determining the success of the contract
   execution
   by whether the UTXO can be unlocked.
5. BVM contracts are atomic; they either succeed entirely or fail entirely, with no partial execution. Contracts that
   fail
   verification do not consume GAS, as they are considered illegal transactions and are not recorded on the blockchain.

![BVM](/img/bitcoin-virtual-machine.png)

For more details on BVM's operation codes and contract programming, please refer to
the [following sections](/docs/blockchain/mvc-improvements/bvm-opcode-unlocking).

## UTXO Smart Contract Overview

UTXO smart contracts involve storing the contract's logic and data within the UTXO and using the contract's invocation
and parameters as inputs to attempt to unlock the contract. The logic of the contract is executed by the BVM, and
ultimately, the ability to unlock the contract (with the function returning true or false) controls the contract's
state. This model might be somewhat unfamiliar to Ethereum smart contract developers, but in fact, by combining the
concepts of functional programming and some conceptual conversions, UTXO smart contracts can also implement very complex
logic.

Due to the lack of a global state in the UTXO model, the contract's state and logic need to be stored within the UTXO,
and the state's transmission and transformation are carried out through the passing of UTXO transaction chains, as shown
in the following diagram:

![UTXO state chain](/img/utxo-state-chain.png)
（UTXO Contract state Chain，image from [sCrypt](https://docs.scrypt.io/how-to-write-a-contract/stateful-contract)）

Each UTXO transaction consumes the previous UTXO and generates a new UTXO, enabling chain-like state transitions for
contracts. Whether a UTXO can be unlocked corresponds to whether the contract execution result allows for a state
transition. If the contract determines that a state modification is not allowed (such as prohibiting transfers or data
changes), it will return false, the UTXO will not be unlocked, and the contract execution fails.

If we view contracts as state machines that operate to transition data states, we can see the differences between UTXO
contracts and Account contracts:

* Account contracts maintain a global state, and a single transaction may cause the EVM to perform multiple state
  transitions, frequently modifying state data until contract execution is complete or Gas is depleted. In contrast, a
  UTXO contract transaction with one input contract call only triggers one state transition, and no matter how complex
  the internal logic of the contract or how many times the state transitions, the BVM will only record the final state
  transition result on the blockchain.
* UTXO contracts do not have a global state; they consist only of "functions" (UTXOs) waiting to be executed. To
  transfer a state, it is necessary to first locate the function containing this state, modify the state through
  function calls, and generate a new function. This mode makes the state transition of UTXO contracts clearer and easier
  to understand.
* Since UTXO contracts do not rely on external states, the result of a contract call is deterministic, no matter how
  many times it is called. This brings significant convenience to contract analysis, debugging, and unit testing. In
  contrast, EVM contracts depend on a global state, and the execution results of these contracts can be influenced by
  external conditions, leading to indeterminate outcomes (for example, the outcome may differ depending on whether there
  is enough balance), which is a significant issue for the security and predictability of EVM contracts.

Of course, passing the state down each time is not without cost. In scenarios that require traceability, the state may
grow as the transfer chain increases because more data may need to be verified for traceability, leading
to [unlimited state expansion](/docs/blockchain/mvc-improvements/back-to-genesis). MVC addresses this problem through a
technique called [MetaTxid](meta_txid.md), using cryptographic methods such as hashing and data extraction to thoroughly
solve a wide range of state expansion issues. This is also an important characteristic that distinguishes MVC smart
contracts from other UTXO chains.

![UTXO smart contract](/img/bitcoin-smart-contract.png)
