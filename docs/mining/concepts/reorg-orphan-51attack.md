---
sidebar_position: 8
---

# Reorg, Orphan, and 51% Attack

Key mechanisms for resolving conflicts and achieving consensus in POW.

In the POW process, miners compete to solve a mathematical problem to receive mining rewards. The process of solving
this problem is random, so different miners might find different solutions simultaneously. When different miners find
different solutions at the same time, a fork occurs.

To ensure the uniqueness of the blockchain, the consensus network will select one fork as the main chain and consider
the other forks as orphaned forks.

## Block Reorganization

Block reorganization (reorg) refers to the process where existing blocks in the blockchain are replaced by a new, longer
chain. This phenomenon occurs when two or more miners almost simultaneously mine valid blocks, and these blocks are
added to the end of the chain. However, due to network propagation delays, different nodes might receive different
blocks, temporarily creating multiple forked chains.

POW follows the longest chain principle or the maximum work principle. Therefore, if multiple forks exist
simultaneously, the consensus network will choose the fork with the largest workload as the main chain, and the other
forks will be isolated, with all transactions in the isolated forks being rolled back (if a transaction exists in
multiple forks, it will only take effect once in the final accepted chain).

### Why Block Reorganizations Occur

Block reorganizations mainly occur due to the following reasons:

1. **Simultaneous Discovery of New Blocks**: If two miners almost simultaneously find valid blocks, these blocks will be
   added to the end of the chain. However, due to network propagation delays, some nodes will receive one block, while
   other nodes will receive the other block, forming a temporary fork.

2. **Network Delays**: Since the MVC network is distributed, network delays can cause different nodes to receive new
   blocks at different times, leading to temporary forks.

3. **Network Attacks**: In some cases, malicious miners may attempt to reorganize the blockchain to execute
   double-spending attacks. The attacker will try to mine a forked chain and hope that this chain becomes longer than
   the original chain, thus becoming the main chain.

### Block Reorganization Process

1. **Forming a Fork**: Suppose after block height `N`, miners A and B almost simultaneously find two new valid
   blocks `N+1A` and `N+1B`. Some nodes will receive `N+1A`, while others will receive `N+1B`.

2. **Propagation and Confirmation**: Over time, miners continue working and mining new blocks. Suppose miner C
   finds `N+2A` based on `N+1A`, and miner D finds `N+2B` based on `N+1B`.

3. **Selecting the Longest Chain (Maximum Workload)**: According to MVC protocol, nodes will select the longest received
   chain as the main chain. If both `N+1A` and `N+1B` chains each generate a new block, both chains have the same length
   with no priority. Until a new block, say `N+3A`, is found on the `N+1A` chain, making it longer, nodes will consider
   the `N+1A` chain as the main chain.

4. **Reorganization**: Once the `N+1A` chain is confirmed as the main chain, all nodes holding the `N+1B` chain will
   discard `N+1B` and `N+2B` and accept the `N+1A` chain and its subsequent blocks. This process is known as block
   reorganization.

### Effects of Block Reorganization

1. **Transaction Confirmation**: During reorganization, some transactions confirmed on the discarded chain may become
   invalid. These transactions will return to the memory pool and await re-confirmation on the new chain.

2. **Network Security**: Frequent block reorganizations can affect network stability. However, MVC network's difficulty
   adjustment mechanism and mining reward maturity period help prevent frequent reorganizations and enhance network
   security.

In summary, block reorganization is part of the MVC network's normal operation. This mechanism helps the network
maintain final consistency and security in the face of temporary forks.

## Orphan Blocks

### What are Orphan Blocks

Orphan blocks are blocks that are discarded by the blockchain. When a block is discarded, the transactions it contains
are also rolled back. These transactions may be repackaged into the main chain or discarded due to conflicts.

Miners should avoid creating orphan blocks as they waste computational power and time.

### Possible Causes of Orphan Blocks

Due to MVC's unlimited block size, orphan blocks are unavoidable under poor network conditions. Possible causes include:

1. **Miner Network Delays**: After finding a block, a miner may not be able to propagate it promptly due to network or
   synchronization delays.
2. **Large Blocks**: Large blocks may prevent some miners from receiving them in time, resulting in orphan blocks.
3. **Inconsistent Memory Pool Fees**: Different miners use different fee strategies, leading to memory pool
   synchronization inconsistencies, increasing the difficulty of synchronizing blocks and causing orphan blocks.

### How to Avoid Orphan Blocks

If miners or mining pools encounter orphan blocks, they can take the following steps to avoid them:

1. **Enhance Connectivity**: Increase connections with other miners to reduce network delays.
2. **Increase Fee Rates**: Set higher packaging and relay fees to ensure transactions are more likely included in other
   miners' memory pools.
3. **Reduce Transaction Size**: Minimize transaction size to reduce block size and improve propagation speed.

### Double-Edged Sword

While methods 2 and 3 reduce potential fee income for miners, only method 1 can balance network stability and miner
profitability.

Therefore, orphan blocks are not just a network issue but also an incentive mechanism, encouraging miners to invest more
in connectivity to earn higher fee income. This leads to a more interconnected small-world network, enhancing overall
MVC network performance and throughput, supporting higher TPS and MVC's grand vision.

## 51% Attack

### What is a 51% Attack

A 51% attack occurs when a miner or mining pool controls more than 50% of the computing power (hash rate) in the MVC
network, allowing them to manipulate the blockchain. By controlling the majority hash rate, attackers can execute
malicious actions on the blockchain. This threat exists in any POW blockchain network.

### How to Execute a 51% Attack

Steps to execute a 51% attack include:

1. **Accumulate Computing Power**: Attackers need enough computing power to exceed 50% of the network's total hash rate,
   requiring significant resources and hardware.
2. **Fork the Blockchain**: With majority hash rate control, attackers can mine an independent fork without broadcasting
   new blocks to the network.
3. **Attack Moment**: When the attacker's fork becomes longer than the main chain, it is broadcast to the network. The
   MVC network accepts the longest chain as valid, causing nodes to adopt the attacker's fork and discard the original
   chain.

In practice, attackers may need more than 50% hash rate (e.g., over 90%) for a successful attack.

### Risks of a 51% Attack

A 51% attack can cause double-spending and transaction rollbacks:

1. **Double-Spending Attack**: Attackers can execute double-spending by making a transaction on the main chain and not
   including it on their fork. When their fork becomes the main chain, the original transaction is reversed, allowing
   attackers to spend the same funds again.
2. **Blocking Transaction Confirmation**: Attackers can prevent specific or all transactions from being confirmed by not
   including them in blocks.
3. **Obstructing Other Miners**: Attackers can reject other miners' blocks, monopolizing block rewards.
4. **Undermining Network Trust**: Frequent 51% attacks erode user trust, causing price drops and user attrition.

A 51% attack can only double-spend and rollback transactions, but cannot alter historical records, steal private keys,
or unauthorized assets.

The primary targets of a 51% attack are exchanges and services sensitive to double-spending, such as asset bridges,
allowing attackers to fake deposits and withdraw funds.

### How to Avoid a 51% Attack

1. **Increase Network Hash Rate**: A higher total hash rate makes it harder and costlier to control 51%. Attracting more
   miners enhances network security.
2. **Decentralize Mining Pools**: Encourage miners to use different pools to avoid centralization risks.
3. **Hard Fork and Consensus Mechanism Changes**: In extreme cases, developers and the community can hard fork or
   implement new security measures.
4. **Economic Incentives**: Maintain healthy economic incentives to make attack costs higher than potential gains,
   ensuring high MVC market value and transaction volume.
5. **Monitoring and Warning Systems**: Implement systems to monitor hash rate distribution and issue warnings if an
   entity's hash rate approaches or exceeds 50%.
6. **Increase Confirmation Counts**: Services like exchanges can increase confirmation counts to raise double-spending
   costs and reduce attack likelihood.

In summary, while a 51% attack poses a significant threat, increasing network hash rate, decentralizing pools, adjusting
consensus mechanisms, and establishing monitoring systems can effectively reduce the risk.

### Honest Miners

During a 51% attack, the attacker struggles to maintain sustained high hash rates, usually resulting in a temporary
burst of power. If the MVC network suffers a severe double-spending attack, victims can join honest miners to mark the
attacker's blocks as invalid and persistently mine the un-double-spent chain. Over time, the cumulative workload will
surpass the attack fork, causing the attacker's fork to be reorganized, recovering losses.

These miners are known as honest miners, who monitor double-spending transactions, mark potential double-spending risks,
and confirm double-spending transactions, effectively protecting MVC network security.
