# Control

Control the startup and shutdown of nodes and monitoring information.

You can use `mvc-cli help command` to view the usage of specific commands. The JsonRpc call method is in the example.

## Commands

```text
== Control ==
activezmqnotifications
getinfo
getmemoryinfo
help ( "command" )
stop
uptime
```

## activezmqnotifications

Get the active zmq notifications and their addresses

```text
activezmqnotifications
Get the active zmq notifications and their addresses

Result:
[ (array) active zmq notifications
    {
       "notification": "xxxx", (string) name of zmq notification
       "address": "xxxx"       (string) address of zmq notification
    }, ...
]

Examples:
> mvc-cli activezmqnotifications
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "activezmqnotifications", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getinfo

> Deprecated

DEPRECATED. Returns an object containing various state info.

```text
getinfo

DEPRECATED. Returns an object containing various state info.

Result:
{
  "version": xxxxx,           (numeric) the server version
  "protocolversion": xxxxx,   (numeric) the protocol version
  "walletversion": xxxxx,     (numeric) the wallet version
  "balance": xxxxxxx,         (numeric) the total mvc balance of the wallet
  "blocks": xxxxxx,           (numeric) the current number of blocks processed in the server
  "timeoffset": xxxxx,        (numeric) the time offset
  "connections": xxxxx,       (numeric) the number of connections
  "proxy": "host:port",       (string, optional) the proxy used by the server
  "difficulty": xxxxxx,       (numeric) the current difficulty
  "testnet": true|false,      (boolean) if the server is using testnet or not
  "keypoololdest": xxxxxx,    (numeric) the timestamp (seconds since Unix epoch) of the oldest pre-generated key in the key pool
  "keypoolsize": xxxx,        (numeric) how many new keys are pre-generated
  "unlocked_until": ttt,      (numeric) the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked
  "paytxfee": x.xxxx,         (numeric) the transaction fee set in SPACE/kB
  "relayfee": x.xxxx,         (numeric) minimum relay fee for non-free transactions in SPACE/kB
  "errors": "...",            (string) any error messages
  "maxblocksize": xxxxx,      (numeric) The absolute maximum block size we will accept from any source
  "maxminedblocksize": xxxxx  (numeric) The maximum block size we will mine
  "maxstackmemoryusagepolicy": xxxxx, (numeric) Policy value of max stack memory usage
  "maxStackMemoryUsageConsensus": xxxxx, (numeric) Consensus value of max stack memory usage
}

Examples:
> mvc-cli getinfo
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getmemoryinfo

Returns an object containing information about memory usage.

```text
getmemoryinfo
Returns an object containing information about memory usage.

Result:
{
  "locked": {               (json object) Information about locked memory manager
    "used": xxxxx,          (numeric) Number of bytes used
    "free": xxxxx,          (numeric) Number of bytes available in current arenas
    "total": xxxxxxx,       (numeric) Total number of bytes managed
    "locked": xxxxxx,       (numeric) Amount of bytes that succeeded locking. If this number is smaller than total, locking pages failed at some point and key data could be swapped to disk.
    "chunks_used": xxxxx,   (numeric) Number allocated chunks
    "chunks_free": xxxxx,   (numeric) Number unused chunks
  }
}

Examples:
> mvc-cli getmemoryinfo
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmemoryinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## help

List all commands, or get help for a specified command.

```text
help ( "command" )

List all commands, or get help for a specified command.

Arguments:
1. "command"     (string, optional) The command to get help on

Result:
"text"     (string) The help text

Examples:

> mvc-cli help
> mvc-cli help "getmemoryinfo"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "help", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## stop

Stop MVC server.

```text
stop

Stop MVC server.
```

## uptime

Returns the total uptime of the server.

```text
uptime

Returns the total uptime of the server.

Result:
ttt        (numeric) The number of seconds that the server has been running

Examples:
> mvc-cli uptime
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "uptime", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```
