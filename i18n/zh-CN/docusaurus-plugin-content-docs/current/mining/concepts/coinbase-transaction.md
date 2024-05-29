---
sidebar_position: 5 
---
# Coinbase交易

介绍产出Space的Coinbase交易。

## 币基交易

Coinbase 交易（Coinbase Transaction）是指比特币和MVC区块链网络中一种特殊类型的交易，这种交易是每个新块生成时由矿工创建的。具体来说，Coinbase 交易有以下几个重要功能和作用：

1. **区块奖励**：矿工成功挖出一个新的区块后，会通过Coinbase 交易获得区块奖励。区块奖励包括新生成的加密货币（例如SPACE）以及该区块中所有交易的交易费。这个奖励是矿工的主要收入来源之一。

2. **新币发行**：Coinbase 交易是SPACE（或其他加密货币）进入流通市场的唯一途径。当一个新的区块被挖出时，矿工通过Coinbase 交易获得的新SPACE会被加入到流通中。

3. **无输入交易**：与普通的加密货币交易不同，Coinbase 交易没有输入，只有输出。这意味着矿工创建这个交易时，不需要提供之前的任何币作为输入，因为这是一个创造新币的过程。

4. **区块链验证**：Coinbase 交易也是区块链验证的一部分，每个区块都必须包含一个Coinbase 交易。这是区块链协议的一部分，用于确保每个区块的合法性和矿工的奖励分配。

总的来说，Coinbase 交易在区块链网络中起着至关重要的作用，不仅是矿工收入的重要来源，也是新币发行和区块链系统正常运转的关键部分。

另外通过Coinbase交易，矿工可以在交易的input信息中添加一些特殊的信息，例如对某个事件的纪念，或者对某个人的祝福等。这些信息会被记录在区块链中，成为永久的历史记录。


## 构建 Coinbase 交易

构建和验证 Coinbase 交易涉及几个步骤和过程，主要包括以下内容：

1. **准备工作**：矿工需要准备好挖掘一个新的区块，包括收集区块链网络上的待处理交易。

2. **创建 Coinbase 交易**：
    - **版本号**：设置交易版本号。
    - **输入**：Coinbase 交易没有输入，因此输入部分只需包含一个特殊的输入，该输入的 `previous_output` 字段指向一个不存在的交易，并且索引为 `0xFFFFFFFF`。
    - **输入脚本**：包含任意数据（通常包含矿工的额外数据，如区块高度）。可以将矿池相关的信息放在这里，方便浏览器等解析矿池信息。
    - **输出**：包含矿工的奖励地址和奖励金额。奖励金额包括当前区块的挖矿奖励和所有交易的手续费总和。

3. **输出脚本**：定义将奖励发送到矿工的地址，这通常是一个标准的 P2PKH（Pay-to-PubKey-Hash）脚本。

4. **其他信息**：Coinbase 交易还包括区块头信息，例如区块版本号、上一个区块的哈希值、Merkle 树根、时间戳、难度目标和随机数（nonce）。

### 验证 Coinbase 交易

1. **检查格式**：确保 Coinbase 交易符合MVC协议的格式要求，例如输入和输出的数量以及格式是否正确。

2. **验证输入**：确认 Coinbase 交易的输入是有效的，即 `previous_output` 字段指向一个不存在的交易并且索引为 `0xFFFFFFFF`。

3. **验证奖励金额**：确认 Coinbase 交易的奖励金额正确。这包括计算当前区块的奖励金额（根据减半规则）和所有包含交易的手续费总和。

4. **检查脚本**：验证输出脚本是否有效，确保奖励可以正确支付给矿工指定的地址。

5. **验证区块头**：确认区块头的信息，例如上一个区块的哈希值是否正确、Merkle 树根是否匹配交易列表、时间戳是否有效、难度目标和随机数是否符合要求。

6. **Merkle 树验证**：构建区块的 Merkle 树，并验证 Coinbase 交易是否在树的根中。确保交易列表的哈希值与区块头中的 Merkle 树根匹配。

### 例子

下面是一个简化的 Coinbase 交易示例（以高度71704为例）：

```bash
mvc-cli getrawtransaction 1dad179ba3f547fa1412a92cf49e4d02af3fc9d52c9c0f3a00d6600b2818f591 1
```

得到如下输出：

```plaintext
{
  "txid": "1dad179ba3f547fa1412a92cf49e4d02af3fc9d52c9c0f3a00d6600b2818f591",
  "hash": "1dad179ba3f547fa1412a92cf49e4d02af3fc9d52c9c0f3a00d6600b2818f591",
  "version": 2,
  "size": 160,
  "locktime": 0,
  "vin": [
    {
      "coinbase": "0318180104eb045466088111bcb8e8d900007a657267706f6f6c2e636f6d00fabe6d6da1e70d1e25b70ccaf051b0382ec890fcc7049609b73dcc9fe2ea586465c7c54b0100000000000000",
      "sequence": 0
    }
  ],
  "vout": [
    {
      "value": 25.00000226,
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 c6beeb1edba75692e4a82dc964a36fb98052aae1 OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a914c6beeb1edba75692e4a82dc964a36fb98052aae188ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": [
          "1K7sWEEYChza2GZa4yNNzTwsXR7wtRwQNH"
        ]
      }
    }
  ],
  "blockhash": "0000000000000000073b37f7e898f755d356905ad4f6ddb44d5b5189021eb7bc",
  "confirmations": 1,
  "time": 1716782315,
  "blocktime": 1716782315,
  "blockheight": 71704,
}
```

在这个示例中：
- **version**：交易版本号。
- **inputs**：包含一个输入，`previous_output` 字段指向一个不存在的交易，索引为 `0xFFFFFFFF`，表示这是一个 Coinbase 交易。其中的coinbase字段包含矿工的额外数据，比如矿池的名称，区块高度等等信息。
- **script**：输入脚本包含任意数据。
- **outputs**：一个输出，包含矿工的奖励地址和奖励金额。
- **locktime**：交易的锁定时间，通常为 0。

通过这些步骤，矿工可以构建并验证一个 Coinbase 交易，确保其符合MVC网络的协议和规则。
