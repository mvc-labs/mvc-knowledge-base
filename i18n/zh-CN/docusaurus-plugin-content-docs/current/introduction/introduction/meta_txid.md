---
sidebar_position: 5
---
# MetaTxid纯一层合约

## 状态膨胀问题

在[BVM和UTXO智能合约](mvc-bvm-utxo.md)中我们介绍了MVC智能合约的基本特点，其中提到一点，某些合约状态需要通过溯源来实现，溯源状态需要从当前状态一路校验到创世状态，这个过程可能会导致状态无限膨胀。

我们举一个实际的例子：

FT，也就是Fungible Token同质化代币合约，是一种标准的代币合约。与以太坊的全局合约账本状态不同的是，在MVC中，它的合约状态是一个个UTXO，这些FT UTXO的状态包括代币的代号，创始信息，代币数量，所有权等多个信息。合约需要让有FT所有权的人可以解锁，而没有控制权（私钥）的人无法解锁并转账FT。控制权的问题很好解决，只要在合约中要求状态转移函数携带所有者的签名，并且签名正确才可以转移所有权。

但是有另一个问题仅仅通过所有权校验无法被解决，那就是token真实性的问题。由于UTXO自身是无状态的，它无法感知到自身之外的信息，除非将外部信息作为参数传递给函数。另外由于UTXO函数的代码和状态数据都是链上公开的，任何人都可以伪造一个一模一样的UTXO，这个UTXO的状态和代码都是正确的，但是它并不是真正的FT UTXO，如果允许这样的行为，那么意味着FT将会被任意超发，发行者和持有者将会受到重大损失。

在UTXO合约中理论上当然可以解决这样的问题，编写FT合约的时候，我们强制要求参数中携带当前FT的所有祖先交易信息（无论通过递归方式还是通过循环方式），然后逐一校验祖先交易的合法性，一直追溯到创始交易，能够完整形成溯源证据链条的才被当作合法交易。而刚才伪造的交易一定无法构建溯源证据链条。

我们可以看到，随着FT合约的换手或者交易次数的累加，校验祖先信息所携带的证据链数据越来越多，会导致解锁状态所需要的数据量越来越大，这个过程可能会导致状态无限膨胀，这个问题在UTXO合约中是一个非常严重的问题，严重影响token的可用性。

![状态膨胀](/img/russian-nesting-dolls.png)

在一些竞争链解决方案中，token正确性一般通过两种方式来解决，一种是indexer共识，在一层utxo状态外再建立一套indexer机制，由indexer负责校验utxo是否合法，这是一种二层方案。二层方案最大的弊端就是无法保证和主链的一致性，比如说，brc20依赖indexer，你可以意外把brc20token当作普通satoshi花费掉，还有一些场景，layer1可以解锁的合约在indexer上并不合法，也就是说，共识不仅仅是layer1来保证，而是通过layer1和indexer共同保证，出bug和问题的可能性大大增加。另一种解决方法是使用oracle，这是一种利用外部可信数据源来保证token正确性的方案，但是oracle的问题是，它依赖于外部数据源，一旦外部数据源出现问题，那么token的正确性也会受到影响（oracle作恶问题）。

MVC使用了一种称为MetaTxid的技术，可以在不引起交易膨胀的前提下，实现纯一层合约的溯源功能，不再依赖外部indexer和oracle来维护状态正确性，而是仅仅通过utxo本身以及部分前序交易就可以鉴别token合法性，也就是说token是否合法的信息，已经全部包含在合约内部了，不需要区块链外部状态辅助判断（这是layer1的一个重要特征）。

## MetaTxid技术概述

这里简单介绍一下MetaTxid的溯源实现方法，详细的技术细节和安全性论证请参考[MetaTxid技术文档](/docs/blockchain/mvc-improvements/meta-txid)。

介绍MetaTxid之前，我们先介绍一个概念：数学归纳法。数学归纳法是一种数学证明方法，它的基本思想是：证明当n=1时命题成立，然后假设n=k时命题成立，证明n=k+1时命题也成立，这样就证明了对于任意的n，命题都成立。MetaTxid的实现方法就是基于数学归纳法的思想。

我们要证明n=k+1的utxo合法（这里合法的意思是约束条件，状态转移函数，还有状态没有发生非预期的篡改，这个可以通过脚本hash来保证，后面会详细介绍具体做法）。n=1时，token是创世交易，无需证明。而假定n=k合法，由于[后代约束能力](/docs/contract/scrypt-language/stateful-contracts)的存在，我们一定可以证明出n=k+1合法。数学归纳法保证了在创世交易合法以及后代约束能力存在的情况下，utxo状态转移链上的所有n都是合法的。

同理，应用上面数学归纳法的结论来判断第k+1个utxo是否合法的时候，也无需判断所有链路，只需判断如下几点：

1. 创世交易是否合法（token内部会携带创世交易信息）。
2. n=k（前序utxo）是否合法。论证k合法包括代码是否合法，k是否属于utxo证据链中（查看一下k对应的input是不是指向相同的链条）。
3. 后代约束能力（函数代码hash）是否合法。

反之如果一个UTXO是伪造的，那么它一定无法同时满足上面三个条件，这样就可以把上面3个条件作为解锁条件设置到UTXO的状态转移函数中，从而实现了UTXO的溯源功能。

而MetaTxid的作用简而言之，就是将证明前序交易合法的部分步骤进行了改良和简化，可以在不引起交易膨胀的前提下，证明条件2。从而真正实现了纯一层的状态和溯源功能。

## 纯一层合约的优势

相较于oracle和基于indexer的二层解决方案，纯一层合约的优势在于：

1. 唯一性：合约状态仅存在于链上，不依赖任何链外的状态，保证了合约状态的唯一性。而2层方案依赖解析器的状态，一旦解析器出现问题，那么token的状态也会受到影响。
2. 安全性：一层方案的安全性**等同于**基础代币space的安全性，安全性由所有矿工共同用强大的算力进行保证，在pow的共识机制下唯一可能遭受的攻击只可能是双花（[51攻击](/docs/mining/concepts/reorg-orphan-51attack)），而不会产生其他状态不一致的问题。而二层方案的安全性则依赖于indexer和oracle的安全性，一旦indexer或者oracle出现问题，那么token的安全性也会受到影响。
3. 高性能：一层方案的性能**等同于**Utxo模型的性能，可以充分利用Utxo的并行性优势，同时处理大规模的交易。而indexer和oracle的二层方案则需要额外的计算资源来维护状态，并且通常使用串行校验来保证状态唯一，性能很容易产生瓶颈。