---
sidebar_position: 11
---

# ASICBoost

Introduction to a method to optimize mining power—ASICBoost.

In the field of Bitcoin mining, as competition becomes increasingly fierce, various optimization techniques have
emerged. Among them, ASICBoost is a technology that can significantly improve the efficiency of mining machines. This
article will analyze what ASICBoost is from a professional technical perspective, its implementation principles, why it
can improve the efficiency of mining machines, and how mining pools support ASICBoost.

## What is ASICBoost

ASICBoost is a technology proposed by Dr. Timo Hanke in 2016 that improves Bitcoin mining efficiency by optimizing the
SHA-256 hash calculation process. ASICBoost reduces the power consumption and time required for each hash calculation by
eliminating certain repetitive steps in the hash computation. This optimization can be implemented on existing ASIC
hardware without requiring physical modifications to the chip.

For a detailed understanding of the ASICBoost technology, please refer to the
paper: [AsicBoost - A Speedup for Bitcoin Mining](https://arxiv.org/pdf/1604.00575).

## Introduction to ASICBoost Principles

The core idea of ASICBoost is to utilize intermediate states of the SHA-256 hash calculation. The SHA-256 algorithm is
an iterative process where each round of computation depends on the output of the previous round. ASICBoost reduces the
total computation by introducing "intermediate state reuse" in the hash calculation.

Specifically, ASICBoost can be implemented in two ways:

1. **Explicit ASICBoost**:
    - Explicit ASICBoost is a public and transparent method that optimizes proof-of-work (PoW) calculations by modifying
      specific fields in the Bitcoin block header. This method requires changes to a part of the Bitcoin protocol and
      can be detected by other nodes on the network.
    - Explicit ASICBoost is mainly achieved by modifying the version field in the block header. This method requires
      miners to make specific optimizations in their mining equipment and software. By adjusting the version field in
      the block header to produce the same intermediate state, it reduces the computational load. Different version
      numbers can map to the same intermediate hash state, allowing the reuse of previously cached intermediate states
      when calculating new hashes.

2. **Covert ASICBoost**:
    - Covert ASICBoost is a concealed method that optimizes PoW calculations without altering significant fields in the
      block header. This method is difficult for other nodes on the network to detect, hence the term "covert."
    - Covert ASICBoost is more complex and typically requires specific circuit design and optimization at the hardware
      level to reduce the computational load.

**Differences**:

- **Transparency**: Explicit ASICBoost is open and transparent, easily detectable; covert ASICBoost is concealed and
  hard to detect.
- **Implementation**: Explicit ASICBoost mainly involves modifying the version field in the Bitcoin protocol; covert
  ASICBoost involves optimization through hardware circuit design.
- **Community Reaction**: Covert ASICBoost, being hard to detect and considered potentially unfair, is controversial
  within the community. Explicit ASICBoost, being transparent, faces relatively less controversy.

Currently, the mainstream implementation of ASICBoost is explicit ASICBoost because it is relatively simple and easy to
implement, and it is also more detectable by other network nodes.

## Reasons for Increased Efficiency

The primary reasons ASICBoost can improve mining machine efficiency are:

1. **Reduced Computation**: By reusing intermediate states, ASICBoost reduces the total computational load required for
   each hash calculation. This means that mining machines can perform more hash calculations in the same amount of time,
   increasing overall hash power.

2. **Lower Power Consumption**: With fewer unnecessary computational steps, mining machines consume less power for each
   hash calculation. This is particularly important for large-scale mining farms, as electricity costs are a significant
   part of their operating expenses.

3. **Hardware Optimization**: ASICBoost does not require physical modifications to existing ASIC hardware and can be
   implemented through firmware or software updates. This allows existing mining machines to quickly deploy and utilize
   this technology to improve mining efficiency.

## How Mining Pools Support ASICBoost

To support ASICBoost, mining pools need to make some adjustments and configurations. This mainly involves the
verification and management of the work submitted by miners. Specifically, mining pools need to:

1. **Work Task Generation**: When generating work tasks, the mining pool needs to create tasks that can utilize
   ASICBoost. This includes adjusting the version field in the block header to fit the ASICBoost computation model.

2. **Work Verification**: The solutions submitted by miners need to be verified by the mining pool. The mining pool must
   be able to recognize and validate the hash calculation results using ASICBoost to ensure their legality and validity.

3. **Software Compatibility**: The mining pool needs to update its software to ensure compatibility with miners using
   ASICBoost. This includes protocol adjustments and optimizations to support ASICBoost features.

4. **Collaboration and Coordination**: Mining pool operators need to collaborate with miners and ASIC manufacturers to
   ensure the smooth implementation and deployment of ASICBoost technology. This includes providing technical support
   and assistance to help miners implement and optimize ASICBoost.

## Stratum Protocol Changes

The [Stratum protocol](stratum-protocol.md) is a commonly used communication protocol between miners and mining pools.
To support ASICBoost technology, mining pools can make corresponding adjustments and optimizations through the Stratum
protocol. This includes:

**Protocol Extensions**: Mining pools can extend the Stratum protocol to add support for ASICBoost. This includes
defining new message types and fields to transmit ASICBoost-related information. Compared to the ordinary Stratum
protocol, ASICBoost extends the following plugins:

* "version-rolling"
* "minimum-difficulty"
* "subscribe-extranonce"

**mining.configure**: The mining pool can send ASICBoost-related configuration information to miners via the
mining.configure message. This includes specifying the method of using ASICBoost and version field adjustments, among
other things. This is also a way to distinguish ASICBoost miners from ordinary miners.

```json
{
  "method": "mining.configure",
  "id": 1,
  "params": [
    [
      "minimum-difficulty",
      "version-rolling"
    ],
    {
      "minimum-difficulty.value": 2048,
      "version-rolling.mask": "1fffe000",
      "version-rolling.min-bit-count": 2
    }
  ]
}
```

**Using the version-rolling Plugin**: The version-rolling plugin is a crucial part of ASICBoost, used to adjust the
version field in the block header. Mining pools can send version field adjustment information to miners via the
version-rolling plugin to support the ASICBoost computation model.

```json
{
  "method": "mining.configure",
  "id": 1,
  "params": [
    [
      "version-rolling"
    ],
    {
      "version-rolling.mask": "1fffe000",
      "version-rolling.min-bit-count": 2
    }
  ]
}
```

The mask field specifies the mask for the version field, and the min-bit-count field specifies the minimum number of
bits for version adjustment. These two fields determine the range that the version can be adjusted.

When handling work submitted by ASICBoost miners, the mining pool needs to adjust and verify the block header
accordingly based on this configuration to correctly package the transactions.

For more details, please refer
to [Stratum Extensions](https://github.com/slushpool/stratumprotocol/blob/master/stratum-extensions.mediawiki).

## Conclusion

As a technology to optimize Bitcoin mining efficiency, ASICBoost significantly improves the computational efficiency and
energy efficiency of mining machines by reducing repetitive steps in the SHA-256 hash calculation. Its implementation
principle mainly relies on reusing intermediate states, which can reduce computation and lower power consumption. Mining
pools can support ASICBoost technology through appropriate adjustments and configurations, providing a more efficient
mining environment for miners. As the Bitcoin network continues to develop, innovative technologies like ASICBoost will
play an important role in improving mining efficiency and reducing operational costs.
