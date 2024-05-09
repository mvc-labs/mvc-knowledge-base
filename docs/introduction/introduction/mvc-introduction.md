---
sidebar_position: 1
---

# Why Choose MVC

The background, advantages, and features of MVC.

## Background of MVC

Since the release of Ethereum, smart contract platforms based on the account model have become mainstream in the
blockchain industry. However, the shortcomings of the account model have gradually become apparent, such as performance
bottlenecks, difficulty in scaling, and challenges in debugging. As the foundation of Bitcoin's secure operation for
over a decade, the UTXO model, with its strong concurrency and stability, has increasingly garnered attention.

There has been a misconception in the industry that blockchains based on the UTXO model cannot implement smart contracts
because they cannot maintain a global state or because they cannot perform loop calls. This view now seems one-sided and
outdated. Blockchains with the UTXO model can fully implement smart contracts; they just do it differently. With the
relentless exploration and effort of projects and experts in the industry, the theoretical foundation, toolchain, and
ecosystem of UTXO model contracts have gradually improved, which later led to the emergence of popular projects like
BRC20 inscriptions. The crypto community has started to recognize the advantages of the UTXO model and explore its smart
contracts.

The popularity of inscriptions brought severe congestion to the Bitcoin mainnet, urgently needing a solution to
completely resolve this issue. The route to mainnet scaling has ended after forks like BCH and BSV. The remaining viable
scaling route is to reference Ethereum's sidechain solution, allowing the sidechain to handle high-frequency, low-fee
transactions, while the main chain settles and transfers higher values.

MVC (MicroVisionChain) was created against this backdrop, aspiring to build a high-performance, low-fee, Turing-complete
UTXO contract blockchain, using the same architecture and design as Bitcoin, serving as a sidechain solution for Bitcoin
to provide high-performance, low-fee transaction services.

The foundational token of MVC is SPACE, symbolizing the hope that MVC's ecosystem can be as boundlessly vast and
flourishing as the universe. Our goal is the stars and the sea.

![(/img/huge-block.png)](/img/huge-block.png)

## Advantages of MVC

### High Performance

MVC possesses extremely high mainnet performance, with actual block processing capacity in the testnet already exceeding
***10,000 TPS***, and can be further enhanced with increased hardware configurations. MVC's high performance is
primarily reflected in the following aspects:

1. Using the UTXO model, which does not require maintaining a global state, allows for high-concurrency transaction
   processing.
2. Very large blocks, strong packaging capability. Currently, the mainnet block can reach up to 4GB, accommodating over
   10 million transactions.
3. Secure zero confirmation. Small, everyday transactions can achieve sufficient security through zero confirmation,
   enabling quick payments.

Such high performance is the foundation that supports MVC in becoming a blockchain infrastructure that benefits all of
humanity.

### Low Fees

Because an individual MVC block can accommodate a large number of transactions, it can offer lower fees while ensuring
network security and miner revenue. The current network's minimum fee rate has already been reduced to 0.25 sat/byte,
which, at current coin prices, means a P2PKH transfer transaction costs only $0.0002, less than a cent.

Low fees promote more transactions, reduce the cost of transactions, enhance transaction efficiency, and provide a
better user experience. It also serves well as a sidechain solution for Bitcoin, offering high-performance, low-fee
transaction services.

### Smart Contracts

MVC possesses Turing-complete UTXO smart contract capabilities, enabling various complex smart contract logics. MVC's
smart contracts have the following features:

1. High concurrency: Based on the parallel processing feature of UTXO, MVC can simultaneously handle multiple contract
   transactions, enhancing the execution efficiency of smart contracts and the overall scalability of the network.
2. Atomicity: Due to the UTXO model's characteristics, MVC's smart contracts have atomicity. The contract execution
   either succeeds entirely or fails entirely, and failed contract executions do not consume any GAS, ensuring contract
   security and state integrity. There is no issue of smart contract executions failing and stopping as in the account
   model (where GAS fees are still paid).
3. Statelessness: MVC's smart contracts do not need to maintain a global state. The results of contract executions
   depend only on the inputs and are not affected by the global state. The results can be verified and are not affected
   by the order of contract execution.
4. Pure functional programming: Pure functional programming ensures the predictability of contracts. The results of
   contract executions depend only on the inputs and are not affected by external environments, greatly enhancing
   contract security and auditability.
5. Secure traceability: For smart contracts like tokens that require traceability, MVC provides secure traceability
   functions, using mathematical induction to prove and verify the legality of tokens without causing contract
   transaction expansion.

### Fair Distribution

MVC employs a dual incentive mechanism of POW (Proof of Work) and POB (Proof of Build) for distribution, with no
reserves set aside, ensuring the distribution process is completely fair and transparent.

POW uses the same SHA256 algorithm as Bitcoin for mining, enabling Bitcoin miners to seamlessly switch to mining on the
MVC network without the need to invest in new mining equipment or resources. This has made it very popular among SHA256
miners, and it is now supported by multiple well-known mining pools. Miners from around the world participate in mining
MVC, collectively securing the blockchain. After the mainnet launch, MVC’s hashing power is expected to grow rapidly, at
times surpassing BCH to become the second largest SHA256 public chain. Bitcoin’s robust hashing power and mature market
provide a solid guarantee for the security of the MVC network. Attacking the MVC network is as difficult as attacking
the Bitcoin network.

The POB mechanism is designed by MVC to address the tragedy of the commons on public blockchains, motivating developers
and builders to participate in ecosystem development and collectively maintain the public chain. Participants in any
valuable construction approved by community votes can receive MVC rewards. The scope of construction includes, but is
not limited to, developing tools, application development, ecosystem building, community development, exchange listings,
and promotional activities. The purpose of the POB mechanism is to make MVC's ecosystem more prosperous, stabilize MVC's
value, and activate its community.

MVC has no reserves; obtaining MVC is only possible through the aforementioned methods, including early project
contributors who are also rewarded through POB. There are no private placements, ICOs, or IEOs, and every disbursement
is transparent to the community, ensuring MVC's fairness and decentralization to the greatest extent.

### Decentralized Operations

MVC is governed and operated in the style of a DAO (Decentralized Autonomous Organization), without a traditional team
or "project side." The MVC DAO is composed of all SPACE token holders. Community members can participate in the
governance of MVC by staking SPACE and voting, steadfastly adhering to the principle of one coin, one vote for
decision-making. Decision topics include, but are not limited to, upgrade proposals, node development, ecosystem
construction, community building, and promotional activities. MVC's governance is completely decentralized, with no
centralized control. Community members are free to participate, express themselves, vote, and make decisions, jointly
maintaining the ecosystem and value of MVC. The DAO is responsible for managing and disbursing POB rewards, playing a
crucial role in advancing and developing the MVC ecosystem.

For more details, please refer to
the [MVC DAO Constitution](https://mvcdao.gitbook.io/mvc-dao/mvcdao/the-constitution-of-the-mvcdao).

## Vision

Web3 is the next generation of the internet based on blockchain technology, carrying people's hopes for the future of
the internet world. Web3 is also the foundation and precursor phase of the future metaverse. The success of Web3 and the
metaverse is predicated on allowing the majority of the world's population to use it simultaneously without suffering
from slow performance and bearing high transaction fees; hence, its underlying operation must be a high-performance,
low-fee public blockchain.

MVC aspires to build a Web3 blockchain infrastructure that supports global usage, providing high-performance, low-fee,
Turing-complete UTXO blockchain services to users worldwide.
