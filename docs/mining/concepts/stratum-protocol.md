---
sidebar_position: 10
---

# Stratum Mining Protocol

This article introduces the Stratum mining protocol, the current mainstream cryptocurrency mining protocol.

## What is the Stratum Mining Protocol?

The Stratum mining protocol is a protocol used for cryptocurrency mining, designed to optimize communication between
miners and mining pools. This protocol was introduced by Slush Pool in 2012, replacing the earlier HTTP mining protocol
and addressing issues of efficiency and scalability.

Before the Stratum protocol, cryptocurrency mining primarily used [RPC mining protocols](../config/set-up-your-own.md),
such as `getwork` and `getblocktemplate`. These protocols were common in early Bitcoin mining, but as mining difficulty
and the number of miners increased, RPC protocols exposed several significant shortcomings.

### Mining Methods and Drawbacks of RPC (or HTTP) Protocols

#### Mining Process

1. **Connecting to the Pool**:
    - Miners connect to the pool's server via RPC, typically using standard RPC POST requests to obtain mining tasks.

2. **Task Request**:
    - Miners send a request containing their wallet address and other relevant information to the pool to request a
      mining task.
    - The pool returns a task containing information such as the block header and target difficulty.

3. **Hash Calculation**:
    - Miners start calculating hashes with the given data, trying to find a hash value that meets the target difficulty.

4. **Submitting Results**:
    - When miners find a valid hash value, they use an RPC POST request to submit the result to the pool.
    - The pool verifies the result, and if valid, incorporates it into the blockchain.

5. **Task Loop**:
    - Since the RPC protocol is stateless, miners need to reconnect and request new tasks after each task completion.

#### Drawbacks of RPC Protocols

1. **High Connection Overhead**:
    - The stateless nature of the RPC protocol requires miners to reconnect and establish a new connection for each task
      request and result submission, increasing network overhead and latency.
    - Frequent connection establishment and closure operations lead to resource wastage for both miners and pool
      servers.

2. **Poor Real-time Performance**:
    - RPC protocols cannot push new tasks in real-time, causing miners to potentially perform invalid calculations due
      to untimely task updates.
    - Miners might waste computational resources during the task update process, reducing mining efficiency.

3. **Latency Issues**:
    - The need to reconnect for each task request and result submission significantly affects mining efficiency due to
      network latency.
    - In high-latency network environments, miners may miss valid tasks, reducing their earnings.

4. **Poor Scalability**:
    - Designed for web browsing, the RPC protocol was not intended for high-frequency task requests and result
      submissions, making it unsuitable for the high concurrency demands of large-scale mining operations.
    - As the number of miners increases, the pool server's load significantly increases, leading to performance
      bottlenecks.
    - As the number of blocks increases, the network bandwidth and computational resources required to generate a work
      task also increase.

5. **Low Fault Tolerance**:
    - The RPC protocol lacks fault tolerance for connection interruptions, making miners susceptible to losing tasks or
      results during network fluctuations, affecting mining stability.
    - Communication between pools and miners is vulnerable to network failures and attacks.

## Stratum Protocol Details

The [Stratum](https://en.bitcoin.it/wiki/Stratum_mining_protocol) protocol addresses the shortcomings of RPC protocols
by optimizing communication between miners and pools, improving mining efficiency and stability. It uses a persistent
connection and communicates using the JSON-RPC format, offering real-time task updates, strong fault tolerance, and good
scalability.

1. **Connection Establishment**:
    - Miners connect to the pool's Stratum server via TCP and communicate using the JSON-RPC format.
    - Upon successful connection, miners send a "mining.subscribe" request to subscribe to tasks.

2. **Task Allocation**:
    - After receiving the subscription request, the pool sends a "mining.notify" message containing detailed mining task
      information, such as the block header and target difficulty.
    - Miners start calculating hashes upon receiving the task, seeking solutions that meet the target difficulty.

3. **Submitting Results**:
    - When miners find a valid hash, they send a "mining.submit" message to the pool to submit their results.
    - The pool verifies the results and incorporates them into the blockchain if valid.

4. **Task Updates**:
    - The pool periodically sends new tasks to miners, ensuring they always work on the latest tasks.
    - Through "mining.notify" messages, the pool can dynamically adjust task parameters to improve mining efficiency.

### Advantages of the Protocol

1. **Efficient Communication**:
    - The Stratum protocol uses a persistent connection, reducing the overhead of frequent connection establishment and
      closure in the HTTP protocol.
    - Using the lightweight JSON-RPC format makes message transmission more efficient.

2. **Real-time Task Updates**:
    - Pools can push new tasks to miners in real-time, ensuring they always work on the latest block data and avoid
      invalid work.
    - Dynamic difficulty adjustment improves mining efficiency and fairness.

3. **Strong Fault Tolerance**:
    - The Stratum protocol supports multiple attempts to submit results, offering strong fault tolerance and ensuring
      miners' work is not lost due to occasional network fluctuations.
    - Supports redundant servers, allowing miners to switch to backup servers in case of a primary server failure,
      ensuring uninterrupted mining.

4. **Good Scalability**:
    - The simple design of the Stratum protocol makes it easy to extend, supporting various cryptocurrencies and
      different mining algorithms.
    - Pools can develop customized Stratum servers based on their needs to accommodate different miners and hardware
      configurations.

5. **Easy Task Division**:
    - The Stratum protocol divides mining tasks into smaller tasks that miners can process in parallel, increasing
      mining efficiency. Miners do not need to submit the entire block's proof of work but can submit proofs of work for
      each small task. This allows lower hash rate miners to have a chance to earn mining rewards.
    - Due to the properties of Merkle trees, the amount of data needed for mining is logarithmic rather than linear,
      reducing bandwidth and load.

6. **Support for AsicBoost**:
    - The Stratum protocol supports AsicBoost technology, providing a more efficient mining method through protocol
      extensions and message types.
    - Pools can send AsicBoost-related configuration information to miners via the Stratum protocol, enabling more
      efficient hash calculations.

## Example of Stratum Interaction

Here is a simple example of Stratum mining protocol interaction, including miner subscription, authorization, task push,
and result submission.

All messages use \n as the line ending.

----------

Miner subscription:

```json
{
  "id": 1,
  "method": "mining.subscribe",
  "params": []
}
```

Server response:

```json
{
  "id": 1,
  "result": [
    [
      [
        "mining.set_difficulty",
        "b4b6693b72a50c7116db18d6497cac52"
      ],
      [
        "mining.notify",
        "ae6812eb4cd7735a302a8a9dd95cf71f"
      ]
    ],
    "08000002",
    4
  ],
  "error": null
}
```

If this response is not received, possible reasons include:

1. Not connected to a Stratum server.
2. Stratum server is malfunctioning.
3. Request message line ending is not \n. This can happen when pasting multi-line text into the terminal. In this case,
   paste line by line and press Enter manually.

----------

After successful subscription, miner proceeds with worker name authorization:

```json
{
  "params": [
    "replace_with_your_real_worker_name",
    "password"
  ],
  "id": 2,
  "method": "mining.authorize"
}
```

Server response:

```json
{
  "error": null,
  "id": 2,
  "result": true
}
```

If the response is not true, the result field contains the error information.
If no response is received, possible reasons include:

1. Stratum Server malfunctioning.
2. Line ending issue.
3. Too long a gap between subscription and authorization, causing the server to abandon the miner's authorization.

----------

Upon successful authorization, the Stratum Server will proactively push mining difficulty and task information to the
miner as follows:

(Difficulty)

```json
{
  "id": null,
  "method": "mining.set_difficulty",
  "params": [
    16384
  ]
}
```

(Task)

```json
{
  "params": [
    "0",
    "4d16b6f85af6e2198f44ae2a6de67f78487ae5611b77c6c0440b921e00000000",
    "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff20020862062f503253482f04b8864e5008",
    "072f736c7573682f000000000100f2052a010000001976a914d23fcdf86f7e756a64a7a9688ef9903327048ed988ac00000000",
    [],
    "00000002",
    "1c2ac4af",
    "504e86b9",
    false
  ],
  "id": null,
  "method": "mining.notify"
}
```

If no difficulty push is received, it indicates the Stratum Server is malfunctioning.
If no task push is received, it indicates the Stratum Server might not have any tasks available for you at the moment.
For BTCPool, this could mean it has not read any tasks from Kafka, possibly due to jobmaker not generating corresponding
tasks or Kafka malfunctioning. Of course, the Stratum Server itself might also be malfunctioning.

----------

When a miner finds a share that meets the pool's set difficulty, it will submit the share:

```json
{
  "params": [
    "slush.miner1",
    "0",
    "00000001",
    "504e86ed",
    "b2957c02"
  ],
  "id": 4,
  "method": "mining.submit"
}
```

Server response:

```json
{
  "error": null,
  "id": 4,
  "result": true
}
```

If the result is not true, it will include the reason for rejecting the share.

----------

Please note that not every submit will result in a mined block. For a normal mining pool, most of the miner's
submissions will not result in a mined block, but occasionally, some submissions will meet the network difficulty
requirements, thus resulting in a mined block.

When a miner successfully mines a block, the submission action does not differ from usual. However, both miners and
pools can compare the share difficulty with the job's bits/target to discover if a share meets the network difficulty
requirement.

The same applies to merged mining; it checks if the share difficulty meets the difficulty of the merged mining coins in
the job. If mining multiple coins simultaneously, it only needs to check if it meets the lowest difficulty.

It is important to note that the difficulty of the merged mining coins might be higher or lower than the difficulty of
the main coin being mined.

If the main coin (e.g., Bitcoin) has a higher difficulty, then finding a Bitcoin block will also satisfy the difficulty
for the merged mining coins. However, the reverse is not necessarily true.

If the merged mining coins have a higher difficulty (e.g., Bitcoin Cash merged mining Namecoin), then finding a block
for the main coin does not necessarily mean a block for the merged mining coins has been found, but the reverse is
always true.

## Summary

The Stratum mining protocol enhances mining efficiency and system stability by optimizing communication between miners
and pools. Its efficient communication, real-time task updates, strong fault tolerance, and good scalability make it the
mainstream protocol for cryptocurrency mining today. As technology evolves, the Stratum protocol continues to advance,
further improving mining efficiency and security.
