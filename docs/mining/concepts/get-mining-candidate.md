---
sidebar_position: 12
---

# Get Mining Candidate (GMC)

Introduces GMC, a forward-looking mining API.

## What is GMC?

GMC is an improved API for mining that ensures miners can mine large blocks in the MVC network without being limited by
the RPC interface due to block size growth. GMC, based on the work of Andrew Stone and Johan van der Hoeven, optimizes
the `getblocktemplate` interface by removing the transaction list and providing only the Merkle Proofs of all
transactions currently in the memory pool/block candidate for block assembly.

The new RPC methods are `getminingcandidate` and `submitminingsolution`. These methods serve as alternatives to the
traditional `getblocktemplate` and `submitblock` interfaces. These RPC calls do not send the entire block to the mining
pool (since the size of the entire block is more than double its actual size when transmitted via the RPC interface
because the RPC interface uses HEX encoding, which is larger than binary blocks). Instead, they send the candidate block
header, pre-assembled coinbase transaction, and coinbase Merkle proof. This is essentially the same data sent to hashing
hardware via the Stratum protocol. Due to the nature of Merkle trees, the data required for mining is logarithmic (O(
logN)) rather than linear (O(N)), significantly reducing the bandwidth and load required for mining.

The mining pool uses `getminingcandidate` to receive the aforementioned block information and a tracking identifier (
ID). MVC nodes will, by default, clear unfinished IDs 30 seconds after finding a new block. Miners can create (or
modify) new coinbase transactions and block header fields to create different candidates for hashing hardware to use.
Then, via Stratum, these candidates are forwarded to the hashing hardware. When a block solution (new block) is found,
the mining pool can submit the solution back to the node using `submitminingsolution`.

Benefits of using RPC `getminingcandidate` and RPC `submitminingsolution` include:

- Significantly reduced bandwidth and latency, especially for large blocks. This RPC requires log2(block size) data due
  to the size of Merkle branches.
- Faster JSON parsing and creation.
- Cleaner JSON.

## API Documentation

Detailed RPC interface and parameter descriptions can be found in
the [mining command documentation](../../nodes/usage/mvc-cli/mining.md).

### RPC getminingcandidate

Arguments: - [bool] provide_coinbase_tx (Optional - default is false)

#### Return Values

|             Variable             |                                                                                                                                                                Description                                                                                                                                                                 |
|:--------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|            [uuid] id             |                                                                                                                           The assigned ID from mvcd. This must be provided when submitting a potential solution.                                                                                                                           |
|      [hex string] prevHash       |                                                                                                                                                   Big Endian hash of the previous block.                                                                                                                                                   |
| [hex string] Coinbase (optional) | Suggested coinbase transaction. The miner is free to supply their own or alter the supplied one. Altering will require parsing and splitting the coinbase to splice in/out data as required. Requires Wallet to be enabled. Only returned when the provide_coinbase_tx argument is set to true. Returns an error if Wallet is not enabled. |
|        [int32_t] version         |                                                                                                                                                             The block version.                                                                                                                                                             |
|     [int64_t] coinbaseValue      |                                                                                                                                     Total funds available for the coinbase transaction (in Satoshis).                                                                                                                                      |
|         [uint32_t] nBits         |                                                                                                                                                     Compressed hexadecimal difficulty.                                                                                                                                                     |
|         [uint32_t] time          |                                                                                                                                                            Current block time.                                                                                                                                                             |
|           [int] height           |                                                                                                                                                        The candidate block height.                                                                                                                                                         |
|       [array] merkleProof        |                                                                                    Merkle branch/path for the block, used to calculate the Merkle Root of the block candidate. This is a list of Little-Endian hex strings ordered from top to bottom.                                                                                     |

#### Example Return

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

Arguments: A JSON String containing the following fields.

|       Variable        |                                  Description                                  |
|:---------------------:|:-----------------------------------------------------------------------------:|
|       [uuid] id       |                   The ID supplied by `getminingcandidate`.                    |
|   [uint32_t] nonce    |                            Miner-generated nonce.                             |
| [hex string] coinbase |           The crafted or modified coinbase transaction (Optional).            |
|    [uint32_t] time    | Block time (Optional - must fall within the mintime/maxtime consensus rules). |
|  [uint32_t] version   |                           Block version (Optional).                           |

#### Example Request

```
{   
  "id": "a5f1f38b-2a00-4913-833a-bbcbb39d5d2c", 
  "nonce": 1804358173, 
  "coinbase": "...00ffffffff10028122000b2fc7237b322f414431322ffff...", 
  "time": 1528925410, 
  "version": 536870912 
}  
```

#### Example Return

Success: returns true  
Failure: JSONRPCException or error reason including but not limited to the following.

|            Error             |                                        Description                                        | 
|:----------------------------:|:-----------------------------------------------------------------------------------------:|
| Block candidate ID not found | Required ID was not found, ID is supplied by the corresponding `getminingcandidate` call. |
|       nonce not found        |                       The nonce was not supplied or not recognized.                       | 
|    coinbase decode failed    |                      The supplied coinbase was unable to be parsed.                       | 

Other possible errors can result from the `SubmitBlock` (BIP22) method which `submitminingsolution` ultimately calls
upon.
