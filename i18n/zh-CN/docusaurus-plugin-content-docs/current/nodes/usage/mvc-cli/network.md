# Networking 命令

处理和节点P2P网络相关的命令。

可以使用`mvc-cli help command`来查看具体命令的使用方法。JsonRpc调用方法在示例中。

## 命令列表

命令列表如下（从文档右侧边框选取对应的命令进行查看）：

```text
== Network ==
addnode "node" "add|remove|onetry"
clearbanned
disconnectnode "[address]" [nodeid]
getaddednodeinfo ( "node" )
getconnectioncount
getexcessiveblock
getnettotals
getnetworkinfo
getpeerinfo
listbanned
ping
setban "subnet" "add|remove" (bantime) (absolute)
setblockmaxsize blockSize
setexcessiveblock blockSize
setnetworkactive true|false
settxnpropagationfreq freq
```

## addnode

尝试将Peer节点添加到或从节点连接列表中删除。

参数：

- `node` (string, required) 要添加或删除的节点的IP地址和端口。
- `command` (string, required) 操作类型，可以是`add`、`remove`或`onetry`。

```text
addnode "node" "add|remove|onetry"

Attempts add or remove a node from the addnode list.
Or try a connection to a node once.

Arguments:
1. "node"     (string, required) The node (see getpeerinfo for nodes)
2. "command"  (string, required) 'add' to add a node to the list, 'remove' to remove a node from the list, 'onetry' to try a connection to the node once

Examples:
> mvc-cli addnode "192.168.0.6:9883" "onetry"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "addnode", "params": ["192.168.0.6:9883", "onetry"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```


## clearbanned

清除所有被禁止的IP地址。

```text
clearbanned

Clear all banned IPs.

Examples:
> mvc-cli clearbanned
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "clearbanned", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## disconnectnode

断开与指定节点的连接。

参数：

- `address` (string, optional) 要断开连接的节点的IP地址和端口。
- `nodeid` (string, optional) 要断开连接的节点的ID。

```text
disconnectnode "[address]" [nodeid]

Immediately disconnects from the specified peer node.

Strictly one out of 'address' and 'nodeid' can be provided to identify the node.

To disconnect by nodeid, either set 'address' to the empty string, or call using the named 'nodeid' argument only.

Arguments:
1. "address"     (string, optional) The IP address/port of the node
2. "nodeid"      (number, optional) The node ID (see getpeerinfo for node IDs)

Examples:
> mvc-cli disconnectnode "192.168.0.6:9883"
> mvc-cli disconnectnode "" 1
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "disconnectnode", "params": ["192.168.0.6:9883"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "disconnectnode", "params": ["", 1] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getaddednodeinfo

获取已添加的节点信息。

参数：

- `node` (string, optional) 要获取信息的节点的IP地址和端口。

```text
getaddednodeinfo ( "node" )

Returns information about the given added node, or all added nodes
(note that onetry addnodes are not listed here)

Arguments:
1. "node"   (string, optional) If provided, return information about this specific node, otherwise all nodes are returned.

Result:
[
  {
    "addednode" : "192.168.0.201",   (string) The node ip address or name (as provided to addnode)
    "connected" : true|false,          (boolean) If connected
    "addresses" : [                    (list of objects) Only when connected = true
       {
         "address" : "192.168.0.201:9883",  (string) The mvc server IP and port we're connected to
         "connected" : "outbound"           (string) connection, inbound or outbound
       }
     ]
  }
  ,...
]

Examples:
> mvc-cli getaddednodeinfo true
> mvc-cli getaddednodeinfo true "192.168.0.201"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getaddednodeinfo", "params": [true, "192.168.0.201"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getconnectioncount

获取当前连接的节点数量。

```text
getconnectioncount

Returns the number of connections to other nodes.

Result:
n          (numeric) The connection count

Examples:
> mvc-cli getconnectioncount
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getconnectioncount", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getexcessiveblock

获取当前节点的接受的最大区块大小。

```text
getexcessiveblock

Return the excessive block size.
Result
  excessiveBlockSize (integer) block size in bytes

Examples:
> mvc-cli getexcessiveblock
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getexcessiveblock", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getnettotals

获取网络流量统计信息。

```text
getnettotals

Returns information about network traffic, including bytes in, bytes out,
and current time.

Result:
{
  "totalbytesrecv": n,   (numeric) Total bytes received
  "totalbytessent": n,   (numeric) Total bytes sent
  "timemillis": t,       (numeric) Current UNIX time in milliseconds
  "uploadtarget":
  {
    "timeframe": n,                         (numeric) Length of the measuring timeframe in seconds
    "target": n,                            (numeric) Target in bytes
    "target_reached": true|false,           (boolean) True if target is reached
    "serve_historical_blocks": true|false,  (boolean) True if serving historical blocks
    "bytes_left_in_cycle": t,               (numeric) Bytes left in current time cycle
    "time_left_in_cycle": t                 (numeric) Seconds left in current time cycle
  }
}

Examples:
> mvc-cli getnettotals
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnettotals", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getnetworkinfo

获取网络综合信息。

```text
getnetworkinfo
Returns an object containing various state info regarding P2P networking.

Result:
{
  "version": xxxxx,                      (numeric) the server version
  "subversion": "/Satoshi:x.x.x/",     (string) the server subversion string
  "protocolversion": xxxxx,              (numeric) the protocol version
  "localservices": "xxxxxxxxxxxxxxxx", (string) the services we offer to the network
  "localrelay": true|false,              (bool) true if transaction relay is requested from peers
  "timeoffset": xxxxx,                   (numeric) the time offset
  "txnpropagationfreq": xxxxx,           (numeric) how often the transaction propagator runs (milli-secs)
  "txnpropagationqlen": xxxxx,           (numeric) length of the transaction propagator queue
  "connections": xxxxx,                  (numeric) the number of connections
  "addresscount": xxxxx,                 (numeric) number of known peer addresses
  "streampolicies": "xxxxxxxxxxxxxxx", (string) list of available stream policies to use
  "networkactive": true|false,           (bool) whether p2p networking is enabled
  "networks": [                          (array) information per network
  {
    "name": "xxx",                     (string) network (ipv4 or ipv6)
    "limited": true|false,               (boolean) is the network limited using -onlynet?
    "reachable": true|false,             (boolean) is the network reachable?
    "proxy": "host:port"               (string) the proxy that is used for this network, or empty if none
    "proxy_randomize_credentials": true|false,  (string) Whether randomized credentials are used
  }
  ,...
  ],
  "relayfee": x.xxxxxxxx,                (numeric) minimum relay fee for non-free transactions in SPACE/kB
  "minconsolidationfactor": xxxxx               (numeric) minimum ratio between scriptPubKey inputs and outputs, 0 disables consolidation transactions
  "maxconsolidationinputscriptsize": xxxxx      (numeric) maximum input scriptSig size
  "minconfconsolidationinput": xxxxx        (numeric) minimum number of confirmations for inputs spent
  "minconsolidationinputmaturity": xxxxx    (numeric) minimum number of confirmations for inputs spent (DEPRECATED: use minconfconsolidationinput instead)
  "acceptnonstdconsolidationinput": true|false  (boolean) true if non std inputs can be spent
  "localaddresses": [                    (array) list of local addresses
  {
    "address": "xxxx",                 (string) network address
    "port": xxx,                         (numeric) network port
    "score": xxx                         (numeric) relative score
  }
  ,...
  ]
  "warnings": "..."                    (string) any network warnings
}

Examples:
> mvc-cli getnetworkinfo
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getnetworkinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## getpeerinfo

获取当前连接的Peer节点信息。

```text
getpeerinfo

Returns data about each connected network node as a json array of objects.

Result:
[
  {
    "id": n,                   (numeric) Peer index
    "addr":"host:port",      (string) The ip address and port of the peer
    "addrlocal":"ip:port",   (string) local address
    "services":"xxxxxxxxxxxxxxxx",   (string) The services offered
    "relaytxes":true|false,    (boolean) Whether peer has asked us to relay transactions to it
    "lastsend": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last send
    "lastrecv": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last receive
    "bytessent": n,            (numeric) The total bytes sent
    "bytesrecv": n,            (numeric) The total bytes received
    "sendsize": n,             (numeric) Current size of queued messages for sending
    "recvsize": n,             (numeric) Current size of queued messages for receiving
    "pausesend": true|false,   (boolean) Are we paused for sending
    "unpausesend": true|false, (boolean) Have we temporarily unpaused sending
    "avgrecvbw": n,            (numeric) The 1 minute average download bandwidth across all streams (bytes/sec)
    "associd": "xxxxxxx"       (string) The association ID if set by the peer, otherwise Null
    "streampolicy": "xxxxxxx"  (string) The stream policy in use
    "streams": [
       {
          "streamtype": "TYPE" (string) The type of this stream
          "lastsend": ttt,     (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last send
          "lastrecv": ttt,     (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last receive
          "bytessent": n,      (numeric) The total bytes sent
          "bytesrecv": n,      (numeric) The total bytes received
          "sendsize": n,       (numeric) Current size of queued messages for sending
          "recvsize": n,       (numeric) Current size of queued messages for receiving
          "spotrecvbw": n,     (numeric) The spot average download bandwidth over this stream (bytes/sec)
          "minuterecvbw": n    (numeric) The 1 minute average download bandwidth over this stream (bytes/sec)
          "pauserecv": true|false, (boolean) Are we paused for receiving
       }
       ...
    ],
    "conntime": ttt,           (numeric) The connection time in seconds since epoch (Jan 1 1970 GMT)
    "timeoffset": ttt,         (numeric) The time offset in seconds
    "pingtime": n,             (numeric) ping time (if available)
    "minping": n,              (numeric) minimum observed ping time (if any at all)
    "pingwait": n,             (numeric) ping wait (if non-zero)
    "version": v,              (numeric) The peer version, such as 7001
    "subver": "/Satoshi:0.8.5/",  (string) The string version
    "inbound": true|false,     (boolean) Inbound (true) or Outbound (false)
    "addnode": true|false,     (boolean) Whether connection was due to addnode and is using an addnode slot
    "startingheight": n,       (numeric) The starting height (block) of the peer
    "txninvsize": n,           (numeric) The number of queued transaction inventory msgs we have for this peer
     "banscore": n,             (numeric) The ban score
    "synced_headers": n,       (numeric) The last header we have in common with this peer
    "synced_blocks": n,        (numeric) The last block we have in common with this peer
    "inflight": [
       n,                        (numeric) The heights of blocks we're currently asking from this peer
       ...
    ],
    "whitelisted": true|false, (boolean) Whether the peer is whitelisted
    "bytessent_per_msg": {
       "addr": n,              (numeric) The total bytes sent aggregated by message type
       ...
    },
    "bytesrecv_per_msg": {
       "addr": n,              (numeric) The total bytes received aggregated by message type
       ...
    }
  }
  ,...
]

Examples:
> mvc-cli getpeerinfo
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getpeerinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## listbanned

列出所有被禁止的IP地址。

```text
listbanned

List all banned IPs/Subnets.

Examples:
> mvc-cli listbanned
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "listbanned", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## ping

Ping所有peer的节点，衡量网络状况，网络状况更新后可以使用getpeerinfo查看。

```text
ping

Requests that a ping be sent to all other nodes, to measure ping time.
Results provided in getpeerinfo, pingtime and pingwait fields are decimal seconds.
Ping command is handled in queue with all other commands, so it measures processing backlog, not just network ping.

Examples:
> mvc-cli ping
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "ping", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## setban

禁止或解禁指定IP地址。

参数：

- `subnet` (string, required) 要禁止或解禁的IP地址。
- `command` (string, required) 操作类型，可以是`add`或`remove`。
- `bantime` (numeric, optional) 禁止时间，单位为秒。
- `absolute` (boolean, optional) 是否使用绝对时间。

```text
setban "subnet" "add|remove" (bantime) (absolute)

Attempts add or remove a IP/Subnet from the banned list.

Arguments:
1. "subnet"       (string, required) The IP/Subnet (see getpeerinfo for nodes ip) with a optional netmask (default is /32 = single ip)
2. "command"      (string, required) 'add' to add a IP/Subnet to the list, 'remove' to remove a IP/Subnet from the list
3. "bantime"      (numeric, optional) time in seconds how long (or until when if [absolute] is set) the ip is banned (0 or empty means using the default time of 24h which can also be overwritten by the -bantime startup argument)
4. "absolute"     (boolean, optional) If set, the bantime must be a absolute timestamp in seconds since epoch (Jan 1 1970 GMT)

Examples:
> mvc-cli setban "192.168.0.6" "add" 86400
> mvc-cli setban "192.168.0.0/24" "add"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setban", "params": ["192.168.0.6", "add", 86400] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## setblockmaxsize

设置节点挖矿产出的的最大区块大小。

参数：

- `blockSize` (numeric, required) 区块大小字节数。

```text
setblockmaxsize blockSize

Sets maximum size of produced block.
Result
  blockSize (integer) block size in bytes

Examples:
> mvc-cli setblockmaxsize
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setblockmaxsize", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## setexcessiveblock

设置节点接受的最大区块大小。

参数：

- `blockSize` (numeric, required) 区块大小字节数。

```text
setexcessiveblock blockSize

Set the excessive block size. Excessive blocks will not be used in the active chain or relayed. This discourages the propagation of blocks that you consider excessively large.
Result
  blockSize (integer) excessive block size in bytes

Examples:
> mvc-cli setexcessiveblock
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setexcessiveblock", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## setnetworkactive

启用或禁用P2P网络。

参数：

- state `true|false` (boolean, required) 是否启用P2P网络。

```text
setnetworkactive true|false

Disable/enable all p2p network activity.

Arguments:
1. "state"        (boolean, required) true to enable networking, false to disable

Examples:

Disable networking

> mvc-cli setnetworkactive false

Enable networking

> mvc-cli setnetworkactive true

> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "setnetworkactive", "params": [true] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## settxnpropagationfreq

设置交易传播频率。

参数：

- `freq` (numeric, required) 传播频率毫秒。

```text
settxnpropagationfreq freq

Set the frequency (in milli-seconds) the transaction propagator runs at.

Arguments:
1. "freq"        (numeric, required) the frequency in milliseconds

Examples:

Set the transaction propagation frequency to 1000 milliseconds

> mvc-cli settxnpropagationfreq 1000

> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "settxnpropagationfreq", "params": [1000] }' -H 'content-type: text/plain;' http://
```
