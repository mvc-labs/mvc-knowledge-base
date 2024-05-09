# Wallet

Operating the local wallet.

The wallet function of the node needs to be enabled to use it normally.

> Suggestion: Unless you are very familiar with how to construct and back up a node wallet, do not casually use wallet
> commands, as there is a risk of losing funds.

You can use `mvc-cli help command` to view the usage of specific commands. The JsonRpc call method is in the example.

## Commands

```text
== Wallet ==
abandontransaction "txid"
addmultisigaddress nrequired ["key",...] ( "account" )
backupwallet "destination"
dumpprivkey "address"
dumpwallet "filename"
encryptwallet "passphrase"
getaccount "address"
getaccountaddress "account"
getaddressesbyaccount "account"
getbalance ( "account" minconf include_watchonly )
getnewaddress ( "account" )
getrawchangeaddress
getreceivedbyaccount "account" ( minconf )
getreceivedbyaddress "address" ( minconf )
gettransaction "txid" ( include_watchonly )
getunconfirmedbalance
getwalletinfo
importaddress "address" ( "label" rescan p2sh )
importmulti "requests" "options"
importprivkey "mvcprivkey" ( "label" ) ( rescan )
importprunedfunds
importpubkey "pubkey" ( "label" rescan )
importwallet "filename"
keypoolrefill ( newsize )
listaccounts ( minconf include_watchonly)
listaddressgroupings
listlockunspent
listreceivedbyaccount ( minconf include_empty include_watchonly)
listreceivedbyaddress ( minconf include_empty include_watchonly)
listsinceblock ( "blockhash" target_confirmations include_watchonly)
listtransactions ( "account" count skip include_watchonly)
listunspent ( minconf maxconf  ["addresses",...] [include_unsafe] )
listwallets
lockunspent unlock ([{"txid":"txid","vout":n},...])
move "fromaccount" "toaccount" amount ( minconf "comment" )
removeprunedfunds "txid"
sendfrom "fromaccount" "toaddress" amount ( minconf "comment" "comment_to" )
sendmany "fromaccount" {"address":amount,...} ( minconf "comment" ["address",...] )
sendtoaddress "address" amount ( "comment" "comment_to" subtractfeefromamount )
setaccount "address" "account"
settxfee amount
signmessage "address" "message"
```

## abandontransaction

Mark in-wallet transaction \<txid> as abandoned
This will mark this transaction and all its in-wallet descendants as abandoned which will allow
for their inputs to be respent. It can be used to replace "stuck" or evicted transactions.

Param：

- `txid` (string, required)

```text
abandontransaction "txid"

Mark in-wallet transaction <txid> as abandoned
This will mark this transaction and all its in-wallet descendants as abandoned which will allow
for their inputs to be respent.  It can be used to replace "stuck" or evicted transactions.
It only works on transactions which are not included in a block and are not currently in the mempool.
It has no effect on transactions which are already conflicted or abandoned.

Arguments:
1. "txid"    (string, required) The transaction id

Result:

Examples:
> mvc-cli abandontransaction "1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "abandontransaction", "params": ["1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## addmultisigaddress

Add a nrequired-to-sign multisignature address to the wallet.

Param：

- `nrequired` (numeric, required)
- `keys` (array, required)
- `account` (string, optional)

```text
addmultisigaddress nrequired ["key",...] ( "account" )

Add a nrequired-to-sign multisignature address to the wallet.
Each key is a MVC address or hex-encoded public key.
If 'account' is specified (DEPRECATED), assign address to that account.

Arguments:
1. nrequired        (numeric, required) The number of required signatures out of the n keys or addresses.
2. "keys"         (string, required) A json array of mvc addresses or hex-encoded public keys
     [
       "address"  (string) mvc address or hex-encoded public key
       ...,
     ]
3. "account"      (string, optional) DEPRECATED. An account to assign the addresses to.

Result:
"address"         (string) A mvc address associated with the keys.

Examples:

Add a multisig address from 2 addresses
> mvc-cli addmultisigaddress 2 "[\"16sSauSf5pF2UkUwvKGq4qjNRzBZYqgEL5\",\"171sgjn4YtPu27adkKGrdDwzRTxnRkBfKV\"]"

As json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "addmultisigaddress", "params": [2, ["16sSauSf5pF2UkUwvKGq4qjNRzBZYqgEL5","171sgjn4YtPu27adkKGrdDwzRTxnRkBfKV"]] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## backupwallet

Safely copies current wallet file to destination, which can be a directory or a path with filename.

Param：

- `destination` (string, required)

```text
backupwallet "destination"

Safely copies current wallet file to destination, which can be a directory or a path with filename.

Arguments:
1. "destination"   (string) The destination directory or file

Examples:
> mvc-cli backupwallet "backup.dat"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "backupwallet", "params": ["backup.dat"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## dumpprivkey

Reveals the private key corresponding to 'address'.
Then the importprivkey can be used with this output

Param：

- `address` (string, required)

```text
dumpprivkey "address"

Reveals the private key corresponding to 'address'.
Then the importprivkey can be used with this output

Arguments:
1. "address"   (string, required) The mvc address for the private key

Result:
"key"                (string) The private key

Examples:
> mvc-cli dumpprivkey "myaddress"
> mvc-cli importprivkey "mykey"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "dumpprivkey", "params": ["myaddress"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## dumpwallet

Dumps all wallet keys in a human-readable format to a server-side file. This does not allow overwriting existing files.

Param：

- `filename` (string, required)

```text
dumpwallet "filename"

Dumps all wallet keys in a human-readable format to a server-side file. This does not allow overwriting existing files.

Arguments:
1. "filename"    (string, required) The filename with path (either absolute or relative to mvcd)

Result:
{                           (json object)
  "filename" : {        (string) The filename with full absolute path
}

Examples:
> mvc-cli dumpwallet "test"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "dumpwallet", "params": ["test"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## encryptwallet

Encrypts the wallet with 'passphrase'. This is for first time encryption.

Param：

- `passphrase` (string, required)

```text
encryptwallet "passphrase"

Encrypts the wallet with 'passphrase'. This is for first time encryption.
After this, any calls that interact with private keys such as sending or signing
will require the passphrase to be set prior the making these calls.
Use the walletpassphrase call for this, and then walletlock call.
If the wallet is already encrypted, use the walletpassphrasechange call.
Note that this will shutdown the server.

Arguments:
1. "passphrase"    (string) The pass phrase to encrypt the wallet with. It must be at least 1 character, but should be long.

Examples:

Encrypt you wallet
> mvc-cli encryptwallet "my pass phrase"

Now set the passphrase to use the wallet, such as for signing or sending mvc
> mvc-cli walletpassphrase "my pass phrase"

Now we can so something like sign
> mvc-cli signmessage "address" "test message"

Now lock the wallet again by removing the passphrase
> mvc-cli walletlock

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "encryptwallet", "params": ["my pass phrase"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getaccount

DEPRECATED. Returns the account associated with the given address.

Param：

- `address` (string, required)

```text
getaccount "address"

DEPRECATED. Returns the account associated with the given address.

Arguments:
1. "address"         (string, required) The mvc address for account lookup.

Result:
"accountname"        (string) the account address

Examples:
> mvc-cli getaccount "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaccount", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getaccountaddress

DEPRECATED. Returns the current MVC address for receiving payments to this account.

Param：

- `account` (string, required) 

```text
getaccountaddress "account"

DEPRECATED. Returns the current MVC address for receiving payments to this account.

Arguments:
1. "account"       (string, required) The account name for the address. It can also be set to the empty string "" to represent the default account. The account does not need to exist, it will be created and a new address created  if there is no account by the given name.

Result:
"address"          (string) The account mvc address

Examples:
> mvc-cli getaccountaddress
> mvc-cli getaccountaddress ""
> mvc-cli getaccountaddress "myaccount"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaccountaddress", "params": ["myaccount"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getaddressesbyaccount

DEPRECATED. Returns the list of addresses for the given account.

Param：

- `account` (string, required)

```text
getaddressesbyaccount "account"

DEPRECATED. Returns the list of addresses for the given account.

Arguments:
1. "account"        (string, required) The account name.

Result:
[                     (json array of string)
  "address"         (string) a mvc address associated with the given account
  ,...
]

Examples:
> mvc-cli getaddressesbyaccount "tabby"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddressesbyaccount", "params": ["tabby"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getbalance

Get the total balance in the wallet.

Param：

- `account` (string, optional)
- `minconf` (numeric, optional, default=1)
- `include_watchonly` (bool, optional, default=false)

```text
getbalance ( "account" minconf include_watchonly )

If account is not specified, returns the server's total available balance.
If account is specified (DEPRECATED), returns the balance in the account.
Note that the account "" is not the same as leaving the parameter out.
The server total may be different to the balance in the default "" account.

Arguments:
1. "account"         (string, optional) DEPRECATED. The account string may be given as a
                     specific account name to find the balance associated with wallet keys in
                     a named account, or as the empty string ("") to find the balance
                     associated with wallet keys not in any named account, or as "*" to find
                     the balance associated with all wallet keys regardless of account.
                     When this option is specified, it calculates the balance in a different
                     way than when it is not specified, and which can count spends twice when
                     there are conflicting pending transactions temporarily resulting in low
                     or even negative balances.
                     In general, account balance calculation is not considered reliable and
                     has resulted in confusing outcomes, so it is recommended to avoid passing
                     this argument.
2. minconf           (numeric, optional, default=1) Only include transactions confirmed at least this many times.
3. include_watchonly (bool, optional, default=false) Also include balance in watch-only addresses (see 'importaddress')

Result:
amount              (numeric) The total amount in SPACE received for this account.

Examples:

The total amount in the wallet
> mvc-cli getbalance

The total amount in the wallet at least 5 blocks confirmed
> mvc-cli getbalance "*" 6

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbalance", "params": ["*", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getnewaddress

Returns a new MVC address for receiving payments.

Param：

- `account` (string, optional)

```text
getnewaddress ( "account" )

Returns a new MVC address for receiving payments.
If 'account' is specified (DEPRECATED), it is added to the address book
so payments received with the address will be credited to 'account'.

Arguments:
1. "account"        (string, optional) DEPRECATED. The account name for the address to be linked to. If not provided, the default account "" is used. It can also be set to the empty string "" to represent the default account. The account does not need to exist, it will be created if there is no account by the given name.

Result:
"address"    (string) The new mvc address

Examples:
> mvc-cli getnewaddress
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnewaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getrawchangeaddress

Returns a new MVC address, for receiving change.

```text
getrawchangeaddress

Returns a new MVC address, for receiving change.
This is for use with raw transactions, NOT normal use.

Result:
"address"    (string) The address

Examples:
> mvc-cli getrawchangeaddress
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawchangeaddress", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getreceivedbyaccount

DEPRECATED. Returns the total amount received by addresses with \<account> in transactions with at least [minconf]
confirmations.

Param：

- `account` (string, required)
- `minconf` (numeric, optional, default=1)

```text
getreceivedbyaccount "account" ( minconf )

DEPRECATED. Returns the total amount received by addresses with <account> in transactions with at least [minconf] confirmations.

Arguments:
1. "account"      (string, required) The selected account, may be the default account using "".
2. minconf          (numeric, optional, default=1) Only include transactions confirmed at least this many times.

Result:
amount              (numeric) The total amount in SPACE received for this account.

Examples:

Amount received by the default account with at least 1 confirmation
> mvc-cli getreceivedbyaccount ""

Amount received at the tabby account including unconfirmed amounts with zero confirmations
> mvc-cli getreceivedbyaccount "tabby" 0

The amount with at least 6 confirmation, very safe
> mvc-cli getreceivedbyaccount "tabby" 6

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getreceivedbyaccount", "params": ["tabby", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getreceivedbyaddress

Returns the total amount received by the given address in transactions with at least minconf confirmations.

Param：

- `address` (string, required)
- `minconf` (numeric, optional, default=1)

```text
getreceivedbyaddress "address" ( minconf )

Returns the total amount received by the given address in transactions with at least minconf confirmations.

Arguments:
1. "address"         (string, required) The mvc address for transactions.
2. minconf             (numeric, optional, default=1) Only include transactions confirmed at least this many times.

Result:
amount   (numeric) The total amount in SPACE received at this address.

Examples:

The amount from transactions with at least 1 confirmation
> mvc-cli getreceivedbyaddress "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX"

The amount including unconfirmed transactions, zero confirmations
> mvc-cli getreceivedbyaddress "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" 0

The amount with at least 6 confirmation, very safe
> mvc-cli getreceivedbyaddress "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" 6

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getreceivedbyaddress", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## gettransaction

Get detailed information about in-wallet transaction \<txid>

Param：

- `txid` (string, required)
- `include_watchonly` (bool, optional, default=false)

```text
gettransaction "txid" ( include_watchonly )

Get detailed information about in-wallet transaction <txid>

Arguments:
1. "txid"                  (string, required) The transaction id
2. "include_watchonly"     (bool, optional, default=false) Whether to include watch-only addresses in balance calculation and details[]

Result:
{
  "amount" : x.xxx,        (numeric) The transaction amount in SPACE
  "fee": x.xxx,            (numeric) The amount of the fee in SPACE. This is negative and only available for the
                              'send' category of transactions.
  "confirmations" : n,     (numeric) The number of confirmations
  "blockhash" : "hash",  (string) The block hash
  "blockindex" : xx,       (numeric) The index of the transaction in the block that includes it
  "blocktime" : ttt,       (numeric) The time in seconds since epoch (1 Jan 1970 GMT)
  "txid" : "transactionid",   (string) The transaction id.
  "time" : ttt,            (numeric) The transaction time in seconds since epoch (1 Jan 1970 GMT)
  "timereceived" : ttt,    (numeric) The time received in seconds since epoch (1 Jan 1970 GMT)
  "details" : [
    {
      "account" : "accountname",      (string) DEPRECATED. The account name involved in the transaction, can be "" for the default account.
      "address" : "address",          (string) The mvc address involved in the transaction
      "category" : "send|receive",    (string) The category, either 'send' or 'receive'
      "amount" : x.xxx,                 (numeric) The amount in SPACE
      "label" : "label",              (string) A comment for the address/transaction, if any
      "vout" : n,                       (numeric) the vout value
      "fee": x.xxx,                     (numeric) The amount of the fee in SPACE. This is negative and only available for the
                                           'send' category of transactions.
      "abandoned": xxx                  (bool) 'true' if the transaction has been abandoned (inputs are respendable). Only available for the
                                           'send' category of transactions.
    }
    ,...
  ],
  "hex" : "data"         (string) Raw data for transaction
}

Examples:
> mvc-cli gettransaction "1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"
> mvc-cli gettransaction "1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d" true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettransaction", "params": ["1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getunconfirmedbalance

Returns the server's total unconfirmed balance

```text
getunconfirmedbalance
Returns the server's total unconfirmed balance

Examples:

> mvc-cli getunconfirmedbalance
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getunconfirmedbalance", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getwalletinfo

Returns an object containing various wallet state info.

```text
getwalletinfo
Returns an object containing various wallet state info.

Result:
{
  "walletname": xxxxx,             (string) the wallet name
  "walletversion": xxxxx,          (numeric) the wallet version
  "balance": xxxxxxx,              (numeric) the total confirmed balance of the wallet in SPACE
  "unconfirmed_balance": xxx,      (numeric) the total unconfirmed balance of the wallet in SPACE
  "immature_balance": xxxxxx,      (numeric) the total immature balance of the wallet in SPACE
  "txcount": xxxxxxx,              (numeric) the total number of transactions in the wallet
  "keypoololdest": xxxxxx,         (numeric) the timestamp (seconds since Unix epoch) of the oldest pre-generated key in the key pool
  "keypoolsize": xxxx,             (numeric) how many new keys are pre-generated (only counts external keys)
  "keypoolsize_hd_internal": xxxx, (numeric) how many new keys are pre-generated for internal use (used for change outputs, only appears if the wallet is using this feature, otherwise external keys are used)
  "unlocked_until": ttt,           (numeric) the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked
  "paytxfee": x.xxxx,              (numeric) the transaction fee configuration, set in SPACE/kB
  "hdmasterkeyid": "<hash160>"     (string) the Hash160 of the HD master pubkey
}

Examples:
> mvc-cli getwalletinfo
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getwalletinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## importaddress

Adds a script (in hex) or address that can be watched as if it were in your wallet but cannot be used to spend.

Param：

- `address` (string, required)
- `label` (string, optional)
- `rescan` (bool, optional, default=true)
- `p2sh` (bool, optional, default=false)

```text
importaddress "address" ( "label" rescan p2sh )

Adds a script (in hex) or address that can be watched as if it were in your wallet but cannot be used to spend.

Arguments:
1. "script"           (string, required) The hex-encoded script (or address)
2. "label"            (string, optional, default="") An optional label
3. rescan               (boolean, optional, default=true) Rescan the wallet for transactions
4. p2sh                 (boolean, optional, default=false) Add the P2SH version of the script as well

Note: This call can take minutes to complete if rescan is true.
If you have the full public key, you should call importpubkey instead of this.

Note: If you import a non-standard raw script in hex form, outputs sending to it will be treated
as change, and not show up in many RPCs.

Examples:

Import a script with rescan
> mvc-cli importaddress "myscript"

Import using a label without rescan
> mvc-cli importaddress "myscript" "testing" false

As a JSON-RPC call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importaddress", "params": ["myscript", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## importmulti

Import addresses/scripts (with private or public keys, redeem script (P2SH)), rescanning all addresses in
one-shot-only (rescan can be disabled via options).

Param：

- `requests` (array, required)
- `options` (object, optional)

```text
importmulti "requests" "options"

Import addresses/scripts (with private or public keys, redeem script (P2SH)), rescanning all addresses in one-shot-only (rescan can be disabled via options).

Arguments:
1. requests     (array, required) Data to be imported
  [     (array of json objects)
    {
      "scriptPubKey": "<script>" | { "address":"<address>" }, (string / json, required) Type of scriptPubKey (string for script, json for address)
      "timestamp": timestamp | "now"                        , (integer / string, required) Creation time of the key in seconds since epoch (Jan 1 1970 GMT),
                                                              or the string "now" to substitute the current synced blockchain time. The timestamp of the oldest
                                                              key will determine how far back blockchain rescans need to begin for missing wallet transactions.
                                                              "now" can be specified to bypass scanning, for keys which are known to never have been used, and
                                                              0 can be specified to scan the entire blockchain. Blocks up to 2 hours before the earliest key
                                                              creation time of all keys being imported by the importmulti call will be scanned.
      "redeemscript": "<script>"                            , (string, optional) Allowed only if the scriptPubKey is a P2SH address or a P2SH scriptPubKey
      "pubkeys": ["<pubKey>", ... ]                         , (array, optional) Array of strings giving pubkeys that must occur in the output or redeemscript
      "keys": ["<key>", ... ]                               , (array, optional) Array of strings giving private keys whose corresponding public keys must occur in the output or redeemscript
      "internal": <true>                                    , (boolean, optional, default: false) Stating whether matching outputs should be be treated as not incoming payments
      "watchonly": <true>                                   , (boolean, optional, default: false) Stating whether matching outputs should be considered watched even when they're not spendable, only allowed if keys are empty
      "label": <label>                                      , (string, optional, default: '') Label to assign to the address (aka account name, for now), only allowed with internal=false
    }
  ,...
  ]
2. options                 (json, optional)
  {
     "rescan": <false>,         (boolean, optional, default: true) Stating if should rescan the blockchain after all imports
  }

Examples:
> mvc-cli importmulti "[{\"scriptPubKey\": {\"address\":\"my address\"}, \"timestamp\":1455191478}, {\"scriptPubKey\": {\"address\":\"my 2nd address\"}, \"label\":\"example 2\", \"timestamp\":1455191480}]"
> mvc-cli importmulti "[{\"scriptPubKey\": {\"address\":\"my address\"}, \"timestamp\":1455191478}]" "{\"rescan\":false}"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importmulti", "params": [[{"scriptPubKey": {"address":"my address"}, "timestamp":1455191478}], {"rescan":false}] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/

Response is an array with the same size as the input that has the execution result :
  [{ "success": true } , { "success": false, "error": { "code": -1, "message": "Internal Server Error"} }, ... ]
```

## importprivkey

Adds a private key (as returned by dumpprivkey) to your wallet.

Param：

- `mvcprivkey` (string, required)
- `label` (string, optional)
- `rescan` (bool, optional, default=true)

```text
importprivkey "mvcprivkey" ( "label" ) ( rescan )

Adds a private key (as returned by dumpprivkey) to your wallet.

Arguments:
1. "mvcprivkey"   (string, required) The private key (see dumpprivkey)
2. "label"            (string, optional, default="") An optional label
3. rescan               (boolean, optional, default=true) Rescan the wallet for transactions

Note: This call can take minutes to complete if rescan is true.

Examples:

Dump a private key
> mvc-cli dumpprivkey "myaddress"

Import the private key with rescan
> mvc-cli importprivkey "mykey"

Import using a label and without rescan
> mvc-cli importprivkey "mykey" "testing" false

Import using default blank label and without rescan
> mvc-cli importprivkey "mykey" "" false

As a JSON-RPC call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importprivkey", "params": ["mykey", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## importprunedfunds

Imports funds without rescan. Corresponding address or script must previously be included in wallet. Aimed towards
pruned wallets. The end-user is responsible to import additional transactions that subsequently spend the imported
outputs or rescan after the point in the blockchain the transaction is included.

Param：

- `rawtransaction` (string, required)
- `txoutproof` (string, required)

```text
importprunedfunds

Imports funds without rescan. Corresponding address or script must previously be included in wallet. Aimed towards pruned wallets. The end-user is responsible to import additional transactions that subsequently spend the imported outputs or rescan after the point in the blockchain the transaction is included.

Arguments:
1. "rawtransaction" (string, required) A raw transaction in hex funding an already-existing address in wallet
2. "txoutproof"     (string, required) The hex output from gettxoutproof that contains the transaction

Examples:

> mvc-cli importprunedfunds "rawtransaction" "txoutproof"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importprunedfunds", "params": ["rawtransaction", "txoutproof"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## importpubkey

Adds a public key (in hex) that can be watched as if it were in your wallet but cannot be used to spend.

Param：

- `pubkey` (string, required)
- `label` (string, optional)
- `rescan` (bool, optional, default=true)

```text
importpubkey "pubkey" ( "label" rescan )

Adds a public key (in hex) that can be watched as if it were in your wallet but cannot be used to spend.

Arguments:
1. "pubkey"           (string, required) The hex-encoded public key
2. "label"            (string, optional, default="") An optional label
3. rescan               (boolean, optional, default=true) Rescan the wallet for transactions

Note: This call can take minutes to complete if rescan is true.

Examples:

Import a public key with rescan
> mvc-cli importpubkey "mypubkey"

Import using a label without rescan
> mvc-cli importpubkey "mypubkey" "testing" false

As a JSON-RPC call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importpubkey", "params": ["mypubkey", "testing", false] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## importwallet

Imports keys from a wallet dump file (see dumpwallet).

Param：

- `filename` (string, required)

```text
importwallet "filename"

Imports keys from a wallet dump file (see dumpwallet).

Arguments:
1. "filename"    (string, required) The wallet file

Examples:

Dump the wallet
> mvc-cli dumpwallet "test"

Import the wallet
> mvc-cli importwallet "test"

Import using the json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "importwallet", "params": ["test"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## keypoolrefill

Fills the keypool.

Param：

- `newsize` (numeric, optional)

```text
keypoolrefill ( newsize )

Fills the keypool.

Arguments
1. newsize     (numeric, optional, default=100) The new keypool size

Examples:
> mvc-cli keypoolrefill
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "keypoolrefill", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## listaddressgroupings

Lists groups of addresses which have had their common ownership
made public by common use as inputs or as the resulting change
in past transactions

```text
listaddressgroupings

Lists groups of addresses which have had their common ownership
made public by common use as inputs or as the resulting change
in past transactions

Result:
[
  [
    [
      "address",            (string) The mvc address
      amount,                 (numeric) The amount in SPACE
      "account"             (string, optional) DEPRECATED. The account
    ]
    ,...
  ]
  ,...
]

Examples:
> mvc-cli listaddressgroupings
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listaddressgroupings", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/

The optional "account" value is only available for backward compatibility and should not be used.
```

## listlockunspent

Returns list of temporarily unspendable outputs.

```text
listlockunspent

Returns list of temporarily unspendable outputs.
See the lockunspent call to lock and unlock transactions for spending.

Result:
[
  {
    "txid" : "transactionid",     (string) The transaction id locked
    "vout" : n                      (numeric) The vout value
  }
  ,...
]

Examples:

List the unspent transactions
> mvc-cli listunspent

Lock an unspent transaction
> mvc-cli lockunspent false "[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":1}]"

List the locked transactions
> mvc-cli listlockunspent

Unlock the transaction again
> mvc-cli lockunspent true "[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":1}]"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listlockunspent", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## listreceivedbyaccount

DEPRECATED. List balances by account.

Param：

- `minconf` (numeric, optional, default=1)
- `includeempty` (bool, optional, default=false)

```text
listreceivedbyaccount ( minconf include_empty include_watchonly)

DEPRECATED. List balances by account.

Arguments:
1. minconf           (numeric, optional, default=1) The minimum number of confirmations before payments are included.
2. include_empty     (bool, optional, default=false) Whether to include accounts that haven't received any payments.
3. include_watchonly (bool, optional, default=false) Whether to include watch-only addresses (see 'importaddress').

Result:
[
  {
    "involvesWatchonly" : true,   (bool) Only returned if imported addresses were involved in transaction
    "account" : "accountname",  (string) The account name of the receiving account
    "amount" : x.xxx,             (numeric) The total amount received by addresses with this account
    "confirmations" : n,          (numeric) The number of confirmations of the most recent transaction included
    "label" : "label"           (string) A comment for the address/transaction, if any
  }
  ,...
]

Examples:
> mvc-cli listreceivedbyaccount
> mvc-cli listreceivedbyaccount 6 true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listreceivedbyaccount", "params": [6, true, true] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## listreceivedbyaddress

List balances by receiving address.

Param：

- `minconf` (numeric, optional, default=1)
- `includeempty` (bool, optional, default=false)
- `include_watchonly` (bool, optional, default=false)

```text
listreceivedbyaddress ( minconf include_empty include_watchonly)

List balances by receiving address.

Arguments:
1. minconf           (numeric, optional, default=1) The minimum number of confirmations before payments are included.
2. include_empty     (bool, optional, default=false) Whether to include addresses that haven't received any payments.
3. include_watchonly (bool, optional, default=false) Whether to include watch-only addresses (see 'importaddress').

Result:
[
  {
    "involvesWatchonly" : true,        (bool) Only returned if imported addresses were involved in transaction
    "address" : "receivingaddress",  (string) The receiving address
    "account" : "accountname",       (string) DEPRECATED. The account of the receiving address. The default account is "".
    "amount" : x.xxx,                  (numeric) The total amount in SPACE received by the address
    "confirmations" : n,               (numeric) The number of confirmations of the most recent transaction included
    "label" : "label",               (string) A comment for the address/transaction, if any
    "txids": [
       n,                                (numeric) The ids of transactions received with the address
       ...
    ]
  }
  ,...
]

Examples:
> mvc-cli listreceivedbyaddress
> mvc-cli listreceivedbyaddress 6 true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listreceivedbyaddress", "params": [6, true, true] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/

The optional "account" value is only available for backward compatibility and should not be used.
```

## listsinceblock

Get all transactions in blocks since block [blockhash], or all transactions if omitted

Param：

- `blockhash` (string, required)
- `target_confirmations` (numeric, optional, default=1)
- `include_watchonly` (bool, optional, default=false)

```text
listsinceblock ( "blockhash" target_confirmations include_watchonly)

Get all transactions in blocks since block [blockhash], or all transactions if omitted

Arguments:
1. "blockhash"            (string, optional) The block hash to list transactions since
2. target_confirmations:    (numeric, optional) The confirmations required, must be 1 or more
3. include_watchonly:       (bool, optional, default=false) Include transactions to watch-only addresses (see 'importaddress')
Result:
{
  "transactions": [
    "account":"accountname",       (string) DEPRECATED. The account name associated with the transaction. Will be "" for the default account.
    "address":"address",    (string) The mvc address of the transaction. Not present for move transactions (category = move).
    "category":"send|receive",     (string) The transaction category. 'send' has negative amounts, 'receive' has positive amounts.
    "amount": x.xxx,          (numeric) The amount in SPACE. This is negative for the 'send' category, and for the 'move' category for moves
                                          outbound. It is positive for the 'receive' category, and for the 'move' category for inbound funds.
    "vout" : n,               (numeric) the vout value
    "fee": x.xxx,             (numeric) The amount of the fee in SPACE. This is negative and only available for the 'send' category of transactions.
    "confirmations": n,       (numeric) The number of confirmations for the transaction. Available for 'send' and 'receive' category of transactions.
                                          When it's < 0, it means the transaction conflicted that many blocks ago.
    "blockhash": "hashvalue",     (string) The block hash containing the transaction. Available for 'send' and 'receive' category of transactions.
    "blockindex": n,          (numeric) The index of the transaction in the block that includes it. Available for 'send' and 'receive' category of transactions.
    "blocktime": xxx,         (numeric) The block time in seconds since epoch (1 Jan 1970 GMT).
    "txid": "transactionid",  (string) The transaction id. Available for 'send' and 'receive' category of transactions.
    "time": xxx,              (numeric) The transaction time in seconds since epoch (Jan 1 1970 GMT).
    "timereceived": xxx,      (numeric) The time received in seconds since epoch (Jan 1 1970 GMT). Available for 'send' and 'receive' category of transactions.
    "abandoned": xxx,         (bool) 'true' if the transaction has been abandoned (inputs are respendable). Only available for the 'send' category of transactions.
    "comment": "...",       (string) If a comment is associated with the transaction.
    "label" : "label"       (string) A comment for the address/transaction, if any
    "to": "...",            (string) If a comment to is associated with the transaction.
  ],
  "lastblock": "lastblockhash"     (string) The hash of the last block
}

Examples:
> mvc-cli listsinceblock
> mvc-cli listsinceblock "000000000000000bacf66f7497b7dc45ef753ee9a7d38571037cdb1a57f663ad" 6
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listsinceblock", "params": ["000000000000000bacf66f7497b7dc45ef753ee9a7d38571037cdb1a57f663ad", 6] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## listtransactions

Returns up to 'count' most recent transactions skipping the first 'from' transactions for account 'account'.

Param：

- `account` (string, optional)
- `count` (numeric, optional, default=10)
- `skip` (numeric, optional, default=0)
- `include_watchonly` (bool, optional, default=false)

```text
listtransactions ( "account" count skip include_watchonly)

Returns up to 'count' most recent transactions skipping the first 'from' transactions for account 'account'.

Arguments:
1. "account"    (string, optional) DEPRECATED. The account name. Should be "*".
2. count          (numeric, optional, default=10) The number of transactions to return
3. skip           (numeric, optional, default=0) The number of transactions to skip
4. include_watchonly (bool, optional, default=false) Include transactions to watch-only addresses (see 'importaddress')

Result:
[
  {
    "account":"accountname",       (string) DEPRECATED. The account name associated with the transaction.
                                                It will be "" for the default account.
    "address":"address",    (string) The mvc address of the transaction. Not present for
                                                move transactions (category = move).
    "category":"send|receive|move", (string) The transaction category. 'move' is a local (off blockchain)
                                                transaction between accounts, and not associated with an address,
                                                transaction id or block. 'send' and 'receive' transactions are
                                                associated with an address, transaction id and block details
    "amount": x.xxx,          (numeric) The amount in SPACE. This is negative for the 'send' category, and for the
                                         'move' category for moves outbound. It is positive for the 'receive' category,
                                         and for the 'move' category for inbound funds.
    "label": "label",       (string) A comment for the address/transaction, if any
    "vout": n,                (numeric) the vout value
    "fee": x.xxx,             (numeric) The amount of the fee in SPACE. This is negative and only available for the
                                         'send' category of transactions.
    "confirmations": n,       (numeric) The number of confirmations for the transaction. Available for 'send' and
                                         'receive' category of transactions. Negative confirmations indicate the
                                         transaction conflicts with the block chain
    "trusted": xxx,           (bool) Whether we consider the outputs of this unconfirmed transaction safe to spend.
    "blockhash": "hashvalue", (string) The block hash containing the transaction. Available for 'send' and 'receive'
                                          category of transactions.
    "blockindex": n,          (numeric) The index of the transaction in the block that includes it. Available for 'send' and 'receive'
                                          category of transactions.
    "blocktime": xxx,         (numeric) The block time in seconds since epoch (1 Jan 1970 GMT).
    "txid": "transactionid", (string) The transaction id. Available for 'send' and 'receive' category of transactions.
    "time": xxx,              (numeric) The transaction time in seconds since epoch (midnight Jan 1 1970 GMT).
    "timereceived": xxx,      (numeric) The time received in seconds since epoch (midnight Jan 1 1970 GMT). Available
                                          for 'send' and 'receive' category of transactions.
    "comment": "...",       (string) If a comment is associated with the transaction.
    "otheraccount": "accountname",  (string) DEPRECATED. For the 'move' category of transactions, the account the funds came
                                          from (for receiving funds, positive amounts), or went to (for sending funds,
                                          negative amounts).
    "abandoned": xxx          (bool) 'true' if the transaction has been abandoned (inputs are respendable). Only available for the
                                         'send' category of transactions.
  }
]

Examples:

List the most recent 10 transactions in the systems
> mvc-cli listtransactions

List transactions 100 to 120
> mvc-cli listtransactions "*" 20 100

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listtransactions", "params": ["*", 20, 100] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## listunspent

Returns array of unspent transaction outputs

Param：

- `minconf` (numeric, optional, default=1)
- `maxconf` (numeric, optional, default=9999999)
- `addresses` (array, optional)
- `include_unsafe` (bool, optional, default=false)

```text
listunspent ( minconf maxconf  ["addresses",...] [include_unsafe] )

Returns array of unspent transaction outputs
with between minconf and maxconf (inclusive) confirmations.
Optionally filter to only include txouts paid to specified addresses.

Arguments:
1. minconf          (numeric, optional, default=1) The minimum confirmations to filter
2. maxconf          (numeric, optional, default=9999999) The maximum confirmations to filter
3. "addresses"    (string) A json array of mvc addresses to filter
    [
      "address"   (string) mvc address
      ,...
    ]
4. include_unsafe (bool, optional, default=true) Include outputs that are not safe to spend
                  because they come from unconfirmed untrusted transactions or unconfirmed
                  replacement transactions (cases where we are less sure that a conflicting
                  transaction won't be mined).

Result
[                   (array of json object)
  {
    "txid" : "txid",          (string) the transaction id
    "vout" : n,               (numeric) the vout value
    "address" : "address",    (string) the mvc address
    "account" : "account",    (string) DEPRECATED. The associated account, or "" for the default account
    "scriptPubKey" : "key",   (string) the script key
    "amount" : x.xxx,         (numeric) the transaction output amount in SPACE
    "confirmations" : n,      (numeric) The number of confirmations
    "redeemScript" : n        (string) The redeemScript if scriptPubKey is P2SH
    "spendable" : xxx,        (bool) Whether we have the private keys to spend this output
    "solvable" : xxx,         (bool) Whether we know how to spend this output, ignoring the lack of keys
    "safe" : xxx              (bool) Whether this output is considered safe to spend. Unconfirmed transactions
                              from outside keys are considered unsafe and are not eligible for spending by
                              fundrawtransaction and sendtoaddress.
  }
  ,...
]

Examples
> mvc-cli listunspent
> mvc-cli listunspent 6 9999999 "[\"1PGFqEzfmQch1gKD3ra4k18PNj3tTUUSqg\",\"1LtvqCaApEdUGFkpKMM4MstjcaL4dKg8SP\"]"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listunspent", "params": [6, 9999999, ["1PGFqEzfmQch1gKD3ra4k18PNj3tTUUSqg","1LtvqCaApEdUGFkpKMM4MstjcaL4dKg8SP"]] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## lockunspent

Updates list of temporarily unspendable outputs.

Param：

- `unlock` (bool, required)
- `transactions` (array, required)

```text
lockunspent unlock ([{"txid":"txid","vout":n},...])

Updates list of temporarily unspendable outputs.
Temporarily lock (unlock=false) or unlock (unlock=true) specified transaction outputs.
If no transaction outputs are specified when unlocking then all current locked transaction outputs are unlocked.
A locked transaction output will not be chosen by automatic coin selection, when spending mvcs.
Locks are stored in memory only. Nodes start with zero locked outputs, and the locked output list
is always cleared (by virtue of process exit) when a node stops or fails.
Also see the listunspent call

Arguments:
1. unlock            (boolean, required) Whether to unlock (true) or lock (false) the specified transactions
2. "transactions"  (string, optional) A json array of objects. Each object the txid (string) vout (numeric)
     [           (json array of json objects)
       {
         "txid":"id",    (string) The transaction id
         "vout": n         (numeric) The output number
       }
       ,...
     ]

Result:
true|false    (boolean) Whether the command was successful or not

Examples:

List the unspent transactions
> mvc-cli listunspent

Lock an unspent transaction
> mvc-cli lockunspent false "[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":1}]"

List the locked transactions
> mvc-cli listlockunspent

Unlock the transaction again
> mvc-cli lockunspent true "[{\"txid\":\"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0\",\"vout\":1}]"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "lockunspent", "params": [false, [{"txid":"a08e6907dbbd3d809776dbfc5d82e371b764ed838b5655e72f463568df1aadf0","vout":1}]] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## move

DEPRECATED. Move a specified amount from one account in your wallet to another.

Param：

- `fromaccount` (string, required)
- `toaccount` (string, required)
- `amount` (numeric, required)
- `minconf` (numeric, optional, default=1)
- `comment` (string, optional)

```text
move "fromaccount" "toaccount" amount ( minconf "comment" )

DEPRECATED. Move a specified amount from one account in your wallet to another.

Arguments:
1. "fromaccount"   (string, required) The name of the account to move funds from. May be the default account using "".
2. "toaccount"     (string, required) The name of the account to move funds to. May be the default account using "".
3. amount            (numeric) Quantity of SPACE to move between accounts.
4. (dummy)           (numeric, optional) Ignored. Remains for backward compatibility.
5. "comment"       (string, optional) An optional comment, stored in the wallet only.

Result:
true|false           (boolean) true if successful.

Examples:

Move 0.01 SPACE from the default account to the account named tabby
> mvc-cli move "" "tabby" 0.01

Move 0.01 SPACE timotei to akiko with a comment and funds have 6 confirmations
> mvc-cli move "timotei" "akiko" 0.01 6 "happy birthday!"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "move", "params": ["timotei", "akiko", 0.01, 6, "happy birthday!"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## sendfrom

DEPRECATED (use sendtoaddress). Sent an amount from an account to a mvc address.

Param：

- `fromaccount` (string, required)
- `toaddress` (string, required)
- `amount` (numeric, required)
- `minconf` (numeric, optional, default=1)
- `comment` (string, optional)
- `comment_to` (string, optional)

```text
sendfrom "fromaccount" "toaddress" amount ( minconf "comment" "comment_to" )

DEPRECATED (use sendtoaddress). Sent an amount from an account to a mvc address.

Arguments:
1. "fromaccount"       (string, required) The name of the account to send funds from. May be the default account using "".
                       Specifying an account does not influence coin selection, but it does associate the newly created
                       transaction with the account, so the account's balance computation and transaction history can reflect
                       the spend.
2. "toaddress"         (string, required) The mvc address to send funds to.
3. amount                (numeric or string, required) The amount in SPACE (transaction fee is added on top).
4. minconf               (numeric, optional, default=1) Only use funds with at least this many confirmations.
5. "comment"           (string, optional) A comment used to store what the transaction is for.
                                     This is not part of the transaction, just kept in your wallet.
6. "comment_to"        (string, optional) An optional comment to store the name of the person or organization
                                     to which you're sending the transaction. This is not part of the transaction,
                                     it is just kept in your wallet.

Result:
"txid"                 (string) The transaction id.

Examples:

Send 0.01 SPACE from the default account to the address, must have at least 1 confirmation
> mvc-cli sendfrom "" "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.01

Send 0.01 from the tabby account to the given address, funds must have at least 6 confirmations
> mvc-cli sendfrom "tabby" "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.01 6 "donation" "seans outpost"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendfrom", "params": ["tabby", "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd", 0.01, 6, "donation", "seans outpost"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## sendmany

Send multiple times. Amounts are double-precision floating point numbers.

Param：

- `fromaccount` (string, required)
- `amounts` (json, required)
- `minconf` (numeric, optional, default=1)
- `comment` (string, optional)

```text
sendmany "fromaccount" {"address":amount,...} ( minconf "comment" ["address",...] )

Send multiple times. Amounts are double-precision floating point numbers.

Arguments:
1. "fromaccount"         (string, required) DEPRECATED. The account to send the funds from. Should be "" for the default account
2. "amounts"             (string, required) A json object with addresses and amounts
    {
      "address":amount   (numeric or string) The mvc address is the key, the numeric amount (can be string) in SPACE is the value
      ,...
    }
3. minconf                 (numeric, optional, default=1) Only use the balance confirmed at least this many times.
4. "comment"             (string, optional) A comment
5. subtractfeefrom         (array, optional) A json array with addresses.
                           The fee will be equally deducted from the amount of each selected address.
                           Those recipients will receive less mvcs than you enter in their corresponding amount field.
                           If no addresses are specified here, the sender pays the fee.
    [
      "address"          (string) Subtract fee from this address
      ,...
    ]

Result:
"txid"                   (string) The transaction id for the send. Only 1 transaction is created regardless of
                                    the number of addresses.

Examples:

Send two amounts to two different addresses:
> mvc-cli sendmany "" "{\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\":0.01,\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\":0.02}"

Send two amounts to two different addresses setting the confirmation and comment:
> mvc-cli sendmany "" "{\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\":0.01,\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\":0.02}" 6 "testing"

Send two amounts to two different addresses, subtract fee from amount:
> mvc-cli sendmany "" "{\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\":0.01,\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\":0.02}" 1 "" "[\"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX\",\"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz\"]"

As a json rpc call
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendmany", "params": ["", {"1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX":0.01,"1353tsE8YMTA4EuV7dgUXGjNFf9KpVvKHz":0.02}, 6, "testing"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## sendtoaddress

Send an amount to a given address.

Param：

- `address` (string, required)
- `amount` (numeric, required)
- `comment` (string, optional)
- `comment_to` (string, optional)
- `subtractfeefromamount` (bool, optional, default=false)

```text
sendtoaddress "address" amount ( "comment" "comment_to" subtractfeefromamount )

Send an amount to a given address.

Arguments:
1. "address"            (string, required) The mvc address to send to.
2. "amount"             (numeric or string, required) The amount in SPACE to send. eg 0.1
3. "comment"            (string, optional) A comment used to store what the transaction is for.
                             This is not part of the transaction, just kept in your wallet.
4. "comment_to"         (string, optional) A comment to store the name of the person or organization
                             to which you're sending the transaction. This is not part of the
                             transaction, just kept in your wallet.
5. subtractfeefromamount  (boolean, optional, default=false) The fee will be deducted from the amount being sent.
                             The recipient will receive less mvcs than you enter in the amount field.

Result:
"txid"                  (string) The transaction id.

Examples:
> mvc-cli sendtoaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1
> mvc-cli sendtoaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1 "donation" "seans outpost"
> mvc-cli sendtoaddress "1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd" 0.1 "" "" true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "sendtoaddress", "params": ["1M72Sfpbz1BPpXFHz9m3CdqATR44Jvaydd", 0.1, "donation", "seans outpost"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## setaccount

DEPRECATED. Sets the account associated with the given address.

Param：

- `address` (string, required)
- `account` (string, required)

```text
setaccount "address" "account"

DEPRECATED. Sets the account associated with the given address.

Arguments:
1. "address"         (string, required) The mvc address to be associated with an account.
2. "account"         (string, required) The account to assign the address to.

Examples:
> mvc-cli setaccount "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "tabby"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setaccount", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX", "tabby"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## settxfee

Set the transaction fee per kB. Overwrites the paytxfee parameter.

Param：

- `amount` (numeric, required)

```text
settxfee amount

Set the transaction fee per kB. Overwrites the paytxfee parameter.

Arguments:
1. amount         (numeric or string, required) The transaction fee in SPACE/kB

Result
true|false        (boolean) Returns true if successful

Examples:
> mvc-cli settxfee 0.00001
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "settxfee", "params": [0.00001] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## signmessage

Sign a message with the private key of an address

Param：

- `address` (string, required)
- `message` (string, required)

```text
signmessage "address" "message"

Sign a message with the private key of an address

Arguments:
1. "address"         (string, required) The mvc address to use for the private key.
2. "message"         (string, required) The message to create a signature of.

Result:
"signature"          (string) The signature of the message encoded in base 64

Examples:

Unlock the wallet for 30 seconds
> mvc-cli walletpassphrase "mypassphrase" 30

Create the signature
> mvc-cli signmessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "my message"

Verify the signature
> mvc-cli verifymessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "signature" "my message"

As json rpc
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "signmessage", "params": ["1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX", "my message"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```
