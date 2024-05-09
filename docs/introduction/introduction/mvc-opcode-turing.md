---
sidebar_position: 4
---

# Turing Completeness

Discussion on the Turing Completeness of UTXO Contracts

There has been a misconception in the cryptographic ecosystem that the UTXO model cannot achieve Turing-complete smart
contracts, primarily because the UTXO model does not allow for infinite loops. This article will explain the issue of
Turing completeness.

## What is Turing Completeness

Turing completeness refers to the capability of a computer or programming language to simulate all the functions of a
Turing machine. A Turing machine is a theoretical computer proposed by the British mathematician Alan Turing. It is an
idealized computational model capable of simulating any computer program. A Turing-complete programming language can
implement any computer program, including recursive functions, conditional statements, and loops.

A Turing machine consists of an infinitely long tape and a read-write head. The tape is divided into a series of
symbols, which the read-write head can read and write, operating according to a set of rules. The operations of a Turing
machine include moving the read-write head, reading and writing symbols, and changing states. The operation rules of a
Turing machine form a finite state machine, which can determine the next operation based on the current state and the
read symbol.

Thus, by the definition of Turing completeness, anything that can fully implement the functions of a Turing machine is
Turing-complete. Note that this presupposes an **infinite** tape, implying **unlimited** memory or execution time.
However, in the real world, resources are always limited due to physical laws, and a computer that can solve all
computable problems in the true sense does not exist. The Turing-complete programming languages and programs that we
generally recognize, such as high-level programming languages and ETH contracts, cannot implement infinite loops and are
only approximately Turing-complete.

Take ETH contracts as an example; if the contract logic is too complex or the loop iterations too many, exceeding the
GAS limit, the contract program will be interrupted, resulting in failure to continue executing results. The reason ETH
sets a "GAS limit" is precisely because of this; it's practically impossible to let contracts execute indefinitely.

Based on the above discussion, considering the limitations of actual computing resources and time, what we are really
discussing is an approximate sense of Turing completeness, not true Turing completeness. In this sense, the UTXO model
can achieve an approximate sense of Turing completeness; **any computation that can be implemented by the account model
can equivalently be implemented by the UTXO model**.

![Turing Completeness](/img/turing-machine.png)

## Differences in Execution Paradigms

BVM and EVM differ in their contract execution paradigms, which can be analogized using programming concepts: EVM is
likened to (imperative programming), while BVM is compared to (functional programming).

In EVM's imperative programming, the execution process of a program is described through a series of commands, such as
in languages like C and Java. The characteristic of imperative programming is that the program's execution process is
described by a series of commands, the execution is variable, and it is difficult to predict the final outcome during
the compilation period. When EVM triggers a contract, it executes the contract's state transitions step-by-step
according to the contract's code until the code is completed or the GAS is depleted, ending the contract. The entire
process can be completed entirely by EVM. Since it is impossible to predict the number of steps in a contract execution,
it is necessary to specify a GAS limit when initiating a contract transaction. The characteristics are as follows:

1. The contract's state is global, and maintaining the global state is necessary during the contract's execution, hence
   modifications to the same state must be performed serially.
2. Initiating a contract only requires a single transaction, and internal state transitions within the contract can
   occur multiple times and are automatically performed by EVM.
3. Multiple contract triggers must have a strict order dependency, as executing contracts in different orders can lead
   to different outcomes.
4. Transactions initiating contracts must specify a GAS limit, and different settings of the GAS limit can lead to
   different outcomes.
5. Contract execution failure will also consume GAS, as the process of contract execution is verified by the entire
   network, and the GAS is already spent.

In contrast, BVM's functional programming describes the program's execution process through a series of functions, such
as in Haskell and Lisp. The characteristic of functional programming is that the program's execution process is
described by a series of functions, the process is immutable, and the results of function execution depend only on the
inputs and are not affected by external conditions. Similarly, to prevent resource exhaustion, BVM must specify an upper
limit on the number of loops when setting and triggering contracts. During contract execution, the required steps and
results are predetermined and do not change. Its characteristics include:

1. The contract's state is local, stored within functions (UTXO), and different states are independent of each other and
   can be executed in parallel.
2. State transitions with each transaction, each transaction only triggers one state transition, no matter how complex
   the internal logic of the contract or how many times the state transitions, BVM only records the final state
   transition result on the blockchain. If multiple steps of state transitions or recursive features are needed,
   multiple transactions, i.e., multiple function call chains, must collectively complete them. BVM does not
   automatically trigger subsequent state transitions. It requires the contract caller (anyone can call the function,
   but not everyone can successfully unlock it) to build and execute the chain.
3. When writing contracts, many compile-time constants, such as loop counts, are needed. These constants define the
   maximum number of loops the contract can handle, defining the boundaries of the function and preventing infinite
   expansion that exhausts resources.
4. The contract's execution result depends only on the input and is not affected by any external state. The contract's
   execution result can be verified off-chain, and each execution result is invariably the same (reproducibility).
5. The maximum GAS or fees consumed when initiating a contract are predetermined and do not change during runtime.
6. Failed calls cannot change the state on-chain and can be considered as BVM altering the state; either nothing happens
   if it is unsuccessful, or the state is successfully changed. Therefore, failed calls do not consume GAS nor are they
   recorded on the blockchain.

Due to the characteristics of BVM or the UTXO model and the functional programming paradigm, BVM's model can fully
leverage the advantages of functional programming, ensuring contract security and predictability, while also achieving
Turing-complete smart contracts. The functional programming mode is now widely used in many critical areas, especially
those with dual demands for performance and security, such as finance, AI, etc., showing increasingly more advantages.
Many modern programming languages are also beginning to introduce features of functional programming, such as Java and
Rust, to enhance program safety, predictability, and robustness.

In summary, BVM can achieve Turing completeness equivalent to EVM, and any computation that can be implemented on EVM
can equivalently be implemented on BVM. Additionally, BVM's functional programming mode also provides better security
and predictability for contracts and offers more convenience for contract analysis and debugging.
