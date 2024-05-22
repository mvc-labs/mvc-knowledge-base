# Set Up Your Own Node

If you don't want to use a mining pool, you can set up your own node and mine using RPC.

We suggest using a [mining pool](./connect-to-mining-pool.md) and
the [Stratum protocol](../concepts/stratum-protocol.md) to mine, reducing the cost of setting up and maintaining your
own node.

## Set Up a Node

You can refer to [First Run](../../nodes/installation/first-run.md) to set up your own node on Ubuntu.

Also refer to [Building and Running a Node with Docker](../../nodes/installation/docker-build.md) to install and run a
node using Docker.

Attention, the mining node needs to enable the rpc service and specify some parameters for mining.

In the mvc.conf file, add the following configuration:

```text
server=1
rpcuser=yourrpcuser
rpcpassword=yourrpcpassword
```

## Use RPC for Mining

BTC and other traditional POW use the ***getblocktemplate*** and ***submitblock*** interfaces for mining, and MVC is
also compatible with these two RPC interfaces. Mining pools that support BTC mining can also support MVC mining through
these two interfaces.

The specific RPC interface can be found in the [RPC documentation](../../nodes/usage/mvc-cli/mining.md).

The advantage of these two interfaces is that they are compatible with BTC mining pool mining software, which can be
used directly for mining without worrying about the details of MVC mining.

> Recommended: MVC additionally uses the getminingcandidate and submitminingsolution interfaces, which are more
> efficient and perform better at assembling blocks, but require mining software to be compatible with the protocol. It
> is
> recommended to connect to a mining pool for mining, as the pool will translate these two interfaces into the stratum
> protocol for easy use by miners.

Using the Antminer as an example: log in to the web management interface of the mining machine, find the rpc
configuration, fill in the rpc username and password, and then specify the rpc address in the configuration of the
mining machine. The mining machine will automatically connect to the rpc service for mining.

```text
Pool URL: http://127.0.0.1:8332
Worker: yourrpcuser
Password: yourrpcpassword
```

Attention, this method is not suitable for mining blocks larger than 1m, as the large amount of data in the rpc
interface will seriously affect the mining efficiency. For miners who want to mine large blocks, it is recommended to
connect to the [MVCPool](https://mvcpool.com/) mining pool (based on GMC implementation) or refer to and use
the [getminingcandidate](../concepts/get-mining-candidate.md) and submitminingsolution interfaces.

## Use the built-in mining software for mining (for debugging only)

Mvc provides a cpuminer for debugging mining, which uses the CPU for mining and can be used for local development and debugging. If you are using a test environment, you can use cpuminer for mining, and use a mining machine for mining on the mainnet.

Download：[cpuminer](https://github.com/mvc-labs/mvc-mining-instruction/releases/download/v0.2.0.0/cpuminer.tar.gz)

```text
/home/$USER/mine/minerd -a sha256d -o 127.0.0.1:9882 -O user:password --coinbase-addr=addr
```

user and password are consistent with the configuration in mvc.conf, and addr is your mvc address.

## Use the built-in command for mining (for debugging only)

Mvc nodes have a [Generating command](../../nodes/usage/mvc-cli/generating.md) built in, which can be used to mine with the built-in mining command, but it is not recommended for use in production environments.

```text
mvc-cli generate nblocks ( maxtries )
```
