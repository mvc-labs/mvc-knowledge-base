# 使用MVCApi查看交易

介绍MVCAPI标准化接口定义以及如何使用MVCApi查看交易。

## MVCApi协议
MVCApi是一套OpenAPI服务协议，它定义了一组标准化的接口，用于使用Restful API访问交易数据。MVCApi协议的目的是为了提供一种简单的方式来访问交易数据，以便于开发者可以更容易地使用交易数据。

相比于传统节点的RPC接口，MVCApi定义了更为丰富的接口和功能，增加了很多方便客户端和web页面交互的逻辑，在接入和调试上更为方便。

MVCApi协议的接口定义是基于OpenAPI规范的，开发者可以使用任何支持OpenAPI规范的工具来生成客户端代码，极大简化接入流程。

另外由于MVCApi协议的开放性，任何实现了MVCApi协议的服务都可以被客户端访问，这意味着开发者可以使用MVCApi协议来访问不同的服务，而不需要关心服务的具体实现。也无需和服务商进行绑定，可以自由切换服务商。

查看MVCApi定义请访问[openapi.yaml](https://github.com/mvc-labs/mvcapi-definition/blob/master/openapi.yaml)。

## MVCApi服务

[MVCApi服务](https://mvcapi.com/)是一个基于MVCApi协议的Restful API服务实现，由MVCLabs成员提供维护。开发者可以编写代码来与mvcapi服务交互，也可以使用MVCApi提供Swagger UI来查看接口定义和测试接口。

Swagger UI可以模拟客户端请求，返回接口的数据，主要是面向开发者进行接口的调试和测试。

MVCApi调试接口地址：[https://mvcapi.com/](https://mvcapi.com/)

![](/img/mvcapi-home.png)

## 网络选择

MVCApi支持主网和测试网，用户可以通过选择不同的网络来查看不同的数据。

在Swagger UI中选择不同的Servers，即可切换到不同的网络API入口，如mainnet和testnet。

![](/img/mvcapi-network.png)

## 交易查询

MVCApi提供两种交易查询接口，分别是根据交易ID查询交易详情以及根据交易ID查询生交易。如果需要原始的交易数据，可以使用查询生交易接口。

这里以查询交易详情/tx/\{txid\}为例，输入交易ID，点击`Try it out`按钮，即可查看交易详情(json格式)。

![](/img/mvcapi-transaction.png)

## 地址查询

由于MVCApi是面向开发的，所以地址查询接口功能为专门化的，查询Space余额，查询SpaceUtxo，查询历史交易记录，查询FT，NFT余额和交易记录等分别对应不同的接口。

具体不同的功能请查看MVCApi的接口定义。

![img.png](/img/mvcapi-address.png)
