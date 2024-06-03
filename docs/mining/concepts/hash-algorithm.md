---
sidebar_position: 1
---

# Hash Algorithm

Introduces the mining process and How the hash algorithm works.

MVC's Proof-of-Work (PoW) mining is a mathematical operation where miners repeatedly try different random numbers to
calculate the [hash value of the block header](../../blockchain/bitcoin-basics/block/block-hash.md) until they find a
hash value that meets the [difficulty target](../../blockchain/bitcoin-basics/block/bits.md). The miner who finds a hash
value that meets the difficulty target receives a block reward and transaction fee reward. This process of obtaining
rewards through hash calculation is PoW mining.

The structure of the block header (the object being hashed) is as follows:

![Block Header Structure](/img/blockheader.jpg)

## Mining Process

The general process of mining, including producing blocks, packaging transactions, and finally receiving rewards, is as
follows:

1. **Transaction Verification**:
   When an MVC transaction occurs, it is broadcast to a network of computers (nodes). These transactions enter a memory
   pool and are prepared to be included in the next block. As transactions increase, miners maintain a list of
   transactions from which a Merkle tree root hash is calculated and placed into the block header for mining
   calculations.
2. **Problem Solving**:
   Miners use powerful mining machines to perform hash calculations on the assembled block header. In MVC and Bitcoin,
   this operation uses the SHA-256 algorithm. Miners continuously try different random numbers (nonces) to calculate the
   block header's hash value until they find one that meets the network's difficulty target. The difficulty target's
   characteristic is a hash value with a certain number of leading zeros. The more leading zeros, the higher the
   difficulty and the lower the probability of discovering a block.
3. **Hash Function**: The specific function used in mining is SHA-256 (Secure Hash Algorithm 256-bit). Miners repeatedly
   input different nonce values (random numbers) into the SHA-256 algorithm to generate a hash value that meets the
   network's difficulty target.
4. **Difficulty Adjustment**: As the block production speed varies, the network adjusts the difficulty target to ensure
   that a new block is produced approximately every 10 minutes. Different blockchain networks have different rules for
   adjusting difficulty. MVC uses the same ASERT-DAA algorithm as BCH.
5. **Block Reward**:
   The block constructed by the miner contains a transaction with only an output and no input. The output address of
   this transaction is the miner's address, and the output amount is the block reward plus transaction fees. After
   finding a hash value that meets the difficulty target, the miner broadcasts the block to the network. Other nodes
   verify the block's legitimacy, and if valid, the block is added to the blockchain, and the miner receives the block
   reward and transaction fees.
6. **Block Inclusion in the Network**: Other nodes verify the block's legitimacy, and if valid, the block is added to
   the blockchain, and the miner receives the block reward and transaction fees.

## Hash Algorithm

A hash algorithm is a method that converts input data (of any size) into a fixed-length string called a "hash value"
or "hash code." Hash algorithms have various functions, features, and uses in computer science and cryptography:

### Functions

1. **Data Integrity Verification**: Hash algorithms can verify data integrity. By comparing the hash values of the
   original data and the transmitted data, any tampering can be detected.
2. **Fast Data Retrieval**: Hash tables use hash functions to quickly locate data, significantly improving retrieval
   efficiency by mapping data to hash values.
3. **Cryptographic Applications**: In cryptography, hash algorithms generate message digests, ensuring data integrity
   and authenticity.

### Features

1. **Irreversibility**: Hash algorithms are one-way functions, meaning it is impossible to reverse-engineer the original
   data from the hash value. This makes hash algorithms very useful in cryptography.
2. **Fixed-Length Output**: No matter the size of the input data, the hash value always has a fixed length. For example,
   SHA-256 always produces a 256-bit hash value.
3. **Collision Resistance**: Ideally, different input data should not produce the same hash value (known as a
   collision). Good hash algorithms minimize the likelihood of collisions.
4. **Fast Calculation**: Hash functions compute quickly, suitable for applications requiring rapid processing of large
   amounts of data.

![Hash Algorithm](/img/hash-algo.png)

### Common Hash Algorithms

1. **MD5 (Message-Digest Algorithm 5)**: Produces a 128-bit hash value, now considered insecure and not recommended for
   secure applications.
2. **SHA-1 (Secure Hash Algorithm 1)**: Produces a 160-bit hash value, also proven to have security vulnerabilities and
   not recommended for secure applications.
3. **SHA-256**: Produces a 256-bit hash value, part of the SHA-2 family, widely used in various secure applications.
   This is the hash algorithm used in MVC mining.
4. **SHA-3**: The latest secure hash algorithm standard designed for higher security.

### Uses

1. **Data Integrity Verification**: Used to verify the integrity of files during transfer and storage. For example, the
   hash value provided when downloading a file can verify if the file has been tampered with.
2. **Password Storage**: Passwords are usually hashed before storage to enhance security, storing the hash value instead
   of the plaintext password.
3. **Digital Signatures**: In digital signatures, hash algorithms generate message digests, ensuring the integrity and
   authenticity of messages.
4. **Blockchain**: In blockchain technology, hash algorithms generate block hash values, ensuring the immutability of
   the chain.

Due to its features of irreversibility, fixed-length output, and collision resistance, the hash algorithm plays a vital
role in information security and data processing.

MVC and Bitcoin use SHA-256 (Secure Hash Algorithm 256-bit), part of the SHA-2 (Secure Hash Algorithm 2) family. It is
one of the most widely used secure hash algorithms, producing a 256-bit (32-byte) hash value, known for fast
calculation, fixed-length output, and collision resistance, suitable for various secure applications.

## Security and Fairness

Hash algorithms ensure the security and fairness of the network in PoW public chains. Specifically, hash algorithms
ensure blockchain security through the following methods:

### 1. Blockchain Integrity and Immutability

- **Hash Chain**: Each block contains the hash value of the previous block, forming a chain. If any block's data is
  tampered with, the hash value of that block changes, causing all subsequent blocks' hash values to change, rendering
  the entire chain invalid. This design makes tampering with blockchain data extremely difficult, as modifying one block
  requires recalculating the hash values of all subsequent blocks.

### 2. Proof of Work (PoW)

- **Proof of Work Mechanism**: MVC uses the SHA-256 hash algorithm as part of its PoW mechanism. Miners must solve a
  complex mathematical problem, finding a hash value that meets specific conditions (usually having a certain number of
  leading zeros). This computation requires substantial computational power and time, preventing easy network attacks.
- **Preventing Double Spending**: Through PoW, attackers find it difficult to control a significant portion of the
  network's computational power simultaneously. This means it is almost impossible for attackers to reorganize the chain
  to achieve double spending, as this requires recalculating and verifying a large number of blocks.

### 3. Data Integrity and Tamper Resistance

- **Transaction Verification**: MVC transaction data is packaged into blocks when broadcasted to the network. Each
  transaction is hashed to ensure data integrity and tamper resistance. If transaction data is tampered with, its hash
  value will no longer match, making tampering easily detectable.
- **Merkle Tree**: Transaction data in each block is organized using a Merkle tree, a binary tree structure where
  transaction hash values are combined in pairs to generate upper-level node hash values until a root hash value (Merkle
  Root) is generated. This structure ensures that any change in a single transaction affects the root hash value,
  ensuring transaction data integrity.

### 4. Preventing Preimage and Collision Attacks

- **Resisting Preimage Attacks**: SHA-256 is designed to resist preimage attacks. Even with precomputed hash values and
  corresponding data, attacking SHA-256 remains infeasible.
- **Collision Resistance**: SHA-256 has strong collision resistance, making it nearly impossible to find two different
  sets of data producing the same hash value. This ensures the uniqueness and security of MVC transactions and blocks.

### 5. Miner Rewards and Incentives

- **Block Rewards and Transaction Fees**: Miners receive MVC rewards and transaction fees for solving PoW problems. Only
  the first miner to solve the problem and verify the new block receives the reward, incentivizing miners to work
  honestly and maintain network security.

## Conclusion

Using hash algorithms for mining is the core mechanism of PoW public chains and an essential means of ensuring network
security and fairness. Hash algorithms guarantee blockchain security through PoW, data integrity verification, tamper
resistance, attack resistance, and more. SHA-256, as a secure, fast, and collision-resistant hash algorithm, provides a
solid foundation for MVC mining, ensuring stable network operation and miner rewards.
