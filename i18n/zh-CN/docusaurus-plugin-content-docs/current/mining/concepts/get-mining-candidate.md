---
sidebar_position: 12
---

# Get Mining Candidate(GMC)

本文介绍GMC，面向未来的挖矿API。

## 什么是GMC

GMC 是一种为挖矿改进的 API，确保矿工在MVC网络中可以通过挖掘大区块来扩展，而不会因为区块大小的增长而受到 RPC 接口的限制。GMC
基于 Andrew Stone 和 Johan van der Hoeven 的工作，通过优化`getblocktemplate`接口，将其中的交易列表移除，只提供当前在内存池/区块候选中所有交易的Merkle
Proof证明来组装区块。

新增的 RPC 方法有 `getminingcandidate` 和 `submitminingsolution`。它们是传统的 `getblocktemplate` 和 `submitblock`
的平替接口。这些 RPC 调用不会将整个区块传递给矿池（在通过 RPC
接口传输时，整个区块的大小是实际区块大小的两倍多，这是因为RPC接口使用HEX编码格式，相对于二进制区块要大）。相反，它们传递候选区块头、预装配的
coinbase 交易和 coinbase 默克尔证明。这基本上与通过 Stratum
协议传递给哈希硬件的数据相同。也就是说，由于Merkle树的性质，挖矿所需要的数据量是对数O(logN)级别的。而并非线性O(N)
级别的，也就显著降低了挖矿所需要的带宽和负载。

矿池使用 `getminingcandidate` 接收前述的区块信息和一个跟踪标识符 (ID)。在找到一个新块后 30 秒内，MVC节点会默认清除未完成的
ID。矿工可以创建（或修改）新的coinbase 交易和区块头字段，以创建不同的候选项供哈希硬件使用。然后，通过 Stratum
将这些候选项转发给哈希硬件。当找到一个区块解（挖出新区块）时，矿池可以通过 `submitminingsolution` 将解决方案提交回节点。

使用 RPC `getminingcandidate` 和 RPC `submitminingsolution` 的一些好处包括：

* 大大减少带宽和延迟，特别是对于大区块。这种 RPC 需要 log2(区块大小) 的数据，这是由于默克尔分支的大小决定的。
* 更快的 JSON 解析和创建。
* 简洁的 JSON。

## 接口文档

详细的rpc接口以及参数说明可以参考[mining command](../../nodes/usage/mvc-cli/mining.md)。

### RPC getminingcandidate

Arguments: - [bool] provide_coinbase_tx (Optional - default is false)

#### 返回值

|             Variable             |                                                                                                                                                                     Description                                                                                                                                                                      |
|:--------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|   
|            [uuid] id             |                                                                                                                                The assigned id from mvcd. This must be provided with submitting a potential solution                                                                                                                                 |
|      [hex string] prevHash       |                                                                                                                                                        Big Endian hash of the previous block                                                                                                                                                         | 
| [hex string] Coinbase (optional) | Suggested coinbase transaction is provided. Miner is free to supply their own or alter the supplied one. Altering will require parsing and splitting the coinbase in order to splice in/out data as required.  Requires Wallet to be enabled. Only returned when provide_coinbase_tx argument is set to true. Returns error if Wallet is not enabled |
|        [int32_t] version         |                                                                                                                                                                  The block version                                                                                                                                                                   | 
|     [int64_t] coinbaseValue      |                                                                                                                                               Total funds available for the coinbase tx (in Satoshis)                                                                                                                                                | 
|         [uint32_t] nBits         |                                                                                                                                                          Compressed hexadecimal difficulty                                                                                                                                                           | 
|         [uint32_t] time          |                                                                                                                                                                  Current block time                                                                                                                                                                  | 
|           [int] height           |                                                                                                                                                              The candidate block height                                                                                                                                                              | 
|       [array] merkleProof        |                                                                                          Merkle branch/path for the block, used to calculate the Merkle Root of the block candidate. This is a list of Little-Endian hex strings ordered from top to bottom                                                                                          |

#### 返回值例

```
{ 
  "id": "a5f1f38b-2a00-4913-833a-bbcbb39d5d2c", 
  "prevhash": "0000000020493e205694c9fcb42f7d4ce5d85e230d52fccc90a6354e13940396", 
  "coinbase": "02000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0503878b1300ffffffff01c5a4a80400000000232103b8310da7c413106c6ce63814dbcd366c55e8ae39c8c43c1fdaeb76df56e4ff7dac00000000", 
  "version": 536870912, 
  "nBits": "1c4877e8", 
  "time": 1548132190, 
  "height": 1280903, 
  "merkleProof": [ 
    "497d51f3a933dd6e933cd37a4a5799066086d4ff45dce23f0819c7a6c7174ccb", 
    "c2de445eda326b4afcec1291fc0dad3c526ddb551cbb01e2e10a10ebe79d2482", 
    "7f417e9de2e8c37566141e3057eec37747a924117413ee7c2b8f902dd81b095f", 
    "b25810a0b826ea8bf848d6e3f98f6c0bf4d097f0d1854d50c6e12988f29757d6" 
  ] 
}
```  

### RPC submitminingsolution

Arguments: A JSON String containing the below fields.

|       Variable        |                                  Description                                  |
|:---------------------:|:-----------------------------------------------------------------------------:|
|       [uuid] id       |                     The id supplied by getminingcandidate                     | 
|   [uint32_t] nonce    |                             Miner generated nonce                             |  
| [hex string] coinbase |            The crafted or modified coinbase transaction (Optional)            |
|    [uint32_t] time    | Block time (Optional - must fall within the mintime/maxtime consensus rules ) |
|  [uint32_t] version   |                           Block version (Optional)                            | 

#### 请求例

```
{   
  "id": a5f1f38b-2a00-4913-833a-bbcbb39d5d2c, 
  "nonce": 1804358173, 
   "coinbase": "...00ffffffff10028122000b2fc7237b322f414431322ffff...", 
   "time": 1528925410, 
   "version": 536870912 
}  
```

#### 返回值例

Success: returns true  
Failure: JSONRPCException or error reason comprising of but not limited to the following.

|            Error             |                                      Description                                       | 
|:----------------------------:|:--------------------------------------------------------------------------------------:|
| Block candidate ID not found | Required ID was not found, ID is supplied by the corresponding getminingcandidate call |
|       nonce not found        |                      The nonce was not supplied or not recognized                      | 
|    coinbase decode failed    |                     The supplied coinbase was unable to be parsed                      | 

Other possible errors can result from the SubmitBlock (BIP22) method in which submitminingsolution ultimately calls
upon. 
