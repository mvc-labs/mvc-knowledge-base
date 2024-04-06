---
sidebar_position: 2
---
# 超高性能超低费率

高性能是通往web3.0的必经之路，而低费率则普惠区块链的基础。MVC区块链的设计目标之一就是实现超高性能和超低费率。

MVC架构和网络在设计之初就充分考虑了性能和费率的问题，吸取了传统区块链以及各种新一代公链的技术创新，从理论上将可能产生性能瓶颈的地方进行了大量优化，使得MVC在上线之初已经具备超过10000+TPS的性能，并且预留了可以随着增强硬件配置进行横向拓展的能力。

本文简单介绍以下实现超高性能和超低费率的几个关键技术。

## UTXO模型
UTXO模型（UnspentTransactionOutput 未花费交易输出）是比特币的核心设计之一，相比于以太坊等链账户模型，它的优势在于可以实现大规模的并行处理。

账户模型是维护了一个个全局的状态（账户余额，合约数据信息等），在进行每一步交易之前，都需要对这个全局状态进行读写操作，类似于银行账户余额。在高并发的情况下，对全局状态的读写会导致资源竞争，为了确保安全，账户必须进行串行有序的操作，这也就是为什么账户模型存在一个nonce字段来标记交易的顺序，交易的有效性严格依赖这些顺序，交易之间也必须按顺序进行校验。

UTXO模型则更加类似于现金或者硬币，并没有一个全局的状态来记录每一个地址的余额，而是通过一个个未花费的交易输出（单独的带面值硬币）来表示它的归属关系。地址的余额是通过统计所有未花费的输出（UTXO）总面额来计算出来的。在进行交易的时候，只需要对这些未花费的交易输出进行操作，而不需要对全局状态进行读写，这样就可以实现大规模的并行处理，提高了整个系统的性能。用日常生活的例子来对比，utxo模型维护的状态实际上就是一大堆硬币，每个硬币上面标记了面值和归属（或者花费它的条件），每个硬币之间都是独立互不影响的，可以同时对任意数量的硬币进行操作，这也就带来了更高的并行处理能力。

下图表示了UTXO模型的基本结构：

![img/utxo-presentation.png](/img/utxo-presentation.png)

每一笔交易都包括输入和输出，输入一定来自于前一个交易的输出。类比而言，每一个输入相当于将对应的UTXO销毁，每一个输出则是创造新的UTXO。在比特币中，每一笔交易都会消耗之前的UTXO，生成新的UTXO，UTXO能且只能被花费一次，一旦花费就不再是UTXO，也就不再参与计算余额，这样就保证了每一笔交易都是有效的，不会出现双花的情况。

>注意：coinbase交易，也就是矿工挖矿获得收益的交易不会消耗UTXO，只会产生新的utxo，这也可以看作是铸币的过程。

从上面的图示可以看出，UTXO模型控制的最小单位不是交易，而是一个个的UTXO，理论上可以对任意数量的UTXO同时进行操作，这就是UTXO模型的并行处理能力的来源。为了突出UTXO的并行性，我们可以用几个简单的例子来说明：

1. UTXO转账并行：我可以构造一个1输入，10000输出的交易，将一笔钱平均分给10000个人，使用1笔交易就可以完成，而账户模型完成同样的目标则需要10000笔有序的交易交易，前序转账未完成前不能进行下一笔。（UTXO并行转账）
2. UTXO收款并行：我的地址可以同时接受10000笔转账，注意这里是同时，它们之间的顺序并不重要，谁先到谁后到都不影响最终结果，而账户模型则需要交易出现在区块中的顺序进行串行处理。（UTXO并行接收）
3. UTXO处理并行：节点软件或者矿工可以将交易池中的交易按照不同的规则（比如UTXO相关性）进行分组，然后由多个处理模块并行处理，这样可以通过横向拓展提高整个网络的处理能力，要知道能够进行横向拓展是无限扩容的必要条件，而账户模型则需要对每一笔交易进行有序处理，无法并行。（UTXO并行处理）

因此，MVC采用UTXO模型作为交易并行处理的根基，同时解决了UTXO模型的一些缺点，比如难以实现智能合约，难以维护全局状态等问题，使得MVC具备了高性能的基础。

更多UTXO和交易结构相关的内容请参考后续章节。

## 超大区块

比特币网络每10分钟产生一个区块，每个区块的大小限制在1M（考虑SegWit也只能将理论限制提升到4M，依然严重不足），这个限制在当时为了防止网络被恶意攻击，保证网络的稳定性。但是这个限制也带来了一些问题，比如交易拥堵，交易费率过高等问题。由于比特币网络已经运行多年，形成了强大的共识，修改区块大小的上限需要硬分叉，扩容之争也带来了后续的BCH和BSV算力战争的混乱。

MVC吸取了这些前辈的教训，从最开始的设计就没有设置区块大小的上限，而是采用了动态调整的方式，根据网络的实际情况来调整区块大小，矿工拥有动态调整区块大小上限的能力。目前节点默认接受的4G区块上限是一个软限制，可以随时调整节点软件的配置来适应网络的需求，这样就可以避免了网络拥堵，提高了网络的吞吐量。

以简单的p2pkh一对一转账交易计算。单笔交易需要192字节的数据量，当前4G的区块处理能力已经可以容纳超过2000万笔交易，tps达到约35000，这样的处理能力已经远远超过了目前的需求，可以满足未来的增长需求, 作为比较，当前的visa网络的处理能力大约在同一个数量级，因此在MVC网络达到VISA的使用量和级别之前，这个容量都是绰绰有余的。而一旦超过了这个上限，矿工也只需要简单加倍区块大小上限，就可以继续提高网络的处理能力。

为了有足够的性能处理如此大的区块，MVC节点设计的时候充分利用了现代硬件的优势，比如SSD硬盘特性，高速网络，多核CPU等，这样可以保证节点在处理大区块的时候不会出现性能瓶颈。很多互联网大型应用已经证明，接受并处理4GB数据对于很多数据中心来说根本不是个事，现在的硬件条件足以应付全人类的交易。并且在未来的节点升级中，也可以使用专用芯片来加速区块的处理，提高网络处理的性能。另外得益于UTXO模型的并行处理能力，MVC的下一代超级节点一定是分布式集群架构，可以通过横向拓展来提高整个网络的处理能力。

![/img/mvc-processor.png](/img/mvc-processor.png)

超大的区块处理能力同时也开放了降费的可能性，因为可以容纳更多的交易，矿工可以在保证网络安全的前提下降低交易费率，提高用户体验。这种机制也可以引入矿工之间的良性竞争，让矿工在竞争中逐渐降低交易费率，以薄利换多销，提高网络的整体效率，让生态的所有人获益，最终将MVC发展成web3强大的基础设施。

## 安全零确认

零确认指的是交易还没有被打包进区块，但是已经被广播到网络中，被主要的交易处理商（或者矿工）所接受。在比特币网络中，零确认交易是不安全的，因为比特币网络的区块产生时间是10分钟，而且区块大小有限，导致交易需要等待一段时间才能被确认，这样就给了攻击者足够的时间进行双花攻击。因此比特币网络中的零确认交易是不安全的，商家一般不接受零确认交易。

MVC在此基础上进行了改进，首先移除了可能导致未确认交易被替换的RBF机制，让内存池交易具备不可篡改性，其次由于MVC的区块大小没有限制，可以容纳更多的交易，因此对于**费率正常**的交易，可以预期在下一个区块内被打包，这样极大降低了双花的可能性。另外MVC还内置了交易安全机制，如果有交易被双花，可以立刻被网络发现并且标记，这样可以让商家在接受交易的时候更加放心。

通过网络节点之间更强更紧密的链接，让交易以最快的速度触达全网，让双花的代价无限放大，这也是所谓的“小世界网络”希望实现的目标：

![/img/zero-confirmation.png](/img/zero-confirmation.png)


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
