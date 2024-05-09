---
sidebar_position: 3
---

# Network Selection

Choosing Mainnet and Testnet.

To facilitate the development and testing of new features and prevent irreversible damage from deploying contracts or
code on the production network, MVC nodes support two types of networks: the mainnet and the testnet. The mainnet is the
real blockchain network where SPACE and tokens have actual value, while the testnet is a blockchain network used for
development and testing, where SPACE and tokens are solely for development and testing purposes.

> Note: Do not deploy contracts or code on the testnet, as the SPACE and tokens there are for development and testing
> only and do not have real value. Additionally, data on the testnet may be reset.

By adjusting the node's startup configuration settings (mvc.conf), you can choose to connect to either the mainnet or
the testnet. By default, the node and client connect to the mainnet. Key configurations include:

1. testnet=0: 0 indicates connection to the mainnet, 1 indicates connection to the testnet.
2. addnode: Addresses of seed nodes for the mainnet and testnet, which can help you quickly find other nodes and start
   synchronizing blocks.
3. init params: Initial parameters for the mainnet and testnet, including initial rewards, halving cycles, genesis block
   locking scripts, etc. (basic genesis consensus).

## Mainnet Configuration

Configure the following in the `mvc.conf` file and start:

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

The current status of the mainnet can be viewed through the [MvcScan](https://www.mvcscan.com/) mainnet browser.

## Testnet Configuration

Currently, MVC uses a testnet called `testnet3`, and more testnets may be expanded in the future based on needs.
Configure the following in the `mvc.conf` file and start:

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

The current status of the testnet can be viewed through the [MvcScan](https://test.mvcscan.com/) testnet browser.

If you need testnet SPACE for testing, you can [run your own testnet node mining](../../mining/config/set-up-your-own.md)
to obtain test coins, or refer
to [applying for a test coin faucet](../../introduction/getting-started/enviroment/claim-faucet.md).
