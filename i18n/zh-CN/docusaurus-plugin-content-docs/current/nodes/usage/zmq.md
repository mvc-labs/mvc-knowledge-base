---
sidebar_position: 3
---

# ZMQ 使用手册

介绍如何使用ZMQ功能，以及如何配置ZMQ功能。

## ZMQ简介

ZeroMQ是一个轻量级的消息队列方案，可以通过TCP链接，进程间通讯（IPC）以及共享内存等方式来提供发布订阅服务。ZeroMQ主打轻量级，高性能，低延迟，支持多种语言，支持多种操作系统，支持多种消息模式等特性。

MVC的节点p2p协议本身可以作为可信的消息传播路由，来实现MVC网络的消息通讯，进行共识决策，广播交易等等，但是在一些场景下，我们需要更加灵活的消息队列方案。提供给应用用来监听内存池交易以及新区块等事件需要实时性和高可用性，p2p协议相对而言实现起来要麻烦许多，对客户端也不够友好。

因此，我们引入了ZeroMQ作为消息队列方案，来提供更加灵活的消息队列服务。ZeroMQ可以通过订阅感兴趣的事件，来实现实时的消息通知，比如监听新区块，监听内存池交易等等。

## MVC节点ZMQ推送的特点

ZeroMQ 功能实现了一套特定的通知接口。主要包括新区块和新交易的通知器。节点ZMQ是只读的，仅需要在接收软件中连接相应的 ZeroMQ
订阅端口；它不进行认证，也不涉及双向协议。因此，订阅者应验证接收到的数据（例如使用merkle
proof，二次调用节点rpc认证等），因为这些数据可能是过时的、不完整的或甚至无效的。

ZeroMQ 套接字是自连接和自愈的；也就是说，两个端点之间的连接在中断后将自动恢复，任何一端都可以按任何顺序自由启动或停止。

另外，因为 ZeroMQ 是面向消息的，订阅者接收到的交易和区块是一次性的，并不需要实现任何缓冲或重组。

## 构建节点时启用zmq功能

编译节点时可以指定是否启用zmq功能，如果需要启用zmq功能，那么需要在构建机器上安装libzmq3-dev依赖库等。官方提供的默认二进制包已经包含了zmq的支持，如果你是自己编译的节点，并且希望打包zmq功能，那么可以参考如下的编译选项：

```bash
$ ./configure --disable-zmq (other options)
```

如果你使用默认的二进制包，那么不需要做任何额外的操作，直接启动节点即可，zmq功能已经安装到节点中。

## ZMQ配置

ZMQ功能需要在节点配置文件中进行配置，可以自由选定端口号，以及订阅的事件类型。在mvc.conf文件中进行如下配置（参考[安装启动项](../installation/start-up-command.md)
中ZMQ相关内容）：

```text

-zmqpubhashtx=address
-zmqpubhashblock=address
-zmqpubrawblock=address
-zmqpubrawtx=address
-zmqpubinvalidtx=address
-zmqpubdiscardedfrommempool=address
-zmqpubremovedfrommempoolblock=address

-zmqpubhashtx2=address
-zmqpubhashblock2=address
-zmqpubrawblock2=address
-zmqpubrawtx2=address

```

套接字类型是PUB，地址是一个以tcp://开头的地址，例如tcp://，或者ipc://。如果你不需要某个事件的通知，可以不配置这个事件的地址。相同的地址可以用于监听多个频道。例如：

```bash
$ mvcd -zmqpubhashtx=tcp://0.0.0.0:29882 -zmqpubhashblock=0.0.0.0:29882 -zmqpubrawtx=ipc:///tmp/mvcd.tx.raw
```

同理，这些配置也可以在mvc.conf文件中进行配置，例如：

```text
zmqpubhashtx=tcp://0.0.0.0:29882
zmqpubhashblock=tcp://0.0.0.0:29882 
zmqpubrawtx=ipc:///tmp/mvcd.tx.raw
```

每一个PUB通知都带有一个主题和消息体，消息头中包含了通知类型。比如说，***zmppubhashtx***
通知的主题是“hashtx”，消息体是交易的哈希值。消息体是一个32字节的十六进制字符串，可以通过节点rpc接口获取交易的详细信息。

而***zmqpubdiscardedfrommempool***和***zmqpubremovedfrommempoolblock***
通知的主题是“discardedfrommempool”和“removedfrommempoolblock”，消息体则是一个json类型的字符串：

```json
{
  "txid": "hexstring",
  "reason": "string",
  "collidedWith": {
    "txid": "hexstring",
    "size": 100,
    "hex": "hexstring"
  },
  "blockhash": "hexstring"
}
```

collidedWith字段表示了这个交易和哪个交易冲突，blockhash字段表示了这个交易被打包到了哪个区块中。

***zmqpubdiscardedfrommempool***的reason字段表示了这个交易被丢弃的原因，原因包括：
* expired
* mempool-sizelimit-exceeded
* collision-in-block-tx


***zmqpubremovedfrommempoolblock***的reason字段表示了这个交易被从内存池中移除的原因，原因包括：
* reorg
* included-in-block

***zmqpub2***（比如zmqpubhashtx2等带2后缀的）和不带后缀的功能是类似的，唯一的区别是不再推送重复的消息。例如原先的zmqpubhashtx会在进入内存池以及被打包进入区块的时候推送两次，而zmqpubhashtx2只会推送一次。另外在出现重组的时候，整个重组链条都会被推送，而不仅仅是tip。

## 备注

从 mvcd 的角度看，ZeroMQ 套接字是只写的；PUB 套接字甚至没有读功能。因此，不会直接引入任何状态到 MVC 中。此外，MVC不会广播任何未从公共 P2P 网络接收的信息。

连接客户端时不进行身份验证或授权；因此请务必确保ZeroMQ 端口仅对可信网络开放，使用防火墙等其他手段保护端口。

请注意，当区块链的最高点改变时，可能会发生重组，且只会通知到最高点。订阅者需要从最后已知的区块检索到新的最高点。

根据您使用的通信类型，ZMQ 通知在传输过程中可能会丢失。MVC 会在每个通知中附加一个递增的序列号，这使得监听者能够检测到丢失的通知。

## 实践：使用zmq客户端监听zmq事件

本例以python为例，演示如何使用zmq客户端监听zmq事件。

确保你的本地已经安装zmq和python的库，并且开放了zmq的端口

安装python3以及相关依赖

```bash
sudo apt update
sudo apt install python3
sudo apt install python3-pip
sudo apt install libzmq3-dev python3-zmq
pip3 install pyzmq
```

创建如下python文件***zmq_subscriber.py***，以下代码监听本地zmq端口，监听hashtx频道，并打印接受到的数据：

```python
# File: zmq_subscriber.py
import zmq

# Prepare our context and subscriber socket
context = zmq.Context()
socket = context.socket(zmq.SUB)

# Connect to the publisher's socket
# Adjust the address and port accordingly
socket.connect("tcp://localhost:28332")

# Subscribe to all messages
socket.setsockopt_string(zmq.SUBSCRIBE, 'hashtx')

# Receive messages as bytes
while True:
    message = socket.recv()  # Use recv instead of recv_string
    try:
        # Attempt to decode as UTF-8, or handle as binary data
        print("Received:", message.decode('utf-8'))
    except UnicodeDecodeError:
        hex_message = message.hex()  # Convert bytes to hex string
        print("Received:", hex_message)
```

如果程序正确配置并成功运行，你将看到如下输出：

```bash
Received: hashtx
Received: 679b984049c2b8aeff04291f32415b9346429867e6ae69b4b9569b52fa85ea42
Received: 3fab0700
Received: hashtx
Received: fbe397992b8ce963792a65c91aa9a32c8afb836e15b464ecf7fffd8af450baa9
Received: 40ab0700
Received: hashtx
Received: f2153a5a34707f57c21f6c3dc335a30c095be59a53ed5cd0df0af0383d2677db
Received: 41ab0700
Received: hashtx
Received: 365ec39e879ccf6b70a64432064a98f782b1998cd26dccc0ad630b503e95edb6
Received: 42ab0700
Received: hashtx
Received: 94dda55fc6fe14c05bdb31feead994d6dd9bbec6ea5b95842dadfe9d490f8841
Received: 43ab0700
Received: hashtx
Received: b3cfde1630610903c17a73bb871c008c3f3cc7bcdbeed2185f55ec3a96901ef9
Received: 44ab0700
Received: hashtx
Received: fb1937d2fe7f1b5bc0252acb88bde3123fdc32800f385562c02ed3bbb5f7fd3b
Received: 45ab0700
Received: hashtx
Received: 03123d1aa0f40965eecede4c1dd7531df7dfc87c55ac06264b0d7c90203acdc7
Received: 46ab0700
Received: hashtx
Received: 0b8ddf99ea66f522319f8f8e7aa6c439b44c3b1fff79a41c58356447a7283654
Received: 47ab0700
Received: hashtx
Received: bae9ca06c4fa9dc50756aded981d36d78f301e9e80b14e6031464c36e4a8d28b
Received: 48ab0700
Received: hashtx
Received: 5f4b4d0ff3c595188041c2a1abc00612aad3151ed845c62a9fb41a71214f4ad5
Received: 49ab0700
Received: hashtx
Received: 078f211de0a24a37379199fdda9bdc54323e798899edfadcfeacb834fa2a54c0
Received: 4aab0700
```

包括了hashtx频道的消息，以及消息体，交易哈希值(真实交易，可链上确认)，另外附加连续的sequence用来检测丢失的消息。你也可以设置监听其他频道并且打印输出进行调试。
