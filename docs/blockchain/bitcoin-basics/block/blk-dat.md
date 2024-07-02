---
sidebar_position: 7
---

# blk.dat

Introducing the storage format of Bitcoin block files blk.dat.

## What is blk.dat File

Bitcoin nodes use blk.dat files to store blockchain data. Each blk.dat file contains a series of Bitcoin blocks stored
in a compact binary format. These files are located in the Bitcoin data directory, usually under the `blocks/`
subdirectory.

## Structure of blk.dat File

### Block File Header

Each blk.dat file begins with a 4-byte magic number, which is used to mark the start of a block. In Bitcoin, the magic
number is `0xD9B4BEF9`.

### Block Data

Following the magic number is the block data. The block data includes:

1. **Block Size**: A 4-byte integer representing the size of the block (in bytes).
2. **Block Content**: The actual block data, including the block header and block body (transaction data).

The order of the block data is: magic number -> block size -> block content. Multiple blocks are stored consecutively in
a single blk.dat file.

### File Rotation

When a blk.dat file reaches its maximum size (default is 2GB), the Bitcoin node creates a new blk.dat file, with the
filenames incrementing sequentially, such as `blk00000.dat`, `blk00001.dat`, and so on.

## How to Read blk.dat File

Reading a blk.dat file can be done using the Bitcoin Core client or custom parsing tools. The parsing process involves
the following steps:

1. **Open File**: Open the blk.dat file in binary mode.
2. **Read Magic Number**: Verify if it is a valid block start.
3. **Read Block Size**: Get the block size information.
4. **Read Block Content**: Read the complete block data based on the block size.
5. **Repeat Steps**: Continue reading the next block until the end of the file.

### Example Code

Here is a simple Python example code to parse a blk.dat file:

```python
import struct

def read_block(file):
    magic = file.read(4)
    if not magic:
        return None
    size = struct.unpack("<I", file.read(4))[0]
    block_data = file.read(size)
    return block_data

with open('blk00000.dat', 'rb') as f:
    while True:
        block = read_block(f)
        if block is None:
            break
        print(f"Read block of size: {len(block)}")
```

## Importance of blk.dat Files

1. **Blockchain Storage**: blk.dat files are the foundation for Bitcoin nodes to store the complete blockchain data,
   ensuring all transactions and block records are fully preserved.
2. **Node Synchronization**: When new nodes join the network, they can quickly synchronize blockchain data by
   downloading and parsing blk.dat files.
3. **Data Recovery**: In case of data corruption or node restart, blk.dat files provide a reliable way to recover
   blockchain data.

## Summary

blk.dat files are crucial components for storing blockchain data in Bitcoin nodes. By storing block data in a compact
binary format, they ensure the integrity and reliability of the blockchain. Understanding the structure and reading
methods of blk.dat files helps to deeply grasp the operation mechanism of Bitcoin nodes and blockchain data management.
