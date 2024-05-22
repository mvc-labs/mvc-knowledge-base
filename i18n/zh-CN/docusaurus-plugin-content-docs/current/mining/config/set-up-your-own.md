# 搭建自己的节点并使用RPC进行挖矿

如果你不需要使用矿池，你可以搭建自己的节点并使用RPC进行挖矿。

我们建议[使用矿池](./connect-to-mining-pool.md)和[Stratum协议](../concepts/stratum-protocol.md)协议来进行挖矿，减少自己配置和维护的成本。

## 搭建节点

你可以参考[首次运行](../../nodes/installation/first-run.md)在Ubuntu系统上搭建自己的节点。

也可以参考[使用Docker构建与运行节点](../../nodes/installation/docker-build.md) 使用docker进行节点的安装和运行。

注意，挖矿节点需要开启rpc服务，并且指定挖矿的一些参数。

在mvc.conf中添加以下配置：
```text
server=1
rpcuser=yourrpcuser
rpcpassword=yourrpcpassword
```

## 使用RPC进行挖矿

BTC等传统POW使用***getblocktemplate***和***submitblock***接口进行挖矿，MVC同样兼容这两个RPC接口。支持btc挖矿的矿池也可以通过这两个接口来支持mvc挖矿。

具体的RPC接口可以参考[RPC文档](../../nodes/usage/mvc-cli/mining.md)。

这两个接口的好处是与btc的矿池挖矿软件兼容，可以直接使用btc的矿池挖矿软件进行挖矿，无需关心MVC的挖矿细节。

> 推荐：MVC额外使用getminingcandidate和submitminingsolution两个接口，这两个接口组装区块的效率更高，性能更强，但是需要挖矿软件对协议进行兼容。建议接入矿池进行挖矿，矿池会将这两个接口翻译成stratum协议，方便矿工使用。

以蚂蚁矿机为例：登陆到矿机的web管理界面，找到rpc配置，填入rpc的用户名和密码，然后在矿机的配置中指定rpc的地址，矿机会自动连接到rpc服务进行挖矿。

```text
Pool URL: http://127.0.0.1:8332
Worker: yourrpcuser
Password: yourrpcpassword
```

注意，这种方式不适用于挖掘体积超过1m的区块，因为rpc接口数据量过大的情况下会严重影响挖矿效率。对于希望挖掘大区块的矿工，建议接入[MVCPool](https://mvcpool.com/)矿池(基于GMC实现)或者参考并使用[getminingcandidate](../concepts/get-mining-candidate.md)和submitminingsolution接口。

## 使用内置挖矿软件进行挖矿（仅供调试）

Mvc 提供一个cpuminer来进行挖矿的调试，它使用cpu进行挖矿，可以用来进行本地开发和调试。如果你使用测试环境，可以使用cpuminer进行挖矿，主网请使用矿机进行挖矿。

下载地址：[cpuminer](https://github.com/mvc-labs/mvc-mining-instruction/releases/download/v0.2.0.0/cpuminer.tar.gz)

```text
/home/$USER/mine/minerd -a sha256d -o 127.0.0.1:9882 -O user:password --coinbase-addr=addr
```
user 和password与mvc.conf的配置一致，addr是你的mvc地址。

## 使用节点内置命令进行挖矿（仅供调试）

Mvc节点内置了[Generating命令](../../nodes/usage/mvc-cli/generating.md)，可以使用节点内置的挖矿命令进行挖矿，但是不推荐在生产环境中使用。

```text
mvc-cli generate nblocks ( maxtries )
```
