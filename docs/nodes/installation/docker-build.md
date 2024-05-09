---
sidebar_position: 3
---

# Build Docker Image

How to Build and Run a Node Using Docker

For ease of operation and management, many users choose to run nodes in a containerized environment, including Docker
Compose and Kubernetes. MVC also provides the building and downloading of Docker images to facilitate users in using
containerized environments for installing and deploying node software.

Using Docker also allows nodes to run on non-Ubuntu systems, such as macOS and Windows.

## Building Docker Images

This section explains how to build node images from the source code. If you prefer to directly pull from the public
image repository, you can skip this part.

The Dockerfile, which defines the Docker image, is located in
the [mvc-dockerfile](https://github.com/mvc-labs/mvc-dockerfile) project, and you can check the source code anytime. It
is built from the `ubuntu:20.04` base image, installs dependencies and the runtime environment for the node software,
then downloads binary files and default configurations, and executes `docker build`.

> Building the image has no specific system requirements, as long as you can run Docker and execute bash scripts. All
> tests have passed on macOS (with ARM chips) and Ubuntu 20.04 LTS. However, the node software can only run on machines
> with x86 architecture.

First, clone the project locally:

```bash
git clone https://github.com/mvc-labs/mvc-dockerfile.git
cd mvc-dockerfile
```

Then execute the build command:

```bash
bash docker-build.bash 
```

The script will by default download and build the latest version. If you wish to build an older version of the node
software, you can use the following command to specify the version number:

> Note, the default mvc.conf used in the Docker image is the configuration file from the code repository. If you need to
> modify the configuration file, you can do so before building. You can also specify the configuration file when running
> the container.

```bash
bash docker-build.bash v0.2.0.0
```

You can also tag the built image with the latest tag for later use:

```bash
docker tag microvisionchain:v0.2.0.0 microvisionchain:latest
```

After building, you can use `docker images` to see the built image:

```bash
docker images
```

You should see output similar to the following:

```text
REPOSITORY         TAG        IMAGE ID       CREATED          SIZE
microvisionchain   v0.2.0.0   35630de7b95e   22 minutes ago   967MB
```

This indicates a successful build. You can directly use this image to run a node locally or push the image to a remote
repository for management based on your needs.

## Pulling Docker Containers from a Public Repository

You can build a Docker image following the steps described above, or you can directly pull our pre-built images. MVC
Labs also offers a free public [ECR image repository](https://gallery.ecr.aws/h8c8i3v2/microvisionchain) for direct
access to pre-built images, facilitating quick node deployment for users.

```bash
# Pull the latest version
docker pull public.ecr.aws/h8c8i3v2/microvisionchain:latest
# Tag it as latest
docker tag public.ecr.aws/h8c8i3v2/microvisionchain:latest microvisionchain:latest
```

After successful pull, you can use `docker images` to view the pulled images:

```bash
REPOSITORY                                 TAG        IMAGE ID       CREATED       SIZE
microvisionchain                           latest     35630de7b95e   2 hours ago   967MB
public.ecr.aws/h8c8i3v2/microvisionchain   latest     35630de7b95e   2 hours ago   967MB
public.ecr.aws/h8c8i3v2/microvisionchain   v0.2.0.0   35630de7b95e   2 hours ago   967MB
```

## Running Docker Containers

### Direct Running (Not for Production Environment)

Before running Docker, ensure that you have installed Docker and have either built or pulled an image (refer to the
content above).

You can use the following command to directly run the node container:

```bash
docker run -d --name microvisionchain -p 9883:9883 -p 9882:9882 microvisionchain:latest
```

It will start the node using the default configuration, with data and configuration stored in the container's default
path `/root/.mvc/`. Additionally, due to the container environment differences, logs are not output to mvcd.log but to
stdio. You can view the node logs with `docker logs -f microvisionchain`.

After the node container is started, you can use mvc-cli to view node information:

```bash
docker exec microvisionchain mvc-cli getinfo
```

The advantage of this setup is that management is relatively simple, but the downside is that persistent storage depends
on the container runtime. If the container is deleted, data will also be lost, making backup and restoration of node
data problematic. Thus, it is not recommended to directly execute Docker in production environments. Additionally, the
default configuration cannot modify the config file. If you need to modify the configuration file, you can use the
following method.

### Running with docker-compose

docker-compose is a management tool for Docker that allows the use of a yaml file to manage the startup and
configuration of multiple containers. In docker-compose, you can specify the node's configuration file and data
directory to bind to the host, facilitating easy management and maintenance. You can also set up the node network to
bridge to the host, etc.

In this tutorial, we will bind the data directory to the host's `~/mvc-data` directory and mount it as a volume to the
container's `/mvc/data` path. Then, we instruct the container to use `/mvc/data` to store data, ensuring that data and
configurations are not lost even if the container is deleted.

First, create the data directory on the host machine (you can also bind a different disk to this directory):

```bash
mkdir -p ~/mvc-data
```

Clone the project to your local machine (which includes the config and docker-compose):

```bash
git clone https://github.com/mvc-labs/mvc-dockerfile.git
cd mvc-dockerfile
```

Modify the mvc.conf file in the project directory, such as changing rpcuser and rpcpassword, as well as other
configuration items. For the meanings and usage of specific configuration items, please refer to
the [Configuration File Description](start-up-command.md).

After configuring, run docker-compose:

```bash
docker compose up -d
```

This will start the node container. You can check the status of the container with `docker compose ls`:

```bash
NAME                STATUS              CONFIG FILES
mvc-dockerfile      running(1)          /home/ubuntu/mvc-dockerfile/docker-compose.yml
```

You can also view the node logs with `docker compose logs -f`.

Communicate with the node using mvc-cli:

```bash
docker compose exec mvcd mvc-cli help
```

You should see the help information for the node, indicating a successful start.

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

If you need to backup and restore node data, you simply need to backup and restore the `~/mvc-data` directory.

## Appendix

### Installing and Initializing Docker Service on Ubuntu

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
  $(. /etc/os-release and echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Enable and start Docker
systemctl enable docker
systemctl start docker
```

### Setting Up Docker User Group on Ubuntu

By default, Docker uses the root user to access the Unix socket. If ordinary users need to execute Docker commands
without sudo, you can add the user to the Docker user group.

```bash
# add docker group and add current user to docker group
sudo groupadd docker
sudo usermod -aG docker $USER
sudo newgrp docker
```

Then restart the host to make it effective.
