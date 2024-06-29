---
sidebar_position: 6
---

# 签名

介绍签名系统，为什么签名可以保证比特币网络的安全性。

## 数字签名

签名用于证明你对一组公钥的所有权，以及你对交易的授权。比特币使用椭圆曲线数字签名算法（ECDSA）来生成和验证签名。

![img.png](/img/bitcoin-signature.png)

## 比特币的签名机制

比特币的签名机制是确保交易安全和完整性的核心技术之一。它基于公钥加密算法，通过数字签名来验证交易的合法性和防止篡改。比特币使用椭圆曲线数字签名算法（ECDSA）来创建和验证签名。

## 如何创建签名

创建比特币交易签名的过程如下：

1. **生成私钥**：每个用户生成一个唯一的私钥。
2. **生成公钥**：通过椭圆曲线算法（ECDSA）从私钥生成对应的公钥。
3. **创建交易哈希**：对交易数据进行哈希处理，生成交易哈希（message hash）。这包括交易的输入、输出和其他相关数据。
4. **生成签名**：使用私钥对交易哈希进行签名，生成数字签名。

### 签名的创建步骤

1. **选择消息**：选择要签名的交易数据。
2. **计算哈希**：对交易数据进行哈希处理，通常使用SHA-256算法。
3. **使用私钥签名**：使用私钥对哈希值进行ECDSA签名，生成签名（r, s）。

签名生成的数学过程如下：

- 选择一个随机数k（保证唯一性和安全性）。
- 计算r = (k * G).x mod n，其中G是椭圆曲线的基点，n是曲线的阶。
- 计算s = (z + r * d) / k mod n，其中z是交易哈希，d是私钥。

最终，签名由(r, s)组成。

## 签名的编码

比特币的签名通常使用DER（Distinguished Encoding Rules）编码格式。DER编码是一种ASN.1的二进制编码格式，确保签名的规范性和一致性。

DER编码的签名由以下几部分组成：

1. **SEQUENCE**：表示签名由多个部分组成。
2. **INTEGER r**：签名的第一个整数部分r。
3. **INTEGER s**：签名的第二个整数部分s。

DER编码格式的步骤如下：

1. **编码r和s**：将签名的两个整数部分r和s分别进行DER编码。
2. **组合SEQUENCE**：将r和s的编码结果组合成一个SEQUENCE。

DER编码的具体示例如下：

- r的DER编码：`02 <length_of_r> <r>`
- s的DER编码：`02 <length_of_s> <s>`
- SEQUENCE编码：`30 <length_of_sequence> <r_encoding> <s_encoding>`

## 签名哈希类型

Signature Hash Type（签名哈希类型）用于指定签名适用的交易部分，影响签名验证的过程。比特币中常见的签名哈希类型有以下几种：

1. **SIGHASH_ALL（0x01）**：对整个交易进行签名，包括所有输入和输出。这是最常用的签名哈希类型，确保交易的完整性。
2. **SIGHASH_NONE（0x02）**：只对输入进行签名，输出可以由其他部分指定。适用于需要灵活调整输出的场景。
3. **SIGHASH_SINGLE（0x03）**：对特定的输入和对应的输出进行签名，其他输出可以变化。适用于指定某个特定输出的场景。

MVC 针对签名哈希类型进行了拓展，需要增加SIGHASH_FORKID的前缀来区分与比特币网络的不同。具体请参考下表：

| Flag           | Value including SIGHASH_FORKID | HEX / BINARY | Value excluding SIGHASH_FORKID | HEX / BINARY | Functional Meaning                                 |
|----------------|--------------------------------|--------------|--------------------------------|--------------|----------------------------------------------------|
| SIGHASH_ALL    | 0x41                           | 0100 0001    | 0x01                           | 0000 0001    | Sign all inputs and outputs                        |
| SIGHASH_NONE   | 0x42                           | 0100 0010    | 0x02                           | 0000 0010    | Sign all inputs and no output                      |
| SIGHASH_SINGLE | 0x43                           | 0100 0011    | 0x03                           | 0000 0011    | Sign all inputs and the output with the same index |
| SIGHASH_ALL    | ANYONECANPAY                   | 0xC1         | 1100 0001                      | 0x81         | 1000 0001                                          | Sign its own input and all outputs                      |
| SIGHASH_NONE   | ANYONECANPAY                   | 0xC2         | 1100 0010                      | 0x82         | 1000 0010                                          | Sign its own input and no output                        |
| SIGHASH_SINGLE | ANYONECANPAY                   | 0xC3         | 1100 0011                      | 0x83         | 1000 0011                                          | Sign its own input and the output with the same index   |

## 签名过程示例

假设有一个比特币交易，我们需要对其进行签名，并选择SIGHASH_ALL类型。签名的步骤如下：

1. **生成交易哈希**：对交易数据进行哈希处理。
2. **选择签名哈希类型**：添加SIGHASH_ALL标志。
3. **生成签名**：使用私钥对交易哈希进行签名，得到DER编码格式的签名。
4. **附加签名哈希类型**：将SIGHASH_ALL标志附加到签名后。

## 总结

比特币的签名机制通过ECDSA算法确保交易的安全性和完整性。签名的创建过程涉及私钥生成、公钥生成、交易哈希计算和签名生成。DER编码用于标准化签名表示，确保其规范性。不同的Signature
Hash Type提供了灵活的签名验证方式，适应不同的交易需求。了解比特币的签名机制，有助于深入理解比特币交易的安全性和技术细节。
