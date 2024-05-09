# Docker快速启动节点

介绍如何使用Docker快速搭建一个MVC节点。

本文目标是使用Docker以最少的步骤快速搭建一个MVC节点，方便用户快速部署节点。使用Docker可以将节点软件部署到任意x86_64架构的系统上，无需关心系统环境和依赖库的安装（arm MAC os因为有转译功能，所以也可以运行）。

详细的配置还有以及如何使用Docker构建镜像的内容请参考[MVC节点Docker构建与运行](/docs/nodes/installation/docker-build)。

## 准备工作

确认你的系统已经安装了Docker，如果没有安装，请参考[Docker官方文档](https://docs.docker.com/engine/install/)进行安装。

## 快速搭建

复制并执行以下命令，即可快速搭建一个MVC节点：

```bash
mkdir -p ~/mvc-data && \
git clone https://github.com/mvc-labs/mvc-dockerfile.git && \
cd mvc-dockerfile && \
docker compose up -d
```

这个命令会在用户目录下创建一个`mvc-data`目录用于存储区块数据，然后下载mvc-dockerfile项目，最后使用`docker compose`启动节点以及管理节点，使用项目中的定义和默认配置`mvc.conf`进行快速启动。

## 查看节点状态

你可以使用以下命令查看节点的状态：

使用mvc-cli 与节点通信：

```bash
docker compose exec mvcd mvc-cli getinfo
```

查看节点日志：

```bash
docker compose logs -f
```
