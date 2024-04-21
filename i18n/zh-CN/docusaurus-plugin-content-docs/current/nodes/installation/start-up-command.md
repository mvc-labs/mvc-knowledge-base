---
sidebar_position: 5
---
# 节点启动命令与配置

启动节点的时候，可以通过命令行参数或者配置文件来配置节点的启动参数。用来控制节点行为，比如连接到哪个网络、是否开启挖矿、是否开启rpc服务等。

使用命令行参数和配置文件是等效的，名称也相同，命令行参数优先级更高，如果你同时使用命令行和配置文件，***命令行参数会覆盖配置文件的参数***。

## 查看启动项帮助

```bash
mvcd --help
```

你可以看到所有的启动项帮助信息，包括启动项的名称、默认值、描述等。由于启动项较多，我们放在最后的附录中，你可以查看[附录](start-up-command#附录-启动项帮助)。

## 参数详解

根据不同的使用场景，分类进行参数详解，方便查找和理解。

### 普通
| 参数名                                | 参数描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 默认值 |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| -?                                 | Print this help message and exit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |     |
| -version                           | Print version and exit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |     |
| -alertnotify=\<cmd\>               | Execute command when a relevant alert is received or we see a really long fork (%s in\<cmd\>is replaced by message)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |     |
| -blocknotify=\<cmd\>               | Execute command when the best block changes (%s in\<cmd\>is replaced by block hash)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |     |
| -assumevalid=\<hex\>               | If this block is in the chain assume that it and its ancestors are valid and potentially skip their script verification (0 to verify all, default: 000000000000000000e45ad2fbcc5ff3e85f0868dd8f00ad4e92dffabe28f8d2, testnet: 0000000000327972b8470c11755adf8f4319796bafae01f5a6650490b98a17db)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |     |
| -conf=\<file\>                     | Specify configuration\<file\>(default: bitcoin.conf)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |     |
| -daemon                            | Run in the background as a daemon and accept commands                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |     |
| -datadir=\<dir\>                   | Specify data directory                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |     |
| -dbcache=\<n\>                     | Set database cache size in megabytes (4 to 16384, default: 450). The value may be given in megabytes or with unit (B, KiB, MiB, GiB).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |     |
| -frozentxodbcache=\<n\>            | Set cache size for database holding a list of frozen transaction outputs in bytes (default: 128000)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |     |
| -genesisactivationheight           | Set block height at which genesis should be activated. (default: 620538).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |     |
| -loadblock=\<file\>                | Imports blocks from external blk000??.dat\<file\>on startup                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |     |
| -maxmempool=\<n\>                  | Keep the resident size of the transaction memory pool below \<n\> megabytes (default: 1000,  must be at least 300). The value may be given in megabytes or with unit (B, kB, MB, GB).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |     |
| -mempoolmaxpercentcpfp=\<n\>       | Percentage of total mempool size (ram+disk) to allow for low paying transactions (0..100) (default: 10)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |     |
| -mempoolexpiry=\<n\>               | Do not keep transactions in the mempool longer than \<n\> hours (default: 336)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |     |
| -maxmempoolnonfinal=\<n\>          | Keep the non-final transaction memory pool below \<n\> megabytes (default: 50). The value may be given in megabytes or with unit (B, KiB, MiB, GiB).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |     |
| -mempoolexpirynonfinal=\<n\>       | Do not keep transactions in the non-final mempool longer than \<n\> hours (default: 672)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |     |
| -persistmempool                    | Whether to save the mempool on shutdown and load on restart (default: 1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |     |
| -threadsperblock=\<n\>             | Set the number of script verification threads used when validating single block (0 to 64, 0 = auto, default: 0)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |     |
| -scriptvalidatormaxbatchsize=\<n\> | Set size of script verification batch per thread (1 to 255, default: 128)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |     |
| -maxparallelblocks=\<n\>           | Set the number of block that can be validated in parallel across all nodes. If additional block arrive, validation of an old block is terminated. (1 to 100, default: 4)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |     |
| -maxparallelblocksperpeer=\<n\>    | Set the number of blocks that can be validated in parallel from a single peer. If peers sends another block, the validation of it is delayed. (1 to maxparallelblocks, default: 3)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |     |
| -pid=\<file\>                      | Specify pid\<file\>(default: bitcoind.pid)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |     |
| -preload=\<n\>                     | If\<n\>is set to 1, blockchain state will be preloaded into memory. If\<n\>is 0, no preload will happen. Other values for\<n\>are not allowed. The default value is 0. This option is not supported on Windows operating systems.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |     |
| -prune=\<n\>                       | Reduce storage requirements by enabling pruning (deleting) of old blocks. This allows the pruneblockchain RPC to be called to delete specific blocks, and enables automatic pruning of old blocks if a target size in MiB is provided. This\<mode\>is incompatible with -txindex and -rescan. Warning: Reverting this setting requires re-downloading the entire blockchain. (default: 0 = disable pruning blocks, 1 = allow manual pruning via RPC,  550 = automatically prune block files to stay under the specified target size in MiB, but still keep the last 288 blocks to speed up a potential reorg even if this results in the pruning target being exceeded)Note: Currently achievable prune target is ~100GB (mainnet). Setting the target size too low will not affect pruning function, but will not guarantee block files size staying under the threshold at all times. |     |
| -reindex-chainstate                | Rebuild chain state from the currently indexed blocks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |     |
| -reindex                           | Rebuild chain state and block index from the blk*.dat files on disk                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |     |
| -rejectmempoolrequest              | Reject every mempool request from non-whitelisted peers (default: 1).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |     |
| -sysperms                          | Create new files with system default permissions, instead of umask 077 (only effective with disabled wallet functionality)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |     |
| -txindex                           | Maintain a full transaction index, used by the getrawtransaction rpc call (default: 0)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |     |
| -maxmerkletreediskspace            | Maximum disk size in bytes that can be taken by stored merkle trees. This size should not be less than default size (default: 184549376 bytes). The value may be given in bytes or with unit (B, kiB, MiB, GiB).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |     |
| -preferredmerkletreefilesize       | Preferred size of a single datafile containing merkle trees. When size is reached, new datafile is created. If preferred size is less than size of a single merkle tree, it will still be stored, meaning datafile size can be larger than preferred size. (default: 33554432 bytes). The value may be given in bytes or with unit (B, kiB, MiB, GiB).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |     |
| -maxmerkletreememcachesize         | Maximum merkle trees memory cache size in bytes. For faster responses, requested merkle trees are stored into a memory cache. (default: 33554432 bytes). The value may be given in bytes or with unit (B, kiB, MiB, GiB).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |     |

### 网络连接
| 参数名                                  | 参数描述                                                                                                                                                                                                                                                                                                                     | 默认值 |
|--------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| -addnode=\<ip\>                      | Add a node to connect to and attempt to keep the connection open                                                                                                                                                                                                                                                         |     |
| -banscore=\<n\>                      | Threshold for disconnecting misbehaving peers (default: 100)                                                                                                                                                                                                                                                             |     |
| -bantime=\<n\>                       | Number of seconds to keep misbehaving peers from reconnecting (default: 86400)                                                                                                                                                                                                                                           |     |
| -bind=\<addr\>                       | Bind to given address and always listen on it. Use \[host]:port notation for IPv6                                                                                                                                                                                                                                        |     |
| -blockstallingmindownloadspeed=\<n\> | Minimum average download speed (Kbytes/s) we will allow a stalling peer to fall to during IBD. A value of 0 means stall detection is disabled (default: 100Kb/s)                                                                                                                                                         |     |
| -broadcastdelay=\<n\>                | Set inventory broadcast delay duration in millisecond(min: 0, max: 50000)                                                                                                                                                                                                                                                |     |
| -connect=\<ip\>                      | Connect only to the specified node(s); -noconnect or -connect=0 alone to disable automatic connections                                                                                                                                                                                                                   |     |
| -discover                            | Discover own IP addresses (default: 1 when listening and no -externalip or -proxy)                                                                                                                                                                                                                                       |     |
| -dns                                 | Allow DNS lookups for -addnode, -seednode and -connect (default: 1)                                                                                                                                                                                                                                                      |     |
| -dnsseed                             | Query for peer addresses via DNS lookup, if low on addresses (default: 1 unless -connect/-noconnect)                                                                                                                                                                                                                     |     |
| -externalip=\<ip\>                   | Specify your own public address                                                                                                                                                                                                                                                                                          |     |
| -forcednsseed                        | Always query for peer addresses via DNS lookup (default: 1)                                                                                                                                                                                                                                                              |     |
| -listen                              | Accept connections from outside (default: 1 if no -proxy or                                                                                                                                                                                                                                                              |     |
| -connect/-noconnect)                 |                                                                                                                                                                                                                                                                                                                          |     |
| -maxconnections=\<n\>                | Maintain at most \<n\> connections to peers (default: 125)                                                                                                                                                                                                                                                               |     |
| -maxreceivebuffer=\<n\>              | Maximum per-connection receive buffer in kilobytes (default: 500000). The value may be given in kilobytes or with unit (B, kB, MB, GB).                                                                                                                                                                                  |     |
| -maxsendbuffer=\<n\>                 | Maximum per-connection send buffer in kilobytes (default: 500000). The value may be given in kilobytes or with unit (B, kB, MB, GB).                                                                                                                                                                                     |     |
| -maxsendbuffermult=\<n\>             | Temporary multiplier applied to the -maxsendbuffer size to allow connections to unblock themselves in the unlikely situation where they have become paused for both sending and receiving (default: 10)                                                                                                                  |     |
| -factormaxsendqueuesbytes=\<n\>      | Factor that will be multiplied with excessiveBlockSize to limit the maximum bytes in all sending queues. If this size is exceeded, no response to block related P2P messages is sent. (default factor: 4)                                                                                                                |     |
| -maxtimeadjustment                   | Maximum allowed median peer time offset adjustment. Local perspective of time may be influenced by peers forward or backward by this amount. (default: 4200 seconds)                                                                                                                                                     |     |
| -multistreams                        | Enable the use of multiple streams to our peers (default: 1)                                                                                                                                                                                                                                                             |     |
| -multistreampolicies                 | List of stream policies to use with our peers in order of preference (available policies: BlockPriority,Default, default: BlockPriority,Default)                                                                                                                                                                         |     |
| -onlynet= net                        | Only connect to nodes in network  net  (ipv4 or ipv6)                                                                                                                                                                                                                                                                    |     |
| -permitbaremultisig                  | Relay non-P2SH multisig (default: 1)                                                                                                                                                                                                                                                                                     |     |
| -peerbloomfilters                    | Support filtering of blocks and transaction with bloom filters (default: 0)                                                                                                                                                                                                                                              |     |
| -port=\<port\>                       | Listen for connections on \<port\> (default: 8333 or testnet: 18333)                                                                                                                                                                                                                                                     |     |
| -proxy= ip:port                      | Connect through SOCKS5 proxy                                                                                                                                                                                                                                                                                             |     |
| -proxyrandomize                      | Randomize credentials for every proxy connection. (default: 1)                                                                                                                                                                                                                                                           |     |
| -seednode=\<ip\>                     | Connect to a node to retrieve peer addresses, and disconnect                                                                                                                                                                                                                                                             |     |
| -timeout=\<n\>                       | Specify connection timeout in milliseconds (minimum: 1, default: 5000)                                                                                                                                                                                                                                                   |     |
| -upnp                                | Use UPnP to map the listening\<port\>(default: 0)                                                                                                                                                                                                                                                                        |     |
| -whitebind=\<addr\>                  | Bind to given address and whitelist peers connecting to it. Use [host]:port notation for IPv6                                                                                                                                                                                                                            |     |
| -whitelist= IP                       | address or network  Whitelist peers connecting from the given IP address (e.g. 1.2.3.4) or CIDR notated network (e.g. 1.2.3.0/24). Can be specified multiple times. Whitelisted peers cannot be DoS banned and their transactions are always relayed, even if they are already in the mempool, useful e.g. for a gateway |     |
| -whitelistrelay                      | Accept relayed transactions received from whitelisted peers even when not relaying transactions (default: 1)                                                                                                                                                                                                             |     |
| -whitelistforcerelay                 | Force relay of transactions from whitelisted peers even if they violate local relay policy (default: 1)                                                                                                                                                                                                                  |     |
| -maxuploadtarget=\<n\>               | Tries to keep outbound traffic under the given target (in MiB per 24h), 0 = no limit (default: 0). The value may be given in megabytes or with unit (KiB, MiB, GiB).                                                                                                                                                     |     |

### 钱包

| 参数名                  | 参数描述                                                                                                                                                                                                       | 默认值 |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| -disablewallet       | Do not load the wallet and disable wallet RPC calls                                                                                                                                                        |     |
| -keypool=\<n\>         | Set key pool size to \<n\> (default: 1000)                                                                                                                                                                   |     |
| -fallbackfee=\<amt\>   | A fee rate (in SPACE/kB) that will be used when fee estimation has insufficient data (default: 0.0002)                                                                                                     |     |
| -mintxfee=\<amt\>      | Fees (in SPACE/kB) smaller than this are considered zero fee for transaction creation (default: 0.00001)                                                                                                   |     |
| -paytxfee=\<amt\>      | Fee (in SPACE/kB) to add to transactions you send (default: 0.00)                                                                                                                                          |     |
| -rescan              | Rescan the block chain for missing wallet transactions on startup                                                                                                                                          |     |
| -salvagewallet       | Attempt to recover private keys from a corrupt wallet on startup                                                                                                                                           |     |
| -spendzeroconfchange | Spend unconfirmed change when sending transactions (default: 1)                                                                                                                                            |     |
| -usehd               | Use hierarchical deterministic key generation (HD) after BIP32. Only has effect during wallet creation/first start (default: 1)                                                                            |     |
| -upgradewallet       | Upgrade wallet to latest format on startup                                                                                                                                                                 |     |
| -wallet=\<file\>       | Specify wallet\<file\>(within data directory) (default: wallet.dat)                                                                                                                                          |     |
| -walletbroadcast     | Make the wallet broadcast transactions (default: 1)                                                                                                                                                        |     |
| -walletnotify=\<cmd\>  | Execute command when a wallet transaction changes (%s in\<cmd\>is replaced by TxID)                                                                                                                          |     |
| -zapwallettxes=\<mode\>| Delete all wallet transactions and only recover those parts of the blockchain through -rescan on startup (1 = keep tx meta data e.g. account owner and payment request information, 2 = drop tx meta data) |     |

### ZMQ 

控制ZMQ推送，了解更多请查阅 [zmq文档](/docs/nodes/usage/zmq)

| 参数名                                     | 参数描述                                                                                     | 默认值 |
|-----------------------------------------|------------------------------------------------------------------------------------------|-----|
| -zmqpubhashblock= address               | Enable publish hash block in  address .                                                  |     |
| -zmqpubhashtx= address                  | Enable publish hash transaction in  address .                                            |     |
| -zmqpubrawblock= address                | Enable publish raw block in  address .                                                   |     |
| -zmqpubrawtx= address                   | Enable publish raw transaction in  address .                                             |     |
| -zmqpubinvalidtx= address               | Enable publish invalid transaction in  address . -invalidtxsink=ZMQ should be specified. |     |
| -zmqpubremovedfrommempool= address      | Enable publish removal of transaction (txid and the reason in json format) in  address . |     |
| -zmqpubremovedfrommempoolblock= address | Enable publish removal of transaction (txid and the reason in json format) in  address . |     |
| -zmqpubhashtx2= address                 | Enable publish hash transaction in  address .                                            |     |
| -zmqpubrawtx2= address                  | Enable publish raw transaction in  address .                                             |     |
| -zmqpubhashblock2= address              | Enable publish hash block in  address .                                                  |     |
| -zmqpubrawblock2= address               | Enable publish raw block in  address .                                                   |     |

### 调试与测试

| 参数名                     | 参数描述                                                                                                                                                                                                                                                                                                                                                                                                                       | 默认值 |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| -uacomment= cmt         | Append comment to the user agent string                                                                                                                                                                                                                                                                                                                                                                                    |     |
| -debug= category        | Output debugging information (default: 0, supplying  category  is optional). If  category  is not supplied or if  category  = 1, output all debugging information. category  can be: mempool, http, bench, zmq, db, rpc, addrman, selectcoins, reindex, cmpctblock, rand, prune, proxy, mempoolrej, libevent, coindb, leveldb, txnprop, txnsrc, journal, txnval, netconn, netmsg, netmsgverb, netmsgall, net, doublespend. |     |
| -debugexclude= category | Exclude debugging information for a category. Can be used in conjunction with -debug=1 to output debug logs for all categories except one or more specified categories.                                                                                                                                                                                                                                                    |     |
| -help-debug             | Show all debugging options (usage: --help -help-debug)                                                                                                                                                                                                                                                                                                                                                                     |     |
| -debugp2pthreadstalls   | Log P2P requests that stall request processing loop for longer than specified milliseconds (default: disabled)                                                                                                                                                                                                                                                                                                             |     |
| -logips                 | Include IP addresses in debug output (default: 0)                                                                                                                                                                                                                                                                                                                                                                          |     |
| -logtimestamps          | Prepend debug output with timestamp (default: 1)                                                                                                                                                                                                                                                                                                                                                                           |     |
| -maxtxfee=\<amt\>       | Maximum total fees (in SPACE) to use in a single wallet transaction or raw transaction; setting this too low may abort large transactions (default: 0.10)                                                                                                                                                                                                                                                                  |     |
| -printtoconsole         | Send trace/debug info to console instead of bitcoind.log\<file\>                                                                                                                                                                                                                                                                                                                                                           |     |
| -shrinkdebugfile        | Shrink bitcoind.log\<file\>on client startup (default: 1 when no -debug)                                                                                                                                                                                                                                                                                                                                                   |     |

### 网络选择
| 参数名      | 参数描述                                                                                                                                                               | 默认值 |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| -testnet | Use the test chain                                                                                                                                                 |     |
| -regtest | Enter regression test mode, which uses a special chain in which blocks can be solved instantly. This is intended for regression testing tools and app development. |     |

### 节点网络传播
| 参数名                                    | 参数描述                                                                                                                                                                                                                                                                                                                                                                                   | 默认值 |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| -excessiveblocksize=\<n\>              | Set the maximum block size in bytes we will accept from any source. This is the effective block size hard limit and it is a required parameter (0 = unlimited). The value may be given in bytes or with unit (B, kB, MB, GB).                                                                                                                                                          |     |
| -datacarrier                           | Relay and mine data carrier transactions (default: 1)                                                                                                                                                                                                                                                                                                                                  |     |
| -datacarriersize                       | Maximum size of data in data carrier transactions we relay and mine (default: 4294967295). The value may be given in bytes or with unit (B, kB, MB, GB).                                                                                                                                                                                                                               |     |
| -maxstackmemoryusageconsensus          | Set maximum stack memory usage in bytes used for script verification we're willing to accept from any source (0 = unlimited) after Genesis is activated (consensus level). This is a required parameter. The value may be given in bytes or with unit (B, kB, MB, GB).                                                                                                                 |     |
| -maxstackmemoryusagepolicy             | Set maximum stack memory usage used for script verification we're willing to relay/mine in a single transaction (default: 100 MB, 0 = unlimited) after Genesis is activated (policy level). The value may be given in bytes or with unit (B, kB, MB, GB). Must be less or equal to -maxstackmemoryusageconsensus.                                                                      |     |
| -maxopsperscriptpolicy=\<n\>           | Set maximum number of non-push operations we're willing to relay/mine per script (default: unlimited, 0 = unlimited), after Genesis is activated                                                                                                                                                                                                                                       |     |
| -maxtxsigopscountspolicy=\<n\>         | Set maximum allowed number of signature operations we're willing to relay/mine in a single transaction (default: unlimited, 0 = unlimited) after Genesis is activated.                                                                                                                                                                                                                 |     |
| -maxstdtxvalidationduration=\<n\>      | Set the single standard transaction validation duration threshold in milliseconds after which the standard transaction validation will terminate with error and the transaction is not accepted to mempool (min 1ms, default: 3ms)                                                                                                                                                     |     |
| -maxnonstdtxvalidationduration=\<n\>   | Set the single non-standard transaction validation duration threshold in milliseconds after which the non-standard transaction validation will terminate with error and the transaction is not accepted to mempool (min 10ms, default: 1000ms)                                                                                                                                         |     |
| -maxtxchainvalidationbudget=\<n\>      | Set the upper limit of unused validation time to add to the next transaction validated in the chain (min 0ms, default: 50ms)                                                                                                                                                                                                                                                           |     |
| -validationclockcpu                    | Use CPU time instead of wall clock time for validation duration measurement (default: 1)                                                                                                                                                                                                                                                                                               |     |
| -maxtxsizepolicy=\<n\>                 | Set maximum transaction size in bytes we relay and mine (default: 10 MB, min: 99999 B, 0 = unlimited) after Genesis is activated. The value may be given in bytes or with unit (B, kB, MB, GB).                                                                                                                                                                                        |     |
| -minconsolidationfactor=\<n\>          | Set minimum ratio between sum of utxo scriptPubKey sizes spent in a consolidation transaction, to the corresponding sum of output scriptPubKey sizes. The ratio between number of consolidation transaction inputs to the number of outputs also needs to be greater or equal to the minimum consolidation factor (default: 20). A value of 0 disables free consolidation transactions |     |
| -maxconsolidationinputscriptsize=\<n\> | This number is the maximum length for a scriptSig input in a consolidation txn (default: 150). The value may be given in bytes or with unit (B, kB, MB, GB).                                                                                                                                                                                                                           |     |
| -minconfconsolidationinput=\<n\>       | Minimum number of confirmations of inputs spent by consolidation transactions (default: 6).                                                                                                                                                                                                                                                                                            |     |
| -minconsolidationinputmaturity=\<n\>   | (DEPRECATED: This option will be removed, use -minconfconsolidationinput instead) Minimum number of confirmations of inputs spent by consolidation transactions (default: 6).                                                                                                                                                                                                          |     |
| -acceptnonstdconsolidationinput=\<n\>  | Accept consolidation transactions spending non standard inputs (default: 0).                                                                                                                                                                                                                                                                                                           |     |
| -maxscriptsizepolicy                   | Set maximum script size in bytes we're willing to relay/mine per script after Genesis is activated. (default: 500000, 0 = unlimited). The value may be given in bytes or with unit (B, kB, MB, GB).                                                                                                                                                                                    |     |
| -maxscriptnumlengthpolicy=\<n\>        | Set maximum allowed number length we're willing to relay/mine in scripts (default: 10000, 0 = unlimited) after Genesis is activated. The value may be given in bytes or with unit (B, kB, MB, GB).                                                                                                                                                                                     |     |

### 挖矿相关
| 参数名                    | 参数描述                                                                                                                                                                                                                                                                                                                                                                                          | 默认值 |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| -blockmaxsize=\<n\>      | Set maximum block size in bytes we will mine. Size of the mined block will never exceed the maximum block size we will accept (-excessiveblocksize). The value may be given in bytes or with unit (B, kB, MB, GB). If not specified, the following defaults are used: Mainnet: 32 MB before 2019-07-24 14:00:00 and 128 MB after, Testnet: 32 MB before 2019-07-24 14:00:00 and 128 MB after. |     |
| -minminingtxfee=\<amt\>  | Set lowest fee rate (in BSV/kB) for transactions to be included in block creation. This is a mandatory setting                                                                                                                                                                                                                                                                                |     |
| -invalidateblock= hash | Permanently marks an existing block as invalid as if it violated a consensus rule (same as InvalidateBlock RPC function). If specified block header was not received yet, the header will be ignored when it is received from a peer. This option can be specified multiple times.                                                                                                            |     |
| -banclientua= ua       | Ban clients whose User Agent contains specified string (case insensitive). This option can be specified multiple times.                                                                                                                                                                                                                                                                       |     |
| -allowclientua= ua     | Allow clients whose User Agent equals specified string (case insensitive). This option can be specified multiple times and has precedence over '-banclientua'.                                                                                                                                                                                                                                |     |
| -blockassembler= type  | Set the type of block assembler to use for mining. Supported options are JOURNALING. (default: JOURNALING)                                                                                                                                                                                                                                                                                    |     |
| -jbamaxtxnbatch= max   | batch size  Set the maximum number of transactions processed in a batch by the journaling block assembler (default: 20000)                                                                                                                                                                                                                                                                    |     |

### RPC

| 参数名                               | 参数描述                                                                                                                                                                                                                                                                                                                                    | 默认值 |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| -server                           | Accept command line and JSON-RPC commands                                                                                                                                                                                                                                                                                               |     |
| -rest                             | Accept public REST requests (default: 0)                                                                                                                                                                                                                                                                                                |     |
| -rpcbind=\<addr\>                 | Bind to given address to listen for JSON-RPC connections. Use \[host\]:port notation for IPv6. This option can be specified multiple times (default: bind to all interfaces)                                                                                                                                                            |     |
| -rpccookiefile= loc               | Location of the auth cookie (default: data dir)                                                                                                                                                                                                                                                                                         |     |
| -rpcuser= user                    | Username for JSON-RPC connections                                                                                                                                                                                                                                                                                                       |     |
| -rpcpassword=\<pw\>               | Password for JSON-RPC connections                                                                                                                                                                                                                                                                                                       |     |
| -rpcauth=\<userpw\>               | Username and hashed password for JSON-RPC connections. The field \<userpw\> comes in the format:  USERNAME : SALT $ HASH . A canonical python script is included in share/rpcuser. The client then connects normally using the rpcuser= USERNAME /rpcpassword= PASSWORD  pair of arguments. This option can be specified multiple times |     |
| -rpcport=\<port\>                 | Listen for JSON-RPC connections on \<port\> (default: 8332 or testnet: 18332)                                                                                                                                                                                                                                                           |     |
| -rpcallowip=\<ip\>                | Allow JSON-RPC connections from specified source. Valid for \<ip\> are a single IP (e.g. 1.2.3.4), a network/netmask (e.g. 1.2.3.4/255.255.255.0) or a network/CIDR (e.g. 1.2.3.4/24). This option can be specified multiple times                                                                                                      |     |
| -magicbytes= hexcode              | Allow users to split the test net by changing the magicbytes. This option only work on a network different than mainnet. default : 0f0f0f0f                                                                                                                                                                                             |     |
| -rpcthreads=\<n\>                 | Set the number of threads to service RPC calls (default: 4)                                                                                                                                                                                                                                                                             |     |
| -rpccorsdomain=value              | Domain from which to accept cross origin requests (browser enforced)                                                                                                                                                                                                                                                                    |     |
| -rpcwebhookclientnumthreads=\<n\> | Number of threads available for submitting HTTP requests to webhook endpoints. (default: 2, maximum: 16)                                                                                                                                                                                                                                |     |
| -invalidcsinterval=\<n\>          | Set the time limit on the reception of invalid message checksums from a single node in milliseconds (default: 500ms)                                                                                                                                                                                                                    |     |
| -invalidcsfreq=\<n\>              | Set the limit on the number of invalid checksums received over a given time period from a single node  (default: 100)                                                                                                                                                                                                                   |     |

### 孤块重组

| 参数名                                                 | 参数描述                                                                                                                                                | 默认值 |
|-----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| -blockreconstructionextratxn=\<n\>                  | Extra transactions to keep in memory for compact block reconstructions (default: 100)                                                               |     |
| -maxorphantxsize=\<n\>                              | Keep at most \<n\> MB of unconnectable transactions in memory (default: 1000 MB). The value may be given in megabytes or with unit (B, kB, MB, GB). |     |
| -maxorphansinbatchpercent=\<n\>                     | Maximal number of orphans scheduled for re-validation as percentage of max batch size. (1 to 100, default:60)                                       |     |
| -maxinputspertransactionoutoffirstlayerorphan=\<n\> | Maximal number of inputs of a non-first-layer transaction that can be scheduled for re-validation. (default:5)                                      |     |

### 交易校验

| 参数名                                         | 参数描述                                                                                                                                                                                                                                                                                                                     | 默认值 |
|---------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| -numstdtxvalidationthreads=\<n\>            | Set the number of 'High' priority threads used to validate standard txns (dynamically calculated default: 3)                                                                                                                                                                                                             |     |
| -numnonstdtxvalidationthreads=\<n\>         | Set the number of 'Low' priority threads used to validate non-standard txns (dynamically calculated default: 1)                                                                                                                                                                                                          |     |
| -maxstdtxnsperthreadratio=\<n\>             | Set the max ratio for a number of standard txns per 'High' priority thread (default: 1000)                                                                                                                                                                                                                               |     |
| -maxnonstdtxnsperthreadratio=\<n\>          | Set the max ratio for a number of non-standard txns per 'Low' priority thread (default: 1000)                                                                                                                                                                                                                            |     |
| -txnvalidationasynchrunfreq=\<n\>           | Set run frequency in asynchronous mode (default: 10ms)                                                                                                                                                                                                                                                                   |     |
| -txnvalidationschedulestrategy=\<strategy\> | Set task scheduling strategy to use in parallel transaction validation.Available strategies: CHAIN_DETECTOR (legacy), TOPO_SORT (default)                                                                                                                                                                                |     |
| -maxtxnvalidatorasynctasksrunduration=\<n\> | Set the maximum validation duration for async tasks in a single run (default: 10000ms)                                                                                                                                                                                                                                   |     |
| -maxcoinsviewcachesize=\<n\>                | Set the maximum cumulative size of accepted transaction inputs inside coins cache (default: unlimited -\> 0). The value may be given in bytes or with unit (B, kB, MB, GB).                                                                                                                                              |     |
| -maxcoinsprovidercachesize=\<n\>            | Set soft maximum limit of cached coin tip buffer size (default: 1 GB, minimum: 1 MB). The value may be given in bytes or with unit (B, kB, MB, GB).                                                                                                                                                                      |     |
| -maxcoinsdbfiles=\<n\>                      | Set maximum number of files used by coins leveldb (default: 64).                                                                                                                                                                                                                                                         |     |
| -txnvalidationqueuesmaxmemory=\<n\>         | Set the maximum memory usage for the transaction queues in MB (default: 2048). The value may be given in megabytes or with unit (B, kB, MB, GB).                                                                                                                                                                         |     |
| -maxpubkeyspermultisigpolicy=\<n\>          | Set maximum allowed number of public keys we're willing to relay/mine in a single CHECK_MULTISIG(VERIFY) operation (default: unlimited, 0 = unlimited), after Genesis is activated                                                                                                                                       |     |
| -maxgenesisgracefulperiod=\<n\>             | Set maximum allowed number of blocks for Genesis graceful period (default: 72) where nodes will not be banned for violating Genesis rules in case the calling node is not yet on Genesis height and vice versa. Seting 0 will disable Genesis graceful period. Genesis graceful period range :(GENESIS_ACTIVATION_HEIGHT |     |

### 非法交易推送

| 参数名                                     | 参数描述                                                                                                                                                                                                 | 默认值 |
|-----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| -invalidtxsink=\<sink\>                 | Set destination for dumping invalid transactions. Specify separately for every sink you want to include. Available sinks:FILE, ZMQ, (no sink by default)                                             |     |
| -invalidtxfilemaxdiskusage=\<n\>        | Set maximal disk usage for dumping invalid transactions when using FILE for the sink. In megabytes. (default: 3000MB) The value may be given in megabytes or with unit (B, kB, MB, GB).              |     |
| -invalidtxfileevictionpolicy=\<policy\> | Set policy which is applied when disk usage limits are reached when using FILE for the sink. IGNORE_NEW or DELETE_OLD (default: IGNORE_NEW)                                                          |     |
| -invalidtxzmqmaxmessagesize=\<n\>       | Set maximal message size for publishing invalid transactions using ZMQ, in megabytes. (default: 500MB) The value may be given in megabytes or with unit (B, kB, MB, GB).                             |     |
| -maxprotocolrecvpayloadlength=\<n\>     | Set maximum protocol recv payload length you are willing to accept in bytes (default 2097152). Value should be bigger than legacy protocol payload length: 1048576 B and smaller than: 1000000000 B. |     |
| -recvinvqueuefactor=\<n\>               | Set maximum number of full size inventory messages that we can store for each peer (default 3). Inventory message size can be set with                                                               |     |
| -maxprotocolrecvpayloadlength.          | Value should be an integer between 1 and 10 )                                                                                                                                                        |     |

### 双花检查

| 参数名                                 | 参数描述                                                                                                                                                                                                                                                                                                              | 默认值 |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----|
| -dsnotifylevel                      | Set how this node should handle double-spend notification sending. The options are: 0 Send no notifications, 1 Send notifications only for standard transactions, 2 Send notifications for all transactions. (default: 1)                                                                                         |     |
| -dsendpointfasttimeout=\<n\>        | Timeout in seconds for high priority communications with a double-spend reporting endpoint (default: 5)                                                                                                                                                                                                           |     |
| -dsendpointslowtimeout=\<n\>        | Timeout in seconds for low priority communications with a double-spend reporting endpoint (default: 60)                                                                                                                                                                                                           |     |
| -dsendpointslowrateperhour=\<n\>    | The allowable number of timeouts per hour on a rolling basis to a double-spend reporting endpoint before we temporarily assume that endpoint is consistently slow and direct all communications for it to the slow / low priority queue. Must be between 1 and 60 (default: 3)                                    |     |
| -dsendpointskiplist=\<list of ips\> | A comma separated list of IP addresses for double-spend endpoints we should skip sending notifications to. This can be useful if (for example) we are running a mAPI node locally which will already be receiving double-spend notification via ZMQ, then we don't need to also send such notifications via HTTP. |     |
| -dsendpointmaxcount=\<n\>           | Maximum number of endpoint IPs we will consider notifying per transaction (default: 3)                                                                                                                                                                                                                            |     |
| -dsattempttxnremember=\<n\>         | Limits the maximum number of previous double-spend transactions the node remembers. Setting this high uses more memory and is slower, setting it low increases the chances we may unnecessarily process and re-report duplicate double-spent transactions (default: 1000)                                         |     |
| -dsattemptnumfastthreads=\<n\>      | Number of threads available for processing high priority double-spend notifications. Note that each additional thread also requires a small amount of disk space for serialising transactions to. (default: 2, maximum: 64)                                                                                       |     |
| -dsattemptnumslowthreads=\<n\>      | Number of threads available for processing low priority double-spend notifications. Note that each additional thread also requires a small amount of disk space for serialising transactions to. (default: 2, maximum: 64)                                                                                        |     |
| -dsattemptqueuemaxmemory=\<n\>      | Maximum memory usage for the queue of detected double-spend transactions (default: 4096MB). The value may be given in megabytes or with unit (B, kB, MB, GB).                                                                                                                                                     |     |
| -dsdetectedwebhookurl=\<url\>       | URL of a webhook to notify on receipt of a double-spend detected P2P message from another node. For example: http://127.0.0.1/dsdetected/webhook                                                                                                                                                                  |     |
| -dsdetectedwebhookmaxtxnsize=\<n\>  | Maximum size of transaction to forward to the double-spend detected webhook. For double-spent transactions above this size only the transaction ID will be reported to the webhook (default: 100MB). The value may be given in megabytes or with unit (B, kB, MB, GB).                                            |     |
| -softconsensusfreezeduration        | Set for how many blocks a block that contains transaction spending consensus frozen TXO will remain frozen before it auto unfreezes due to the amount of child blocks that were mined after it (default: 3; note: 0 - soft consensus freeze duration is disabled and block is frozen indefinitely).               |     |

### 安全模式

| 参数名                               | 参数描述                                                                                                                                    | 默认值 |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|-----|
| -disablesafemode                  | Disable safemode, override a real safe mode event (default: 0)                                                                          |     |
| -safemodewebhookurl=\<url\>       | URL of a webhook to notify if the node enters safe mode. For example: http://127.0.0.1/mywebhook                                        |     |
| -safemodeminblockdifference=\<n\> | Minimum number of blocks that fork should be ahead (if positive) or behind (if negative) of active tip to enter safe mode (default:-72) |     |
| -safemodemaxforkdistance=\<n\>    | Maximum distance of forks last common block from current active tip to enter safe mode (default: 1000)                                  |     |
| -safemodeminforklength=\<n\>      | Minimum length of valid fork to enter safe mode (default: 3)                                                                            |     |


## 附录-启动项帮助
```text
MVC version v0.2.1.0

Usage:
  mvcd [options]                     Start MicroVisionChain Daemon

Options:

  -?
       Print this help message and exit

  -version
       Print version and exit

  -alertnotify=<cmd>
       Execute command when a relevant alert is received or we see a really
       long fork (%s in\<cmd\>is replaced by message)

  -blocknotify=<cmd>
       Execute command when the best block changes (%s in\<cmd\>is replaced by
       block hash)

  -assumevalid=<hex>
       If this block is in the chain assume that it and its ancestors are valid
       and potentially skip their script verification (0 to verify all,
       default:
       000000000000000000e45ad2fbcc5ff3e85f0868dd8f00ad4e92dffabe28f8d2,
       testnet:
       0000000000327972b8470c11755adf8f4319796bafae01f5a6650490b98a17db)

  -conf=<file>
       Specify configuration file (default: bitcoin.conf)

  -daemon
       Run in the background as a daemon and accept commands

  -datadir=<dir>
       Specify data directory

  -dbcache=<n>
       Set database cache size in megabytes (4 to 16384, default: 450). The
       value may be given in megabytes or with unit (B, KiB, MiB, GiB).

  -frozentxodbcache=<n>
       Set cache size for database holding a list of frozen transaction outputs
       in bytes (default: 128000)

  -genesisactivationheight
       Set block height at which genesis should be activated. (default:
       620538).

  -loadblock=<file>
       Imports blocks from external blk000??.dat file on startup

  -maxmempool=<n>
       Keep the resident size of the transaction memory pool below <n>
       megabytes (default: 1000,  must be at least 300). The value may
       be given in megabytes or with unit (B, kB, MB, GB).

  -mempoolmaxpercentcpfp=<n>
       Percentage of total mempool size (ram+disk) to allow for low paying
       transactions (0..100) (default: 10)

  -mempoolexpiry=<n>
       Do not keep transactions in the mempool longer than <n> hours (default:
       336)

  -maxmempoolnonfinal=<n>
       Keep the non-final transaction memory pool below <n> megabytes (default:
       50). The value may be given in megabytes or with unit (B, KiB,
       MiB, GiB).

  -mempoolexpirynonfinal=<n>
       Do not keep transactions in the non-final mempool longer than <n> hours
       (default: 672)

  -persistmempool
       Whether to save the mempool on shutdown and load on restart (default: 1)

  -threadsperblock=<n>
       Set the number of script verification threads used when validating
       single block (0 to 64, 0 = auto, default: 0)

  -scriptvalidatormaxbatchsize=<n>
       Set size of script verification batch per thread (1 to 255, default:
       128)

  -maxparallelblocks=<n>
       Set the number of block that can be validated in parallel across all
       nodes. If additional block arrive, validation of an old block is
       terminated. (1 to 100, default: 4)

  -maxparallelblocksperpeer=<n>
       Set the number of blocks that can be validated in parallel from a single
       peer. If peers sends another block, the validation of it is
       delayed. (1 to maxparallelblocks, default: 3)

  -pid=<file>
       Specify pid\<file\>(default: bitcoind.pid)

  -preload=<n>
       If\<n\>is set to 1, blockchain state will be preloaded into memory. If n
       is 0, no preload will happen. Other values for\<n\>are not allowed.
       The default value is 0. This option is not supported on Windows
       operating systems.

  -prune=<n>
       Reduce storage requirements by enabling pruning (deleting) of old
       blocks. This allows the pruneblockchain RPC to be called to
       delete specific blocks, and enables automatic pruning of old
       blocks if a target size in MiB is provided. This\<mode\>is
       incompatible with -txindex and -rescan. Warning: Reverting this
       setting requires re-downloading the entire blockchain. (default:
       0 = disable pruning blocks, 1 = allow manual pruning via RPC,
       >550 = automatically prune block files to stay under the
       specified target size in MiB, but still keep the last 288 blocks
       to speed up a potential reorg even if this results in the pruning
       target being exceeded)Note: Currently achievable prune target is
       ~100GB (mainnet). Setting the target size too low will not affect
       pruning function, but will not guarantee block files size staying
       under the threshold at all times.

  -reindex-chainstate
       Rebuild chain state from the currently indexed blocks

  -reindex
       Rebuild chain state and block index from the blk*.dat files on disk

  -rejectmempoolrequest
       Reject every mempool request from non-whitelisted peers (default: 1).

  -sysperms
       Create new files with system default permissions, instead of umask 077
       (only effective with disabled wallet functionality)

  -txindex
       Maintain a full transaction index, used by the getrawtransaction rpc
       call (default: 0)

  -maxmerkletreediskspace
       Maximum disk size in bytes that can be taken by stored merkle trees.
       This size should not be less than default size (default:
       184549376 bytes). The value may be given in bytes or with unit
       (B, kiB, MiB, GiB).

  -preferredmerkletreefilesize
       Preferred size of a single datafile containing merkle trees. When size
       is reached, new datafile is created. If preferred size is less
       than size of a single merkle tree, it will still be stored,
       meaning datafile size can be larger than preferred size.
       (default: 33554432 bytes). The value may be given in bytes or
       with unit (B, kiB, MiB, GiB).

  -maxmerkletreememcachesize
       Maximum merkle trees memory cache size in bytes. For faster responses,
       requested merkle trees are stored into a memory cache. (default:
       33554432 bytes). The value may be given in bytes or with unit (B,
       kiB, MiB, GiB).

Connection options:

  -addnode=<ip>
       Add a node to connect to and attempt to keep the connection open

  -banscore=<n>
       Threshold for disconnecting misbehaving peers (default: 100)

  -bantime=<n>
       Number of seconds to keep misbehaving peers from reconnecting (default:
       86400)

  -bind=<addr>
       Bind to given address and always listen on it. Use [host]:port notation
       for IPv6

  -blockstallingmindownloadspeed=<n>
       Minimum average download speed (Kbytes/s) we will allow a stalling peer
       to fall to during IBD. A value of 0 means stall detection is
       disabled (default: 100Kb/s)

  -broadcastdelay=<n>
       Set inventory broadcast delay duration in millisecond(min: 0, max:
       50000)

  -connect=<ip>
       Connect only to the specified node(s); -noconnect or -connect=0 alone to
       disable automatic connections

  -discover
       Discover own IP addresses (default: 1 when listening and no -externalip
       or -proxy)

  -dns
       Allow DNS lookups for -addnode, -seednode and -connect (default: 1)

  -dnsseed
       Query for peer addresses via DNS lookup, if low on addresses (default: 1
       unless -connect/-noconnect)

  -externalip=<ip>
       Specify your own public address

  -forcednsseed
       Always query for peer addresses via DNS lookup (default: 1)

  -listen
       Accept connections from outside (default: 1 if no -proxy or
       -connect/-noconnect)

  -maxconnections=<n>
       Maintain at most <n> connections to peers (default: 125)

  -maxreceivebuffer=<n>
       Maximum per-connection receive buffer in kilobytes (default: 500000).
       The value may be given in kilobytes or with unit (B, kB, MB, GB).

  -maxsendbuffer=<n>
       Maximum per-connection send buffer in kilobytes (default: 500000). The
       value may be given in kilobytes or with unit (B, kB, MB, GB).

  -maxsendbuffermult=<n>
       Temporary multiplier applied to the -maxsendbuffer size to allow
       connections to unblock themselves in the unlikely situation where
       they have become paused for both sending and receiving (default:
       10)

  -factormaxsendqueuesbytes=<n>
       Factor that will be multiplied with excessiveBlockSize to limit the
       maximum bytes in all sending queues. If this size is exceeded, no
       response to block related P2P messages is sent. (default factor:
       4)

  -maxtimeadjustment
       Maximum allowed median peer time offset adjustment. Local perspective of
       time may be influenced by peers forward or backward by this
       amount. (default: 4200 seconds)

  -multistreams
       Enable the use of multiple streams to our peers (default: 1)

  -multistreampolicies
       List of stream policies to use with our peers in order of preference
       (available policies: BlockPriority,Default, default:
       BlockPriority,Default)

  -onlynet=<net>
       Only connect to nodes in network <net> (ipv4 or ipv6)

  -permitbaremultisig
       Relay non-P2SH multisig (default: 1)

  -peerbloomfilters
       Support filtering of blocks and transaction with bloom filters (default:
       0)

  -port=\<port\>
       Listen for connections on \<port\> (default: 8333 or testnet: 18333)

  -proxy=<ip:port>
       Connect through SOCKS5 proxy

  -proxyrandomize
       Randomize credentials for every proxy connection. (default: 1)

  -seednode=<ip>
       Connect to a node to retrieve peer addresses, and disconnect

  -timeout=<n>
       Specify connection timeout in milliseconds (minimum: 1, default: 5000)

  -upnp
       Use UPnP to map the listening\<port\>(default: 0)

  -whitebind=<addr>
       Bind to given address and whitelist peers connecting to it. Use
       [host]:port notation for IPv6

  -whitelist=<IP address or network>
       Whitelist peers connecting from the given IP address (e.g. 1.2.3.4) or
       CIDR notated network (e.g. 1.2.3.0/24). Can be specified multiple
       times. Whitelisted peers cannot be DoS banned and their
       transactions are always relayed, even if they are already in the
       mempool, useful e.g. for a gateway

  -whitelistrelay
       Accept relayed transactions received from whitelisted peers even when
       not relaying transactions (default: 1)

  -whitelistforcerelay
       Force relay of transactions from whitelisted peers even if they violate
       local relay policy (default: 1)

  -maxuploadtarget=<n>
       Tries to keep outbound traffic under the given target (in MiB per 24h),
       0 = no limit (default: 0). The value may be given in megabytes or
       with unit (KiB, MiB, GiB).

Wallet options:

  -disablewallet
       Do not load the wallet and disable wallet RPC calls

  -keypool=<n>
       Set key pool size to <n> (default: 1000)

  -fallbackfee=<amt>
       A fee rate (in SPACE/kB) that will be used when fee estimation has
       insufficient data (default: 0.0002)

  -mintxfee=<amt>
       Fees (in SPACE/kB) smaller than this are considered zero fee for
       transaction creation (default: 0.00001)

  -paytxfee=<amt>
       Fee (in SPACE/kB) to add to transactions you send (default: 0.00)

  -rescan
       Rescan the block chain for missing wallet transactions on startup

  -salvagewallet
       Attempt to recover private keys from a corrupt wallet on startup

  -spendzeroconfchange
       Spend unconfirmed change when sending transactions (default: 1)

  -usehd
       Use hierarchical deterministic key generation (HD) after BIP32. Only has
       effect during wallet creation/first start (default: 1)

  -upgradewallet
       Upgrade wallet to latest format on startup

  -wallet=<file>
       Specify wallet\<file\>(within data directory) (default: wallet.dat)

  -walletbroadcast
       Make the wallet broadcast transactions (default: 1)

  -walletnotify=<cmd>
       Execute command when a wallet transaction changes (%s in\<cmd\>is replaced
       by TxID)

  -zapwallettxes=<mode>
       Delete all wallet transactions and only recover those parts of the
       blockchain through -rescan on startup (1 = keep tx meta data e.g.
       account owner and payment request information, 2 = drop tx meta
       data)

ZeroMQ notification options:

  -zmqpubhashblock=<address>
       Enable publish hash block in <address>. For more information see
       doc/zmq.md.

  -zmqpubhashtx=<address>
       Enable publish hash transaction in <address>. For more information see
       doc/zmq.md.

  -zmqpubrawblock=<address>
       Enable publish raw block in <address>. For more information see
       doc/zmq.md.

  -zmqpubrawtx=<address>
       Enable publish raw transaction in <address>. For more information see
       doc/zmq.md.

  -zmqpubinvalidtx=<address>
       Enable publish invalid transaction in <address>. -invalidtxsink=ZMQ
       should be specified. For more information see [zmq](/docs/nodes/usage/zmq).

  -zmqpubremovedfrommempool=<address>
       Enable publish removal of transaction (txid and the reason in json
       format) in <address>. For more information see [zmq](/docs/nodes/usage/zmq).

  -zmqpubremovedfrommempoolblock=<address>
       Enable publish removal of transaction (txid and the reason in json
       format) in <address>. For more information see [zmq](/docs/nodes/usage/zmq).

  -zmqpubhashtx2=<address>
       Enable publish hash transaction in <address>. For more information see
       doc/zmq.md.

  -zmqpubrawtx2=<address>
       Enable publish raw transaction in <address>. For more information see
       doc/zmq.md.

  -zmqpubhashblock2=<address>
       Enable publish hash block in <address>. For more information see
       doc/zmq.md.

  -zmqpubrawblock2=<address>
       Enable publish raw block in <address>. For more information see
       doc/zmq.md.

Debugging/Testing options:

  -uacomment=<cmt>
       Append comment to the user agent string

  -debug=<category>
       Output debugging information (default: 0, supplying <category> is
       optional). If <category> is not supplied or if <category> = 1,
       output all debugging information.<category> can be: mempool,
       http, bench, zmq, db, rpc, addrman, selectcoins, reindex,
       cmpctblock, rand, prune, proxy, mempoolrej, libevent, coindb,
       leveldb, txnprop, txnsrc, journal, txnval, netconn, netmsg,
       netmsgverb, netmsgall, net, doublespend.

  -debugexclude=<category>
       Exclude debugging information for a category. Can be used in conjunction
       with -debug=1 to output debug logs for all categories except one
       or more specified categories.

  -help-debug
       Show all debugging options (usage: --help -help-debug)

  -debugp2pthreadstalls
       Log P2P requests that stall request processing loop for longer than
       specified milliseconds (default: disabled)

  -logips
       Include IP addresses in debug output (default: 0)

  -logtimestamps
       Prepend debug output with timestamp (default: 1)

  -maxtxfee=<amt>
       Maximum total fees (in SPACE) to use in a single wallet transaction or raw
       transaction; setting this too low may abort large transactions
       (default: 0.10)

  -printtoconsole
       Send trace/debug info to console instead of bitcoind.log file

  -shrinkdebugfile
       Shrink bitcoind.log\<file\>on client startup (default: 1 when no -debug)

Chain selection options:

  -testnet
       Use the test chain

  -regtest
       Enter regression test mode, which uses a special chain in which blocks
       can be solved instantly. This is intended for regression testing
       tools and app development.

  -stn
       Use the Scaling Test Network

Node relay options:

  -excessiveblocksize=<n>
       Set the maximum block size in bytes we will accept from any source. This
       is the effective block size hard limit and it is a required
       parameter (0 = unlimited). The value may be given in bytes or
       with unit (B, kB, MB, GB).

  -datacarrier
       Relay and mine data carrier transactions (default: 1)

  -datacarriersize
       Maximum size of data in data carrier transactions we relay and mine
       (default: 4294967295). The value may be given in bytes or with
       unit (B, kB, MB, GB).

  -maxstackmemoryusageconsensus
       Set maximum stack memory usage in bytes used for script verification
       we're willing to accept from any source (0 = unlimited) after
       Genesis is activated (consensus level). This is a required
       parameter. The value may be given in bytes or with unit (B, kB,
       MB, GB).

  -maxstackmemoryusagepolicy
       Set maximum stack memory usage used for script verification we're
       willing to relay/mine in a single transaction (default: 100 MB, 0
       = unlimited) after Genesis is activated (policy level). The value
       may be given in bytes or with unit (B, kB, MB, GB). Must be less
       or equal to -maxstackmemoryusageconsensus.

  -maxopsperscriptpolicy=<n>
       Set maximum number of non-push operations we're willing to relay/mine
       per script (default: unlimited, 0 = unlimited), after Genesis is
       activated

  -maxtxsigopscountspolicy=<n>
       Set maximum allowed number of signature operations we're willing to
       relay/mine in a single transaction (default: unlimited, 0 =
       unlimited) after Genesis is activated.

  -maxstdtxvalidationduration=<n>
       Set the single standard transaction validation duration threshold in
       milliseconds after which the standard transaction validation will
       terminate with error and the transaction is not accepted to
       mempool (min 1ms, default: 3ms)

  -maxnonstdtxvalidationduration=<n>
       Set the single non-standard transaction validation duration threshold in
       milliseconds after which the non-standard transaction validation
       will terminate with error and the transaction is not accepted to
       mempool (min 10ms, default: 1000ms)

  -maxtxchainvalidationbudget=<n>
       Set the upper limit of unused validation time to add to the next
       transaction validated in the chain (min 0ms, default: 50ms)

  -validationclockcpu
       Use CPU time instead of wall clock time for validation duration
       measurement (default: 1)

  -maxtxsizepolicy=<n>
       Set maximum transaction size in bytes we relay and mine (default: 10 MB,
       min: 99999 B, 0 = unlimited) after Genesis is activated. The
       value may be given in bytes or with unit (B, kB, MB, GB).

  -minconsolidationfactor=<n>
       Set minimum ratio between sum of utxo scriptPubKey sizes spent in a
       consolidation transaction, to the corresponding sum of output
       scriptPubKey sizes. The ratio between number of consolidation
       transaction inputs to the number of outputs also needs to be
       greater or equal to the minimum consolidation factor (default:
       20). A value of 0 disables free consolidation transactions

  -maxconsolidationinputscriptsize=<n>
       This number is the maximum length for a scriptSig input in a
       consolidation txn (default: 150). The value may be given in bytes
       or with unit (B, kB, MB, GB).

  -minconfconsolidationinput=<n>
       Minimum number of confirmations of inputs spent by consolidation
       transactions (default: 6).

  -minconsolidationinputmaturity=<n>
       (DEPRECATED: This option will be removed, use -minconfconsolidationinput
       instead) Minimum number of confirmations of inputs spent by
       consolidation transactions (default: 6).

  -acceptnonstdconsolidationinput=<n>
       Accept consolidation transactions spending non standard inputs (default:
       0).

  -maxscriptsizepolicy
       Set maximum script size in bytes we're willing to relay/mine per script
       after Genesis is activated. (default: 500000, 0 = unlimited). The
       value may be given in bytes or with unit (B, kB, MB, GB).

  -maxscriptnumlengthpolicy=<n>
       Set maximum allowed number length we're willing to relay/mine in scripts
       (default: 10000, 0 = unlimited) after Genesis is activated. The
       value may be given in bytes or with unit (B, kB, MB, GB).

Block creation options:

  -blockmaxsize=<n>
       Set maximum block size in bytes we will mine. Size of the mined block
       will never exceed the maximum block size we will accept
       (-excessiveblocksize). The value may be given in bytes or with
       unit (B, kB, MB, GB). If not specified, the following defaults
       are used: Mainnet: 32 MB before 2019-07-24 14:00:00 and 128 MB
       after, Testnet: 32 MB before 2019-07-24 14:00:00 and 128 MB
       after.

  -minminingtxfee=<amt>
       Set lowest fee rate (in SPACE/kB) for transactions to be included in block
       creation. This is a mandatory setting

  -invalidateblock=<hash>
       Permanently marks an existing block as invalid as if it violated a
       consensus rule (same as InvalidateBlock RPC function). If
       specified block header was not received yet, the header will be
       ignored when it is received from a peer. This option can be
       specified multiple times.

  -banclientua=<ua>
       Ban clients whose User Agent contains specified string (case
       insensitive). This option can be specified multiple times.

  -allowclientua=<ua>
       Allow clients whose User Agent equals specified string (case
       insensitive). This option can be specified multiple times and has
       precedence over '-banclientua'.

  -blockassembler=<type>
       Set the type of block assembler to use for mining. Supported options are
       JOURNALING. (default: JOURNALING)

  -jbamaxtxnbatch=<max batch size>
       Set the maximum number of transactions processed in a batch by the
       journaling block assembler (default: 20000)

RPC client/server options:

  -server
       Accept command line and JSON-RPC commands

  -rest
       Accept public REST requests (default: 0)

  -rpcbind=<addr>
       Bind to given address to listen for JSON-RPC connections. Use
       [host]:port notation for IPv6. This option can be specified
       multiple times (default: bind to all interfaces)

  -rpccookiefile=<loc>
       Location of the auth cookie (default: data dir)

  -rpcuser=<user>
       Username for JSON-RPC connections

  -rpcpassword=<pw>
       Password for JSON-RPC connections

  -rpcauth=<userpw>
       Username and hashed password for JSON-RPC connections. The field
       <userpw> comes in the format: <USERNAME>:<SALT>$<HASH>. A
       canonical python script is included in share/rpcuser. The client
       then connects normally using the
       rpcuser=<USERNAME>/rpcpassword=<PASSWORD> pair of arguments. This
       option can be specified multiple times

  -rpcport=\<port\>
       Listen for JSON-RPC connections on \<port\> (default: 8332 or testnet:
       18332)

  -rpcallowip=<ip>
       Allow JSON-RPC connections from specified source. Valid for <ip> are a
       single IP (e.g. 1.2.3.4), a network/netmask (e.g.
       1.2.3.4/255.255.255.0) or a network/CIDR (e.g. 1.2.3.4/24). This
       option can be specified multiple times

  -magicbytes=<hexcode>
       Allow users to split the test net by changing the magicbytes. This
       option only work on a network different than mainnet. default :
       0f0f0f0f

  -rpcthreads=<n>
       Set the number of threads to service RPC calls (default: 4)

  -rpccorsdomain=value
       Domain from which to accept cross origin requests (browser enforced)

  -rpcwebhookclientnumthreads=<n>
       Number of threads available for submitting HTTP requests to webhook
       endpoints. (default: 2, maximum: 16)

  -invalidcsinterval=<n>
       Set the time limit on the reception of invalid message checksums from a
       single node in milliseconds (default: 500ms)

  -invalidcsfreq=<n>
       Set the limit on the number of invalid checksums received over a given
       time period from a single node  (default: 100)

Orphan txns config :

  -blockreconstructionextratxn=<n>
       Extra transactions to keep in memory for compact block reconstructions
       (default: 100)

  -maxorphantxsize=<n>
       Keep at most <n> MB of unconnectable transactions in memory (default:
       1000 MB). The value may be given in megabytes or with unit (B,
       kB, MB, GB).

  -maxorphansinbatchpercent=<n>
       Maximal number of orphans scheduled for re-validation as percentage of
       max batch size. (1 to 100, default:60)

  -maxinputspertransactionoutoffirstlayerorphan=<n>
       Maximal number of inputs of a non-first-layer transaction that can be
       scheduled for re-validation. (default:5)

TxnValidator options:

  -numstdtxvalidationthreads=<n>
       Set the number of 'High' priority threads used to validate standard txns
       (dynamically calculated default: 3)

  -numnonstdtxvalidationthreads=<n>
       Set the number of 'Low' priority threads used to validate non-standard
       txns (dynamically calculated default: 1)

  -maxstdtxnsperthreadratio=<n>
       Set the max ratio for a number of standard txns per 'High' priority
       thread (default: 1000)

  -maxnonstdtxnsperthreadratio=<n>
       Set the max ratio for a number of non-standard txns per 'Low' priority
       thread (default: 1000)

  -txnvalidationasynchrunfreq=<n>
       Set run frequency in asynchronous\<mode\>(default: 10ms)

  -txnvalidationschedulestrategy=<strategy>
       Set task scheduling strategy to use in parallel transaction
       validation.Available strategies: CHAIN_DETECTOR (legacy),
       TOPO_SORT (default)

  -maxtxnvalidatorasynctasksrunduration=<n>
       Set the maximum validation duration for async tasks in a single run
       (default: 10000ms)

  -maxcoinsviewcachesize=<n>
       Set the maximum cumulative size of accepted transaction inputs inside
       coins cache (default: unlimited -> 0). The value may be given in
       bytes or with unit (B, kB, MB, GB).

  -maxcoinsprovidercachesize=<n>
       Set soft maximum limit of cached coin tip buffer size (default: 1 GB,
       minimum: 1 MB). The value may be given in bytes or with unit (B,
       kB, MB, GB).

  -maxcoinsdbfiles=<n>
       Set maximum number of files used by coins leveldb (default: 64).

  -txnvalidationqueuesmaxmemory=<n>
       Set the maximum memory usage for the transaction queues in MB (default:
       2048). The value may be given in megabytes or with unit (B, kB,
       MB, GB).

  -maxpubkeyspermultisigpolicy=<n>
       Set maximum allowed number of public keys we're willing to relay/mine in
       a single CHECK_MULTISIG(VERIFY) operation (default: unlimited, 0
       = unlimited), after Genesis is activated

  -maxgenesisgracefulperiod=<n>
       Set maximum allowed number of blocks for Genesis graceful period
       (default: 72) where nodes will not be banned for violating
       Genesis rules in case the calling node is not yet on Genesis
       height and vice versa. Seting 0 will disable Genesis graceful
       period. Genesis graceful period range :(GENESIS_ACTIVATION_HEIGHT
       -\<n\>|...| GENESIS_ACTIVATION_HEIGHT |...|
       GENESIS_ACTIVATION_HEIGHT + n)

Invalid transactions sink options:

  -invalidtxsink=<sink>
       Set destination for dumping invalid transactions. Specify separately for
       every sink you want to include. Available sinks:FILE, ZMQ, (no
       sink by default)

  -invalidtxfilemaxdiskusage=<n>
       Set maximal disk usage for dumping invalid transactions when using FILE
       for the sink. In megabytes. (default: 3000MB) The value may be
       given in megabytes or with unit (B, kB, MB, GB).

  -invalidtxfileevictionpolicy=<policy>
       Set policy which is applied when disk usage limits are reached when
       using FILE for the sink. IGNORE_NEW or DELETE_OLD (default:
       IGNORE_NEW)

  -invalidtxzmqmaxmessagesize=<n>
       Set maximal message size for publishing invalid transactions using ZMQ,
       in megabytes. (default: 500MB) The value may be given in
       megabytes or with unit (B, kB, MB, GB).

  -maxprotocolrecvpayloadlength=<n>
       Set maximum protocol recv payload length you are willing to accept in
       bytes (default 2097152). Value should be bigger than legacy
       protocol payload length: 1048576 B and smaller than: 1000000000
       B.

  -recvinvqueuefactor=<n>
       Set maximum number of full size inventory messages that we can store for
       each peer (default 3). Inventory message size can be set with
       -maxprotocolrecvpayloadlength. Value should be an integer between
       1 and 10 )

Double-Spend detection options:

  -dsnotifylevel
       Set how this node should handle double-spend notification sending. The
       options are: 0 Send no notifications, 1 Send notifications only
       for standard transactions, 2 Send notifications for all
       transactions. (default: 1)

  -dsendpointfasttimeout=<n>
       Timeout in seconds for high priority communications with a double-spend
       reporting endpoint (default: 5)

  -dsendpointslowtimeout=<n>
       Timeout in seconds for low priority communications with a double-spend
       reporting endpoint (default: 60)

  -dsendpointslowrateperhour=<n>
       The allowable number of timeouts per hour on a rolling basis to a
       double-spend reporting endpoint before we temporarily assume that
       endpoint is consistently slow and direct all communications for
       it to the slow / low priority queue. Must be between 1 and 60
       (default: 3)

  -dsendpointskiplist=<list of ips>
       A comma separated list of IP addresses for double-spend endpoints we
       should skip sending notifications to. This can be useful if (for
       example) we are running a mAPI node locally which will already be
       receiving double-spend notification via ZMQ, then we don't need
       to also send such notifications via HTTP.

  -dsendpointmaxcount=<n>
       Maximum number of endpoint IPs we will consider notifying per
       transaction (default: 3)

  -dsattempttxnremember=<n>
       Limits the maximum number of previous double-spend transactions the node
       remembers. Setting this high uses more memory and is slower,
       setting it low increases the chances we may unnecessarily process
       and re-report duplicate double-spent transactions (default: 1000)

  -dsattemptnumfastthreads=<n>
       Number of threads available for processing high priority double-spend
       notifications. Note that each additional thread also requires a
       small amount of disk space for serialising transactions to.
       (default: 2, maximum: 64)

  -dsattemptnumslowthreads=<n>
       Number of threads available for processing low priority double-spend
       notifications. Note that each additional thread also requires a
       small amount of disk space for serialising transactions to.
       (default: 2, maximum: 64)

  -dsattemptqueuemaxmemory=<n>
       Maximum memory usage for the queue of detected double-spend transactions
       (default: 4096MB). The value may be given in megabytes or with
       unit (B, kB, MB, GB).

  -dsdetectedwebhookurl=<url>
       URL of a webhook to notify on receipt of a double-spend detected P2P
       message from another node. For example:
       http://127.0.0.1/dsdetected/webhook

  -dsdetectedwebhookmaxtxnsize=<n>
       Maximum size of transaction to forward to the double-spend detected
       webhook. For double-spent transactions above this size only the
       transaction ID will be reported to the webhook (default: 100MB).
       The value may be given in megabytes or with unit (B, kB, MB, GB).

  -softconsensusfreezeduration
       Set for how many blocks a block that contains transaction spending
       consensus frozen TXO will remain frozen before it auto unfreezes
       due to the amount of child blocks that were mined after it
       (default: 3; note: 0 - soft consensus freeze duration is disabled
       and block is frozen indefinitely).

Safe-mode activation options:

  -disablesafemode
       Disable safemode, override a real safe\<mode\>event (default: 0)

  -safemodewebhookurl=<url>
       URL of a webhook to notify if the node enters safe mode. For example:
       http://127.0.0.1/mywebhook

  -safemodeminblockdifference=<n>
       Minimum number of blocks that fork should be ahead (if positive) or
       behind (if negative) of active tip to enter safe\<mode\>(default:
       -72)

  -safemodemaxforkdistance=<n>
       Maximum distance of forks last common block from current active tip to
       enter safe\<mode\>(default: 1000)

  -safemodeminforklength=<n>
       Minimum length of valid fork to enter safe\<mode\>(default: 3)
```
