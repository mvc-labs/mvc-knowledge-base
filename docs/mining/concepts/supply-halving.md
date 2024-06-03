---
sidebar_position: 4 
---

# Supply Halving

This article introduces the mining halving rules of the MVC blockchain.

## What is Halving?

Taking Bitcoin's halving as an example:

Bitcoin mining rewards refer to the number of Bitcoins a miner receives when a block is mined (newly created Bitcoins,
not including transaction fees). Bitcoin's mining reward halving is designed to control the issuance rate of Bitcoin to
maintain its scarcity. As the issuance rate of Bitcoin halves exponentially, the total number of Bitcoins will gradually
approach 21 million.

On the Bitcoin blockchain, every 210,000 blocks generated triggers a halving event in which the network's block reward
to miners is halved. This occurs approximately every four years. The halving event is intended to control the supply of
Bitcoin, making it gradually decrease to prevent inflation and increase scarcity.

1. **Miner Rewards**: In the early days of the Bitcoin network, miners received 50 Bitcoins as a reward for each block.
   After the first halving in 2012, the reward was reduced to 25 Bitcoins. The second halving in 2016 further reduced it
   to 12.5 Bitcoins, and the third halving in 2020 brought it down to 6.25 Bitcoins.
2. **Time Interval**: A Bitcoin block is generated approximately every 10 minutes, so 210,000 blocks take about 4 years
   to complete.
3. **Future Halving**: The halving event will continue until the block reward approaches zero.

### Calculation of the 21 Million Limit

Below is a detailed table of each halving stage for Bitcoin:

| Stage    | Block Reward (BTC)              | Number of Blocks | Bitcoins Generated During Stage |
|----------|---------------------------------|------------------|---------------------------------|
| Stage 1  | 50                              | 210,000          | 10,500,000                      |
| Stage 2  | 25                              | 210,000          | 5,250,000                       |
| Stage 3  | 12.5                            | 210,000          | 2,625,000                       |
| Stage 4  | 6.25                            | 210,000          | 1,312,500                       |
| Stage 5  | 3.125                           | 210,000          | 656,250                         |
| Stage 6  | 1.5625                          | 210,000          | 328,125                         |
| Stage 7  | 0.78125                         | 210,000          | 164,062.5                       |
| Stage 8  | 0.390625                        | 210,000          | 82,031.25                       |
| Stage 9  | 0.1953125                       | 210,000          | 41,015.625                      |
| Stage 10 | 0.09765625                      | 210,000          | 20,507.8125                     |
| Stage 11 | 0.048828125                     | 210,000          | 10,253.90625                    |
| Stage 12 | 0.0244140625                    | 210,000          | 5,126.953125                    |
| Stage 13 | 0.01220703125                   | 210,000          | 2,563.4765625                   |
| Stage 14 | 0.006103515625                  | 210,000          | 1,281.73828125                  |
| Stage 15 | 0.0030517578125                 | 210,000          | 640.869140625                   |
| Stage 16 | 0.00152587890625                | 210,000          | 320.4345703125                  |
| Stage 17 | 0.000762939453125               | 210,000          | 160.21728515625                 |
| Stage 18 | 0.0003814697265625              | 210,000          | 80.108642578125                 |
| Stage 19 | 0.00019073486328125             | 210,000          | 40.0543212890625                |
| ...      | ...                             | ...              | ...                             |
| Stage 29 | 0.000000186264514923095703125   | 210,000          | 0.03911554813385009765625       |
| Stage 30 | 0.0000000931322574615478515625  | 210,000          | 0.019557774066925048828125      |
| Stage 31 | 0.00000004656612873077392578125 | 210,000          | 0.0097788870334625244140625     |

The total supply is: 21,000,000 Bitcoins.

This demonstrates that the total supply of Bitcoin is indeed 21 million, achieved through the above halving mechanism.

## MVC Blockchain Halving Rules

Due to MVC adopting a POW+POB hybrid consensus mechanism, halving only applies to POW mining rewards (35%), while POB
rewards are not affected by halving. According to MVC's white-paper, the halving rules for MVC are as follows:

| Rule                       | Description |
|----------------------------|-------------|
| Total POW Issuance         | 7,350,000   |
| Halving Block Count        | 147,000     |
| Estimated Halving Interval | 1,000 days  |
| Initial Issuance Amount    | 25 space    |

### MVC Halving Rule Calculation

We can calculate the total production of Space using a method similar to Bitcoin. The initial reward for Space is 25,
halving every 147,000 blocks.

### Calculation of Space Amount for Each Stage:

Below is a detailed table of each halving stage for Space:

| Stage    | Block Reward (Space)             | Number of Blocks | Space Generated During Stage  |
|----------|----------------------------------|------------------|-------------------------------|
| Stage 1  | 25                               | 147,000          | 3,675,000                     |
| Stage 2  | 12.5                             | 147,000          | 1,837,500                     |
| Stage 3  | 6.25                             | 147,000          | 918,750                       |
| Stage 4  | 3.125                            | 147,000          | 459,375                       |
| Stage 5  | 1.5625                           | 147,000          | 229,687.5                     |
| Stage 6  | 0.78125                          | 147,000          | 114,843.75                    |
| Stage 7  | 0.390625                         | 147,000          | 57,421.875                    |
| Stage 8  | 0.1953125                        | 147,000          | 28,710.9375                   |
| Stage 9  | 0.09765625                       | 147,000          | 14,355.46875                  |
| Stage 10 | 0.048828125                      | 147,000          | 7,177.734375                  |
| Stage 11 | 0.0244140625                     | 147,000          | 3,588.8671875                 |
| Stage 12 | 0.01220703125                    | 147,000          | 1,794.43359375                |
| Stage 13 | 0.006103515625                   | 147,000          | 897.216796875                 |
| Stage 14 | 0.0030517578125                  | 147,000          | 448.6083984375                |
| Stage 15 | 0.00152587890625                 | 147,000          | 224.30419921875               |
| Stage 16 | 0.000762939453125                | 147,000          | 112.152099609375              |
| Stage 17 | 0.0003814697265625               | 147,000          | 56.0760498046875              |
| Stage 18 | 0.00019073486328125              | 147,000          | 28.03802490234375             |
| ...      | ...                              | ...              | ...                           |
| Stage 28 | 0.000000186264514923095703125    | 147,000          | 0.027380883693695068359375    |
| Stage 29 | 0.0000000931322574615478515625   | 147,000          | 0.0136904418468475341796875   |
| Stage 30 | 0.00000004656612873077392578125  | 147,000          | 0.00684522092342376708984375  |
| Stage 31 | 0.000000023283064365386962890625 | 147,000          | 0.003422610461711883544921875 |

The total supply is approximately: 7,350,000 Space.
