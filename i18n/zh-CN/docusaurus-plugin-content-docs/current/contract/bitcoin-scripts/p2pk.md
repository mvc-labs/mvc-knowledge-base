---
sidebar_position: 3
---
# P2PK(支付到公钥)脚本

介绍P2PK输出。

## 什么是P2PK输出？

P2PK（Pay-to-PubKey，即“支付到公钥”）是比特币网络中一种较早的输出类型，用于向特定的公钥进行支付。虽然在现代比特币交易中使用相对较少，但了解P2PK对于理解比特币交易和脚本系统是非常重要的。

### P2PK输出的结构

P2PK输出的结构相对简单，它直接包含了接收方的公钥。典型的P2PK脚本如下：

```
<公钥> OP_CHECKSIG
```

在这个脚本中：

- `<公钥>`：这是接收方的公钥。
- `OP_CHECKSIG`：这是一个操作码，用于验证签名。

为了更好地理解P2PK输出，让我们拆解其脚本：

1. `<公钥>`：这是一个压缩或未压缩的比特币公钥。
2. `OP_CHECKSIG`：这是一个操作码，它会从栈中取出一个签名和一个公钥，然后使用该公钥验证签名是否有效。

### P2PK输出的特点

1. **简单性**：P2PK输出结构简单，只包含一个公钥和一个操作码。这使得它在比特币早期版本中广泛使用。
2. **直接支付到公钥**：不像P2PKH（Pay-to-PubKeyHash）输出需要通过公钥哈希找到公钥，P2PK输出直接使用公钥。这简化了验证过程，但也带来了一些隐私和安全问题。
3. **隐私问题**：由于P2PK输出直接包含公钥，任何人都可以看到接收方的公钥。这可能会导致隐私问题，因为公钥可以通过一定的技术手段被关联到用户的其他交易或身份。
4. **安全问题**：在量子计算机可能威胁到公钥加密的假设下，直接暴露公钥可能会降低安全性，因为量子计算机可能能够从公钥中推导出私钥。

### P2PK输出的使用场景

尽管P2PK输出在现代比特币交易中已经不常见，但它在比特币的早期发展中扮演了重要角色。以下是一些可能的使用场景：

1. **矿工奖励**：比特币创世区块和早期的一些区块使用了P2PK输出作为矿工奖励。
2. **简单的点对点支付**：在比特币早期，用户之间进行简单的点对点支付时可能会使用P2PK输出。

### 现代替代方案

由于P2PK输出的隐私和安全问题，现代比特币交易中更常用的是P2PKH（Pay-to-PubKeyHash）输出和P2SH（Pay-to-ScriptHash）输出。

- **P2PKH**：P2PKH输出使用公钥哈希，而不是直接使用公钥，这样可以在一定程度上保护用户的隐私和安全。典型的P2PKH脚本如下：
  ```
  OP_DUP OP_HASH160 <公钥哈希> OP_EQUALVERIFY OP_CHECKSIG
  ```

- **P2SH**：P2SH输出允许使用更复杂的脚本，以支持多重签名和其他高级功能。典型的P2SH脚本如下：
  ```
  OP_HASH160 <脚本哈希> OP_EQUAL
  ```

### 结论

P2PK输出作为比特币网络的一种早期交易输出类型，虽然在现代使用较少，但其简单直接的设计为理解比特币交易和脚本系统提供了一个重要的基础。随着比特币网络的发展，更多复杂和安全的输出类型如P2PKH和P2SH逐渐取代了P2PK输出，但了解P2PK输出对于全面理解比特币技术仍然是非常重要的。
