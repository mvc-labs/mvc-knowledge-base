---
sidebar_position: 2
---

# 首次运行

MVC节点需要运行在Ubuntu 20.04 LTS系统上。请确保你的运行环境为Ubuntu 20.04 LTS并满足[硬件要求](hardware-requirements.md)。

如果你的系统不是Ubuntu 20.04 LTS，你可以使用Docker来运行节点，具体请参考[使用Docker构建与运行](docker-build.md)。

## 安装环境依赖

如果你在本地已经进行了[编译构建](node-compilation.md)，你的运行环境所需的依赖库已经安装。 可以跳过这一步环境安装。

首先需要安装依赖库，执行如下命令

```bash
sudo apt-get update && sudo apt-get install -y build-essential \
  libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils \
  libboost-system-dev libboost-filesystem-dev libboost-chrono-dev \
  libboost-program-options-dev libboost-test-dev libboost-thread-dev \
  libdb-dev libdb++-dev libczmq-dev
```

## 下载二进制文件

然后创建一个目录，下载二进制文件或者[点击手动下载](https://github.com/mvc-labs/mvc-mining-instruction/releases/download/v0.2.0.0/mvc.tar.gz)
。为了方便调试，我们统一将当前的工作目录设置为`~/mvc`。

```bash
cd ~ && mkdir -p mvc && cd mvc && wget https://github.com/mvc-labs/mvc-mining-instruction/releases/download/v0.2.0.0/mvc.tar.gz && tar -zxvf mvc.tar.gz && rm mvc.tar.gz*
```

你同样会得到bin目录下的三个文件：mvcd、mvc-cli、mvc-tx，这三个文件分别是节点程序、节点命令行工具、交易工具。

## 下载并修改配置

mvc需要各种启动项来运行，你可以下载一个示例配置文件，然后修改配置文件：

```bash
cd ~/mvc &&
wget https://github.com/mvc-labs/mvc-mining-instruction/releases/download/v0.2.0.0/mvc.conf
```

你可以自由修改mvc.conf文件，比如修改rpcuser和rpcpassword，以及其他配置项。具体配置项的含义和用法请参考[配置文件说明](start-up-command.md)
，如果你不了解参数的含义，建议使用默认配置，默认配置是主网并且经过优化。

## 启动节点

创建存储区块的数据目录：

```bash
mkdir -p ~/mvc/data
```

这个目录用来存储区块数据，如果你需要重新同步区块，可以删除这个目录。你也可以从节点快照服务下载区块数据并保存在这个目录下。

然后启动节点：

```bash
~/mvc/bin/mvcd -conf=~/mvc/mvc.conf -datadir=/home/$USER/mvc/data &
```

你也可以使用nohup命令来启动节点，防止终端关闭后节点程序退出。

```bash
nohup /home/$USER/mvc/bin/mvcd -conf=/home/$USER/mvc/mvc.conf -datadir=/home/$USER/mvc/data &
```

通过`data/mvcd.log`文件查看节点日志，如果你的节点启动失败，可以查看日志文件来定位问题。

```bash
tail -f ~/mvc/data/mvcd.log
```

## 使用命令行工具

你可以使用mvc-cli命令行工具来操作节点，首先将mvc-cli alias到config文件上：
```bash
alias mvc-cli="/home/$USER/mvc/bin/mvc-cli -conf=/home/$USER/mvc/mvc.conf" 
```

然后可以使用mvc-cli命令来操作节点，比如获取节点信息：

```bash
mvc-cli getinfo
```

如果配置正确，你会看到节点的信息。 之后等待节点同步即可，如果长时间同步失败，可以考虑排除网络因素，或者查看节点日志文件。

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
