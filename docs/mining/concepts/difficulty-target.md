---
sidebar_position: 2
---

# Difficulty Target and Network Hashrate

An introduction to the concepts of difficulty target and network-wide difficulty.

> Note: Difficulty target and network-wide difficulty are two different concepts. The difficulty target is the value
> that a block's hash must be less than, while network-wide difficulty is the difficulty of obtaining the next valid
> block. Generally, the smaller the difficulty target, the greater the difficulty; the higher the network-wide difficulty,
> the harder it is to mine.

## Difficulty Target

The difficulty target is the value that a block's hash must be less than. The hash value calculated by the block header
hash algorithm can be viewed as a 256-bit hexadecimal number. The more leading zeros in the hash value, the smaller the
corresponding number of the hash value. The difficulty target specifies that the hash value must be less than a specific
value, and only a hash value that meets this condition will be accepted by the network.

The difficulty target determines the computational difficulty miners need to find a valid block hash. The difficulty
target ensures that new blocks are discovered approximately every 10 minutes, regardless of changes in the network's
total computational power. The entire network adjusts the difficulty target in real-time to control the speed of block
production and the issuance rate of new coins.

## Representation of Difficulty Target

In the Bitcoin and MVC networks, the difficulty target is located in the `bits` field of the block header. The `bits`
field is a 4-byte integer that represents the difficulty target value. The value of the `bits` field is a hexadecimal
number, using a compact format to represent the difficulty target. The compact `bits` value can be calculated into the
actual target value using the following formula:

- **Compact Format**: In the MVC network, the difficulty target is often represented in a compact form called "bits."
  This is a 4-byte value from which the actual target hash value can be calculated.
- **Calculating the Actual Target Value**: The actual target value can be calculated from the compact `bits` format
  using the following formula:

$$
\text{Target} = \text{Coefficient} \times 2^{(8 \times (\text{Exponent} - 3))}
$$

Where `Coefficient` is the first three bytes of `bits`, and `Exponent` is the last byte of `bits`. For example,
if `bits` is represented as `0x1d00ffff`, then `Coefficient` is `0x00ffff` and `Exponent` is `0x1d`.

![img.png](/img/blockheader-bits.png)

### Example

Suppose the current difficulty target is represented as `0x1b0404cb`. We can calculate the actual difficulty target
value with the following steps:

**Extracting the Coefficient and Exponent**:

$$
\text{Coefficient} = 0x0404cb
$$
$$
\text{Exponent} = 0x1b
$$

**Calculating the Actual Target Value**:

$$
\text{Target} = 0x0404cb \times 2^{(8 \times (0x1b - 3))}
$$
$$
\text{Target} = 0x0404cb \times 2^{(8 \times 0x18)}
$$
$$
\text{Target} = 0x0404cb \times 2^{192}
$$

In hexadecimal form:
$$
\text{Target} = 0x0023AEA3C73B13B193EC4E9D9AD4A03B60000000000000000000000000000000
$$

This value is the actual difficulty target value. The block header's hash value must be less than this value to be
accepted by the network. In other words, if the calculated hash value of the block header is less than this value (
starting with 2 leading zeros), then the block is valid.

## Difficulty Calculation

Network-wide difficulty is the difficulty of obtaining the next valid block. It is determined by the total computational
power of all miners in the network. Network-wide difficulty is a dynamic value that adjusts in real-time based on the
total computational power of miners. The goal of network-wide difficulty is to ensure that new blocks are discovered
approximately every 10 minutes.

You can use the mvc-cli command-line tool to check the current network-wide difficulty:

```bash
mvc-cli getmininginfo
```

```text
{
  "blocks": 71434,
  "currentblocksize": 339,
  "currentblocktx": 1,
  "difficulty": 34975994469.53414,
  "errors": "",
  "networkhashps": 2.409330669323676e+17,
  "pooledtx": 1,
  "chain": "main"
}
```

In the output above, the `difficulty` field represents the current network-wide difficulty in decimal format. The higher
the difficulty value, the harder it is to mine.

Network-wide difficulty can be calculated inversely from the difficulty target. The smaller the difficulty target, the
higher the difficulty, so it is essential to define what difficulty is.

### Maximum Target (Also Known as Difficulty 1)

In the MVC network, the difficulty value is a relative measure used to indicate the difficulty of finding a valid block
hash. It is calculated by comparing the current target with the maximum target (Max Target). The maximum target is the
target value at the lowest difficulty, which is the initial difficulty target of MVC.

The maximum difficulty target (Max Target) is:

$$
\text{Max Target} = 0x1d00ffff
$$

In decimal format, the maximum target is:

$$
\text{Max Target} = 0x1d00ffff \times 2^{8 \times (0x1d - 3)}
$$
$$
\text{Max Target} = 0x00ffff \times 2^{8 \times 0x1a}
$$
$$
\text{Max Target} = 65535 \times 2^{208}
$$

### Calculating Difficulty Value

The difficulty value is calculated by dividing the maximum target by the current target:

$$
\text{Difficulty} = \frac{\text{Max Target}}{\text{Current Target}}
$$

This aligns with our understanding that the smaller the current target, the higher the difficulty value. As it is a
ratio, the difficulty value of the maximum difficulty target is the smallest, which is 1.

### Steps to Calculate Difficulty Value

**Convert Current Difficulty Target to Decimal**:

$$
\text{Current Target} = 165608837515678774353553029698295978246167310057892115125170688
$$

**Calculate the Decimal Value of the Maximum Target**:

$$
\text{Max Target} = 65535 \times 2^{208}
$$
$$
\text{Max Target} \approx 5.788 \times 10^{49}
$$

**Divide to Calculate the Difficulty Value**:

$$
\text{Difficulty} = \frac{5.788 \times 10^{49}}{165608837515678774353553029698295978246167310057892115125170688}
$$

Approximately, the difficulty value is:

$$
\text{Difficulty} \approx \frac{5.788 \times 10^{49}}{1.656 \times 10^{41}}
$$
$$
\text{Difficulty} \approx 3.493 \times 10^8
$$
