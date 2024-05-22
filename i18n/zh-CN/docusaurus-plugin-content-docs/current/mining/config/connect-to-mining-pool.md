# 链接矿池进行挖矿

## 为什么使用矿池

矿池是一种集中式的挖矿方式，它将来自多个矿工的算力集中在一起，以增加挖矿的成功率。矿池通常会提供更稳定的收益，因为它们会将矿工的算力集中在一起，从而增加了挖矿的成功率。此外，矿池还可以减少矿工的挖矿难度，因为矿池会将矿工的算力集中在一起，从而增加了挖矿的成功率。

在没有矿池的情况下，矿工需要自己独立挖出一个区块才能获得奖励，根据网络的不同，独立挖矿所需要的算力也不同，通常挖出一个区块所需要的算力远超单台Asic矿机所能提供的算力，需要大规模的Asic矿机共同协作才可以挖出区块。如果矿工的算力不足以独立挖出区块的话，那么矿工将很长时间无法获得奖励。矿池的作用就是将算力不足的矿工聚集起来共同形成一个算力池，这个算力池的算力达到挖矿所需要的算力条件，在产生区块奖励后，根据矿工的算力贡献来分配奖励。这样即使很小算力的矿工也可以获得算力相对应的奖励。

另外，现代主流的矿机厂商生产的矿机普遍使用[Stratum协议](../concepts/stratum-protocol.md)
进行矿机的接入。矿池可以使用stratum协议来切分难度目标，让矿机可以近乎实时地提交工作量，方便矿机的监控和维护等。另外stratum协议无需传输大量的区块数据，可以减少网络传输的开销，提高矿机的挖矿效率。

## 支持MVC的矿池

MVC使用和比特币相同的SHA256算法，因此挖比特币的Asic设备可以用来挖MVC，支持BTC挖矿的矿池理论上也可以支持MVC挖矿。POW挖矿无需许可，MVC是一个开放的项目，欢迎各个比特币矿工等生态伙伴的加入，一起为MVC的网络安全作出贡献。下面介绍一些支持MVC挖矿的矿池以及它们的接入方式。

### MVCPool.com

[MVCPool](https://mvcpool.com/)
是mvclabs团队成员创立和维护的MVC矿池，伴随MVC主网上线一起上线。[MVCPool](https://mvcpool.com/)
是专注于MVC的矿池，针对MVC生产大区块进行了大量的优化，使命是逐步推进和实现MVC的宏大愿景。

[MVCPool](https://mvcpool.com/)曾多次抵御机枪池算力攻击，保护MVC网络的安全，并且在高难度的时候打包大量交易，确保MVC交易网络通畅。

| 矿池名称      | MVCPool.com                                |
|-----------|--------------------------------------------|
| 官网地址      | https://mvcpool.com/                       |
| 接入指南      | https://github.com/mvc-labs/mvcpool-manual |
| 挖矿算法      | SHA256                                     |
| 矿工奖励模式    | PPLNS (Pay per last N shares)              |
| 矿池费率      | 区块奖励的1%                                    |
| 挖矿地址      | mine.mvcpool.com:6666                      |
| AsicBoost | 支持                                         |

### Mining-Dutch.nl

[MiningDutch](https://www.mining-dutch.nl/)
是位于荷兰的矿池，支持多币种挖矿和多种挖矿算法。[MiningDutch](https://www.mining-dutch.nl/)
作为最先支持MVC挖矿的矿池之一，为MVC的发展提供了不可或缺的支持。

| 矿池名称      | Mining Dutch                                             |
|-----------|----------------------------------------------------------|
| 官网地址      | https://www.mining-dutch.nl/pools/mvc.php?page=dashboard |
| 接入指南      | https://www.mining-dutch.nl/?page=gettingstarted         |
| 挖矿算法      | SHA256                                                   |
| 矿工奖励模式    | PPS PPLNS SOLO PROP                                      |
| 矿池费率      | PPS(2%) PPLNS(1%) PROP(1%) SOLO(0.5%)                    |
| 挖矿地址      | see https://www.mining-dutch.nl/                         |
| AsicBoost | 支持                                                       |

### F2Pool

[F2Pool](https://www.f2pool.com/)
鱼池作为老牌BTC矿池，支持多币种挖矿，是全球最大的矿池之一。F2Pool是专业的矿池服务商，提供多种挖矿算法和多种计费模式，并且提供丰富的API和文档，为全球矿工提供了稳定的挖矿服务。

| 矿池名称      | F2Pool                                                        |
|-----------|---------------------------------------------------------------|
| 官网地址      | https://www.f2pool.com/                                       |
| 接入指南      | https://f2pool.io/mining/guides/how-to-mine-microvisionchain/ |
| 挖矿算法      | SHA256                                                        |
| 矿工奖励模式    | PPLNS                                                         |
| 矿池费率      | PPLNS(1%)                                                     |
| 挖矿地址      | stratum+tcp://space-na.f2pool.com:5900                        |
| AsicBoost | 支持                                                            |

### 更多

MVC欢迎更多矿池的支持，如果您的矿池支持MVC挖矿，欢迎联系我们，我们会将您的矿池信息添加到这里。
