---
sidebar_position: 4
---

# Functions

How to define and use user-defined functions.

## Private and Public Functions

Users can specify their own functions, but functions are private by default and can only be seen within the contract.

Public functions are specifically used to unlock the contract, and they return `true` by default. If the `require`
conditions are not met, they will terminate and return `false`.

## Static Functions

Static functions can be called directly using the Contract name as a prefix or internally within the contract. Static
functions do not modify any external state.

## `return` Keyword

Since the script does not support the `return` syntax, `return` must be placed at the end of the function. This
restriction cannot be lifted for now, but there are ways to bypass it.

## Recursive Calls

Recursive calls are not permitted.

## Library Functions

Scrypt provides some convenient public library functions that can be called directly.

### Math

- `int abs(int a)`
- `int min(int a, int b)`
- `int max(int a, int b)`
- `bool within(int x, int min, int max)`

### Hashing

- `Ripemd160 ripemd160(bytes b)`
- `Sha1 sha1(bytes b)`
- `Sha256 sha256(bytes b)`
- `Ripemd160 hash160(bytes b)` - `ripemd160(sha256(b))`
- `Sha256 hash256(bytes b)` - `sha256(sha256(b))`
- `Sha256 flattenSha256(T a)`

### Signature Verification

- `bool checkSig(Sig sig, PubKey pk)`
    - Returns true if the signature matches the public key. Returns false if the signature is an empty byte array.
      Otherwise, the entire contract fails immediately due to the NULLFAIL rule.
- `bool checkMultiSig(Sig[M] sigs, PubKey[N] pks)`
    - Returns true if and only if M signatures match M out of N public keys. Returns false if all signatures are an
      empty byte array. Otherwise, the entire contract fails immediately.

### Byte Operations

- Convert to and from `int`, using `unpack` or `pack` methods for conversion.
- `bytes num2bin(int num, int size)`
- `len()` - Returns the length of bytes.
- Slicing Operator - `b[start:end]` - inclusive of start, exclusive of end. If `start` is omitted, it defaults to 0.
  If `end` is omitted, it defaults to the length.
- Byte concatenation: `bytes b = b'00112233' + b'334455'` results in `b == b'00112233334455'`
- `reverseBytes(bytes b, static const int size)`
