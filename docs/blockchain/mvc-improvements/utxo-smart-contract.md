---
sidebar_position: 2
---

# Utxo Smart Contracts

An introduction to what UTXO smart contracts are and why UTXO contracts can significantly enhance performance.

## Introduction to the UTXO Model

The UTXO model (Unspent Transaction Output) is one of the core designs of Bitcoin. Compared to account models used by
blockchains like Ethereum, the UTXO model has the advantage of enabling large-scale parallel processing.

The account model maintains a global state (such as account balances and contract data). Before executing each
transaction, it needs to read and write to this global state, similar to a bank account balance. In high concurrency
scenarios, reading and writing to the global state leads to resource competition. To ensure security, accounts must
operate in a serial order, which is why the account model has a nonce field to mark transaction sequences. The validity
of transactions strictly depends on these sequences, and transactions must be validated in order.

The UTXO model is more akin to cash or coins. It does not maintain a global state recording each address's balance;
instead, it uses individual unspent transaction outputs (UTXOs) to represent ownership. An address's balance is
calculated by summing the values of all its UTXOs. During transactions, only these unspent transaction outputs are
manipulated, avoiding global state reads and writes. This enables large-scale parallel processing, enhancing overall
system performance. Using a daily life example, the UTXO model's state is like a collection of coins, each marked with a
value and ownership (or spending conditions). Each coin is independent and unaffected by others, allowing simultaneous
operations on any number of coins, resulting in higher parallel processing capabilities.

The diagram below illustrates the basic structure of the UTXO model:

![img/utxo-presentation.png](/img/utxo-presentation.png)

Every transaction includes inputs and outputs, where inputs come from the outputs of previous transactions. Analogously,
each input destroys the corresponding UTXO, and each output creates new UTXOs. In Bitcoin, each transaction consumes
previous UTXOs and generates new ones. UTXOs can only be spent once; once spent, they no longer participate in balance
calculations, ensuring every transaction is valid and preventing double-spending.

> Note: Coinbase transactions, which are miner rewards, do not consume UTXOs but generate new ones, akin to minting
> coins.

As shown in the diagram, the smallest unit controlled by the UTXO model is not the transaction but the individual UTXOs.
Theoretically, any number of UTXOs can be operated on simultaneously, which is the source of the UTXO model's parallel
processing capability. To highlight the parallelism of UTXOs, we can use a few simple examples:

1. **UTXO Parallel Transfers:** One can construct a transaction with one input and 10,000 outputs, distributing money to
   10,000 people with a single transaction. In contrast, the account model would require 10,000 sequential transactions,
   where the next transfer cannot proceed until the previous one is completed.
2. **UTXO Parallel Receipts:** An address can simultaneously receive 10,000 transactions. Here, order doesn't matter;
   the sequence of arrivals doesn't affect the final result. In contrast, the account model requires transactions to be
   processed in block order sequentially.
3. **UTXO Parallel Processing:** Node software or miners can group transactions from the transaction pool according to
   different rules (e.g., UTXO relevance) and process them in parallel with multiple processing modules. This horizontal
   scalability improves the entire network's processing capacity. Horizontal scalability is essential for unlimited
   expansion, whereas the account model requires sequential transaction processing, hindering parallelism.

Thus, MVC adopts the UTXO model as the foundation for transaction parallel processing while addressing some of the UTXO
model's drawbacks, such as difficulty in implementing smart contracts and maintaining global state, thereby providing a
high-performance foundation.

Using the UTXO model for standard transfer transactions is straightforward, but implementing smart contracts faces many
limitations and technical challenges:

* The lack of global state in the UTXO model makes global state management, like Ethereum smart contracts, very
  difficult.
* The UTXO model requires functional programming, which needs a certain theoretical foundation to master the correct
  programming model.
* Public chains like BTC limit the number and types of executable scripts, allowing only a few standard types of
  transaction outputs, restricting smart contract functionality.
* The UTXO ecosystem lacks comprehensive smart contract development tools, forcing developers to write scripts and
  construct transactions manually, which is user-unfriendly.
* UTXO contracts, due to their technical characteristics, have many compile-time constants, making it challenging to
  handle complex logic like loops and recursion.

MVC carefully considers the advantages and disadvantages of the UTXO model, drawing on the experiences of Ethereum and
other UTXO public chains, introducing concepts like BVM (Blockchain Virtual Machine) and MetaTxid to achieve true
first-layer UTXO smart contracts. Deep cooperation with the [sCrypt](https://scrypt.io/) team provides more
user-friendly smart contract development tools, significantly lowering the threshold for writing and deploying BVM smart
contracts.

## BVM (Bitcoin Virtual Machine)

BVM is a virtual machine based on Bitcoin's [script system](https://en.bitcoin.it/wiki/Script), restoring and extending
its opcodes. It serves as the execution engine for MVC smart contracts. Bitcoin's script system is a dual-stack
executor, including input and output stacks, using a Forth-like language to manipulate the stack, achieving higher-level
logic. In fact, many modern programming languages rely heavily on the execution stack; theoretically, any complex
program logic can be implemented through a stack structure (provided there are enough memory resources). The stack
structure is fundamental to modern programming languages, with infinite potential.

However, due to BTC's restrictions, the script system can only perform simple logical judgments, with very limited
opcodes, making it impossible to implement complex smart contract logic. BVM expands the script system's functionality
by [introducing more opcodes](bvm-opcode-unlocking), supporting more data types, and providing more functions, enabling
MVC smart contracts to achieve more complex logic.

We can summarize the definitions and characteristics of BVM and its contracts as follows:

1. BVM is a virtual machine that extends the opcodes of Bitcoin's script system.
2. BVM consists of an input stack and an output stack. The output stack can be seen as the function definitions and data
   of smart contracts, while the input stack represents the function calls and parameters of smart contracts.
3. BVM contracts are [purely functional computations](https://www.turing.com/kb/introduction-to-functional-programming),
   with the characteristics of functional programming: atomicity, statelessness, no side effects, and parallel
   execution.
4. The result of BVM contract calculations is only TRUE or FALSE, determining whether the UTXO can be unlocked to judge
   the success of contract execution.
5. BVM contracts are atomic; they either all succeed or all fail, without partial execution. Failed contract
   verifications do not consume GAS fees, as they are considered illegal transactions and will not be recorded on the
   chain.

![BVM](/img/bitcoin-virtual-machine.png)

For more detailed information on BVM opcodes and contract programming, please refer
to [subsequent chapters](bvm-opcode-unlocking.md).

## Introduction to UTXO Smart Contracts

UTXO smart contracts store contract logic and data in UTXOs and use contract calls and parameters as inputs to attempt
to unlock the contract. By executing the contract logic through BVM, the contract's state is controlled by whether the
UTXO can be unlocked (function returns true or false). This model might be unfamiliar to Ethereum smart contract
developers, but with functional programming concepts and some conceptual conversions, UTXO smart contracts can achieve
very complex logic.

Since the UTXO model lacks a global state, it stores contract state and logic in UTXOs, transferring state through UTXO
transaction chains, as shown below:

![UTXO state chain](/img/utxo-state-chain.png)
(UTXO contract state chain, image from [sCrypt](https://docs.scrypt.io/how-to-write-a-contract/stateful-contract))

Each UTXO transaction consumes previous UTXOs and generates new ones, achieving chain-like state transfers. Whether the
UTXO can be unlocked corresponds to whether the contract execution allows state transfers. If the contract disallows
state modification (e.g., no transfers, no data modifications), it returns false, the UTXO remains locked, and the
contract execution fails.

Viewing the contract as a state machine transferring data states, the differences between UTXO contracts and account
contracts are as follows:

* Account contracts maintain a global state, where a single transaction might cause multiple state transfers in the EVM,
  frequently modifying state data until the contract execution completes or gas is exhausted. A UTXO contract
  transaction, however, triggers only one state transfer per input contract call, and regardless of the complexity of
  internal logic or the number of state transfers, BVM only records the final state transfer result on the chain.
* UTXO contracts have no global state, only waiting-to-be-executed "functions" (UTXOs). To transfer state, one must find
  the state-containing function, modify the state through a function call, and generate a new function. This model makes
  UTXO contract state transfers clearer and easier to understand.
* Since UTXO contracts do not rely on external states, a contract call will have a definite result regardless of how
  many times it is called, greatly facilitating contract analysis, debugging, and unit testing. In contrast, EVM
  contracts, dependent on global states, might have execution results influenced by the external environment, leading to
  uncertain outcomes (balance sufficient yields one result, insufficient another), posing a significant issue for EVM
  contract security and predictability.

Of course, transmitting state each time isn't cost-free. In scenarios requiring traceability, state might expand
indefinitely with the transmission chain, as more data needs to

be verified, causing state bloat. MVC addresses this issue with techniques like [MetaTxid](meta-txid.md), using
cryptographic methods such as hashing and data extraction to solve a large class of state bloat problems, distinguishing
MVC smart contracts from other UTXO chains.

![UTXO smart contract](/img/bitcoin-smart-contract.png)
