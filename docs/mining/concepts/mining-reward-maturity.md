---
sidebar_position: 6
---

# Mining Reward Maturity

How long it takes to spend rewards after a block is mined.

The MVC mining reward maturity period refers to the time that newly mined MVC must wait on the blockchain network before
it can be used for transactions or transfers. In the MVC network, this maturity period is typically 100 blocks. This
means that after a miner successfully mines a block and receives an MVC reward, they must wait for approximately 100
blocks before these MVCs are considered mature and usable.

The reasons for setting the maturity period in MVC, like in other POW blockchain networks, are mainly to maintain
network security and stability.

## Why is there a Maturity Period

The maturity period is established for the following reasons:

1. **Network Security**: By setting a maturity period, it can prevent miners from executing double-spending attacks on
   the network. If a miner tries to reorganize the blockchain (for example, attempting to reverse already confirmed
   transactions), the maturity period makes such attacks more difficult because the attacker would need to re-mine a
   large number of blocks.

2. **Blockchain Stability**: The maturity period can increase the stability of the blockchain, preventing short-term
   block reorganizations from affecting miner rewards and transaction confirmations.

3. **Consistency**: During the maturity period, network nodes have time to confirm the legality of newly mined blocks
   and transactions, ensuring consistency in the blockchain state across all nodes.

## How to Calculate the Maturity Period

Calculating the maturity period is relatively simple, involving the following basic steps:

1. **Mine a New Block**: A miner successfully mines a new block and receives a reward, for example, at block height `n`.

2. **Wait for 100 Blocks**: The miner needs to wait for 100 blocks to be mined after this block. This means that when
   the blockchain reaches height `n+100`, the newly mined MVC rewards will mature and become usable.

Assuming the MVC network mines a new block approximately every 10 minutes, the maturity period would be about 10 minutes
multiplied by 100, which is approximately 1000 minutes (about 16.67 hours).

## Example Explanation

If a miner mines a block at block height `70000` and receives a reward, these reward MVCs must wait until the block
height reaches `70100` before they can be used. During this period, the miner can see these rewards in their wallet but
cannot perform any transactions with them.

Through this process, the MVC network ensures that newly mined MVCs have sufficient time to be confirmed by the network
before they are used, thereby maintaining network security and consistency.

## Handling of the Maturity Period by MVCPool

MVCPool will wait for the reward to mature before distributing it after the reward calculation is completed. During this
period, the confirmation number of the maturity period will be displayed.
