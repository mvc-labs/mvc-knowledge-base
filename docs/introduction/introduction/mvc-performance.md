---
sidebar_position: 2
---

# Performance with Minimum Fee

MVC is highly competitive and cost-effective.

High performance is essential for the journey towards Web3.0, while low fee rates form the foundation for making
blockchain technology universally accessible. One of the design goals of the MVC blockchain is to achieve ultra-high
performance and ultra-low fee rates.

From the outset, the design of the MVC architecture and network has taken performance and fee rates into account,
incorporating technological innovations from traditional blockchains and various new-generation public chains. It has
extensively optimized potential performance bottlenecks theoretically, enabling MVC to achieve a performance of over
10,000+ TPS at launch, with the capability reserved for horizontal expansion through enhanced hardware configurations.

This article briefly introduces a few key technologies for achieving ultra-high performance and ultra-low fee rates.

## UTXO Model

The UTXO model (Unspent Transaction Output) is one of the core designs of Bitcoin and offers advantages over the account
model used by chains like Ethereum, such as the ability to handle large-scale parallel processing.

The account model maintains individual global states (account balances, contract data, etc.). Before every transaction,
it is necessary to read and write this global state, similar to checking a bank account balance. In high concurrency
scenarios, read and write operations on the global state can lead to resource contention. To ensure security, accounts
must operate in a serialized and orderly manner, which is why the account model includes a nonce field to mark the
sequence of transactions. The validity of transactions strictly depends on this sequence, and transactions must also be
verified in order.

The UTXO model is more akin to cash or coins. It doesn't maintain a global state recording each address's balance;
instead, it represents ownership through individual unspent transaction outputs (like individual coins with a
denomination). An address's balance is calculated by tallying the total denomination of all unspent outputs (UTXOs). In
transactions, only these unspent outputs need to be operated on, without the need for global state read and write
operations, thus enabling large-scale parallel processing and enhancing overall system performance. To draw a parallel
with everyday life, the state maintained by the UTXO model is essentially a pile of coins, each marked with a
denomination and ownership (or conditions for spending). Each coin operates independently without affecting others,
allowing operations on any number of coins simultaneously, thus facilitating higher parallel processing capabilities.

The following diagram illustrates the basic structure of the UTXO model:

![img/utxo-presentation.png](/img/utxo-presentation.png)

Every transaction includes inputs and outputs, where inputs must originate from the outputs of a previous transaction.
By analogy, each input effectively destroys the corresponding UTXO, and each output creates a new UTXO. In Bitcoin, each
transaction consumes previous UTXOs and generates new ones. UTXOs can only be spent once; once spent, they are no longer
considered UTXOs and no longer participate in calculating the balance, ensuring that each transaction is valid and
double-spending does not occur.

> Note: Coinbase transactions, which are the transactions where miners earn their mining rewards, do not consume any
> UTXOs but only generate new ones. This can also be seen as a minting process.

From the diagram above, it can be seen that the smallest unit controlled by the UTXO model is not the transaction itself
but each individual UTXO. Theoretically, any number of UTXOs can be operated on simultaneously, which is the source of
the UTXO model's parallel processing capability. To highlight the parallelism of UTXOs, we can illustrate with a few
simple examples:

1. **UTXO Transfer Parallelism**: I can create a transaction with 1 input and 10,000 outputs to evenly distribute money
   to 10,000 people using just one transaction. In contrast, the account model would require 10,000 ordered transactions
   to achieve the same goal, where one transfer cannot proceed until the previous one is completed. (UTXO parallel
   transfer)
2. **UTXO Receipt Parallelism**: My address can simultaneously receive 10,000 transfers. Note that the simultaneity is
   key here; their order does not matter, and whoever arrives first or last does not affect the final outcome, whereas
   the account model needs to serially process transactions based on their sequence in the block. (UTXO parallel
   receipt)
3. **UTXO Processing Parallelism**: Node software or miners can group transactions from the transaction pool based on
   different criteria (such as UTXO relevance) and then process them in parallel using multiple processing modules. This
   approach allows for horizontal scaling to enhance the overall network's processing capacity. Horizontal scaling is a
   necessary condition for unlimited scaling, whereas the account model requires sequential processing of each
   transaction, preventing parallelism. (UTXO parallel processing)

Therefore, MVC adopts the UTXO model as the foundation for parallel transaction processing, while also addressing some
of the UTXO model's drawbacks, such as difficulties in implementing smart contracts and maintaining a global state, thus
providing a basis for high performance.

For more content related to UTXO and transaction structures, please refer to the following chapters.

## Huge Blocks

The Bitcoin network produces one block every 10 minutes, with each block size limited to 1MB (considering SegWit, the
theoretical limit can only be increased to 4MB, which is still severely insufficient). This limit was initially set to
prevent the network from malicious attacks and ensure its stability. However, this limitation has also brought about
some issues, such as transaction congestion and high transaction fees. Since the Bitcoin network has been operating for
many years and has formed a strong consensus, changing the block size limit requires a hard fork, and the debate over
scaling has led to the subsequent chaos of the hash wars with BCH and BSV.

MVC has learned from these predecessors’ lessons and did not set an upper limit on block size in its initial design but
adopted a dynamic adjustment method. The block size is adjusted according to the actual conditions of the network, and
miners have the ability to dynamically adjust the upper limit of block size. Currently, the default 4GB block limit
accepted by nodes is a soft limit, which can be adjusted at any time by configuring the node software to meet network
demands, thus avoiding network congestion and increasing network throughput.

For example, let’s calculate a simple p2pkh one-to-one transfer transaction. A single transaction requires 192 bytes of
data. With the current 4GB block processing capability, it can accommodate over 20 million transactions, achieving a
TPS (transactions per second) of about 35,000. Such processing power far exceeds current demands and can meet future
growth needs. For comparison, the current Visa network's processing capability is about at the same magnitude.
Therefore, before the MVC network reaches the usage level and scale of Visa, this capacity is more than sufficient. Once
this limit is exceeded, miners only need to simply double the block size limit to continue increasing the network's
processing capacity.

To ensure enough performance to handle such large blocks, the design of MVC nodes fully utilizes the advantages of
modern hardware, such as SSD characteristics, high-speed networks, multi-core CPUs, etc., ensuring that nodes do not
experience performance bottlenecks when processing large blocks. Many large internet applications have already proven
that accepting and processing 4GB of data is not a big deal for many data centers, and current hardware conditions are
sufficient to handle all of humanity's transactions. Additionally, with future node upgrades, specialized chips can be
used to accelerate block processing and improve network performance. Furthermore, thanks to the parallel processing
capabilities of the UTXO model, the next generation of super nodes in MVC will definitely adopt a distributed cluster
architecture, which can enhance the entire network's processing capacity through horizontal scaling.

![/img/mvc-processor.png](/img/mvc-processor.png)

The capability to handle very large blocks also opens up the possibility of reducing fees because more transactions can be accommodated, allowing miners to lower transaction rates while ensuring network security, thus improving user experience. This mechanism can also introduce healthy competition among miners, encouraging them to gradually reduce transaction fees in exchange for higher volume, enhancing the overall efficiency of the network, benefiting everyone in the ecosystem, and ultimately developing MVC into a strong infrastructure for Web3.

## Secure Zero Confirmation

Zero confirmation refers to transactions that have not yet been packed into a block but have been broadcasted across the network and accepted by the main transaction processors (or miners). In the Bitcoin network, zero confirmation transactions are unsafe because the block generation time is 10 minutes and block sizes are limited, causing transactions to wait some time before confirmation. This delay provides attackers with sufficient time to perform double-spend attacks. Therefore, zero confirmation transactions are generally not accepted by merchants in the Bitcoin network.

MVC has made improvements on this basis. Firstly, it has removed the Replace-by-Fee (RBF) mechanism, which could allow unconfirmed transactions to be replaced, making transactions in the mempool immutable. Secondly, since MVC has no block size limit and can accommodate more transactions, transactions with **normal fees** can be expected to be packed in the next block, greatly reducing the possibility of double spending. Additionally, MVC has built-in transaction security mechanisms; if a transaction is double-spent, it can be immediately detected and marked by the network, giving merchants more confidence when accepting transactions.

By fostering stronger and tighter links between network nodes, transactions are propagated exponentially and reach the entire network, significantly increasing the cost of attempting a double-spend. This is also the goal hoped to be achieved by what is known as the "small world network":

![/img/zero-confirmation.png](/img/zero-confirmation.png)

In fact, this design is exactly what Satoshi Nakamoto, the inventor of Bitcoin, envisioned. Satoshi once mentioned on BitcoinTalk why 10 seconds is already enough to ensure transaction security:

[Click to view Satoshi Nakamoto's own comment](https://bitcointalk.org/index.php?topic=423.msg3819#msg3819)

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

MVC's zero confirmation design approach implements what Satoshi Nakamoto envisioned, using various security mechanisms to significantly increase the cost of double-spending, allowing merchants to confidently accept zero confirmation transactions and improving user experience.

In practice, MVC can evaluate the risk of a transaction based on the amount being transferred and the cost required for double-spending. Transactions with higher risk ratings require waiting for more blocks. This allows merchants to decide whether to accept zero confirmation transactions based on their own risk tolerance.
