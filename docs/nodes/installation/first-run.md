---
sidebar_position: 2
---

# Run for the First Time

Running an MVC Node on a Linux Server

MVC nodes need to operate on Ubuntu 20.04 LTS systems. Please ensure that your operating environment is Ubuntu 20.04 LTS
and meets the [hardware requirements](hardware-requirements.md).

If your system is not Ubuntu 20.04 LTS, you can use Docker to run the node; for specifics, please refer
to [Using Docker to Build and Run](docker-build.md).

## Install Environment Dependencies

If you have already performed [node compilation](node-compilation.md) locally, the required dependency libraries for
your operating environment will have been installed. You can skip this step of environment setup.

First, you need to install the dependency libraries by executing the following command:

```bash
sudo apt-get update && sudo apt-get install -y build-essential \
  libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils \
  libboost-system-dev libboost-filesystem-dev libboost-chrono-dev \
  libboost-program-options-dev libboost-test-dev libboost-thread-dev \
  libdb-dev libdb++-dev libczmq-dev
```

## Download Binary Files

Then, create a directory and download the binary files
or [click here to download manually](https://github.com/mvc-labs/mvc-mining-instruction/releases/download/v0.2.0.0/mvc.tar.gz).
For ease of debugging, we set the current working directory to `~/mvc`.

```bash
cd ~ && mkdir -p mvc && cd mvc && wget https://github.com/mvc-labs/mvc-mining-instruction/releases/download/v0.2.0.0/mvc.tar.gz && tar -zxvf mvc.tar.gz && rm mvc.tar.gz*
```

You will also obtain three files in the bin directory: mvcd, mvc-cli, and mvc-tx, which are the node program, node
command line tool, and transaction tool, respectively.

## Download and Modify Configuration

MVC requires various startup options to run; you can download a sample configuration file and then modify the
configuration:

```bash
cd ~/mvc &&
wget https://github.com/mvc-labs/mvc-mining-instruction/releases/download/v0.2.0.0/mvc.conf
```

You are free to modify the mvc.conf file, such as changing the rpcuser and rpcpassword, along with other configuration
items. For the meanings and usage of specific configuration items, please refer to
the [Configuration File Description](start-up-command.md). If you are unfamiliar with the parameters, it is advisable to
use the default settings, which are optimized for the mainnet.

## Start the Node

Create a directory to store the block data:

```bash
mkdir -p ~/mvc/data
```

This directory is used to store block data. If you need to resynchronize the blocks, you can delete this directory. You
can also download block data from a node snapshot service and save it in this directory.

Then start the node:

```bash
~/mvc/bin/mvcd -conf=~/mvc/mvc.conf -datadir=/home/$USER/mvc/data &
```

You can also use the `nohup` command to start the node, to prevent the node program from exiting after the terminal is
closed.

```bash
nohup /home/$USER/mvc/bin/mvcd -conf=/home/$USER/mvc/mvc.conf -datadir=/home/$USER/mvc/data &
```

Check the node logs through the `data/mvcd.log` file. If your node fails to start, you can review the log file to
pinpoint the issue.

```bash
tail -f ~/mvc/data/mvcd.log
```

## Using the Command Line Tool

You can use the mvc-cli command line tool to operate the node. First, alias mvc-cli to the config file:

```bash
alias mvc-cli="/home/$USER/mvc/bin/mvc-cli -conf=/home/$USER/mvc/mvc.conf" 
```

Then, you can use the mvc-cli command to operate the node, such as getting node information:

```bash
mvc-cli getinfo
```

If configured correctly, you will see the node's information. Afterwards, wait for the node to synchronize. If
synchronization fails for a long time, consider ruling out network issues or reviewing the node log files.

```text
{
  "version": 100020000,
  "protocolversion": 70016,
  "walletversion": 160300,
  "balance": 0.00000000,
  "blocks": 0,
  "timeoffset": 0,
  "connections": 4,
  "proxy": "",
  "difficulty": 517546844550.9862,
  "testnet": false,
  "keypoololdest": 1712767255,
  "keypoolsize": 2000,
  "paytxfee": 0.00000000,
  "relayfee": 0.00000250,
  "errors": "Warning: We do not appear to fully agree with our peers! You may need to upgrade, or other nodes may need to upgrade. A large invalid fork has been detected. We are in the startup process (e.g. Initial block download or reindex), this might be reason for disagreement.",
  "maxblocksize": 10000000000,
  "maxminedblocksize": 4000000000,
  "maxstackmemoryusagepolicy": 100000000
}
```

