---
sidebar_position: 7
---

# Acceptable Fee Rate Config

The acceptable fee rate refers to the minimum fee rate that miners are willing to accept during the mining process. If
the transaction fee rate is lower than the acceptable fee rate, miners will not include that transaction. The acceptable
fee rate is a crucial parameter for miners as it directly impacts their revenue.

Configuring the acceptable fee rate is an important mining strategy. Miners can set different acceptable fee rates based
on their circumstances. If the acceptable fee rate set by the miner is too high, they might miss out on some low-fee
transactions, thereby affecting their revenue. If the acceptable fee rate is set too low, they might accept some low-fee
transactions, but these transactions might reduce the connectivity between miners and increase the risk of orphaned
blocks. For more details, please refer to [Reorg and Orphaned Blocks](reorg-orphan-51attack.md).

Therefore, configuring an acceptable and reasonable fee rate is one of the important strategies for miners to
participate in the network game and maximize their revenue.

## Fee Rate Configuration Methods

In the [node startup command](../../nodes/installation/start-up-command.md), there are two parameters related to
transaction fee rates: `-blockmintxfee` and `-minrelaytxfee`.

- `-blockmintxfee`: The minimum transaction fee rate accepted for mining, measured in satoshis. Transactions with a fee
  rate lower than this configuration will not be included in the block by the node. The default value is 500 sat/KB.
- `-minrelaytxfee`: The minimum transaction fee rate accepted by the node, measured in satoshis. Transactions with a fee
  rate lower than this configuration will not be forwarded by the node. The default value is 250 sat/KB.

To improve node connectivity and balance network performance, it is recommended to use the default configuration during
mining.
