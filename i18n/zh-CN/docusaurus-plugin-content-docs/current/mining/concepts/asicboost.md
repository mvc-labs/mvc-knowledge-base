---
sidebar_position: 11
---

# ASICBoost

本文介绍一种优化挖矿算力的方式——ASICBoost。

在比特币挖矿领域，随着竞争的日益激烈，各种优化技术应运而生。其中，ASICBoost是一种能够显著提高矿机运行效率的技术。本文将从专业的技术角度分析什么是ASICBoost，它的实现原理，为什么可以提高矿机运行效率，以及矿池如何支持ASICBoost。

## 什么是ASICBoost

ASICBoost是一种通过优化SHA-256哈希计算过程来提高比特币挖矿效率的技术。由Dr. Timo
Hanke在2016年提出，ASICBoost通过减少哈希计算中某些重复步骤，从而降低每次哈希计算所需的功耗和时间。这种优化可以在现有的ASIC硬件上实现，而不需要对芯片进行物理改造。

本文简要概括一下AsicBoost实现的原理，如果需要详细了解AsicBoost技术细节，请参阅论文：[AsicBoost - A Speedup for Bitcoin Mining](https://arxiv.org/pdf/1604.00575)。

## ASICBoost原理简介

ASICBoost的核心思想是利用SHA-256哈希计算的中间状态。SHA-256算法是一个迭代过程，每轮计算都依赖前一轮的输出。ASICBoost通过在哈希计算中引入“中间状态重用”技术，减少了总的计算量。

具体来说，ASICBoost有两种实现方式：

1. **显性 ASICBoost (Explicit ASICBoost)**：
   - 显性 ASICBoost 是一种公开且透明的方法，通过修改比特币区块头的特定字段来实现工作量证明（PoW）计算的优化。这种方法需要修改比特币协议的一部分，因此它是显性的，即可以被网络上的其他节点检测到。
   - 显性 ASICBoost 主要通过修改区块头中的版本号字段（Version Field）来实现。这种方法需要矿工在挖矿设备和软件上进行特定的优化配置。通过调整区块头中的版本号来产生相同的中间状态，减少计算量。不同的版本号可以映射到同一个中间哈希状态，使得在计算新的哈希时可以直接使用之前缓存的中间状态。

2. **隐性 ASICBoost (Covert ASICBoost)**：
   - 隐性 ASICBoost 是一种隐蔽的方法，通过在不改变区块头的显著字段的情况下实现工作量证明计算的优化。这种方法难以被网络上的其他节点检测到，因此称为隐性。
   - 隐性 ASICBoost 的实现方式比较复杂，通常需要矿工在硬件层面进行特定的电路设计和优化，以实现计算量的减少。

**区别**：
- **透明度**：显性 ASICBoost 是公开透明的，容易被检测到；而隐性 ASICBoost 是隐蔽的，难以被检测到。
- **实现方式**：显性 ASICBoost 主要通过修改比特币协议中的版本号字段实现；隐性 ASICBoost 通过硬件电路设计优化实现。
- **社区反应**：由于隐性 ASICBoost 难以被检测且被认为可能违反了比特币网络的公平性，因而在社区中存在争议。显性 ASICBoost 因其透明性，受到的争议相对较少。

目前主流的ASICBoost实现方式是显性ASICBoost，因为它相对简单且易于实现，同时也更容易被网络上的其他节点检测到。

## 提高效率的原因

ASICBoost能够提高矿机运行效率的主要原因在于以下几点：

1. **计算量减少**：通过重用中间状态，ASICBoost减少了每次哈希计算所需的总运算量。这意味着矿机可以在相同时间内执行更多的哈希计算，提高了整体算力。

2. **功耗降低**：减少了不必要的计算步骤后，矿机在执行每次哈希计算时消耗的电力也相应减少。这对于大规模矿场尤为重要，因为电力成本是矿场运营的主要支出之一。

3. **硬件优化**：ASICBoost不需要对现有的ASIC硬件进行物理改造，可以通过固件或软件更新实现。这使得现有矿机能够快速部署和利用这一技术，提升挖矿效率。

## 矿池如何支持ASICBoost

为了支持ASICBoost，矿池需要进行一些调整和配置。这主要涉及到对矿工提交的工作（work）的验证和管理。具体来说，矿池需要：

1. **工作任务生成**：矿池在生成工作任务时，需要生成能够利用ASICBoost的任务。这包括调整区块头中的版本号，使其适应ASICBoost的计算模式。

2. **工作验证**：矿工提交的解决方案需要经过矿池的验证。矿池必须能够识别和验证利用ASICBoost技术的哈希计算结果，以确保其合法性和有效性。

3. **软件兼容**：矿池需要更新其软件，确保与使用ASICBoost的矿工兼容。这包括对协议的调整和优化，以支持ASICBoost的特性。

4. **合作与协调**：矿池运营商需要与矿工和ASIC制造商合作，确保ASICBoost技术的顺利实施和部署。这包括提供技术支持和协助，帮助矿工实现和优化ASICBoost。

## Stratum协议变更

[Stratum协议](stratum-protocol.md)是一种常用的矿池通信协议，用于矿工和矿池之间的数据交换。为了支持ASICBoost技术，矿池可以通过Stratum协议进行相应的调整和优化。这包括：

**协议扩展**：矿池可以通过扩展Stratum协议，增加对ASICBoost的支持。这包括定义新的消息类型和字段，以传递ASICBoost相关的信息。相比普通的Stratum协议，AsicBoost拓展了如下插件：

* "version-rolling"
* "minimum-difficulty"
* "subscribe-extranonce"

**mining.configure**
：矿池可以通过mining.configure消息向矿工发送ASICBoost相关的配置信息。这包括指定使用ASICBoost的方式、版本号调整等。这也是区分ASICBoost矿工和普通矿工的一种方式。

```json
 {
  "method": "mining.configure",
  "id": 1,
  "params": [
    [
      "minimum-difficulty",
      "version-rolling"
    ],
    {
      "minimum-difficulty.value": 2048,
      "version-rolling.mask": "1fffe000",
      "version-rolling.min-bit-count": 2
    }
  ]
}
```

**使用version-rolling插件**：
version-rolling插件是ASICBoost的一个重要组成部分，用于调整区块头中的版本号。矿池可以通过version-rolling插件向矿工发送版本号调整的信息，以支持ASICBoost的计算模式。

```json
 {
  "method": "mining.configure",
  "id": 1,
  "params": [
    [
      "version-rolling"
    ],
    {
      "version-rolling.mask": "1fffe000",
      "version-rolling.min-bit-count": 2
    }
  ]
}

```

其中mask字段用于指定版本号的掩码，min-bit-count字段用于指定版本号调整的最小位数。这两个字段决定version可以调整的范围。

矿池在处理ASICBoost矿工提交的工作时，需要根据这些配置信息对区块头进行相应的调整和验证才能正确打包交易。

更多对接细节请参考[Stratum Extentions](https://github.com/slushpool/stratumprotocol/blob/master/stratum-extensions.mediawiki)。

## 结论

ASICBoost作为一种优化比特币挖矿效率的技术，通过减少SHA-256哈希计算中的重复步骤，显著提高了矿机的计算效率和能效比。其实现原理主要依赖于对中间状态的重用，既可以减少计算量，又能降低功耗。矿池通过适当的调整和配置，可以支持ASICBoost技术，从而为矿工提供更高效的挖矿环境。随着比特币网络的不断发展，ASICBoost等创新技术将在提升挖矿效率和降低运营成本方面发挥重要作用。
