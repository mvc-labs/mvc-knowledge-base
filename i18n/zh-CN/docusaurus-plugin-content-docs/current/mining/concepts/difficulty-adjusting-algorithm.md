---
sidebar_position: 3
---
# 难度调整算法DAA

如何调整难度目标以确保区块的平均产出时间为10分钟。

## 什么是难度调整算法

难度调整算法是根据过去的区块产出速度来调整下一个区块的[难度目标](difficulty-target.md)，以确保新区块的平均产出时间为10分钟。难度调整算法是区块链网络中的一个重要组成部分，它可以控制区块的产出速度，控制新币的发行速度，同时也确保了区块链的安全性和稳定性。

下文介绍比特币的难度调整算法。以及MVC网络中使用的ASERT-DAA算法。

## 比特币的难度调整算法

比特币采用每2016个区块（约两周）进行一次难度调整。以下是比特币难度调整算法的详细步骤：

1. **计算实际生成时间**

实际生成时间是过去2016个区块生成所花费的总时间：

$$
\text{Actual Time} = \text{Time of the Last Block} - \text{Time of the First Block}
$$

2. **计算理想生成时间**

理想生成时间是期望的生成2016个区块的时间：

$$
\text{Target Time} = 2016 \times 10 \, \text{minutes}
$$

$$
\text{Target Time} = 2016 \times 600 \, \text{seconds}
$$

$$
\text{Target Time} = 1209600 \, \text{seconds}
$$

3. **计算新的难度目标**

新的难度目标根据实际生成时间与理想生成时间的比值调整：

$$
\text{New Difficulty Target} = \text{Old Difficulty Target} \times \left( \frac{\text{Actual Time}}{\text{Target Time}} \right)
$$

4. **调整幅度限制**

为了避免难度目标的剧烈波动，比特币协议规定每次难度调整的幅度不能超过四倍或小于四分之一：

$$
\text{New Difficulty Target} = \min\left(\text{Old Difficulty Target} \times 4, \max\left(\frac{\text{Old Difficulty Target}}{4}, \text{New Difficulty Target}\right)\right)
$$

这种计算方法的缺陷是调整的速度较慢，对于比特币这样的成熟稳定的区块链网络来说，这种调整速度是可以接受的。但是对于新兴的区块链网络来说，价格的波动可能会导致算力的剧烈波动，从而严重影响区块的产出速度。

BCH刚从比特币分叉出来时就出现了由算力潮汐导致的出块困难。之后BCH采用了EDA（Emergency Difficulty Adjustment）算法，以便在短时间内调整难度，确保区块的产出速度。但是EDA算法存在一些问题，容易被攻击，因此BCH后来采用了ASERT-DAA算法，经过实际的考验，ASERT-DAA算法在BCH网络中表现良好。因此MVC网络也采用了ASERT-DAA算法。

## ASERT-DAA算法

[ASERT-DAA](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/2020-11-15-asert.md)算法是BCH网络中的难度调整算法，它是一种基于算力的动态难度调整算法，可以在短时间内调整难度，确保区块的平均产出时间为10分钟。

比特币现金（Bitcoin Cash, BCH）的Asert难度调整算法（Aserti3-2d）是一种改进的难度调整机制，用于解决传统难度调整算法的一些缺陷，确保网络在算力波动时保持稳定的出块时间。Asert（Automatic Difficulty Adjustment by Smoothly Updating and Real-Time Targeting）算法在2020年11月15日的升级中被引入。以下是Asert难度调整算法的介绍：

### Asert难度调整算法的特点

1. **连续调整**：
   Asert算法采用连续的难度调整机制，而不是每2016个区块进行一次调整。这样可以更及时地反映出当前算力的变化，从而保持更稳定的出块时间。

2. **时间参数化**：
   Asert通过时间参数化的方式进行调整，直接根据实际出块时间与目标出块时间的差异调整难度。这使得调整更加灵活和精确。

3. **指数平滑**：
   Asert算法使用指数平滑方法，避免了难度目标的剧烈波动，确保了平稳过渡和稳定性。

### Asert难度调整公式

Asert算法的核心公式如下：

$$
D_{next} = D_{prior} \times 2^{\left( \frac{t_{actual} - t_{expected}}{T} \right) / \tau}
$$

其中：
- $ D_{next}$ 是下一个区块的难度目标。
- $ D_{prior}$ 是当前区块的难度目标。
- $ t_{actual}$ 是当前区块的时间戳与上一个调整区块的时间戳之差。
- $ t_{expected}$ 是目标区块时间间隔乘以区块数。
- $ T$ 是目标出块时间，通常为600秒（10分钟）。
- $ \tau$ 是时间常数，用于平滑调整，通常为172800秒（2天）。

### 计算步骤

1. **获取时间差**：
   计算当前区块的时间戳与上一个调整区块的时间戳之差，即 $ t_{actual}$。

2. **计算目标时间差**：
   根据期望的出块时间间隔和实际区块数量，计算目标时间差，即 $ t_{expected}$。

3. **计算难度调整因子**：
   使用公式计算难度调整因子：

   $$
   \text{调整因子} = 2^{\left( \frac{t_{actual} - t_{expected}}{T} \right) / \tau}
   $$

4. **计算下一个区块的难度目标**：
   通过调整因子计算下一个区块的难度目标：

   $$
   D_{next} = D_{prior} \times \text{调整因子}
   $$

### 例子

假设当前区块的难度目标 $ D_{prior} $ 为100000，实际时间差 $ t_{actual}$ 为1200秒，目标时间差 $ t_{expected}$ 为600秒，目标出块时间 $ T$ 为600秒，时间常数 $ \tau$ 为172800秒。

1. **计算时间差**：

   $$
   t_{actual} = 1200
   $$
   $$
   t_{expected} = 600
   $$

2. **计算调整因子**：

   $$
   \text{调整因子} = 2^{\left( \frac{1200 - 600}{600} \right) / 172800}
   $$
   $$
   \text{调整因子} = 2^{\left( \frac{600}{600} \right) / 172800}
   $$
   $$
   \text{调整因子} = 2^{1 / 172800}
   $$

3. **计算新的难度目标**：

   $$
   D_{next} = 100000 \times 2^{1 / 172800}
   $$

这种计算使得MVC网络能够更平滑地调整难度，以应对算力的波动，确保网络的稳定性和可靠性。
