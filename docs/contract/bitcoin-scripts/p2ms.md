---
sidebar_position: 5
---

# P2MS

Introduction to P2MS output.

## What is P2MS Output?

P2MS (Pay-to-MultiSig, or "Pay to Multiple Signatures") is a type of transaction output in the Bitcoin network that
allows multiple signers to jointly manage a fund. This mechanism is often used to enhance security and fault tolerance,
such as in corporate accounts managed by multiple parties. A P2MS output can specify how many signers' signatures are
required to spend the funds, providing a flexible multi-signature solution.

## Structure of P2MS Output

The script for a P2MS output is called the locking script (scriptPubKey), and its typical structure is as follows:

```
m <public key 1> <public key 2> ... <public key n> n OP_CHECKMULTISIG
```

In this script:

- `m`: Indicates the minimum number of signatures required to spend the funds.
- `<public key 1> <public key 2> ... <public key n>`: These are the public keys of the participants in the
  multi-signature scheme.
- `n`: Indicates the total number of public keys involved.
- `OP_CHECKMULTISIG`: This opcode verifies if the provided signatures meet the required minimum number of signatures.

To better understand the P2MS output, let's break down its script:

1. `m`: Specifies the required minimum number of signatures.
2. `<public key 1> <public key 2> ... <public key n>`: Provides multiple public keys.
3. `n`: Specifies the total number of public keys.
4. `OP_CHECKMULTISIG`: Verifies if the signatures meet the `m` valid signatures requirement.

## Characteristics of P2MS Output

1. **Increased Security**: P2MS output allows multiple signers to manage a fund together, reducing the risk of a single
   point of failure. If one signer's private key is compromised, the attacker still needs the private keys of the other
   signers to spend the funds.
2. **Flexibility**: P2MS output can set the signature threshold (`m`) and the total number of signers (`n`) as needed.
   For example, it can be set to 3-of-5 signatures, meaning any 3 out of 5 public keys are needed to spend the funds.
3. **Complexity**: Compared to P2PKH output, the script for P2MS output is more complex, requiring more computation and
   verification steps. While it increases security, it also adds complexity and transaction size in bytes.

## Use Cases for P2MS Output

P2MS output is very useful in scenarios that require joint management or enhanced security. Here are some typical use
cases:

1. **Corporate Fund Management**: Companies can use P2MS output to set up multi-signature accounts, ensuring that
   multiple authorized signers are required to spend company funds.
2. **Joint Investments**: Multiple investors can use P2MS output to jointly manage an investment fund, only being able
   to spend the funds with consensus.
3. **Family Financial Security**: Family members can set up multi-signature accounts to ensure the secure management of
   family funds.

## Example of a P2MS Transaction

Here is a simplified example of a P2MS transaction:

- Locking Script (scriptPubKey):
  ```
  2 <public key 1> <public key 2> <public key 3> 3 OP_CHECKMULTISIG
  ```

- Unlocking Script (scriptSig):
  ```
  OP_0 <signature 1> <signature 2>
  ```

When spending this Bitcoin, the unlocking script must be provided, containing the signatures that meet the minimum
number required. In this example, at least two signatures are needed to spend the funds. The verification process is as
follows:

1. `OP_0`: Due to a small bug in the Bitcoin script, an invalid opcode (usually `OP_0`) needs to be placed on top of the
   stack.
2. `<signature 1> <signature 2>`: Provide two valid signatures.
3. `OP_CHECKMULTISIG`: Takes signatures and public keys from the stack, verifying if at least two signatures are valid.

## Conclusion

P2MS output, as a transaction type that allows multi-signature verification, provides enhanced security and flexibility
in the Bitcoin network. It is suitable for scenarios requiring joint management, such as corporate fund management,
joint investments, and family financial security. Although its script structure is relatively complex, the use of P2MS
output can significantly increase the security of fund management. Understanding P2MS output is important for mastering
advanced uses of Bitcoin and multi-signature mechanisms.
