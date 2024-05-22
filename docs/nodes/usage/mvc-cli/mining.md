# Mining


Mining commands are used for mining-related operations. Specify the node to generate a block template for mining, get mining information, get mining status, etc.

You can use `mvc-cli help command` to view the usage of specific commands. The JsonRpc call method is in the example.

## Commands

```text
== Mining ==
getblocktemplate ( TemplateRequest )
getminingcandidate coinbase (optional, default false)
getmininginfo
getnetworkhashps ( nblocks height )
prioritisetransaction <txid> <priority delta> <fee delta>
submitblock "hexdata" ( "jsonparametersobject" )
submitminingsolution "<json string>"
verifyblockcandidate "hexdata" ( "jsonparametersobject" )
```

## getblocktemplate

Generate a standard block template (same as Bitcoin).

```text
getblocktemplate ( TemplateRequest )

If the request parameters include a 'mode' key, that is used to explicitly select between the default 'template' request or a 'proposal'.
It returns data needed to construct a block to work on.
For full specification, see BIPs 22, 23, 9, and 145:
    https://github.com/mvc/bips/blob/master/bip-0022.mediawiki
    https://github.com/mvc/bips/blob/master/bip-0023.mediawiki
    https://github.com/mvc/bips/blob/master/bip-0009.mediawiki#getblocktemplate_changes
    https://github.com/mvc/bips/blob/master/bip-0145.mediawiki

Arguments:
1. template_request         (json object, optional) A json object in the following spec
     {
       "mode":"template"    (string, optional) This must be set to "template", "proposal" (see BIP 23), or omitted
       "capabilities":[     (array, optional) A list of strings
           "support"          (string) client side supported feature, 'longpoll', 'coinbasetxn', 'coinbasevalue', 'proposal', 'serverlist', 'workid'
           ,...
       ]
     }


Result:
{
  "version" : n,                    (numeric) The preferred block version
  "previousblockhash" : "xxxx",     (string) The hash of current highest block
  "transactions" : [                (array) contents of non-coinbase transactions that should be included in the next block
      {
         "data" : "xxxx",             (string) transaction data encoded in hexadecimal (byte-for-byte)
         "txid" : "xxxx",             (string) transaction id encoded in little-endian hexadecimal
         "hash" : "xxxx",             (string) hash encoded in little-endian hexadecimal (including witness data)
         "depends" : [                (array) array of numbers
             n                          (numeric) transactions before this one (by 1-based index in 'transactions' list) that must be present in the final block if this one is
             ,...
         ],
         "fee": n,                    (numeric) difference in value between transaction inputs and outputs (in Satoshis); for coinbase transactions, this is a negative Number of the total collected block fees (ie, not including the block subsidy); if key is not present, fee is unknown and clients MUST NOT assume there isn't one
         "required" : true|false      (boolean) if provided and true, this transaction must be in the final block
      }
      ,...
  ],
  "coinbaseaux" : {                 (json object) data that should be included in the coinbase's scriptSig content
      "flags" : "xx"                  (string) key name is to be ignored, and value included in scriptSig
  },
  "coinbasevalue" : n,              (numeric) maximum allowable input to coinbase transaction, including the generation award and transaction fees (in Satoshis)
  "coinbasetxn" : { ... },          (json object) information for coinbase transaction
  "target" : "xxxx",                (string) The hash target
  "mintime" : xxx,                  (numeric) The minimum timestamp appropriate for next block time in seconds since epoch (Jan 1 1970 GMT)
  "mutable" : [                     (array of string) list of ways the block template may be changed
     "value"                          (string) A way the block template may be changed, e.g. 'time', 'transactions', 'prevblock'
     ,...
  ],
  "noncerange" : "00000000ffffffff",(string) A range of valid nonces
  "sizelimit" : n,                  (numeric) limit of block size
  "curtime" : ttt,                  (numeric) current timestamp in seconds since epoch (Jan 1 1970 GMT)
  "bits" : "xxxxxxxx",              (string) compressed target of next block
  "height" : n                      (numeric) The height of the next block
}

Examples:
> mvc-cli getblocktemplate
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblocktemplate", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getminingcandidate

Use the mining candidate protocol to get the mining candidate block.

```text
getminingcandidate coinbase (optional, default false)

Returns Mining-Candidate protocol data.

Arguments:
1. "coinbase"        (boolean, optional) True if a coinbase transaction is required in result
Result: (json string)
    {

        "id": n,                  (string) Candidate identifier for submitminingsolution
        "prevhash": "xxxx",     (hex string) Hash of the previous block
        "coinbase": "xxxx",     (optional hex string encoded binary transaction) Coinbase transaction
        "coinbaseValue": n,       (integer) Total funds available for the coinbase transaction (in Satoshis)
        "version": n,             (integer) Block version
        "nBits": "xxxx",        (hex string) Difficulty
        "time": n,                (integer) Block time
        "height": n,              (integer) Current Block Height
        "num_tx": n,              (integer) Number of transactions the current candidate has including coinbase transaction
        "sizeWithoutCoinbase": n, (integer) Size of current block candidate in bytes without coinbase transaction
        "merkleProof": [          (list of hex strings) Merkle branch for the block
                          xxxx,
                          yyyy,
                         ]
    }
```

## getmininginfo

Get mining-related information.

```text
getmininginfo

Returns a json object containing mining-related information.
Result:
{
  "blocks": nnn,             (numeric) The current block
  "currentblocksize": nnn,   (numeric) The last block size
  "currentblocktx": nnn,     (numeric) The last block transaction
  "difficulty": xxx.xxxxx    (numeric) The current difficulty
  "errors": "..."            (string) Current errors
  "networkhashps": nnn,      (numeric) The network hashes per second
  "pooledtx": n              (numeric) The size of the mempool
  "chain": "xxxx",           (string) current network name as defined in BIP70 (main, test, regtest)
}

Examples:
> mvc-cli getmininginfo
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmininginfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getnetworkhashps

Returns the estimated network hashes per second based on the last n blocks.

```text
getnetworkhashps ( nblocks height )

Returns the estimated network hashes per second based on the last n blocks.
Pass in [blocks] to override # of blocks, -1 specifies since last difficulty change.
Pass in [height] to estimate the network speed at the time when a certain block was found.

Arguments:
1. nblocks     (numeric, optional, default=120) The number of blocks, or -1 for blocks since last difficulty change.
2. height      (numeric, optional, default=-1) To estimate at the time of the given height.

Result:
x             (numeric) Hashes per second estimated

Examples:
> mvc-cli getnetworkhashps
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnetworkhashps", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## prioritisetransaction

Add or subtract priority to a transaction.

```text
prioritisetransaction <txid> <priority delta> <fee delta>
Accepts the transaction into mined blocks at a higher (or lower) priority

Arguments:
1. "txid"       (string, required) The transaction id.
2. dummy (numeric, required) Unused, must be set to zero.
3. fee_delta      (numeric, required) The fee value (in satoshis) to add (or subtract, if negative).
                  The fee is not actually paid, only the algorithm for selecting transactions into a block
                  considers the transaction as it would have paid a higher (or lower) fee.

Result:
true              (boolean) Returns true

Examples:
> mvc-cli prioritisetransaction "txid" 0.0 10000
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "prioritisetransaction", "params": ["txid", 0.0, 10000] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## submitblock

Submit a new block to the network.

```text
submitblock "hexdata" ( "jsonparametersobject" )

Attempts to submit new block to network.
The 'jsonparametersobject' parameter is currently ignored.
See https://en.bitcoin.it/wiki/BIP_0022 for full specification.

Arguments
1. "hexdata"        (string, required) the hex-encoded block data to submit
2. "parameters"     (string, optional) object of optional parameters
    {
      "workid" : "id"    (string, optional) if the server provided a workid, it MUST be included with submissions
    }

Result:

Examples:
> mvc-cli submitblock "mydata"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "submitblock", "params": ["mydata"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/

```

## submitminingsolution

Works with getminingcandidate to submit a mining solution.

```text
submitminingsolution "<json string>"

Attempts to submit a new block to the network.

Json Object should comprise of the following and must be escaped
    {
        "id": n,           (string) ID from getminingcandidate RPC
        "nonce": n,        (integer) Miner generated nonce
        "coinbase": "",  (hex string, optional) Modified Coinbase transaction
        "time": n,         (integer, optional) Block time
        "version": n       (integer, optional) Block version
    }

Result:

Nothing on success, error string if block was rejected.
Identical to "submitblock".

Examples:
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "submitminingsolution", "params": ["<json string>"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## verifyblockcandidate

Verify a block template for validity without a valid PoW.

```text
verifyblockcandidate "hexdata" ( "jsonparametersobject" )

Test a block template for validity without a valid PoW.
The 'jsonparametersobject' parameter is currently ignored.
See https://en.mvc.it/wiki/BIP_0022 for full specification.

Arguments
1. "hexdata"        (string, required) the hex-encoded block data to submit
2. "parameters"     (string, optional) object of optional parameters
    {
      "workid" : "id"    (string, optional) if the server provided a workid, it MUST be included with submissions
    }

Result:

Examples:
> mvc-cli verifyblockcandidate "mydata"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "verifyblockcandidate", "params": ["mydata"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

