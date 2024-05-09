# Safe Mode

Safe Mode while Consensus Forks

This command is used to protect miners when there is a consensus fork in the blockchain, stopping the generation of
block templates and the acceptance of transactions.

You can use `mvc-cli help command` to view the usage of specific commands. The JsonRpc call method is in the example.

## Commands

```text
== Safemode ==
getsafemodeinfo
ignoresafemodeforblock "blockhash"
reconsidersafemodeforblock "blockhash"
```

## getsafemodeinfo

Returns safe mode status.

```text
getsafemodeinfo

Returns safe mode status.

Arguments:

Result:
{
  "safemodeenabled": <true/false>,
  "activetip": {
    "hash": "<block_hash>",
    "height": <height>,
    "blocktime": "<time UTC>",
    "firstseentime": "<time UTC>",
    "status": "active"
  },
  "timeutc": "<time_of_the_message>",
  "reorg": {
    "happened": <true/false>,
    "numberofdisconnectedblocks": <number>,
    "oldtip": {
      "hash": "<block_hash>",
      "height": <height>,
      "blocktime": "<time UTC>",
      "firstseentime": "<time UTC>",
      "status": "<block_header_status>"
    }
  },
  "forks": [
    {
      "forkfirstblock": {
        "hash": "<block_hash>",
        "height": <height>,
        "blocktime": "<time UTC>",
        "firstseentime": "<time UTC>",
        "status": "<block_header_status>"
      },
      "tips": [
        {
          "hash": "<block_hash>",
          "height": <height>,
          "blocktime": "<time UTC>",
          "firstseentime": "<time UTC>",
          "status": "<block_header_status>"
        },
        ...
      ],
      "lastcommonblock": {
        "hash": "<block_hash>",
        "height": <height>,
        "blocktime": "<time UTC>",
        "firstseentime": "<time UTC>",
        "status": "active"
      },
      "activechainfirstblock": {
        "hash": "<block_hash>",
        "height": <height>,
        "blocktime": "<time UTC>",
        "firstseentime": "<time UTC>",
        "status": "active"
      },
    },
         ...
  ]
}


Examples:
> mvc-cli getsafemodeinfo
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getsafemodeinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## ignoresafemodeforblock

Specified block, and all its descendants, will be ignored for safe mode activation.

Param：

- `blockhash` (string, required)

```text
ignoresafemodeforblock "blockhash"

Specified block, and all its descendants, will be ignored for safe mode activation.

Arguments:
1. "blockhash"   (string, required) the hash of the block which we want to ignore.

Result:

Examples:
> mvc-cli ignoresafemodeforblock "blockhash"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "ignoresafemodeforblock", "params": ["blockhash"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## reconsidersafemodeforblock

Specified block, and all its ancestors, will be considered for safe mode activation.

Param：

- `blockhash` (string, required)

```text
reconsidersafemodeforblock "blockhash"

Specified block, and all its ancestors, will be considered for safe mode activation.

Arguments:
1. "blockhash"   (string, required) the hash of the block for which we want

Result:

Examples:
> mvc-cli reconsidersafemodeforblock "blockhash"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "reconsidersafemodeforblock", "params": ["blockhash"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```


