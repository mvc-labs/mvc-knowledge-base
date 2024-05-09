---
sidebar_position: 1
---
# 节点编译和构建

从源码编译和构建节点二进制文件。

本文介绍如何从源码构建节点二进制文件，并初次运行。如果你不需要编译，可以直接跳过本章并进入[节点启动章节](first-run.md)。

## 编译环境准备

目前节点软件只能在Ubuntu 20.04 LTS版本构建，请确保版本号正确，高版本暂时不支持（有编译错误）。如果你的操作系统不是Ubuntu 20.04 LTS，你可以使用Docker来编译节点软件（参考后续内容）。后续计划支持更多的操作系统。

> 注意，构建过程对资源的需求较大，建议在2核CPU，4GB内存以上的机器上进行构建。本文测试所使用的机器为AWS EC2 m5.xlarge实例，4核CPU，16GB内存（Ubuntu 20.04LTS）。

### 安装依赖

C++代码构建需要依赖以下软件包，使用apt-get来安装所需的依赖：

复制以下命令并执行：

```bash
sudo apt-get update && sudo apt-get install -y build-essential \
  libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils \
  libboost-system-dev libboost-filesystem-dev libboost-chrono-dev \
  libboost-program-options-dev libboost-test-dev libboost-thread-dev \
  libdb-dev libdb++-dev libczmq-dev
```

## 下载源码并编译

确保你的构建环境超过1.5GB的可用内存，否则编译过程可能会失败。这一步根据机器的配置可能需要几分钟到几十分钟不等。

逐步执行以下命令：
```bash
# 下载源码
git clone https://github.com/mvc-labs/microvisionchain.git
# 进入源码目录
cd microvisionchain
# 执行autogen.sh，这一步主要是做初始化工作，生成configure文件
./autogen.sh
# 执行configure，这一步主要是检查编译环境以及依赖库是否齐全，并生成Makefile文件
./configure --enable-cxx --disable-shared --with-pic --prefix=/home/$USER/mvc 
# 执行make，这一步主要是编译源码，如果这一步卡住不动，很可能是资源不足导致，请检查你的机器配置是否足够
make
# 可选项，将二进制文件安装到指定目录
make install
```

构建日志如下(可以对照配置与实际执行是否一致)：

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

执行完`make`之后，如果执行正常，你会在src目录下看到三个二进制文件：mvcd、mvc-cli、mvc-tx，这三个文件分别是节点程序、节点命令行工具、交易工具。

执行完`make install`之后，你会在指定的目录(/home/$USER/mvc/bin)下看到这几个二进制文件。代表编译成功。此时你可以[直接运行节点程序](first-run.md)，或进行后续[Docker构建](docker-build.md)等操作。
