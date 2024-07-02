---
sidebar_position: 2
---

# Basic Syntax

Introduction to the basic grammar and rules of the Scrypt language.

Reference: https://scryptdoc.readthedocs.io/en/latest/

## Constructor

Each contract has only one constructor, which is used to initialize member variables. If no constructor is specified, a
default constructor will be generated to initialize all members.

![img.png](/img/scrypt-constructor.png)

## Require()

The `require` function specifies contract conditions and accepts a boolean parameter. If the parameter is false, the
contract execution will be interrupted, and it will return a failure.

When the parameter is true, the verification will pass.

## Public Functions

Each contract has at least one public function. This function does not return a value (void return). It can be
considered the locking script or the entry point of the entire contract. Only when all the `require` conditions in the
public function are met and end normally, can the contract be unlocked.

In the case of multiple public functions, the contract can be considered to have multiple unlocking methods, each
capable of unlocking the output.

## Basic Data Structures

- Bool: true or false
- Int: Signed integers of any length in decimal or hexadecimal
- Byte: Hexadecimal format starting with b and single quotes, or UTF-8 characters enclosed in double quotes
    - Array type: separated by commas, with a fixed length

```c
bool[3] b = [false, false && true || false, true || (1 > 2)];
int[3] c = [72, -4 - 1 - 40, 833 * (99 + 9901) + 8888];
bytes[3] a = [b'ffee', b'11', b'22'];
int[2][3] d = [[11, 12, 13], [21, 22, 23]];
// array dimension can be omitted when declared
int[] e = [1, 4, 2];  // e is of type int[3]
int[][] f = [[11, 12, 13], [21, 22, 23]]; // f is of type int[2][3]
```

Arrays can use the `repeat` function to set all values to the same.

```text
// a == [0, 0, 0]
int[3] a = repeat(0, 3);
```

Arrays can be indexed using indices starting from 0. If out of bounds, the contract will fail.

Two arrays are considered equal if they have the same number of elements and each element is the same.

## Struct Type

A struct is a group of member variables, which can be basic data structures or nested structs.

When using arrays, members can be accessed directly using the dot (.) notation.

Type inference: The `auto` keyword can automatically infer basic data types.

Type alias: You can assign aliases to specific data types.

## Generics

Generics can be defined in libraries and structs. When using generics, the corresponding type must be explicitly
declared.

```c
library HashedMap<K, V> {
    // use them as function parameter's type
    function set(K k, V v, int idx) {
        ...
    }
}

struct ST<T, P> {
    T t;
    P p;
}
```

## Domain Types

Domain types are subtypes of basic types, mainly used for types related to Bitcoin transactions. Using domain types can
enhance type safety.

- PublicKey: PubKey(b'0200112233445566778899aabbccddeeffffeeddccbbaa99887766554433221100');
- Sig: Sig(
  b'3045022100b71be3f1dc001e0a1ad65ed84e7a5a0bfe48325f2146ca1d677cf15e96e8b80302206d74605e8234eae3d4980fcd7b2fdc1c5b9374f0ce71dea38707fccdbd28cf7e41');
- Ripemd160: Ripemd160(b'0011223344556677889999887766554433221100');
- PubKeyHash: PubKeyHash(b'0011223344556677889999887766554433221100');
- Sha1: Sha1(b'0011223344556677889999887766554433221100');
- Sha256: Sha256(b'00112233445566778899aabbccddeeffffeeddccbbaa99887766554433221100');
- SigHashType: SigHashType(b'01'); SigHashType s = SigHash.ALL | SigHash.ANYONECANPAY;
- SigHashPreimage: SigHashPreimage(b'0100000028bcef7e73248aa273db19d73');
- OpCodeType: OpCode.OP_DUP + OpCode.OP_ADD;
- PrivKey: PrivKey(0x00112233445566778899aabbccddeeffffeeddccbbaa99887766554433221100);

## Constants

Constants cannot be modified once declared.

```text
contract Test { 
    const int x;
    
    constructor(int x) {
        this.x = x;
    }
    
    public function equal(const int y) {
        y = 1; // error
        const int a = 36;
        a = 11; // error
    }
}
```

## If Condition

The `if` condition is used to control the program logic flow. Besides bool, int, and bytes can also use `if`. Int 0 and
byte b'', b'00' are considered false.

## Exit Method

The `exit` method ends the function logic early. The parameter can be true or false.

## Code Separator

Three or more asterisks (*) will insert an OP_CODESEPARATOR operation, which affects the signature calculation.

## Access Control

- Default: no keyword required
- Private
- Public: only applies to functions

| Access Level | Same Contract | Other Contract | Externally |
|--------------|---------------|----------------|------------|
| Default      | Yes           | Yes            | No         |
| Private      | Yes           | No             | No         |
| Public       | Yes           | Yes            | Yes        |
