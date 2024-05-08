# Safe Mode 命令

Safe Mode 命令用于在区块链出现共识分歧的时候保护矿工，停止生成区块模板和接受交易。

可以使用`mvc-cli help command`来查看具体命令的使用方法。JsonRpc调用方法在示例中。

## 命令列表

命令列表如下（从文档右侧边框选取对应的命令进行查看）：

```text
== Safemode ==
getsafemodeinfo
ignoresafemodeforblock "blockhash"
reconsidersafemodeforblock "blockhash"
```

## getsafemodeinfo

获取当前节点的Safe Mode状态，以及对应的区块信息。

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

忽略指定区块的Safe Mode状态，继续生成区块模板和接受交易。

参数：

- `blockhash` (string, required) 要忽略的区块哈希值。

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

重新考虑指定区块的Safe Mode状态，停止生成区块模板和接受交易。

参数：

- `blockhash` (string, required) 要重新考虑的区块哈希值。

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


