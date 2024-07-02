# MVCApi

Introduction to MVCAPI Standardized Interface Definition and How to Use MVCApi to View Transactions

## MVCApi Protocol

MVCApi is a set of OpenAPI service protocols that define a standardized interface for accessing transaction data using
Restful APIs. The goal of the MVCApi protocol is to provide an easy way to access transaction data, making it simpler
for developers to utilize this data.

Compared to traditional node RPC interfaces, MVCApi defines more comprehensive interfaces and functionalities, adding
many convenient interaction logics for clients and web pages, making integration and debugging easier.

The interface definition of the MVCApi protocol is based on the OpenAPI specification. Developers can use any tools that
support the OpenAPI specification to generate client code, greatly simplifying the integration process.

Additionally, due to the openness of the MVCApi protocol, any service implementing the MVCApi protocol can be accessed
by clients. This means developers can use the MVCApi protocol to access different services without worrying about the
specific implementation of the service and without being tied to a particular service provider, allowing for flexible
switching between providers.

To view the MVCApi definition,
visit [openapi.yaml](https://github.com/mvc-labs/mvcapi-definition/blob/master/openapi.yaml).

## MVCApi Service

[MVCApi Service](https://mvcapi.com/) is a Restful API service implementation based on the MVCApi protocol, maintained
by members of MVCLabs. Developers can write code to interact with the MVCApi service or use the Swagger UI provided by
MVCApi to view interface definitions and test the interfaces.

Swagger UI can simulate client requests and return interface data, mainly for developers to debug and test the
interfaces.

MVCApi debugging interface address: [https://mvcapi.com/](https://mvcapi.com/)

![MVCApi Home](/img/mvcapi-home.png)

## Network Selection

MVCApi supports both the mainnet and the testnet. Users can choose different networks to view different data.

In Swagger UI, by selecting different Servers, you can switch to different network API entries, such as mainnet and
testnet.

![Network Selection](/img/mvcapi-network.png)

## Transaction Query

MVCApi provides two types of transaction query interfaces: querying transaction details by transaction ID and querying
raw transactions by transaction ID. If raw transaction data is needed, the raw transaction query interface can be used.

Here, we take querying transaction details /tx/\{txid} as an example. Enter the transaction ID, click the `Try it out`
button, and you can view the transaction details in JSON format.

![Transaction Query](/img/mvcapi-transaction.png)

## Address Query

Since MVCApi is developer-oriented, the address query interface functionalities are specialized. Querying space balance,
querying SpaceUtxo, querying transaction history, querying FT, and querying NFT balances and transaction history
correspond to different interfaces.

For specific functionalities, please refer to the MVCApi interface definition.

![Address Query](/img/mvcapi-address.png)
