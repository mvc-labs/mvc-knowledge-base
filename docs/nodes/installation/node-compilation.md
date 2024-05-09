---
sidebar_position: 1
---
# Node Compilation and Building

Compiling and building node binary from source code.

This article explains how to build node binary files from source code and run them for the first time. If you do not need to compile, you can skip this chapter and go directly to the [Node Startup Section](first-run.md).

## Preparation of the Compilation Environment

Currently, the node software can only be built on Ubuntu 20.04 LTS. Please ensure the version number is correct, as higher versions are not supported yet (due to compilation errors). If your operating system is not Ubuntu 20.04 LTS, you can use Docker to compile the node software (refer to subsequent content). Plans are in place to support more operating systems.

> Note, the building process is resource-intensive, and it is recommended to build on a machine with at least a 2-core CPU and 4GB of memory. The machine used for testing in this article is an AWS EC2 m5.xlarge instance with a 4-core CPU and 16GB of memory (Ubuntu 20.04 LTS).

### Installing Dependencies

Building C++ code requires the following software packages. Use apt-get to install the necessary dependencies:

Copy and execute the following command:

```bash
sudo apt-get update && sudo apt-get install -y build-essential \
  libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils \
  libboost-system-dev libboost-filesystem-dev libboost-chrono-dev \
  libboost-program-options-dev libboost-test-dev libboost-thread-dev \
  libdb-dev libdb++-dev libczmq-dev
```

## Download Source Code and Compile

Ensure that your build environment has more than 1.5GB of available memory; otherwise, the compilation process may fail. Depending on your machine's configuration, this step could take several minutes to several hours.

Execute the following commands step by step:
```bash
# Download the source code
git clone https://github.com/mvc-labs/microvisionchain.git
# Enter the source code directory
cd microvisionchain
# Execute autogen.sh, this step mainly initializes and generates the configure file
./autogen.sh
# Execute configure, this step checks the compilation environment and dependencies are complete, and generates the Makefile
./configure --enable-cxx --disable-shared --with-pic --prefix=/home/$USER/mvc 
# Execute make, this step mainly compiles the source code, if this step gets stuck, it is likely due to insufficient resources, please check if your machine configuration is sufficient
make
# Optional, install the binary files to a specified directory
make install
```

The build log is as follows (you can compare to check if the configuration and actual execution match):

```text
config.status: executing libtool commands
Fixing libtool for -rpath problems.

Options used to compile and link:
  prod build    = yes
  with wallet   = yes
  with zmq      = yes
  with upnp     = auto
  use asm       = yes
  debug enabled = no
  werror        = no

  sanitizers
          asan  = no
          tsan  = no
          ubsan = no

  memory allocators
       tcmalloc = no
       jemalloc = no

  target os     = linux
  build os      =

  CC            = gcc
  CFLAGS        = -g -O2
  CPPFLAGS      =  -DHAVE_BUILD_INFO -D__STDC_FORMAT_MACROS
  CXX           = g++ -std=c++17
  CXXFLAGS      = -g -O2 -Wall -Wextra -Wformat -Wvla -Wformat-security -Wno-unused-parameter
  LDFLAGS       =

```

After executing `make`, if everything goes smoothly, you will see three binary files in the src directory: `mvcd`, `mvc-cli`, and `mvc-tx`. These files are the node program, node command line tool, and transaction tool, respectively.

After completing `make install`, you will find these binary files in the specified directory (/home/$USER/mvc/bin), indicating a successful compilation. At this point, you can [directly run the node program](first-run.md), or proceed with further actions such as [Docker building](docker-build.md).
