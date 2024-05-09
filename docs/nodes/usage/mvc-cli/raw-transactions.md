# Raw Transactions

Construct and send raw transactions.

Provide transaction decoding, transaction construction, and transaction broadcasting functions.

You can use `mvc-cli help command` to view the usage of specific commands. The JsonRpc call method is in the example.

## Commands

```text
== Rawtransactions ==
createrawtransaction [{"txid":"id","vout":n},...] {"address":amount,"data":"hex",...} ( locktime )
decoderawtransaction "hexstring"
decodescript "hexstring"
fundrawtransaction "hexstring" ( options )
getrawtransaction "txid" ( verbose )
sendrawtransaction "hexstring" ( allowhighfees dontcheckfee )
sendrawtransactions [{"hex": "hexstring", "allowhighfees": true|false, "dontcheckfee": true|false, "listunconfirmedancestors": true|false, "config: " <json string> }, ...]
signrawtransaction "hexstring" ( [{"txid":"id","vout":n,"scriptPubKey":"hex","redeemScript":"hex"},...] ["privatekey1",...] sighashtype )
```

## createrawtransaction

创建一个生交易。指定Utxo，创建新的输出。

参数：

inputs：输入的utxo。
- `txid` (string, required) Utxo的txid。
- `vout` (numeric, required) Utxo的vout。
- `sequence` (numeric, optional) Utxo的sequence。

outputs：输出。

- `address` (string, required) 输出地址。value是输出金额。
- `data` (string, optional) 输出数据。

locktime：锁定时间。

```text
createrawtransaction [{"txid":"id","vout":n},...] {"address":amount,"data":"hex",...} ( locktime )

Create a transaction spending the given inputs and creating new outputs.
Outputs can be addresses or data.
Returns hex-encoded raw transaction.
Note that the transaction's inputs are not signed, and
it is not stored in the wallet or transmitted to the network.

Arguments:
1. "inputs"                (array, required) A json array of json objects
     [
       {
         "txid":"id",    (string, required) The transaction id
         "vout":n,         (numeric, required) The output number
         "sequence":n      (numeric, optional) The sequence number
       }
       ,...
     ]
2. "outputs"               (object, required) a json object with outputs
    {
      "address": x.xxx,    (numeric or string, required) The key is the mvc address, the numeric value (can be string) is the SPACE amount
      "data": "hex"      (string, required) The key is "data", the value is hex encoded data
      ,...
    }
3. locktime                  (numeric, optional, default=0) Raw locktime. Non-0 value also locktime-activates inputs

Result:
"transaction"              (string) hex string of the transaction

Examples:
> mvc-cli createrawtransaction "[{\"txid\":\"myid\",\"vout\":0}]" "{\"address\":0.01}"
> mvc-cli createrawtransaction "[{\"txid\":\"myid\",\"vout\":0}]" "{\"data\":\"00010203\"}"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "createrawtransaction", "params": [[{"txid":"myid","vout":0}], {"address":0.01}] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "createrawtransaction", "params": [[{"txid":"myid","vout":0}], {"data":"00010203"}] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## decoderawtransaction

解码一个原始交易，输出json。

参数：

- `hexstring` (string, required) 原始交易的十六进制字符串。

```text
decoderawtransaction "hexstring"

Return a JSON object representing the serialized, hex-encoded transaction.

Arguments:
1. "hexstring"      (string, required) The transaction hex string

Result:
{
  "txid" : "id",        (string) The transaction id
  "hash" : "id",        (string) The transaction hash (differs from txid for witness transactions)
  "size" : n,             (numeric) The transaction size
  "version" : n,          (numeric) The version
  "locktime" : ttt,       (numeric) The lock time
  "vin" : [               (array of json objects)
     {
       "txid": "id",    (string) The transaction id
       "vout": n,         (numeric) The output number
       "scriptSig": {     (json object) The script
         "asm": "asm",  (string) asm
         "hex": "hex"   (string) hex
       },
       "sequence": n     (numeric) The script sequence number
     }
     ,...
  ],
  "vout" : [             (array of json objects)
     {
       "value" : x.xxx,            (numeric) The value in SPACE
       "n" : n,                    (numeric) index
       "scriptPubKey" : {          (json object)
         "asm" : "asm",          (string) the asm
         "hex" : "hex",          (string) the hex
         "reqSigs" : n,            (numeric) The required sigs
         "type" : "pubkeyhash",  (string) The type, eg 'pubkeyhash'
         "addresses" : [           (json array of string)
           "12tvKAXCxZjSmdNbao16dKXC8tRWfcF5oc"   (string) mvc address
           ,...
         ]
       }
     }
     ,...
  ],
}

Examples:
> mvc-cli decoderawtransaction "hexstring"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "decoderawtransaction", "params": ["hexstring"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## decodescript

解码一个脚本，输出json。

参数：

- `hexstring` (string, required) 脚本的十六进制字符串。

```text
decodescript "hexstring"

Decode a hex-encoded script.

Arguments:
1. "hexstring"     (string) the hex encoded script

Result:
{
  "asm":"asm",   (string) Script public key
  "hex":"hex",   (string) hex encoded public key
  "type":"type", (string) The output type
  "reqSigs": n,    (numeric) The required signatures
  "addresses": [   (json array of string)
     "address"     (string) mvc address
     ,...
  ],
  "p2sh","address" (string) address of P2SH script wrapping this redeem script (not returned if the script is already a P2SH).
}

Examples:
> mvc-cli decodescript "hexstring"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "decodescript", "params": ["hexstring"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## fundrawtransaction

为原始交易添加输入，用于支付手续费，返回一个完整的原始交易。

参数：

- `hexstring` (string, required) 原始交易的十六进制字符串。
- `options` (object, optional) 选项。

```text
fundrawtransaction "hexstring" ( options )

Add inputs to a transaction until it has enough in value to meet its out value.
This will not modify existing inputs, and will add at most one change output to the outputs.
No existing outputs will be modified unless "subtractFeeFromOutputs" is specified.
Note that inputs which were signed may need to be resigned after completion since in/outputs have been added.
The inputs added will not be signed, use signrawtransaction for that.
Note that all existing inputs must have their previous output transaction be in the wallet.
Note that all inputs selected must be of standard form and P2SH scripts must be
in the wallet using importaddress or addmultisigaddress (to calculate fees).
You can see whether this is the case by checking the "solvable" field in the listunspent output.
Only pay-to-pubkey, multisig, and P2SH versions thereof are currently supported for watch-only

Arguments:
1. "hexstring"           (string, required) The hex string of the raw transaction
2. options                 (object, optional)
   {
     "changeAddress"          (string, optional, default pool address) The mvc address to receive the change
     "changePosition"         (numeric, optional, default random) The index of the change output
     "includeWatching"        (boolean, optional, default false) Also select inputs which are watch only
     "lockUnspents"           (boolean, optional, default false) Lock selected unspent outputs
     "reserveChangeKey"       (boolean, optional, default true) Reserves the change output key from the keypool
     "feeRate"                (numeric, optional, default not set: makes wallet determine the fee) Set a specific feerate (SPACE per KB)
     "subtractFeeFromOutputs" (array, optional) A json array of integers.
                              The fee will be equally deducted from the amount of each specified output.
                              The outputs are specified by their zero-based index, before any change output is added.
                              Those recipients will receive less mvcs than you enter in their corresponding amount field.
                              If no outputs are specified here, the sender pays the fee.
                                  [vout_index,...]
   }
                         for backward compatibility: passing in a true instead of an object will result in {"includeWatching":true}

Result:
{
  "hex":       "value", (string)  The resulting raw transaction (hex-encoded string)
  "fee":       n,         (numeric) Fee in SPACE the resulting transaction pays
  "changepos": n          (numeric) The position of the added change output, or -1
}

Examples:

Create a transaction with no inputs
> mvc-cli createrawtransaction "[]" "{\"myaddress\":0.01}"

Add sufficient unsigned inputs to meet the output value
> mvc-cli fundrawtransaction "rawtransactionhex"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "fundrawtransaction", "params": ["rawtransactionhex"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/

Sign the transaction
> mvc-cli signrawtransaction "fundedtransactionhex"

Send the transaction
> mvc-cli sendrawtransaction "signedtransactionhex"
```

## getrawtransaction

从节点获取原始交易。

参数：

- `txid` (string, required) 交易id。
- `verbose` (bool, optional, default=false) 详细程度。false返回生交易，true返回详细信息。

```text
getrawtransaction "txid" ( verbose )

NOTE: By default this function only works for mempool transactions. If the -txindex option is
enabled, it also works for blockchain transactions.
DEPRECATED: for now, it also works for transactions with unspent outputs.

Return the raw transaction data.

If verbose is 'true', returns an Object with information about 'txid'.
If verbose is 'false' or omitted, returns a string that is serialized, hex-encoded data for 'txid'.

Arguments:
1. "txid"      (string, required) The transaction id
2. verbose       (bool, optional, default=false) If false, return a string, otherwise return a json object

Result (if verbose is not set or set to false):
"data"      (string) The serialized, hex-encoded data for 'txid'

Result (if verbose is set to true):
{
  "hex" : "data",       (string) The serialized, hex-encoded data for 'txid'
  "txid" : "id",        (string) The transaction id (same as provided)
  "hash" : "id",        (string) The transaction hash (differs from txid for witness transactions)
  "size" : n,             (numeric) The serialized transaction size
  "version" : n,          (numeric) The version
  "locktime" : ttt,       (numeric) The lock time
  "vin" : [               (array of json objects)
     {
       "txid": "id",    (string) The transaction id
       "vout": n,         (numeric)
       "scriptSig": {     (json object) The script
         "asm": "asm",  (string) asm
         "hex": "hex"   (string) hex
       },
       "sequence": n      (numeric) The script sequence number
     }
     ,...
  ],
  "vout" : [              (array of json objects)
     {
       "value" : x.xxx,            (numeric) The value in SPACE
       "n" : n,                    (numeric) index
       "scriptPubKey" : {          (json object)
         "asm" : "asm",          (string) the asm
         "hex" : "hex",          (string) the hex
         "reqSigs" : n,            (numeric) The required sigs
         "type" : "pubkeyhash",  (string) The type, eg 'pubkeyhash'
         "addresses" : [           (json array of string)
           "address"        (string) mvc address
           ,...
         ]
       }
     }
     ,...
  ],
  "blockhash" : "hash",   (string) the block hash
  "confirmations" : n,      (numeric) The confirmations
  "time" : ttt,             (numeric) The transaction time in seconds since epoch (Jan 1 1970 GMT)
  "blocktime" : ttt,        (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
  "blockheight" : n         (numeric) The block height
}

Examples:
> mvc-cli getrawtransaction "mytxid"
> mvc-cli getrawtransaction "mytxid" true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawtransaction", "params": ["mytxid", true] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## sendrawtransaction

广播原始交易。

参数：

- `hexstring` (string, required) 原始交易的十六进制字符串。
- `allowhighfees` (bool, optional, default=false) 是否允许高手续费。
- `dontcheckfee` (bool, optional, default=false) 是否检查手续费。

```text
sendrawtransaction "hexstring" ( allowhighfees dontcheckfee )

Submits raw transaction (serialized, hex-encoded) to local node and network.

Also see createrawtransaction and signrawtransaction calls.

Arguments:
1. "hexstring"    (string, required) The hex string of the raw transaction)
2. allowhighfees    (boolean, optional, default=false) Allow high fees
3. dontcheckfee     (boolean, optional, default=false) Don't check fee

Result:
"hex"             (string) The transaction hash in hex

Examples:

Create a transaction
> mvc-cli createrawtransaction "[{\"txid\" : \"mytxid\",\"vout\":0}]" "{\"myaddress\":0.01}"
Sign the transaction, and get back the hex
> mvc-cli signrawtransaction "myhex"

Send the transaction (signed hex)
> mvc-cli sendrawtransaction "signedhex"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendrawtransaction", "params": ["signedhex"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## sendrawtransactions

广播多个原始交易。批量广播接口性能更好。需要保证交易的依赖关系，祖先交易在前，子交易在后。

参数：

交易列表

- `hex` (string, required) 原始交易的十六进制字符串。
- `allowhighfees` (bool, optional, default=false) 是否允许高手续费。
- `dontcheckfee` (bool, optional, default=false) 是否检查手续费。
- `listunconfirmedancestors` (bool, optional, default=false) 是否列出未确认的祖先交易。
- `config` (string, optional) 配置信息。

```text
sendrawtransactions [{"hex": "hexstring", "allowhighfees": true|false, "dontcheckfee": true|false, "listunconfirmedancestors": true|false, "config: " <json string> }, ...]

Submits raw transactions (serialized, hex-encoded) to local node and network.

To maximise performance, transaction chains should be provided in inheritance order
(parent-child).

Also see sendrawtransaction, createrawtransaction and signrawtransaction calls.

Arguments:
1. "inputs"      (array, required) A json array of json objects
     [
       {
         "hex":"hexstring",          (string, required) The hex string of the raw transaction
         "allowhighfees": true|false,  (boolean, optional, default=false) Allow high fees
         "dontcheckfee": true|false,   (boolean, optional, default=false) Don't check fee
         "listunconfirmedancestors": true|false  (boolean, optional, default=false) List transaction ids of unconfirmed ancestors
         "config": json string  (json string, optional, default="") Key-value pairs of policy settings for this transaction in any combination. Setting invalid policy setting results in transaction being rejected and returned in invalid transactions array. Each setting should not be specified more than once. If they are, it is unspecified which value will be used. Following settings are available:
    {
        "maxtxsizepolicy": n,                 (integer, optional) Set maximum transaction size in bytes we relay and mine
        "datacarriersize": n,                 (integer, optional) Maximum size of data in data carrier transactions we relay and mine
        "maxscriptsizepolicy": n,             (integer, optional) Set maximum script size in bytes we're willing to relay/mine per script after Genesis is activated
        "maxscriptnumlengthpolicy": n,        (integer, optional) Set maximum allowed number length we're willing to relay/mine in scripts after Genesis is activated
        "maxstackmemoryusagepolicy": n,       (integer, optional) Set maximum stack memory usage used for script verification we're willing to relay/mine in a single transaction after Genesis is activated (policy level)
        "limitancestorcount": n,              (integer, optional) Do not accept transactions if maximum height of in-mempool ancestor chain is <n> or more
        "limitcpfpgroupmemberscount": n,      (integer, optional) Do not accept transactions if number of in-mempool transactions which we are not willing to mine due to a low fee is <n> or more
        "acceptnonstdoutputs": n,             (boolean, optional) Relay and mine transactions that create or consume non standard after Genesis is activated
        "datacarrier": n,                     (boolean, optional) Relay and mine data carrier transactions
        "maxstdtxvalidationduration": n,      (integer, optional) Set the single standard transaction validation duration threshold in milliseconds after which the standard transaction validation will terminate with error and the transaction is not accepted to mempool
        "maxnonstdtxvalidationduration": n,   (integer, optional) Set the single non-standard transaction validation duration threshold in milliseconds after which the standard transaction validation will terminate with error and the transaction is not accepted to mempool
        "minconsolidationfactor": n,          (integer, optional)Set minimum ratio between sum of utxo scriptPubKey sizes spent in a consolidation transaction, to the corresponding sum of output scriptPubKey sizes.
        "maxconsolidationinputscriptsize": n, (integer, optional) This number is the maximum length for a scriptSig input in a consolidation txn
        "minconfconsolidationinput": n,       (integer, optional) Minimum number of confirmations of inputs spent by consolidation transactions
        "acceptnonstdconsolidationinput": n,  (boolean, optional) Accept consolidation transactions spending non standard inputs
        "skipscriptflags": n                  (array of strings, optional) Specify standard non-mandatory flags that you wish to be skipped. Options are: "DERSIG", "MINIMALDATA", "NULLDUMMY", "DISCOURAGE_UPGRADABLE_NOPS", "CLEANSTACK"
    }
       }
       ,...
     ]
2. "policy settings"      (json string, optional) Policy settings for all inputs. If policy settings are defined for specific input this global policy is ignored (for that input). Setting invalid policy setting results in JSONRPCError. Options are the same as for per transaction config policies.

Result:
{
  "known" : [                 (json array) Already known transactions detected during processing (if there are any)
      "txid" : xxxxxx,        (string) The transaction id
      ,...
  ],
  "evicted" : [               (json array) Transactions accepted by the mempool and then evicted due to insufficient fee (if there are any)
      "txid" : xxxxx,         (string) The transaction id
      ,...
  ],
  "invalid" : [               (json array of objects) Invalid transactions detected during validation (if there are any)
    {
      "txid" : xxxxxxxx,      (string) The transaction id
      "reject_code" : x,      (numeric) The reject code set during validation
      "reject_reason" : xxxxx (string) The reject reason set during validation
      "collidedWith" : [      (json array of objects) This field is only present in case of doublespend transaction and contains transactions we collided with
        {
          "txid" : xxxxxxxx,  (string) The transaction id
          "size" : xxxx,      (numeric) Transaction size in bytes
          "hex"  : xxxxxxxx,  (string) Whole transaction in hex
        }
        ,...
      ]
    }
    ,...
  ],
  "unconfirmed" : [              (json array) List of transactions with their unconfirmed ancestors (only if listunconfirmedancestors was set to true)
    {
      "txid" : xxxxxxxx,         (string) The transaction id
      "ancestors" : [            (json array) List of all ancestors that are still in the mempool
        {
          "txid" : xxxxxxxx,     (string) Ancestor's transaction id
          "vin" : [              (json array) List of onacestor's inputs
            {
              "txid" : xxxxxxxx, (string) Input's transaction id
              "vout" : x         (numeric) Input's vout index
            }
            ,...
          ]
        }
        ,...
      ]
    }
    ,...
  ]
}

Examples:
> mvc-cli sendrawtransactions "[{\"hex\":\"hexstring\"}]"
> mvc-cli sendrawtransactions "[{\"hex\":\"hexstring\", \"allowhighfees\":true}]"
> mvc-cli sendrawtransactions "[{\"hex\":\"hexstring\", \"allowhighfees\":true, \"dontcheckfee\":true}]"
> mvc-cli sendrawtransactions "[{\"hex\":\"hexstring\", \"listunconfirmedancestors\":true}]"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendrawtransactions", "params": [[{"hex":"hexstring"}]] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendrawtransactions", "params": [[{"hex":"hexstring", "allowhighfees":true}]] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendrawtransactions", "params": [[{"hex":"hexstring", "allowhighfees":true, "dontcheckfee":true}]] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendrawtransactions", "params": [[{"hex":"hexstring", "listunconfirmedancestors":true}]] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## signrawtransaction

签名原始交易inputs。

参数：

- `hexstring` (string, required) 原始交易的十六进制字符串。
- `prevtxs` (array, optional) 交易的输入。
- `privatekeys` (array, optional) 私钥。
- `sighashtype` (string, optional) 签名类型。

```text
signrawtransaction "hexstring" ( [{"txid":"id","vout":n,"scriptPubKey":"hex","redeemScript":"hex"},...] ["privatekey1",...] sighashtype )

Sign inputs for raw transaction (serialized, hex-encoded).
The second optional argument (may be null) is an array of previous transaction outputs that
this transaction depends on but may not yet be in the block chain.
The third optional argument (may be null) is an array of base58-encoded private
keys that, if given, will be the only keys used to sign the transaction.


Arguments:
1. "hexstring"     (string, required) The transaction hex string
2. "prevtxs"       (string, optional) An json array of previous dependent transaction outputs
     [               (json array of json objects, or 'null' if none provided)
       {
         "txid":"id",             (string, required) The transaction id
         "vout":n,                  (numeric, required) The output number
         "scriptPubKey": "hex",   (string, required) script key
         "redeemScript": "hex",   (string, required for P2SH or P2WSH) redeem script
         "amount": value            (numeric, required) The amount spent
       }
       ,...
    ]
3. "privkeys"     (string, optional) A json array of base58-encoded private keys for signing
    [                  (json array of strings, or 'null' if none provided)
      "privatekey"   (string) private key in base58-encoding
      ,...
    ]
4. "sighashtype"     (string, optional, default=ALL) The signature hash type. Must be one of
       "ALL"
       "NONE"
       "SINGLE"
       "ALL|ANYONECANPAY"
       "NONE|ANYONECANPAY"
       "SINGLE|ANYONECANPAY"
       "ALL|FORKID"
       "NONE|FORKID"
       "SINGLE|FORKID"
       "ALL|FORKID|ANYONECANPAY"
       "NONE|FORKID|ANYONECANPAY"
       "SINGLE|FORKID|ANYONECANPAY"

Result:
{
  "hex" : "value",           (string) The hex-encoded raw transaction with signature(s)
  "complete" : true|false,   (boolean) If the transaction has a complete set of signatures
  "errors" : [                 (json array of objects) Script verification errors (if there are any)
    {
      "txid" : "hash",           (string) The hash of the referenced, previous transaction
      "vout" : n,                (numeric) The index of the output to spent and used as input
      "scriptSig" : "hex",       (string) The hex-encoded signature script
      "sequence" : n,            (numeric) Script sequence number
      "error" : "text"           (string) Verification or signing error related to the input
    }
    ,...
  ]
}

Examples:
> mvc-cli signrawtransaction "myhex"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signrawtransaction", "params": ["myhex"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```
