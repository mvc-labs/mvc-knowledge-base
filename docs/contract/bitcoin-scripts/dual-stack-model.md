---
sidebar_position: 1
---

# Dual Stack Model

Bitcoin script execution involves a stack-based programming language used to verify transactions on the Bitcoin network.
Here is an overview of the Bitcoin script execution stack:

## Script Composition

- **ScriptPubKey**: This is the locking script attached to the output, specifying the conditions that must be met to
  spend the output.
- **ScriptSig**: This is the unlocking script included in the input, providing the data required to meet the conditions
  in ScriptPubKey.

## Execution Stack

The execution stack is used to process and evaluate Bitcoin scripts. Here’s how it works:

1. **Push Operations**: Push data and commands (opcodes) onto the stack.
    - Example: `OP_DUP` duplicates the top item on the stack.
    - Example: `OP_HASH160` performs a RIPEMD-160 hash after SHA-256.

2. **Script Execution**:
    - ScriptSig and ScriptPubKey are concatenated and executed sequentially.
    - First, ScriptSig is executed, pushing its data onto the stack.
    - Then, ScriptPubKey is executed, using the data left on the stack by ScriptSig.

3. **Stack Operations**:
    - Various operations modify the stack. For example:
        - `OP_ADD` pops two items from the stack, adds them, and pushes the result back onto the stack.
        - `OP_EQUALVERIFY` checks if the top two items are equal and removes them if they are.

4. **Conditionals and Control Structures**:
    - Conditional operations like `OP_IF`, `OP_ELSE`, and `OP_ENDIF` allow for more complex scripts by enabling
      conditional execution paths.

5. **Validation**:
    - After executing all commands, the stack should be in a specific state for the transaction to be valid.
    - Typically, the final stack state should have a single `TRUE` value, indicating successful script execution.

## Example Transaction Execution

1. **ScriptSig**: `<signature> <public key>`
    - Pushes the signature and public key onto the stack.

2. **ScriptPubKey**: `OP_DUP OP_HASH160 <PubKeyHash> OP_EQUALVERIFY OP_CHECKSIG`
    - `OP_DUP`: Duplicates the public key.
    - `OP_HASH160`: Hashes the duplicated public key.
    - `<PubKeyHash>`: Pushes the expected public key hash.
    - `OP_EQUALVERIFY`: Verifies that the public key hash matches the expected hash.
    - `OP_CHECKSIG`: Verifies the signature using the public key.

## Stack Execution Flow

- **Initial Stack (after executing ScriptSig)**:
    - Stack: `[signature, public key]`

- **Executing ScriptPubKey**:
    - `OP_DUP`: `[signature, public key, public key]`
    - `OP_HASH160`: `[signature, public key, public key hash]`
    - `<PubKeyHash>`: `[signature, public key, public key hash, expected public key hash]`
    - `OP_EQUALVERIFY`: Verifies and removes the public key hash and expected public key hash if they match.
    - `OP_CHECKSIG`: Verifies the signature using the public key.

- **Final Stack**:
    - If valid: `[TRUE]`
    - If invalid: `[FALSE]` or script failure, resulting in the transaction being rejected.

Understanding the Bitcoin script execution stack is crucial for developers working on Bitcoin transactions as it ensures
the correct and secure validation of transaction conditions.
