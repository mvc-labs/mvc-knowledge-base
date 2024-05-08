# Blockchain 命令

Blockchain下属命令主要用来操作和区块链共识相关的功能。

可以使用`mvc-cli help command`来查看具体命令的使用方法。JsonRpc调用方法在示例中。

## 命令列表

命令列表如下（从文档右侧边框选取对应的命令进行查看）：

```text
== Blockchain ==
checkjournal
getbestblockhash
getblock "blockhash" ( verbosity )
getblockbyheight height ( verbosity )
getblockchaininfo
getblockcount
getblockhash height
getblockheader "hash" ( verbose )
getblockstats blockhash ( stats )
getblockstatsbyheight height ( stats )
getchaintips
getchaintxstats ( nblocks blockhash )
getdifficulty
getmempoolancestors txid (verbose)
getmempooldescendants txid (verbose)
getmempoolentry txid
getmempoolinfo
getrawmempool ( verbose )
getrawnonfinalmempool
gettxout "txid" n ( include_mempool )
gettxoutproof ["txid",...] ( blockhash )
gettxoutsetinfo
preciousblock "blockhash"
pruneblockchain
rebuildjournal
verifychain ( checklevel nblocks )
verifytxoutproof "proof"
```

## checkjournal

节点默认会采用journaling的方式来构建区块链，这个命令可以检查journal和内存池的完整性和一致性。矿工使用这个命令来检查区块的完整性。

```text
checkjournal

Checks for consistency between the TX memory pool and the block assembly journal.

Result:
{
  "ok": xx,                    (boolean) True if check passed, False otherwise
  "errors": xxxxx,             (string) If check failed, a string listing the errors
}

Examples:
> mvc-cli checkjournal
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "checkjournal", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getbestblockhash

返回当前最长链上最新区块的哈希值。用于定位当前区块链的最新状态。

```text
getbestblockhash

Returns the hash of the best (tip) block in the longest blockchain.

Result:
"hex"      (string) the block hash hex encoded

Examples:
> mvc-cli getbestblockhash
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbestblockhash", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getblock

根据不同的verbosity参数，返回指定哈希值的区块信息。

参数包括

- blockhash: 区块哈希值
- verbosity: 0, 1, 2, 3。也可以是字符串"RAW_BLOCK", "DECODE_HEADER", "DECODE_TRANSACTIONS", "DECODE_HEADER_AND_COINBASE"

其中verbosity的值对应的返回结果如下：

* 0 或者 "RAW_BLOCK"：返回区块的HEX序列化数据，用于拉去全量数据。
* 1 或者 "DECODE_HEADER"：返回区块头信息。
* 2 或者 "DECODE_TRANSACTIONS"：返回区块头和交易信息。
* 3 或者 "DECODE_HEADER_AND_COINBASE"：返回区块头和coinbase交易信息。

```text
getblock "blockhash" ( verbosity )

If verbosity is 0 or RAW_BLOCK, returns a string that is serialized, hex-encoded data for block 'hash'.
If verbosity is 1 or DECODE_HEADER, returns an Object with information about block <hash>.
If verbosity is 2 or DECODE_TRANSACTIONS, returns an Object with information about block <hash> and information about each transaction.
If verbosity is 3 or DECODE_HEADER_AND_COINBASE, returns a json object with block information and the coinbase transaction.

Arguments:
1. "blockhash"          (string, required) The block hash
2. verbosity              (numeric or string, optional, default=1) 0 (RAW_BLOCK) for hex encoded data, 1 (DECODE_HEADER) for a json object, 2 (DECODE_TRANSACTIONS) for json object with transaction data and 3 (DECODE_HEADER_AND_COINBASE) for a json object with coinbase only

Result (for verbosity = 0 or verbosity = RAW_BLOCK):
"data"             (string) A string that is serialized, hex-encoded data for block 'hash'.

Result (for verbosity = 1 or verbosity = DECODE_HEADER):
{
  "hash" : "hash",     (string) the block hash (same as provided)
  "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
  "size" : n,            (numeric) The block size
  "height" : n,          (numeric) The block height or index
  "version" : n,         (numeric) The block version
  "versionHex" : "00000000", (string) The block version formatted in hexadecimal
  "merkleroot" : "xxxx", (string) The merkle root
  "num_tx" : n,          (numeric) The number of transactions
  "tx" : [               (array of string) The transaction ids
     "transactionid"     (string) The transaction id
     ,...
  ],
  "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (numeric) The nonce
  "bits" : "1d00ffff", (string) The bits
  "difficulty" : x.xxx,  (numeric) The difficulty
  "chainwork" : "xxxx",  (string) Expected number of hashes required to produce the chain up to this block (in hex)
  "previousblockhash" : "hash",  (string) The hash of the previous block
  "nextblockhash" : "hash"       (string) The hash of the next block
}

Result (for verbosity = 2 or verbosity = DECODE_TRANSACTIONS):
"data"             (string) A string that is serialized, hex-encoded data for block 'hash'.
{
  "hash" : "hash",     (string) the block hash (same as provided)
  "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
  "size" : n,            (numeric) The block size
  "height" : n,          (numeric) The block height or index
  "version" : n,         (numeric) The block version
  "versionHex" : "00000000", (string) The block version formatted in hexadecimal
  "merkleroot" : "xxxx", (string) The merkle root
  "num_tx" : n,          (numeric) The number of transactions
  "tx" : [               (array of Objects) The transactions in the format of the getrawtransaction RPC. Different from verbosity = 1 "tx" result.
         ,...
  ],
  "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (numeric) The nonce
  "bits" : "1d00ffff", (string) The bits
  "difficulty" : x.xxx,  (numeric) The difficulty
  "chainwork" : "xxxx",  (string) Expected number of hashes required to produce the chain up to this block (in hex)
  "previousblockhash" : "hash",  (string) The hash of the previous block
  "nextblockhash" : "hash"       (string) The hash of the next block
}

Result (for verbosity = 3 or verbosity = DECODE_HEADER_AND_COINBASE):
{
  "hash" : "hash",     (string) the block hash (same as provided)
  "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
  "size" : n,            (numeric) The block size
  "height" : n,          (numeric) The block height or index
  "version" : n,         (numeric) The block version
  "versionHex" : "00000000", (string) The block version formatted in hexadecimal
  "merkleroot" : "xxxx", (string) The merkle root
  "num_tx" : n,          (numeric) The number of transactions
  "tx" : [               The coinbase transaction in the format of the getrawtransaction RPC. Different from verbosity = 1 "tx" result.
         ,...
  ],
  "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (numeric) The nonce
  "bits" : "1d00ffff", (string) The bits
  "difficulty" : x.xxx,  (numeric) The difficulty
  "chainwork" : "xxxx",  (string) Expected number of hashes required to produce the chain up to this block (in hex)
  "previousblockhash" : "hash",  (string) The hash of the previous block
  "nextblockhash" : "hash"       (string) The hash of the next block
}

Examples:
> mvc-cli getblock "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblock", "params": ["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getblockbyheight

根据区块高度返回区块信息。返回结果和getblock一样。需要注意的是，如果区块高度不在主链上，返回结果中confirmations为-1。并且由于区块重组，高度对应的区块可能会发生变化。

参数包括

- height: 区块高度
- verbosity: 0, 1, 2, 3。也可以是字符串"RAW_BLOCK", "DECODE_HEADER", "DECODE_TRANSACTIONS", "DECODE_HEADER_AND_COINBASE"

其中verbosity的值对应的返回结果如下：

* 0 或者 "RAW_BLOCK"：返回区块的HEX序列化数据，用于拉去全量数据。
* 1 或者 "DECODE_HEADER"：返回区块头信息。
* 2 或者 "DECODE_TRANSACTIONS"：返回区块头和交易信息。
* 3 或者 "DECODE_HEADER_AND_COINBASE"：返回区块头和coinbase交易信息。

```text
getblockbyheight height ( verbosity )

If verbosity is 0 or RAW_BLOCK, returns a string that is serialized, hex-encoded data for block 'hash'.
If verbosity is 1 or DECODE_HEADER, returns an Object with information about block <hash>.
If verbosity is 2 or DECODE_TRANSACTIONS, returns an Object with information about block <hash> and information about each transaction.
If verbosity is 3 or DECODE_HEADER_AND_COINBASE, returns a json object with block information and the coinbase transaction.

Arguments:
1. "height"             (numeric, required) The block height
2. verbosity              (numeric or string, optional, default=1) 0 (RAW_BLOCK) for hex encoded data, 1 (DECODE_HEADER) for a json object, 2 (DECODE_TRANSACTIONS) for json object with transaction data and 3 (DECODE_HEADER_AND_COINBASE) for a json object with coinbase only

Result (for verbosity = 0 or verbosity = RAW_BLOCK):
"data"             (string) A string that is serialized, hex-encoded data for block 'hash'.

Result (for verbosity = 1 or verbosity = DECODE_HEADER):
{
  "hash" : "hash",     (string) the block hash (same as provided)
  "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
  "size" : n,            (numeric) The block size
  "height" : n,          (numeric) The block height or index
  "version" : n,         (numeric) The block version
  "versionHex" : "00000000", (string) The block version formatted in hexadecimal
  "merkleroot" : "xxxx", (string) The merkle root
  "num_tx" : n,          (numeric) The number of transactions
  "tx" : [               (array of string) The transaction ids
     "transactionid"     (string) The transaction id
     ,...
  ],
  "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (numeric) The nonce
  "bits" : "1d00ffff", (string) The bits
  "difficulty" : x.xxx,  (numeric) The difficulty
  "chainwork" : "xxxx",  (string) Expected number of hashes required to produce the chain up to this block (in hex)
  "previousblockhash" : "hash",  (string) The hash of the previous block
  "nextblockhash" : "hash"       (string) The hash of the next block
}

Result (for verbosity = 2 or verbosity = DECODE_TRANSACTIONS):
{
  "hash" : "hash",     (string) the block hash (same as provided)
  "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
  "size" : n,            (numeric) The block size
  "height" : n,          (numeric) The block height or index
  "version" : n,         (numeric) The block version
  "versionHex" : "00000000", (string) The block version formatted in hexadecimal
  "merkleroot" : "xxxx", (string) The merkle root
  "num_tx" : n,          (numeric) The number of transactions
  "tx" : [               (array of Objects) The transactions in the format of the getrawtransaction RPC. Different from verbosity = 1 "tx" result.
         ,...
  ],
  "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (numeric) The nonce
  "bits" : "1d00ffff", (string) The bits
  "difficulty" : x.xxx,  (numeric) The difficulty
  "chainwork" : "xxxx",  (string) Expected number of hashes required to produce the chain up to this block (in hex)
  "previousblockhash" : "hash",  (string) The hash of the previous block
  "nextblockhash" : "hash"       (string) The hash of the next block
}

Result (for verbosity = 3 or verbosity = DECODE_HEADER_AND_COINBASE):
{
  "hash" : "hash",     (string) the block hash (same as provided)
  "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
  "size" : n,            (numeric) The block size
  "height" : n,          (numeric) The block height or index
  "version" : n,         (numeric) The block version
  "versionHex" : "00000000", (string) The block version formatted in hexadecimal
  "merkleroot" : "xxxx", (string) The merkle root
  "num_tx" : n,          (numeric) The number of transactions
  "tx" : [               The coinbase transaction in the format of the getrawtransaction RPC. Different from verbosity = 1 "tx" result.
         ,...
  ],
  "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (numeric) The nonce
  "bits" : "1d00ffff", (string) The bits
  "difficulty" : x.xxx,  (numeric) The difficulty
  "chainwork" : "xxxx",  (string) Expected number of hashes required to produce the chain up to this block (in hex)
  "previousblockhash" : "hash",  (string) The hash of the previous block
  "nextblockhash" : "hash"       (string) The hash of the next block
}

Examples:
> mvc-cli getblockbyheight "1214adbda81d7e2a3dd146f6ed09"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockbyheight", "params": ["1214adbda81d7e2a3dd146f6ed09"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getblockchaininfo

返回当前区块链的信息，包括区块链的最新状态，区块链的共识状态，区块链的网络状态等。

```text
lockchaininfo
Returns an object containing various state info regarding blockchain processing.

Result:
{
  "chain": "xxxx",        (string) current network name as defined in BIP70 (main, test, regtest)
  "blocks": xxxxxx,         (numeric) the current number of blocks processed in the server
  "headers": xxxxxx,        (numeric) the current number of headers we have validated
  "bestblockhash": "...", (string) the hash of the currently best block
  "difficulty": xxxxxx,     (numeric) the current difficulty
  "mediantime": xxxxxx,     (numeric) median time for the current best block
  "verificationprogress": xxxx, (numeric) estimate of verification progress [0..1]
  "chainwork": "xxxx"     (string) total amount of work in active chain, in hexadecimal
  "pruned": xx,             (boolean) if the blocks are subject to pruning
  "pruneheight": xxxxxx,    (numeric) lowest-height complete block stored
  "softforks": [            (array) status of softforks in progress
     {
        "id": "xxxx",        (string) name of softfork
        "version": xx,         (numeric) block version
        "reject": {            (object) progress toward rejecting pre-softfork blocks
           "status": xx,       (boolean) true if threshold reached
        },
     }, ...
  ]
}

Examples:
> mvc-cli getblockchaininfo
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/

```

## getblockcount

返回当前最长区块链上的区块数量。

```text
getblockcount

Returns the number of blocks in the longest blockchain.

Result:
n    (numeric) The current block count

Examples:
> mvc-cli getblockcount
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockcount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getblockhash

根据区块高度返回区块哈希值。

参数：

- height: 区块高度

```text
getblockhash height

Returns hash of block in best-block-chain at height provided.

Arguments:
1. height         (numeric, required) The height index

Result:
"hash"         (string) The block hash

Examples:
> mvc-cli getblockhash 1000
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockhash", "params": [1000] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getblockheader

根据区块哈希值返回区块头信息。可以指定verbosity参数，返回不同级别的信息。

参数：

- hash: 区块哈希值
- verbose: true, false。false返回HEX序列化数据，true返回json对象。默认为true。

```text
getblockheader "hash" ( verbose )

If verbose is false, returns a string that is serialized, hex-encoded data for blockheader 'hash'.
If verbose is true, returns an Object with information about blockheader <hash>.

Arguments:
1. "hash"          (string, required) The block hash
2. verbose           (boolean, optional, default=true) true for a json object, false for the hex encoded data

Result (for verbose = true):
{
  "hash" : "hash",     (string) the block hash (same as provided)
  "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
  "height" : n,          (numeric) The block height or index
  "version" : n,         (numeric) The block version
  "versionHex" : "00000000", (string) The block version formatted in hexadecimal
  "merkleroot" : "xxxx", (string) The merkle root
  "num_tx" : n,          (numeric) The number of transactions
  "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
  "nonce" : n,           (numeric) The nonce
  "bits" : "1d00ffff", (string) The bits
  "difficulty" : x.xxx,  (numeric) The difficulty
  "chainwork" : "0000...1f3"     (string) Expected number of hashes required to produce the current chain (in hex)
  "previousblockhash" : "hash",  (string) The hash of the previous block
  "nextblockhash" : "hash",      (string) The hash of the next block
status: {
  "validity" : (string) Validation state of the block
  "data" : (boolean) Data flag
  "undo" : (boolean) Undo flag
  "failed" : (boolean) Failed flag
  "parent failed" : (boolean) Parent failed flag
  "disk meta" : (boolean) Disk meta flag
  "soft reject" : (boolean) Soft reject flag
  "double spend" : (boolean) May contain a double spend tx
  "soft consensus frozen" : (boolean) Soft consensus frozen flag
  }
}

Result (for verbose=false):
"data"             (string) A string that is serialized, hex-encoded data for block 'hash'.

Examples:
> mvc-cli getblockheader "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockheader", "params": ["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getblockstats

根据区块哈希值返回区块统计信息。可以指定stats参数，返回不同的统计信息。统计信息包括费率，输入数量。输出数量，utxo数量等。

参数：

- blockhash: 区块哈希值
- stats: "minmaxfee", "minmaxfeerate", "avgfee", "avgfeerate", "avgtxsize", "blockhash", "utxo_size_inc"等，详情见下方示例。

```text
getblockstats blockhash ( stats )

Compute per block statistics for a given window. All amounts are in SPACE.
It won't work for some heights with pruning.
It won't work without -txindex for utxo_size_inc, *fee or *feerate stats.

Arguments:
1. "blockhash"          (string, required) The block hash of the target block
2. "stats"              (array,  optional) Values to plot, by default all values (see result below)
    [
      "height",         (string, optional) Selected statistic
      "time",           (string, optional) Selected statistic
      ,...
    ]

Result:
{                           (json object)
  "avgfee": x.xxx,          (numeric) Average fee in the block
  "avgfeerate": x.xxx,      (numeric) Average feerate (in SPACE per byte)
  "avgtxsize": xxxxx,       (numeric) Average transaction size
  "blockhash": xxxxx,       (string) The block hash (to check for potential reorgs)
  "height": xxxxx,          (numeric) The height of the block
  "ins": xxxxx,             (numeric) The number of inputs (excluding coinbase)
  "maxfee": xxxxx,          (numeric) Maximum fee in the block
  "maxfeerate": xxxxx,      (numeric) Maximum feerate (in SPACE per byte)
  "maxtxsize": xxxxx,       (numeric) Maximum transaction size
  "medianfee": x.xxx,       (numeric) Truncated median fee in the block
  "medianfeerate": x.xxx,   (numeric) Truncated median feerate (in SPACE per byte)
  "mediantime": xxxxx,      (numeric) The block median time past
  "mediantxsize": xxxxx,    (numeric) Truncated median transaction size
  "minfee": x.xxx,          (numeric) Minimum fee in the block
  "minfeerate": xx.xx,      (numeric) Minimum feerate (in SPACE per byte)
  "mintxsize": xxxxx,       (numeric) Minimum transaction size
  "outs": xxxxx,            (numeric) The number of outputs
  "subsidy": x.xxx,         (numeric) The block subsidy
  "time": xxxxx,            (numeric) The block time
  "total_out": x.xxx,       (numeric) Total amount in all outputs (excluding coinbase and thus reward [ie subsidy + totalfee])
  "total_size": xxxxx,      (numeric) Total size of all non-coinbase transactions
  "totalfee": x.xxx,        (numeric) The fee total
  "txs": xxxxx,             (numeric) The number of transactions (excluding coinbase)
  "utxo_increase": xxxxx,   (numeric) The increase/decrease in the number of unspent outputs
  "utxo_size_inc": xxxxx,   (numeric) The increase/decrease in size for the utxo index (not discounting op_return and similar)
}

Examples:
> mvc-cli getblockstats 000000000000000001618b0a11306363725fbb8dbecbb0201c2b4064cda00790 "[\"minfeerate\",\"avgfeerate\"]"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockstats", "params": ["000000000000000001618b0a11306363725fbb8dbecbb0201c2b4064cda00790", ["minfeerate","avgfeerate"]] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getblockstatsbyheight

根据区块高度返回区块统计信息。可以指定stats参数，返回不同的统计信息。统计信息包括费率，输入数量。输出数量，utxo数量等。

参数：

- height: 区块高度
- stats: "minmaxfee", "minmaxfeerate", "avgfee", "avgfeerate", "avgtxsize", "blockhash", "utxo_size_inc"等，详情见下方示例。

```text
getblockstatsbyheight height ( stats )

Compute per block statistics for a given window. All amounts are in SPACE.
It won't work for some heights with pruning.
It won't work without -txindex for utxo_size_inc, *fee or *feerate stats.

Arguments:
1. "height"             (numeric, required) The height of the target block
2. "stats"              (array,  optional) Values to plot, by default all values (see result below)
    [
      "height",         (string, optional) Selected statistic
      "time",           (string, optional) Selected statistic
      ,...
    ]

Result:
{                           (json object)
  "avgfee": x.xxx,          (numeric) Average fee in the block
  "avgfeerate": x.xxx,      (numeric) Average feerate (in SPACE per byte)
  "avgtxsize": xxxxx,       (numeric) Average transaction size
  "blockhash": xxxxx,       (string) The block hash (to check for potential reorgs)
  "height": xxxxx,          (numeric) The height of the block
  "ins": xxxxx,             (numeric) The number of inputs (excluding coinbase)
  "maxfee": xxxxx,          (numeric) Maximum fee in the block
  "maxfeerate": xxxxx,      (numeric) Maximum feerate (in SPACE per byte)
  "maxtxsize": xxxxx,       (numeric) Maximum transaction size
  "medianfee": x.xxx,       (numeric) Truncated median fee in the block
  "medianfeerate": x.xxx,   (numeric) Truncated median feerate (in SPACE per byte)
  "mediantime": xxxxx,      (numeric) The block median time past
  "mediantxsize": xxxxx,    (numeric) Truncated median transaction size
  "minfee": x.xxx,          (numeric) Minimum fee in the block
  "minfeerate": xx.xx,      (numeric) Minimum feerate (in SPACE per byte)
  "mintxsize": xxxxx,       (numeric) Minimum transaction size
  "outs": xxxxx,            (numeric) The number of outputs
  "subsidy": x.xxx,         (numeric) The block subsidy
  "time": xxxxx,            (numeric) The block time
  "total_out": x.xxx,       (numeric) Total amount in all outputs (excluding coinbase and thus reward [ie subsidy + totalfee])
  "total_size": xxxxx,      (numeric) Total size of all non-coinbase transactions
  "totalfee": x.xxx,        (numeric) The fee total
  "txs": xxxxx,             (numeric) The number of transactions (excluding coinbase)
  "utxo_increase": xxxxx,   (numeric) The increase/decrease in the number of unspent outputs
  "utxo_size_inc": xxxxx,   (numeric) The increase/decrease in size for the utxo index (not discounting op_return and similar)
}

Examples:
> mvc-cli getblockstatsbyheight 620538 "[\"minfeerate\",\"avgfeerate\"]"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockstatsbyheight", "params": [630538, ["minfeerate","avgfeerate"]] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getchaintips

获取所有区块链分叉的tips信息。返回结果包括分叉的区块哈希值，分叉的区块高度。

```text
getchaintips
Return information about all known tips in the block tree, including the main chain as well as orphaned branches.

Result:
[
  {
    "height": xxxx,         (numeric) height of the chain tip
    "hash": "xxxx",         (string) block hash of the tip
    "branchlen": 0          (numeric) zero for main chain
    "status": "active"      (string) "active" for the main chain
  },
  {
    "height": xxxx,
    "hash": "xxxx",
    "branchlen": 1          (numeric) length of branch connecting the tip to the main chain
    "status": "xxxx"        (string) status of the chain (active, valid-fork, valid-headers, headers-only, invalid)
  }
]
Possible values for status:
1.  "invalid"               This branch contains at least one invalid block
2.  "headers-only"          Not all blocks for this branch are available, but the headers are valid
3.  "valid-headers"         All blocks are available for this branch, but they were never fully validated
4.  "valid-fork"            This branch is not part of the active chain, but is fully validated
5.  "active"                This is the tip of the active main chain, which is certainly valid

Examples:
> mvc-cli getchaintips
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getchaintips", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getchaintxstats

获取区块链全部交易统计信息。返回结果包括区块链的交易数量，交易费率，交易大小等。

参数：

- nblocks: 向前回溯的区块数量
- blockhash: 回溯终点的区块哈希值

```text
getchaintxstats ( nblocks blockhash )

Compute statistics about the total number and rate of transactions in the chain.

Arguments:
1. nblocks      (numeric, optional) Size of the window in number of blocks (default: one month).
2. "blockhash"  (string, optional) The hash of the block that ends the window.

Result:
{
  "time": xxxxx,                (numeric) The timestamp for the final block in the window in UNIX format.
  "txcount": xxxxx,             (numeric) The total number of transactions in the chain up to that point.
  "window_block_count": xxxxx,  (numeric) Size of the window in number of blocks.
  "window_tx_count": xxxxx,     (numeric) The number of transactions in the window. Only returned if "window_block_count" is > 0.
  "window_interval": xxxxx,     (numeric) The elapsed time in the window in seconds. Only returned if "window_block_count" is > 0.
  "txrate": x.xx,               (numeric) The average rate of transactions per second in the window. Only returned if "window_interval" is > 0.
}

Examples:
> mvc-cli getchaintxstats
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getchaintxstats", "params": [2016] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getdifficulty

返回当前区块链的难度值。

```text
getdifficulty

Returns the proof-of-work difficulty as a multiple of the minimum difficulty.

Result:
n.nnn       (numeric) the proof-of-work difficulty as a multiple of the minimum difficulty.

Examples:
> mvc-cli getdifficulty
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getdifficulty", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getmempoolancestors

如果交易在内存池中，根据交易哈希值返回交易在内存池的祖先交易。返回结果包括交易的哈希值，交易的大小，交易的费率等。

参数：

- txid: 交易哈希值
- verbose: true, false。false返回交易哈希值，true返回交易详细信息。默认为false。

```text
getmempoolancestors txid (verbose)

If txid is in the mempool, returns all in-mempool ancestors.

Arguments:
1. "txid"                 (string, required) The transaction id (must be in mempool)
2. verbose                  (boolean, optional, default=false) True for a json object, false for array of transaction ids

Result (for verbose=false):
[                       (json array of strings)
  "transactionid"           (string) The transaction id of an in-mempool ancestor transaction
  ,...
]

Result (for verbose=true):
{                           (json object)
  "transactionid" : {       (json object)
    "size" : n,             (numeric) transaction size.
    "fee" : n,              (numeric) transaction fee in SPACE
    "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
    "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (numeric) block height when transaction entered pool
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (string) parent transaction id
       ... ]
  }, ...
}

Examples:
> mvc-cli getmempoolancestors "mytxid"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmempoolancestors", "params": ["mytxid"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getmempooldescendants

如果交易在内存池中，根据交易哈希值返回交易在内存池的后代交易。返回结果包括交易的哈希值，交易的大小，交易的费率等。

参数：

- txid: 交易哈希值
- verbose: true, false。false返回交易哈希值，true返回交易详细信息。默认为false。

```text
getmempooldescendants txid (verbose)

If txid is in the mempool, returns all in-mempool descendants.

Arguments:
1. "txid"                 (string, required) The transaction id (must be in mempool)
2. verbose                  (boolean, optional, default=false) True for a json object, false for array of transaction ids

Result (for verbose=false):
[                       (json array of strings)
  "transactionid"           (string) The transaction id of an in-mempool descendant transaction
  ,...
]

Result (for verbose=true):
{                           (json object)
  "transactionid" : {       (json object)
    "size" : n,             (numeric) transaction size.
    "fee" : n,              (numeric) transaction fee in SPACE
    "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
    "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (numeric) block height when transaction entered pool
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (string) parent transaction id
       ... ]
  }, ...
}

Examples:
> mvc-cli getmempooldescendants "mytxid"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmempooldescendants", "params": ["mytxid"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getmempoolentry

如果交易在内存池中，根据交易哈希值返回交易在内存池的详细信息。返回结果包括交易的哈希值，交易的大小，交易的费率等。

参数：

- txid: 交易哈希值

```text
getmempoolentry txid

Returns mempool data for given transaction

Arguments:
1. "txid"                   (string, required) The transaction id (must be in mempool)

Result:
{                           (json object)
    "size" : n,             (numeric) transaction size.
    "fee" : n,              (numeric) transaction fee in SPACE
    "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
    "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (numeric) block height when transaction entered pool
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (string) parent transaction id
       ... ]
}

Examples:
> mvc-cli getmempoolentry "mytxid"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmempoolentry", "params": ["mytxid"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getmempoolinfo

返回内存池的信息，包括内存池的交易数量，内存池的交易大小，内存池的费率等。

```text
getmempoolinfo

Returns details on the active state of the TX memory pool.

Result:
{
  "size": xxxxx,               (numeric) Current tx count
  "journalsize": xxxxx,        (numeric) Current tx count within the journal
  "nonfinalsize": xxxxx,       (numeric) Current non-final tx count
  "bytes": xxxxx,              (numeric) Transaction size.
  "usage": xxxxx,              (numeric) Total memory usage for the mempool
  "usagedisk": xxxxx,          (numeric) Total disk usage for storing mempool transactions
  "usagecpfp": xxxxx,          (numeric) Total memory usage for the low paying transactions
  "nonfinalusage": xxxxx,      (numeric) Total memory usage for the non-final mempool
  "maxmempool": xxxxx,         (numeric) Maximum memory usage for the mempool
  "maxmempoolsizedisk": xxxxx, (numeric) Maximum disk usage for storing mempool transactions
  "maxmempoolsizecpfp": xxxxx, (numeric) Maximum memory usage for the low paying transactions
  "mempoolminfee": xxxxx       (numeric) Minimum fee (in SPAVE/kB) for tx to be accepted
}

Examples:
> mvc-cli getmempoolinfo
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmempoolinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getrawmempool

返回内存池中的交易哈希值列表。可以指定verbose参数，返回交易详细信息。

参数：

- verbose: true, false。false返回交易哈希值列表，true返回交易详细信息。默认为false。

```text
getrawmempool ( verbose )

Returns all transaction ids in memory pool as a json array of string transaction ids.

Arguments:
1. verbose (boolean, optional, default=false) True for a json object, false for array of transaction ids

Result: (for verbose = false):
[                     (json array of string)
  "transactionid"     (string) The transaction id
  ,...
]

Result: (for verbose = true):
{                           (json object)
  "transactionid" : {       (json object)
    "size" : n,             (numeric) transaction size.
    "fee" : n,              (numeric) transaction fee in SPACE
    "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
    "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
    "height" : n,           (numeric) block height when transaction entered pool
    "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
        "transactionid",    (string) parent transaction id
       ... ]
  }, ...
}

Examples:
> mvc-cli getrawmempool true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawmempool", "params": [true] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getrawnonfinalmempool

返回内存池中的非最终交易哈希值列表。

```text
getrawnonfinalmempool

Returns all transaction ids in the non-final memory pool as a json array of string transaction ids.

Result:
[                     (json array of string)
  "transactionid"     (string) The transaction id
  ,...
]

Examples:
> mvc-cli getrawnonfinalmempool
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawnonfinalmempool", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## gettxout

返回交易UTXO输出信息。可以指定include_mempool参数，返回交易在内存池中的交易输出信息。

参数：

- txid: 交易哈希值
- n: 输出索引
- include_mempool: true, false。false返回交易在区块链上的交易输出信息，true返回交易在内存池中的交易输出信息。默认为true。

```text
gettxout "txid" n ( include_mempool )

Returns details about an unspent transaction output.

Arguments:
1. "txid"             (string, required) The transaction id
2. "n"                (numeric, required) vout number
3. "include_mempool"  (boolean, optional) Whether to include the mempool. Default: true.     Note that an unspent output that is spent in the mempool won't appear.

Result:
{
  "bestblock" : "hash",    (string) the block hash
  "confirmations" : n,       (numeric) The number of confirmations
  "value" : x.xxx,           (numeric) The transaction value in SPACE
  "scriptPubKey" : {         (json object)
     "asm" : "code",       (string)
     "hex" : "hex",        (string)
     "reqSigs" : n,          (numeric) Number of required signatures
     "type" : "pubkeyhash", (string) The type, eg pubkeyhash
     "addresses" : [          (array of string) array of mvc addresses
        "address"     (string) mvc address
        ,...
     ]
  },
  "coinbase" : true|false   (boolean) Coinbase or not
}

Examples:

Get unspent transactions
> mvc-cli listunspent

View the details
> mvc-cli gettxout "txid" 1

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettxout", "params": ["txid", 1] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## gettxoutproof

返回交易输出Merkle证明，证明交易在区块中。返回结果包括区块哈希值，交易哈希值，交易输出索引，交易输出证明。

参数：

- txids: 交易哈希值列表
- blockhash: 区块哈希值

```text
gettxoutproof ["txid",...] ( blockhash )

Returns a hex-encoded proof that "txid" was included in a block.

NOTE: By default this function only works sometimes. This is when there is an
unspent output in the utxo for this transaction. To make it always work,
you need to maintain a transaction index, using the -txindex command line option or
specify the block in which the transaction is included manually (by blockhash).

Arguments:
1. "txids"       (string) A json array of txids to filter
    [
      "txid"     (string) A transaction hash
      ,...
    ]
2. "blockhash"   (string, optional) If specified, looks for txid in the block with this hash

Result:
"data"           (string) A string that is a serialized, hex-encoded data for the proof.

Examples:
> mvc-cli gettxoutproof '["txid"]'
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettxoutproof", "params": [["txid"]] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## gettxoutsetinfo

返回UTXO集合的信息，包括UTXO集合的交易数量，UTXO集合的交易输出数量，UTXO集合的总大小等。

```text
gettxoutsetinfo

Returns statistics about the unspent transaction output set.
Note this call may take some time.

Result:
{
  "height":n,     (numeric) The current block height (index)
  "bestblock": "hex",   (string) the best block hash hex
  "transactions": n,      (numeric) The number of transactions
  "txouts": n,            (numeric) The number of output transactions
  "bogosize": n,          (numeric) A database-independent metric for UTXO set size
  "hash_serialized": "hash",   (string) The serialized hash
  "disk_size": n,         (numeric) The estimated size of the chainstate on disk
  "total_amount": x.xxx          (numeric) The total amount
}

Examples:
> mvc-cli gettxoutsetinfo
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettxoutsetinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## preciousblock

将区块标记为重要区块(假定该区块比其他同工作量的区块先收到)。用于在孤块重组时，保留重要区块。

参数：

- blockhash: 需要标记的区块哈希值

```text
preciousblock "blockhash"

Treats a block as if it were received before others with the same work.

A later preciousblock call can override the effect of an earlier one.

The effects of preciousblock are not retained across restarts.

Arguments:
1. "blockhash"   (string, required) the hash of the block to mark as precious

Result:

Examples:
> mvc-cli preciousblock "blockhash"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "preciousblock", "params": ["blockhash"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## pruneblockchain

根据区块高度，手动删除区块链中的区块。

参数：

- height: 区块高度，裁剪到此高度为止

```text
pruneblockchain

Arguments:
1. "height"       (numeric, required) The block height to prune up to. May be set to a discrete height, or a unix timestamp
                  to prune blocks whose block time is at least 2 hours older than the provided timestamp.

Result:
n    (numeric) Height of the last block pruned.

Examples:
> mvc-cli pruneblockchain 1000
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "pruneblockchain", "params": [1000] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## rebuildjournal

重建内存池的交易日志，保持一致性。

```text
rebuildjournal

Forces the block assembly journal and the TX mempool to be rebuilt to make them consistent with each other.

Result:

Examples:
> mvc-cli rebuildjournal
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "rebuildjournal", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## verifytxoutproof

验证交易输出Merkle证明，证明交易在区块中。

参数：

- proof: HEX交易输出证明

```text
verifytxoutproof "proof"

Verifies that a proof points to a transaction in a block, returning the transaction it commits to
and throwing an RPC error if the block is not in our best chain

Arguments:
1. "proof"    (string, required) The hex-encoded proof generated by gettxoutproof

Result:
["txid"]      (array, strings) The txid(s) which the proof commits to, or empty array if the proof is invalid

Examples:
> mvc-cli verifytxoutproof "proof"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "verifytxoutproof", "params": ["proof"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```
