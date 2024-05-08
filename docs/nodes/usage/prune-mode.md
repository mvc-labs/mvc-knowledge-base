---
sidebar_position: 4
---
# Prune Mode

The prune mode refers to a feature that allows users to reduce the storage space required by an MVC node. It works by selectively deleting old blockchain data that isn't needed for future operations, while ensuring that the node can still function fully in terms of processing and verifying new transactions.

## How it works

Full Blockchain Data: Normally, a full node on the MVC network downloads and stores the entire blockchain, which contains every transaction ever made. This requires a significant amount of storage space, which grows over time as more transactions are added to the blockchain.

Pruning: When prune mode is enabled, the node will download the entire blockchain but only keep the most recent data necessary to operate fully. This means that older blocks are discarded or "pruned" from the storage. Specifically, only the blocks' headers and the transactions relevant to the node’s operation (like those related to the node’s wallet) are kept.

Functionality: Despite pruning old blocks, the node can still validate new transactions and blocks, and serve the blockchain data up to the point of the last few blocks it has kept. It achieves this by ensuring it retains the block headers and the most recent state of the blockchain, which are necessary for validating new transactions and blocks.

Benefits: The primary benefit of pruning is to reduce the storage requirements for running a MVC node, making it more accessible for users with limited storage capabilities. This helps in maintaining decentralization of the network, as more users can run nodes without facing high storage costs.

Trade-offs: While pruning reduces storage requirements, a pruned node cannot serve historical blockchain data beyond its stored limit, which means it cannot contribute to historical data requests from other nodes. This is a trade-off between storage efficiency and full historical data availability.

Pruning is a useful feature for individual users or small organizations that wish to participate in the MVC network without committing extensive resources to storage. It helps keep the node operational for all essential purposes while managing resources efficiently.

## How to enable prune mode

### Option A: Using the Configuration File

1. Open the configuration file of your MVC node. The default location for the configuration file is `~/.mvc/mvc.conf`.
2. Add the following line to the configuration file:

```
prune=<n>
```

Replace <n> with the number of megabytes you want to allocate for blockchain data storage. For example, to allocate 1 GB of storage, you can set `prune=1000`. See [start up command](../installation/start-up-command.md) for more information.

### Option B: Using the Startup Command

When starting the MVC node, you can specify the prune mode directly in the startup command. Use the following command:

```
mvcd -prune=<n>
```

Replace <n> with the number of megabytes you want to allocate for blockchain data storage. For example, to allocate 1 GB of storage, you can use `mvcd -prune=1000`. See [start up command](../installation/start-up-command.md) for more information.

### Option C: Using the MVC-CLI

You can prune the blockchain data using the MVC-CLI tool. Use the following command:

```
mvc-cli pruneblockchain <n>
```

Replace <n> with the height of the block up to which you want to prune the blockchain data. For example, to prune the blockchain up to block height 500, you can use `mvc-cli pruneblockchain 500`. See [MVC-CLI Blockchain](../usage/mvc-cli/blockchain.md) for more information.

## How to confirm prune mode

The data folder holding blockchain data is located at `${YOUR_MVC_DATA_PATH}/blocks`. You can check the size of this folder to confirm that the prune mode is working as expected. If the size of the `blocks` folder is within the limit set for pruning, it indicates that the node is successfully pruning old blockchain data.

Typically, if the prune mode is working correctly, the size of the `blocks` folder should not exceed the limit set for pruning. And you will see the blkxxxx.dat is not continuous which means some blocks are pruned.
