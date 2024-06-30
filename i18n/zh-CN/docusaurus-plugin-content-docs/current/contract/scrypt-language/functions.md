---
sidebar_position: 4
---

# 函数

如何定义和使用用户自己的函数。

## 私有函数和公有函数

用户可以自己指定函数，但是函数默认为private，只能在合约内部被看到。

public函数专门用来解锁合约，默认返回true，如果require条件不满足就会中断并返回false。

## 静态函数

静态函数可以直接使用Contract名称作为前缀进行调用，也可以在内部直接调用，静态函数不修改任何外部状态。

## return关键字

由于脚本不支持return语法，因此return必须要位于函数的最后位置，这个限制暂时无法解除，会有方法进行绕过。

## 递归调用

递归调用不被许可。

## 库函数

Scrypt提供一些方便的公共库函数可以进行直接调用。
Math

- int abs(int a)
- int min(int a, int b)
- int max(int a, int b)
- bool within(int x, int min, int max)
  Hashing
- Ripemd160 ripemd160(bytes b)
- Sha1 sha1(bytes b)
- Sha256 sha256(bytes b)
- Ripemd160 hash160(bytes b)。ripemd160(sha256(b))
- Sha256 hash256(bytes b)sha256(sha256(b))
- Sha256 flattenSha256(T a)
  Signature Verification
- bool checkSig(Sig sig, PubKey pk)
- Returns true if the signature matches the public key. Returns false if the signature is an empty byte array.
  Otherwise, the entire contract fails immediately, due to the NULLFAIL rule.
- bool checkMultiSig(Sig\[M] sigs, PubKey\[N] pks)
- Returns true if and only M signatures match M out of N public keys.
  Returns false if all signatures are an empty byte array. Otherwise, the entire contract fails immediately.
  Byte操作
- Convert to and from int，使用unpack或者pack方法相互转换
- bytes num2bin(int num, int size)
- len() Returns the length of byte.
- Slicing Opeartor - b\[start:end]前闭后开，如果start被忽略，则start为0，如果end被忽略，end是length
- 字节拼接 bytes b = b'00112233' + b'334455'   b == b'00112233334455'
- reverseBytes(bytes b, static const int size)
