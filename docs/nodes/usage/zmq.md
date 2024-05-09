---
sidebar_position: 3
---

# ZMQ Instructions

Introducing How to Use ZMQ Functionality and How to Configure It

## Introduction to ZMQ

ZeroMQ is a lightweight messaging queue solution that provides publish-subscribe services via TCP links, inter-process
communication (IPC), and shared memory. ZeroMQ is known for being lightweight, high-performance, low-latency, supporting
multiple languages, multiple operating systems, and various messaging patterns.

While the node P2P protocol in MVC can itself serve as a trusted messaging propagation route to facilitate communication
within the MVC network, make consensus decisions, broadcast transactions, etc., in some scenarios, a more flexible
messaging queue solution is needed. Applications that need to listen for events like mempool transactions and new blocks
require real-time and high availability, which are more cumbersome to implement via the P2P protocol and not as
user-friendly for clients.

Therefore, we have introduced ZeroMQ as a messaging queue solution to provide more flexible messaging services. ZeroMQ
allows for real-time notifications by subscribing to events of interest, such as listening for new blocks and mempool
transactions.

## Features of MVC Node ZMQ Push

The ZeroMQ functionality implements a specific set of notification interfaces, primarily including notifiers for new
blocks and new transactions. Node ZMQ is read-only, requiring only connection to the corresponding ZeroMQ subscription
port in the receiving software; it does not perform authentication nor does it involve bidirectional protocols.
Therefore, subscribers should verify the received data (e.g., using merkle proofs, making secondary node RPC
verifications, etc.), as this data might be outdated, incomplete, or even invalid.

ZeroMQ sockets are self-connecting and self-healing; that is, the connection between two endpoints will automatically
resume after an interruption, and either end can freely start or stop in any order.

Additionally, because ZeroMQ is message-oriented, the transactions and blocks received by subscribers are one-time
occurrences and do not require any buffering or reassembly.

## Enabling ZMQ Functionality When Building the Node

When compiling the node, you can specify whether to enable ZMQ functionality. If you need to enable ZMQ, you will need
to install the libzmq3-dev dependency library on the build machine. The official default binary package already includes
support for ZMQ. If you are compiling the node yourself and wish to include ZMQ functionality, you can refer to the
following compile option:

```bash
$ ./configure --disable-zmq (other options)
```

If you are using the default binary package, no additional steps are necessary; you can start the node directly as the
ZMQ functionality is already installed in the node.

## ZMQ Configuration

ZMQ functionality needs to be configured in the node's configuration file. You can freely choose the port number and the
types of events to subscribe to. Configure the following in the mvc.conf file (refer to the ZMQ-related content
in [Startup Options](../installation/start-up-command.md)):

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

The socket type is PUB, and the address starts with "tcp://" or "ipc://". If you do not need notifications for a
particular event, you do not need to configure an address for that event. The same address can be used to listen to
multiple channels. For example:

```bash
$ mvcd -zmqpubhashtx=tcp://0.0.0.0:29882 -zmqpubhashblock=0.0.0.0:29882 -zmqpubrawtx=ipc:///tmp/mvcd.tx.raw
```

Similarly, these configurations can also be set in the mvc.conf file, such as:

```text
zmqpubhashtx=tcp://0.0.0.0:29882
zmqpubhashblock=tcp://0.0.0.0:29882 
zmqpubrawtx=ipc:///tmp/mvcd.tx.raw
```

Each PUB notification comes with a topic and a message body, with the notification type included in the message header.
For example, the ***zmqpubhashtx*** notification's topic is "hashtx," and the message body is the transaction hash. The
message body is a 32-byte hexadecimal string, which can be obtained in detail via the node's RPC interface.

Meanwhile, the topics for ***zmqpubdiscardedfrommempool*** and ***zmqpubremovedfrommempoolblock*** notifications are "
discardedfrommempool" and "removedfrommempoolblock," respectively, and their message bodies are JSON strings:

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

The `collidedWith` field indicates which transaction this transaction conflicted with, and the `blockhash` field
indicates which block this transaction was included in.

The `reason` field in ***zmqpubdiscardedfrommempool*** indicates why this transaction was discarded, with reasons
including:

* expired
* mempool-sizelimit-exceeded
* collision-in-block-tx

The `reason` field in ***zmqpubremovedfrommempoolblock*** indicates why this transaction was removed from the mempool,
with reasons including:

* reorg
* included-in-block

***zmqpub2***
(such as zmqpubhashtx2 and other suffixes ending with 2) functions similarly to their non-suffix counterparts, the only
difference being that they no longer push duplicate messages. For example, the original zmqpubhashtx would push messages
twice, both when entering the mempool and when being packaged into a block, whereas zmqpubhashtx2 pushes only once.
Additionally, in the event of a reorganization, the entire reorganization chain is pushed, not just the tip.

## Remarks

From the perspective of `mvcd`, ZeroMQ sockets are write-only; PUB sockets do not even have a read function. Therefore,
they do not directly introduce any state into MVC. Additionally, MVC does not broadcast any information that has not
been received from the public P2P network.

When connecting clients, no authentication or authorization is performed; thus, it is crucial to ensure that the ZeroMQ
ports are open only to trusted networks and are protected by firewalls or other means.

Please note that reorganizations can occur when the highest point of the blockchain changes, and only the highest point
will be notified. Subscribers need to retrieve from the last known block to the new highest point.

Depending on the type of communication used, ZMQ notifications may be lost during transmission. MVC includes an
incrementing sequence number in each notification, allowing listeners to detect missing notifications.

## Practice: Using a ZMQ Client to Listen for ZMQ Events

This example uses Python to demonstrate how to use a ZMQ client to listen for ZMQ events.

Ensure that your local system has installed the ZMQ and Python libraries and that the ZMQ port is open.

Install Python3 and related dependencies:

```bash
sudo apt update
sudo apt install python3
sudo apt install python3-pip
sudo apt install libzmq3-dev python3-zmq
pip3 install pyzmq
```

Create the following Python file ***zmq_subscriber.py***. The code below listens to the local ZMQ port, listens to the
hashtx channel, and prints the data received:

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

If the program is correctly configured and running successfully, you will see the following output:

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

The message includes messages from the hashtx channel, the message body, and the transaction hash (real transaction, can
be confirmed on-chain), as well as an additional continuous sequence to detect missing messages. You can also set up to
listen to other channels and print output for debugging.

