---
sidebar_position: 7
---

# Turing Completeness

A discussion on UTXO contract Turing completeness.

There has been a persistent misconception in the cryptographic ecosystem that the UTXO model cannot achieve
Turing-complete smart contracts. The primary argument is that the UTXO model lacks infinite loops. This article will
explain the issue of Turing completeness.

## What is Turing Completeness

Turing completeness refers to the ability of a computer or programming language to simulate all functions of a Turing
machine. A Turing machine is a theoretical computer proposed by the British mathematician Alan Turing. It is an
idealized computational model capable of simulating any computer program. A Turing-complete programming language can
implement any computer program, including recursive functions, conditional statements, loops, etc.

A Turing machine consists of an infinitely long tape and a read/write head. The tape contains a series of symbols, and
the read/write head can read and write symbols and operate based on a set of rules. The operations of a Turing machine
include moving the read/write head, reading and writing symbols, and changing states. The operation rules of a Turing
machine form a finite state machine that determines the next operation based on the current state and the read symbol.

According to the definition of Turing completeness, a system capable of fully implementing the functions of a Turing
machine is Turing complete. Note that there is a prerequisite: an infinitely long tape, which implies unlimited memory
or execution time. However, real-world constraints bound by physical laws mean resources are always finite. A computer
capable of solving all computable problems does not truly exist. The Turing-complete programming languages and programs
we commonly recognize, such as high-level programming languages and ETH contracts, cannot achieve infinite loops either
and are thus only approximately Turing complete.

Take ETH contracts, for example. If the contract logic is too complex or the number of loops is too high, exceeding the
GAS limit, the contract program will be interrupted and unable to continue execution. The reason ETH sets a "GAS limit"
is precisely because of this; it is practically impossible to allow a contract to execute indefinitely.

Based on the above discussion, considering the constraints of actual computational resources and time, what we are
really discussing is a form of approximate Turing completeness, not true Turing completeness. In this sense, the UTXO
model can achieve approximate Turing completeness. **The computations achievable by the account model can be
equivalently achieved by the UTXO model**.

![Turing Completeness](/img/turing-machine.png)

## Differences in Execution Paradigms

BVM and EVM differ in their contract execution paradigms. Using programming concepts, EVM can be likened to (imperative
programming), while BVM is akin to (functional programming).

EVM's imperative programming describes the execution process of a program through a series of commands, such as C
language, Java, etc. The characteristics of imperative programming are that the execution process of the program is
described by a series of commands, and the execution process of the program is variable, making it difficult to predict
the final result at compile time. When EVM triggers a contract, it executes the contract state transitions step by step
according to the contract code until the code execution is complete or the GAS is exhausted, ending the contract. The
entire process can be completed entirely by EVM itself. Additionally, since the number of steps for contract execution
cannot be predicted, a GAS limit must be specified when initiating a contract transaction. Its characteristics are as
follows:

1. The contract state is global, and the contract execution process needs to maintain a global state, so modifications
   to the same state must be executed serially.
2. Only one transaction is needed to initiate a contract, and the state transitions within the contract can be multiple
   and automatically performed by the EVM.
3. The triggering of multiple contracts must have a strict sequential dependency relationship, and different execution
   sequences of contracts may lead to different results.
4. The transaction initiating the contract must specify the GAS limit, and different GAS limit settings may result in
   different execution outcomes.
5. Failed contract executions still consume GAS fees because the execution process has already been verified by the
   entire network, and the GAS fee has been consumed.

In contrast, BVM's functional programming describes the execution process of a program through a series of functions,
such as Haskell, Lisp, etc. The characteristics of functional programming are that the execution process of the program
is described by a series of functions, the execution process is immutable, and the execution result of a function only
depends on the input and is not affected by the external environment. Similarly, to prevent resource exhaustion, BVM
must specify an upper limit on the number of loops when setting and triggering a contract. During contract execution,
the number of steps required and the result are already determined and will not change. Its characteristics are as
follows:

1. The contract state is local, stored in functions (UTXOs), and different states are independent and can be executed in
   parallel.
2. The state transitions with each transaction. Each transaction triggers only one state transition, regardless of the
   complexity of the contract logic or the number of state transitions, BVM only records the final state transition
   result on the chain. Multiple steps of state transitions or recursive features require multiple transactions, which
   means multiple function call chains working together. BVM does not automatically trigger subsequent state
   transitions. The contract caller (anyone can call the function, but not everyone can successfully unlock it) needs to
   construct and execute the chain.
3. When writing contracts, many compile-time constants are needed, such as the number of loops. These constants define
   the maximum number of loops the contract can accept, defining the function's boundaries to prevent infinite resource
   exhaustion.
4. The contract execution result only depends on the input and is not affected by any external state. The contract
   execution result can be verified off-chain, and each execution result must be identical (reproducibility).
5. The maximum GAS or transaction fee consumed when initiating a contract is determined at the outset and does not
   change during runtime.
6. Failed calls cannot change the state on the chain. It can be considered that BVM state modifications either do not
   succeed, and nothing happens, or they successfully modify the state. Therefore, failed calls do not consume GAS fees
   and are not recorded on the chain.

Due to the characteristics of the BVM or UTXO model and functional programming paradigms, the BVM model can fully
leverage the advantages of functional programming, ensuring contract security and predictability, and achieving
Turing-complete smart contracts. Functional programming modes are widely used in many key areas, especially where
performance and security are doubly required, such as finance and AI, highlighting more and more advantages. Many modern
programming languages also start introducing functional programming features, such as Java and Rust, to improve program
security, predictability, and robustness.

In summary, we can conclude that BVM can achieve the equivalent of EVM's Turing completeness. Any computation that can
be implemented on EVM can be equivalently implemented on BVM. Additionally, BVM's functional programming paradigm
provides better security and predictability for contracts, offering more convenience for contract analysis and
debugging.
