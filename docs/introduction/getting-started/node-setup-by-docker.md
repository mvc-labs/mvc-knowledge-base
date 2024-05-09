# Node Setup by Docker

This guide explains how to quickly set up an MVC node using Docker.

The goal of this article is to use Docker to quickly establish an MVC node with minimal steps, facilitating fast node
deployment for users. Using Docker allows the node software to be deployed on any system with an x86_64 architecture
without concern for system environment and dependency library installation (ARM MAC OS can also run it due to its
translation feature).

For detailed configuration and how to use Docker to build images, please refer
to [MVC Node Docker Build and Operation](/docs/nodes/installation/docker-build).

## Preparation

Ensure your system has Docker installed. If not, please refer to
the [Docker Official Documentation](https://docs.docker.com/engine/install/) for installation instructions.

## Quick Setup

Copy and execute the following command to quickly set up an MVC node:

```bash
mkdir -p ~/mvc-data && \
git clone https://github.com/mvc-labs/mvc-dockerfile.git && \
cd mvc-dockerfile && \
docker compose up -d
```

This command creates a `mvc-data` directory in the user's directory to store block data, downloads the mvc-dockerfile
project, and finally uses `docker compose` to start and manage the node using the definitions and default
configuration `mvc.conf` for quick start-up.

## Check Node Status

You can use the following commands to check the status of the node:

Communicate with the node using mvc-cli:

```bash
docker compose exec mvcd mvc-cli getinfo
```

View node logs:

```bash
docker compose logs -f
```
