---
sidebar_position: 7
---

# Safe Zero Confirmation

Introduction to what zero confirmation is and why zero confirmation can be secure.

Zero confirmation refers to transactions that have not yet been included in a block but have already been broadcast to
the network and accepted by major transaction processors (or miners). In the Bitcoin network, zero-confirmation
transactions are considered unsafe because Bitcoin's block generation time is 10 minutes, and block sizes are limited,
causing transactions to wait for a while before being confirmed. This delay provides attackers enough time to perform
double-spend attacks. Therefore, zero-confirmation transactions in the Bitcoin network are generally not accepted by
merchants due to their insecurity.

## Network Structure Improvement

MVC has made improvements on this basis by first removing the Replace-by-Fee (RBF) mechanism, which could lead to the
replacement of unconfirmed transactions, thus making the mempool transactions immutable. Additionally, since MVC has no
block size limit and can accommodate more transactions, transactions with **normal fees** can be expected to be included
in the next block, significantly reducing the likelihood of double-spending. Moreover, MVC has built-in transaction
security mechanisms. If a transaction is double-spent, the network can immediately detect and mark it, giving merchants
more confidence when accepting transactions.

By creating stronger and tighter links between network nodes, transactions can spread exponentially and reach the entire
network, making the cost of double-spending infinitely high. This is the goal that the
so-called "[small-world network](../../mining/concepts/small-world-model.md)" aims to achieve:

![Zero Confirmation](/img/zero-confirmation.png)

## Satoshi Nakamoto's Design Concept

This design is precisely what Bitcoin's inventor, Satoshi Nakamoto, envisioned. Satoshi mentioned on BitcoinTalk why 10
seconds is sufficient to ensure transaction security:

[Click to view Satoshi Nakamoto's comment](https://bitcointalk.org/index.php?topic=423.msg3819#msg3819)

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

MVC's zero-confirmation design follows Satoshi Nakamoto's vision. By implementing various security mechanisms, it makes
the cost of double-spending infinitely high, allowing merchants to confidently accept zero-confirmation transactions and
improving user experience.

In practice, MVC can provide a risk rating for transactions based on the amount being transferred and the cost required
for double-spending. The higher the risk rating of a transaction, the more blocks it needs to wait for confirmation.
This allows merchants to decide whether to accept zero-confirmation transactions based on their risk tolerance.
