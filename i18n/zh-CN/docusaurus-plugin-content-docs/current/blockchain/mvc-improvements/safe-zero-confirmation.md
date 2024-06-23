---
sidebar_position: 7
---
# 零确认安全性

介绍什么是零确认，以及零确认为什么可以保证安全。

零确认指的是交易还没有被打包进区块，但是已经被广播到网络中，被主要的交易处理商（或者矿工）所接受。在比特币网络中，零确认交易是不安全的，因为比特币网络的区块产生时间是10分钟，而且区块大小有限，导致交易需要等待一段时间才能被确认，这样就给了攻击者足够的时间进行双花攻击。因此比特币网络中的零确认交易是不安全的，商家一般不接受零确认交易。

## 网络结构改善

MVC在此基础上进行了改进，首先移除了可能导致未确认交易被替换的RBF机制，让内存池交易具备不可篡改性，其次由于MVC的区块大小没有限制，可以容纳更多的交易，因此对于**费率正常**的交易，可以预期在下一个区块内被打包，这样极大降低了双花的可能性。另外MVC还内置了交易安全机制，如果有交易被双花，可以立刻被网络发现并且标记，这样可以让商家在接受交易的时候更加放心。

通过网络节点之间更强更紧密的链接，让交易以指数级扩散并触达全网，让双花的代价无限放大，这也是所谓的“[小世界网络](../../mining/concepts/small-world-model.md)”希望实现的目标：

![/img/zero-confirmation.png](/img/zero-confirmation.png)


## 中本聪的设计思路

其实这种设计正是比特币的发明者中本聪所设想的，中本聪在bitcoinTalk中曾经提到过为何10秒中已经足够让交易保证安全：

[点击查看中本聪本人的评论](https://bitcointalk.org/index.php?topic=423.msg3819#msg3819)

```text
I believe it'll be possible for a payment processing company to provide as a service the rapid distribution of transactions with good-enough checking in something like 10 seconds or less.

The network nodes only accept the first version of a transaction they receive to incorporate into the block they're trying to generate.  When you broadcast a transaction, if someone else broadcasts a double-spend at the same time, it's a race to propagate to the most nodes first.  If one has a slight head start, it'll geometrically spread through the network faster and get most of the nodes.

A rough back-of-the-envelope example:
1         0
4         1
16        4
64        16
80%      20%

So if a double-spend has to wait even a second, it has a huge disadvantage.

The payment processor has connections with many nodes.  When it gets a transaction, it blasts it out, and at the same time monitors the network for double-spends.  If it receives a double-spend on any of its many listening nodes, then it alerts that the transaction is bad.  A double-spent transaction wouldn't get very far without one of the listeners hearing it.  The double-spender would have to wait until the listening phase is over, but by then, the payment processor's broadcast has reached most nodes, or is so far ahead in propagating that the double-spender has no hope of grabbing a significant percentage of the remaining nodes.
```

MVC的零确认设计思路就是践行了中本聪所设想的，通过各种安全机制，让双花的代价无限放大，让商家可以放心接受零确认交易，提高用户体验。

实际操作中，MVC可以根据交易转账的金额，综合双花所需的成本，对交易给出一个风险评级，风险评级越高的交易，需要等待的区块数越多，这样可以让商家根据自己的风险承受能力来决定是否接受零确认交易。
