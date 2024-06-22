---
sidebar_position: 2
---
# 申请测试币水龙头

介绍如何通过水龙头申请测试币。

## 前置工作

首先确保你已经完成环境搭建并成功打印出地址，参考[环境搭建](setup-project.md)。

```text
Mnemonic seed exists: <* * * * * * * * * * * *>, will use this one.
Creating wallet with seed: <* * * * * * * * * * * *> and path <m/44'/10001'/0'/0/0>
Your private key *
Your address mi51xGS45itNchtDRdRP3Fbh3vjEQWxh38
Your balance 0 satoshis
```

记录你的address来申请测试币。

## 申请测试币

目前witnessonchain服务提供space测试水龙头。

你可以访问：[Space Testnet Faucet](https://witnessonchain.com/faucet/tspace) 来申请测试币。

输入地址，点击`Shoot me the coin`按钮，等待几秒钟，你的地址将会收到一定数量的测试币。如下图所示：

![space-faucet](/img/witnessonchain-faucet.png)

你可以在浏览器查询你的地址余额，或者再执行一次环境搭建的代码来查看余额。

```bash
node src/index.js
```

此时你应该可以看到你的余额不再是0。

```text
Your balance 10000000 satoshis
```

## 申请主网测试币

如果你需要申请主网测试币，可以访问：[Space Mainnet Faucet](https://witnessonchain.com/faucet/space) 来申请主网测试币。需要注意的是主网地址格式与测试网有所不同，主网地址以`1`开头，测试网地址以`m`或者`n`开头。
