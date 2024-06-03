---
sidebar_position: 3
---

# Difficulty Adjusting Algorithm

How to adjust the difficulty target to ensure an average block generation time of 10 minutes.

## What is a Difficulty Adjustment Algorithm?

A difficulty adjustment algorithm adjusts the difficulty target based on the speed of past block production to ensure
that new blocks are generated at an average time of 10 minutes. This algorithm is an important component of the
blockchain network, controlling the block production speed, regulating the issuance rate of new coins, and ensuring the
security and stability of the blockchain.

The following explains Bitcoin's difficulty adjustment algorithm and the ASERT-DAA algorithm used in the MVC network.

## Bitcoin's Difficulty Adjustment Algorithm

Bitcoin adjusts its difficulty every 2016 blocks (approximately every two weeks). Here are the detailed steps of
Bitcoin's difficulty adjustment algorithm:

**Calculate Actual Time Taken**

The actual time taken is the total time taken to generate the last 2016 blocks:

$$
\text{Actual Time} = \text{Time of the Last Block} - \text{Time of the First Block}
$$

**Calculate Target Time**

The target time is the expected time to generate 2016 blocks:

$$
\text{Target Time} = 2016 \times 10 \, \text{minutes}
$$

$$
\text{Target Time} = 2016 \times 600 \, \text{seconds}
$$

$$
\text{Target Time} = 1209600 \, \text{seconds}
$$

**Calculate New Difficulty Target**

The new difficulty target is adjusted based on the ratio of actual time to target time:

$$
\text{New Difficulty Target} = \text{Old Difficulty Target} \times \left( \frac{\text{Actual Time}}{\text{Target Time}}
\right)
$$

**Limit Adjustment Range**

To avoid drastic fluctuations in the difficulty target, the Bitcoin protocol limits the adjustment range to no more than
four times or less than one-quarter of the previous difficulty:

$$
\text{New Difficulty Target} = \min\left(\text{Old Difficulty Target} \times 4, \max\left(\frac{\text{Old Difficulty
Target}}{4}, \text{New Difficulty Target}\right)\right)
$$

The drawback of this method is that the adjustment speed is slow. For a mature and stable blockchain network like
Bitcoin, this adjustment speed is acceptable. However, for emerging blockchain networks, price fluctuations may lead to
significant changes in computing power, seriously affecting block production speed.

When BCH (Bitcoin Cash) first forked from Bitcoin, it faced block production difficulties due to computing power
fluctuations. BCH initially adopted the EDA (Emergency Difficulty Adjustment) algorithm to adjust the difficulty in a
shorter time, ensuring block production speed. However, the EDA algorithm had some issues and was vulnerable to attacks.
Therefore, BCH later adopted the ASERT-DAA algorithm, which performed well in the BCH network. Consequently, the MVC
network also adopted the ASERT-DAA algorithm.

## ASERT-DAA Algorithm

The [ASERT-DAA](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/2020-11-15-asert.md) algorithm is a
difficulty adjustment algorithm used in the BCH network. It is a dynamic difficulty adjustment algorithm based on
computing power that can adjust the difficulty in a short time to ensure an average block production time of 10 minutes.

The Automatic Difficulty Adjustment by Smoothly Updating and Real-Time Targeting (Asert) algorithm was introduced in the
November 15, 2020, upgrade of Bitcoin Cash. Here are the features and calculation steps of the Asert difficulty
adjustment algorithm:

### Features of the Asert Difficulty Adjustment Algorithm

1. **Continuous Adjustment**:
   The Asert algorithm employs a continuous difficulty adjustment mechanism instead of adjusting every 2016 blocks. This
   allows it to more promptly reflect changes in computing power and maintain a more stable block production time.

2. **Time Parameterization**:
   Asert adjusts difficulty directly based on the difference between actual and target block production times, making
   the adjustments more flexible and precise.

3. **Exponential Smoothing**:
   The Asert algorithm uses exponential smoothing to avoid drastic fluctuations in the difficulty target, ensuring
   smooth transitions and stability.

### Asert Difficulty Adjustment Formula

The core formula of the Asert algorithm is as follows:

$$
D_{next} = D_{prior} \times 2^{\left( \frac{t_{actual} - t_{expected}}{T} \right) / \tau}
$$

Where:

- $ D_{next}$ is the difficulty target for the next block.
- $ D_{prior}$ is the current block's difficulty target.
- $ t_{actual}$ is the difference in timestamps between the current block and the last adjusted block.
- $ t_{expected}$ is the target block time interval multiplied by the number of blocks.
- $ T$ is the target block time, usually 600 seconds (10 minutes).
- $ \tau$ is a time constant used for smoothing adjustments, typically 172800 seconds (2 days).

### Calculation Steps

1. **Calculate Time Difference**:
   Calculate the difference in timestamps between the current block and the last adjusted block, i.e., $ t_{actual}$.

2. **Calculate Target Time Difference**:
   Calculate the target time difference based on the expected block time interval and the actual number of blocks,
   i.e., $ t_{expected}$.

3. **Calculate Difficulty Adjustment Factor**:
   Use the formula to calculate the difficulty adjustment factor:

   $$
   \text{Adjustment Factor} = 2^{\left( \frac{t_{actual} - t_{expected}}{T} \right) / \tau}
   $$

4. **Calculate Next Block's Difficulty Target**:
   Calculate the next block's difficulty target using the adjustment factor:

   $$
   D_{next} = D_{prior} \times \text{Adjustment Factor}
   $$

### Example

Suppose the current block's difficulty target $ D_{prior} $ is 100000, the actual time difference $ t_{actual}$ is 1200
seconds, the target time difference $ t_{expected}$ is 600 seconds, the target block time $ T$ is 600 seconds, and the
time constant $ \tau$ is 172800 seconds.

1. **Calculate Time Difference**:

   $$
   t_{actual} = 1200
   $$
   $$
   t_{expected} = 600
   $$

2. **Calculate Adjustment Factor**:

   $$
   \text{Adjustment Factor} = 2^{\left( \frac{1200 - 600}{600} \right) / 172800}
   $$
   $$
   \text{Adjustment Factor} = 2^{\left( \frac{600}{600} \right) / 172800}
   $$
   $$
   \text{Adjustment Factor} = 2^{1 / 172800}
   $$

3. **Calculate New Difficulty Target**:

   $$
   D_{next} = 100000 \times 2^{1 / 172800}
   $$

This calculation enables the MVC network to more smoothly adjust the difficulty, addressing computing power fluctuations
and ensuring network stability and reliability.
