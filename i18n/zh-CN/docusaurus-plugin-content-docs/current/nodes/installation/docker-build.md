---
sidebar_position: 3
---

# 使用Docker构建与运行

为了方便运维和管理，很多用户选择在容器化的环境中运行节点，包括Docker
Compose以及Kubernetes等。MVC同样提供了Docker镜像的构建和下载，方便用户使用容器化的环境来安装和部署节点软件。

使用Docker还可以在非Ubuntu系统上运行节点，比如macOS和Windows系统。

本文档将介绍如何使用Docker构建和运行节点。

## 构建Docker镜像

本章介绍如何从源码自行构建节点镜像，如果你希望直接拉取公共镜像仓库使用，可以直接跳过这部分内容。

Docker镜像的定义文件Dockerfile位于 [mvc-dockerfile](https://github.com/mvc-labs/mvc-dockerfile)
项目中，你可以随时查阅源码。它从`ubuntu:20.04`
基础镜像构建，安装了节点软件的依赖库和运行环境，然后下载二进制文件和默认配置，并执行`docker build`。

> 构建镜像对系统没有要求，只要能够运行docker并且执行bash脚本即可。这里所有测试在macos（arm chips）和ubuntu 20.04
> LTS上通过。但是节点软件只能在x86架构的机器上运行。

首先clone项目到本地：

```bash
git clone https://github.com/mvc-labs/mvc-dockerfile.git
cd mvc-dockerfile
```

然后执行构建命令：

```bash
bash docker-build.bash 
```

脚本默认会下载构建并构建最新版本，如果你希望构建旧版本的节点软件，可以使用如下命令指定版本号.

> 注意，打包镜像使用的默认mvc.conf 是代码仓库中的配置文件，如果你需要修改配置文件，可以在构建之前修改配置文件。当然也可以在运行容器的时候指定配置文件。

```bash
bash docker-build.bash v0.2.0.0
```

你还可以将构建好的镜像打上latest标签，方便后续使用。

```bash
docker tag microvisionchain:v0.2.0.0 microvisionchain:latest
```

构建完成后，你可以使用`docker images`查看构建的镜像：

```bash
docker images
```

可以看到如下输出：

```text
REPOSITORY         TAG        IMAGE ID       CREATED          SIZE
microvisionchain   v0.2.0.0   35630de7b95e   22 minutes ago   967MB
```

表示构建成功，你可以直接在本地使用这个镜像来运行节点，或者根据你的需求将镜像推送到远端仓库进行管理。

## 从公开仓库拉取Docker容器

你可以根据上文的构建步骤构建Docker镜像，也可以直接拉取我们构建好的镜像。MVC
labs还提供免费公开的[ECR镜像仓库](https://gallery.ecr.aws/h8c8i3v2/microvisionchain)可供直接拉取构建好的镜像，方便用户快速部署节点。

```bash
# 拉取最新版本
docker pull public.ecr.aws/h8c8i3v2/microvisionchain:latest
# 打上latest标签
docker tag public.ecr.aws/h8c8i3v2/microvisionchain:latest microvisionchain:latest
```

成功后，你可以使用`docker images`查看拉取的镜像：

```bash
REPOSITORY                                 TAG        IMAGE ID       CREATED       SIZE
microvisionchain                           latest     35630de7b95e   2 hours ago   967MB
public.ecr.aws/h8c8i3v2/microvisionchain   latest     35630de7b95e   2 hours ago   967MB
public.ecr.aws/h8c8i3v2/microvisionchain   v0.2.0.0   35630de7b95e   2 hours ago   967MB
```

## 运行Docker容器

### 直接运行(非生产环境)

运行Docker之前，请确保你已经安装docker，并构建或者拉取了镜像(参考上文的内容)。

你可以使用如下命令直接运行节点容器：

```bash
docker run -d --name microvisionchain -p 9883:9883 -p 9882:9882 microvisionchain:latest
```

它会采用默认配置启动节点，数据和配置也会存放在容器默认路径`/root/.mvc/`下，另外由于容器环境不同，日志不是输出在mvcd.log中而是stdio，你可以通过`docker logs -f microvisionchain`查看节点日志。

节点容器启动之后，可以使用mvc-cli来查看节点信息：

```bash
docker exec microvisionchain mvc-cli getinfo
```

这样配置的好处是管理相对简单，但是缺点是持久化存储依赖于容器运行时，如果容器被删除，数据也会丢失，备份和恢复节点数据也很麻烦。所以不推荐生产环境直接执行docker。另外，默认配置无法修改config文件，如果你需要修改配置文件，可以使用下面的方法。

### 使用docker-compose运行

docker-compose是docker的一个管理工具，可以通过yaml文件来管理多个容器的启动和配置。在docker
compose中，你可以指定节点的配置文件和数据目录绑定到主机，方便管理和维护。也可以设置节点网络桥接到主机等。

本教程中，我们将数据目录绑定到主机的`~/mvc-data`目录,并通过volume mount到容器内的`/mvc/data`路径下，然后引导容器使用`/mvc/data`来存储数据，这样即使容器被删除，数据和配置也不会丢失。

首先，在宿主机创建数据目录（你也可以绑定不同的硬盘到这个目录）：

```bash
mkdir -p ~/mvc-data
```

clone项目到本地(其中包含config和docker-compose）：

```bash
git clone https://github.com/mvc-labs/mvc-dockerfile.git
cd mvc-dockerfile
```

修改项目目录其中的mvc.conf文件，比如修改rpcuser和rpcpassword，以及其他配置项。具体配置项的含义和用法请参考[配置文件说明](start-up-command.md)

配置完成后，运行docker-compose：

```bash
docker compose  up -d
```

这样就可以启动节点容器了，你可以通过`docker compose ls`查看容器状态：

```bash
NAME                STATUS              CONFIG FILES
mvc-dockerfile      running(1)          /home/ubuntu/mvc-dockerfile/docker-compose.yml
```

也可以用`docker compose logs -f`查看节点日志。

使用mvc-cli 与节点通信：

```bash
docker compose exec mvcd mvc-cli help
```
预期会看到节点的帮助信息，代表启动成功。

```text
$ docker compose exec mvcd mvc-cli help
== Blockchain ==
checkjournal
getbestblockhash
getblock "blockhash" ( verbosity )
getblockbyheight height ( verbosity )
getblockchaininfo
getblockcount
getblockhash height
getblockheader "hash" ( verbose )
getblockstats blockhash ( stats )
getblockstatsbyheight height ( stats )
getchaintips
```

如果需要备份和恢复节点数据，只需要备份和恢复`~/mvc-data`目录即可。

## 附录

### Ubuntu 安装和初始化Docker服务

```bash
#!/bin/bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Enable and start Docker
systemctl enable docker
systemctl start docker
```

### Ubuntu 设置docker用户组

docker默认使用的是root用户访问unix socket，如果普通用户无需sudo来执行docker命令，可以将用户加入docker用户组。

```bash
# add docker group and add current user to docker group
sudo groupadd docker
sudo usermod -aG docker $USER
sudo newgrp docker
```

然后重启主机即可生效。
