# Connect to Mining Pool

## Why Use Mining Pool

Mining pool is a centralized mining method that pools the computing power of multiple miners together to increase the
success rate of mining. Mining pools usually provide more stable returns because they pool the computing power of miners
together, increasing the success rate of mining. In addition, mining pools can reduce the mining difficulty of miners,
because mining pools pool the computing power of miners together, increasing the success rate of mining.

With no mining pool, miners need to mine a block independently to get a reward. Depending on the network, the computing
power required for independent mining varies. Usually, the computing power required to mine a block far exceeds the
computing power that a single Asic miner can provide. It requires a large number of Asic miners to work together to mine
a block. If a miner's computing power is insufficient to mine a block independently, the miner will not be able to get a
reward for a long time. The role of the mining pool is to gather miners with insufficient computing power to form a
computing power pool. When the computing power of this pool meets the requirements for mining, the mining pool will
distribute rewards according to the computing power contribution of miners after generating block rewards. This way,
even miners with very little computing power can get rewards corresponding to their computing power.

In addition, modern mainstream mining machine manufacturers generally use
the [Stratum protocol](../concepts/stratum-protocol.md)
to access mining machines. Mining pools can use the Stratum protocol to split the difficulty target, allowing mining
machines to submit workload almost in real time, facilitating the monitoring and maintenance of mining machines. In
addition, the Stratum protocol does not require the transmission of a large amount of block data, which can reduce
network transmission overhead and improve mining efficiency of mining machines.

## Mining Pools Supporting MVC

MVC uses the same SHA256 algorithm as Bitcoin, so Asic devices for mining Bitcoin can be used to mine MVC. Mining pools
that support BTC mining can theoretically support MVC mining. POW mining does not require permission, and MVC is an open
project. We welcome various Bitcoin miners and other ecosystem partners to join us and contribute to the network
security of MVC. Below are some mining pools that support MVC mining and their access methods.

### MVCPool.com

[MVCPool](https://mvcpool.com/)
is a mining pool established and maintained by members of the mvclabs team, which went live with the MVC
mainnet. [MVCPool](https://mvcpool.com/)
is a mining pool dedicated to MVC, which has been optimized for the production of large blocks in MVC, and its mission
is to gradually advance and realize the grand vision of MVC.

[MVCPool](https://mvcpool.com/) has repeatedly defended against machine gun pool hash attacks to protect the security of
the MVC network and has packaged a large number of transactions during high difficulty to ensure the smooth operation of
the MVC transaction network.

| Name           | MVCPool.com                                |
|----------------|--------------------------------------------|
| Address        | https://mvcpool.com/                       |
| Tutorial       | https://github.com/mvc-labs/mvcpool-manual |
| Algo           | SHA256                                     |
| RewardMode     | PPLNS (Pay per last N shares)              |
| Fee Rate       | 区块奖励的1%                                    |
| Mining Address | mine.mvcpool.com:6666                      |
| AsicBoost      | Supported                                  |

### Mining-Dutch.nl

[MiningDutch](https://www.mining-dutch.nl/)
is a mining pool located in the Netherlands that supports multi-currency mining and multiple mining algorithms.
[MiningDutch](https://www.mining-dutch.nl/)
is one of the first mining pools to support MVC mining, providing essential support for the development of MVC.

| Name           | Mining Dutch                                             |
|----------------|----------------------------------------------------------|
| Address        | https://www.mining-dutch.nl/pools/mvc.php?page=dashboard |
| Tutorial       | https://www.mining-dutch.nl/?page=gettingstarted         |
| Algo           | SHA256                                                   |
| RewardMode     | PPS PPLNS SOLO PROP                                      |
| Fee Rate       | PPS(2%) PPLNS(1%) PROP(1%) SOLO(0.5%)                    |
| Mining Address | see https://www.mining-dutch.nl/                         |
| AsicBoost      | Supported                                                |

### F2Pool

[F2Pool](https://www.f2pool.com/)
as one of the largest mining pools in the world, F2Pool supports multi-currency mining and multiple mining algorithms.
F2Pool is a professional mining pool service provider that provides multiple mining algorithms and multiple billing
modes, as well as rich APIs and documents, to provide stable mining services to miners around the world.

| Name           | F2Pool                                                        |
|----------------|---------------------------------------------------------------|
| Address        | https://www.f2pool.com/                                       |
| Tutorial       | https://f2pool.io/mining/guides/how-to-mine-microvisionchain/ |
| Algo           | SHA256                                                        |
| RewardMode     | PPLNS                                                         |
| Fee Rate       | PPLNS(1%)                                                     |
| Mining Address | stratum+tcp://space-na.f2pool.com:5900                        |
| AsicBoost      | Supported                                                     |

### More

MVC welcomes more mining pools to support it. If your mining pool supports MVC mining, please contact us, and we will
add your mining pool information here.
