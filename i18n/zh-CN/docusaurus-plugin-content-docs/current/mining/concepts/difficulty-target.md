---
sidebar_position: 2
---
# 难度目标与难度计算

介绍难度目标以及全网难度的概念。

> 注意，难度目标和全网难度是两个不同的概念。难度目标是一个区块的哈希值必须小于的值，全网难度是获得下一个有效区块的难度。一般难度目标越小，难度越大，全网难度越大，挖矿越困难。

## 难度目标

难度目标是一个区块的哈希值必须小于的值。区块头哈希算法计算出来的哈希值可以看作一个256位的16进制数，哈希值前面的0的个数越多，哈希值对应的数就越小。难度目标就是规定哈希值必须要小于一个特定的值，符合这个条件的哈希值才能被网络接受。

难度目标在挖矿中决定了矿工在找到一个有效区块哈希值时所需的计算难度。难度目标是为了确保新区块平均每10分钟被发现一次，无论网络的总计算能力如何变化。整个网络就是通过实时调整难度目标，来控制区块产出的速度以及新币发行的速度。

## 难度目标表示

在比特币和MVC网络中，难度目标位于区块头的`bits`字段中。`bits`字段是一个4字节的整数，它表示了难度目标的值。`bits`字段的值是一个16进制数，它使用一种紧凑的形式表示难度目标。紧凑形式的`bits`值可以通过以下公式计算出实际的目标值：


- **紧凑形式**：在MVC网络中，难度目标通常以一种紧凑形式表示，称为“bits”。它是一个4字节的值，通过这个值可以计算出实际的目标哈希值。
- **计算实际目标值**：实际目标值（target）可以从紧凑形式的bits计算出来。计算公式如下：

$$
\text{Target} = \text{Coefficient} \times 2^{(8 \times (\text{Exponent} - 3))}
$$

其中，`Coefficient` 是bits的前三个字节，`Exponent` 是bits的最后一个字节。例如，若bits表示为`0x1d00ffff`，则`Coefficient`是`0x00ffff`，`Exponent`是`0x1d`。

![img.png](/img/blockheader-bits.png)

### 示例

假设当前难度目标表示为 `0x1b0404cb`，我们可以通过以下步骤计算出实际的难度目标值：

**提取系数和指数**：

$$
\text{Coefficient} = 0x0404cb
$$
$$
\text{Exponent} = 0x1b
$$

**计算实际目标值**：

$$
\text{Target} = 0x0404cb \times 2^{(8 \times (0x1b - 3))} \\

\text{Target} = 0x0404cb \times 2^{(8 \times 0x18)} \\

\text{Target} = 0x0404cb \times 2^{192} 

$$

写成16进制数：
$$
\text{Target} = 0x0023AEA3C73B13B193EC4E9D9AD4A03B60000000000000000000000000000000

$$

这个值就是实际的难度目标值，区块头的哈希值必须小于这个值才能被网络接受。也就是说，如果区块头计算出来的hash值小于这个值（2个0开头），那么这个区块就是有效的。

## 难度计算

全网难度是获得下一个有效区块的难度。全网难度是由网络中所有矿工的总计算能力决定的。全网难度是一个动态的值，它会根据网络中矿工的总计算能力实时调整。全网难度的目标是确保新区块平均每10分钟被发现一次。

可以使用mvc-cli命令行工具查看当前全网难度：

```bash
mvc-cli getmininginfo
```

```text
{
  "blocks": 71434,
  "currentblocksize": 339,
  "currentblocktx": 1,
  "difficulty": 34975994469.53414,
  "errors": "",
  "networkhashps": 2.409330669323676e+17,
  "pooledtx": 1,
  "chain": "main"
}
```

在上面的输出中，`difficulty`字段表示当前全网难度的十进制表示。难度值越大，挖矿越困难。

全网难度可以通过难度目标反向计算出来。难度目标越大，难度越低，因此需要定义什么是难度。

### 最大目标（也称为难度1）

在MVC网络中，难度值（Difficulty）是一个相对值，用来表示找到一个有效区块哈希值的难度。它通过将当前目标（Target）与最大目标（Max Target）进行比较来计算。最大目标是最小难度时的目标值，也就是MVC最初的难度目标。

最大难度目标（Max Target）为：
$$
\text{Max Target} = 0x1d00ffff
$$

在十进制表示中，最大目标为：
$$
\text{Max Target} = 0x1d00ffff \times 2^{8 \times (0x1d - 3)}
$$
$$
\text{Max Target} = 0x00ffff \times 2^{8 \times 0x1a}
$$
$$
\text{Max Target} = 65535 \times 2^{208}
$$

### 计算难度值
难度值通过将最大目标除以当前目标来计算：
$$
\text{Difficulty} = \frac{\text{Max Target}}{\text{Current Target}}
$$

这符合我们的认知，如果当前目标越小，难度值就越大。由于是比值的关系，最大难度目标的难度值最小，为单位1。

### 计算难度值的步骤
**将当前难度目标转换为十进制**：
$$
\text{Current Target} = 165608837515678774353553029698295978246167310057892115125170688
$$

**计算最大目标的十进制值**：
$$
\text{Max Target} = 65535 \times 2^{208}
$$
$$
\text{Max Target} \approx 5.788 \times 10^{49}
$$

**相除计算难度值**：
$$
\text{Difficulty} = \frac{5.788 \times 10^{49}}{165608837515678774353553029698295978246167310057892115125170688}
$$

大约可以得到难度值：
$$
\text{Difficulty} \approx \frac{5.788 \times 10^{49}}{1.656 \times 10^{41}}
$$
$$
\text{Difficulty} \approx 3.493 \times 10^8
$$
