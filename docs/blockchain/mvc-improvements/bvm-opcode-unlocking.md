---
sidebar_position: 1
---

# BVM & OPCODE Unlocking

Introduction to the scripting system and BVM.

## Scripting System

Bitcoin Script is a programming language used in Bitcoin transactions to define payment conditions. It is a stack-based
language where opcodes perform various operations such as data pushing, logical evaluation, cryptographic hashing, and
signature verification. Script is not Turing-complete, avoiding complex infinite loops. Typical use cases include
multi-signature addresses, time-locked transactions, and pay-to-hash-lock addresses. Each transaction contains a locking
script and an unlocking script. A transaction is only validated if the unlocking script meets the conditions of the
locking script.

Here are some common opcodes in Bitcoin Script:

1. `OP_DUP`: Duplicates the top item on the stack.
2. `OP_HASH160`: Performs SHA-256 followed by RIPEMD-160 hashing on the top item of the stack.
3. `OP_EQUALVERIFY`: Compares the top two items on the stack; if they are equal, it continues, otherwise validation
   fails.
4. `OP_CHECKSIG`: Verifies if a signature is valid.
5. `OP_CHECKMULTISIG`: Verifies multiple signatures.

These opcodes are used in Bitcoin transaction scripts to implement various functionalities such as signature
verification, multi-signature, and hash locking.

For detailed information, refer to [Opcodes](../../contract/bitcoin-scripts/opcode.md).

![img.png](/img/bitcoin-script-stack.png)

## BVM (Bitcoin Virtual Machine)

BVM is a virtual machine based on Bitcoin's [scripting system](https://en.bitcoin.it/wiki/Script) with restored opcodes
and extended functionalities. It serves as the execution engine for MVC smart contracts. Bitcoin's scripting system is a
dual-stack executor, including input and output stacks, using a Forth-like language to perform arbitrary operations on
the stack to achieve higher-level logic. In fact, many modern programming languages rely heavily on the execution stack.
In principle, you can implement arbitrarily complex program logic through a stack structure, provided there are
sufficient memory resources. The stack structure is the foundation of modern programming languages, with infinite
potential.

However, due to BTC's limitations, the scripting system can only perform simple logical judgments with very limited
opcodes, unable to realize complex smart contract logic. BVM expands the scripting system by introducing more opcodes,
supporting more data types, and providing more functionalities, allowing MVC smart contracts to achieve more complex
logic.

We can define and summarize the features of BVM and its contracts as follows:

1. BVM is a virtual machine that extends the functionalities of Bitcoin's script system opcodes.
2. BVM consists of input and output stacks. The output stack can be viewed as the function definitions and data of smart
   contracts, while the input stack can be seen as the function calls and parameters of smart contracts.
3. BVM contracts are [purely functional operations](https://www.turing.com/kb/introduction-to-functional-programming)
   with characteristics such as atomicity, statelessness, no side effects, and parallel execution typical of functional
   programming.
4. The result of BVM contract computation is either TRUE or FALSE, determined by whether the UTXO can be unlocked to
   judge the contract's success.
5. BVM contracts are atomic, meaning they either all succeed or all fail, with no partial execution. Failed contract
   validations do not consume GAS fees, as they are considered illegal transactions and are not recorded on the chain.

## Opcode Unlocking

For security reasons, Bitcoin's design restricts the number and type of usable opcodes, allowing only a few standard
types of transaction outputs, limiting the functionality of smart contracts.

MVC restores the original version of the opcodes to expand the flexibility of transactions and contracts, supporting
more data types and providing more functionalities, allowing MVC smart contracts to achieve more complex logic.

For the list of available opcodes, refer to [Bitcoin Opcodes](https://en.bitcoin.it/wiki/Script).
