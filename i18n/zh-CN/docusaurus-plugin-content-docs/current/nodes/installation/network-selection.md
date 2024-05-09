---
sidebar_position: 3
---
# 网络选择

选择主网和测试网。

为了方便开发和测试新功能，防止合约或者代码部署上线造成无法挽回的损失。MVC节点支持主网和测试网两种网络，主网是真实的区块链网络，上面的space和token具有真实的价值，测试网是用于测试的区块链网络，其上的space和token仅用于开发和测试。

> 注意：请勿在测试网上部署合约或者代码，测试网上的space和token仅用于开发和测试，不具有真实价值。并且测试网上的数据可能会被重置。

通过调整节点的启动项配置（mvc.conf），可以选择连接到主网或者测试网。默认情况下，节点和客户端连接到主网。主要配置包括以下几点：

1. testnet=0：0表示连接到主网，1表示连接到测试网。
2. addnode：主网和测试网的种子节点地址，可以帮你快速找到其他节点并开始同步区块。
3. init params：主网和测试网的初始参数，包括初始奖励、减半周期、创世区块锁定脚本等（创世基本共识）。

## 主网配置

在`mvc.conf`文件中进行如下配置并启动：

```text
# mainnet conf
testnet=0

# mainnet peers
addnode=81.163.20.40:9883
addnode=43.132.109.146:9883
addnode=43.154.137.194:9883
addnode=82.157.232.16:9883
addnode=node.mvclabs.io:9883

# mainnet init params
# init params
firstBlockReward=1365000000000000
initialReward=2500000000
subsidyHalvingInterval=131250
firstBlockGenesisLockScript=fbb4f97162e02d3be2c860c7f4df5d860030b07f
genesisLockHeight=10
```

主网目前的状态可以通过[MvcScan](https://www.mvcscan.com/)主网浏览器查看。

## 测试网配置

目前MVC使用的测试网称为`testnet3`，以后根据需求可能拓展更多测试网，在`mvc.conf`文件中进行如下配置并启动：

```text
# testnet
testnet=1

# testnet peers
addnode=43.132.109.146:29883
addnode=43.129.203.34:19883
addnode=node.mvclabs.io:19883

# testnet init params
firstBlockReward=420000000000000
initialReward=5000000000
subsidyHalvingInterval=147000
firstBlockGenesisLockScript=5e1514305163dba48bc5500ada085c787e7e0dbe
genesisLockHeight=10
# testnet chainwork is different from mainnet
minimumchainwork=0000000000000000000000000000000000000000000000001388a1b78b278709
```

测试网目前的状态可以通过[MvcScan](https://test.mvcscan.com/)测试网浏览器查看。

如果需要测试网space进行测试，可以自行[运行测试网节点挖矿](../../mining/config/set-up-your-own.md)获得测试币，或者参考[申请测试币水龙头](../../introduction/getting-started/enviroment/claim-faucet.md)。
