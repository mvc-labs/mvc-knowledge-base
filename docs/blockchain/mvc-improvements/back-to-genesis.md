---
sidebar_position: 3
---

# Back To Genesis Issue(B2G)

Introduction to what the Token tracing issue is and why tracing is needed.

In UTXO-type contracts, it is necessary to maintain contract states. These contract states need to be implemented
through tracing, requiring validation from the current state all the way back to the genesis state. This process can
potentially lead to infinite state expansion.

Let’s take a practical example:

FT, or Fungible Token contract, is a standard token contract. Unlike Ethereum’s global contract ledger state, in MVC,
its contract state is composed of individual UTXOs. The state of these FT UTXOs includes multiple pieces of information
such as token code, creation information, token quantity, ownership, etc. The contract needs to allow those with FT
ownership to unlock it, while those without control (private key) cannot unlock and transfer FT. The issue of control is
easily solved by requiring the state transition function in the contract to carry the owner’s signature and only
allowing ownership transfer if the signature is correct.

However, there is another problem that cannot be solved merely through ownership verification, and that is the issue of
token authenticity. Since UTXO itself is stateless, it cannot perceive information outside of itself unless external
information is passed as a parameter to the function. Additionally, because the code and state data of the UTXO function
are publicly available on the chain, anyone can forge an identical UTXO. This UTXO's state and code are correct, but it
is not a genuine FT UTXO. If such behavior is allowed, it would mean FT could be arbitrarily over-issued, causing
significant losses to the issuer and holders.

In UTXO contracts, this issue can theoretically be solved. When writing the FT contract, we can forcibly require the
parameters to carry all ancestor transaction information of the current FT (whether recursively or through loops) and
then verify the legality of the ancestor transactions one by one, tracing back to the original transaction. Only those
that can fully form a traceability evidence chain are considered legitimate transactions. The forged transaction
mentioned earlier cannot construct such a traceability evidence chain.

As we can see, with the accumulation of transfers or transactions of the FT contract, the data required for verifying
the ancestor information increases, causing the data needed for unlocking the state to grow larger and larger. This
process can lead to infinite state expansion, a very serious problem in UTXO contracts, severely affecting token
usability.

![State Expansion](/img/russian-nesting-dolls.png)

In some competing chain solutions, token correctness is generally resolved in two ways: one is through indexer
consensus, establishing an indexer mechanism outside the UTXO state on layer one, where the indexer is responsible for
verifying UTXO legitimacy. This is a layer two solution. The biggest drawback of the layer two solution is its inability
to ensure consistency with the main chain. For example, BRC20 relies on the indexer, and you can mistakenly spend BRC20
tokens as ordinary satoshis. Additionally, there are scenarios where contracts unlockable on layer one are not valid on
the indexer, meaning consensus is guaranteed not just by layer one but by both layer one and the indexer together,
greatly increasing the likelihood of bugs and issues. Another solution is using oracles, which rely on external trusted
data sources to ensure token correctness. However, the problem with oracles is their dependence on external data
sources, and if these external sources fail, the token correctness is also affected (oracle malfeasance issue).

MVC uses a technology called [MetaTxid](meta-txid.md) that can achieve traceability of pure layer one contracts without
causing transaction expansion, no longer relying on external indexers and oracles to maintain state correctness.
Instead, it uses only the UTXO itself and some previous transactions to identify token legitimacy. In other words, the
information to determine whether the token is legitimate is already entirely contained within the contract, without
needing external blockchain state for auxiliary judgment (this is an important feature of layer one).
