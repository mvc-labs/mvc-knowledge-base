# Generating

Try mining with the node.

> Not recommended for production, please refer to the mining guide if you are mining on the mainnet

You can use `mvc-cli help command` to view the usage of specific commands. The JsonRpc call method is in the example.

## Commands

```text
== Generating ==
generate nblocks ( maxtries )
generatetoaddress nblocks address (maxtries)
```

## generate

尝试在节点上挖矿，生成指定数量的区块。

参数：

- `nblocks` (numeric, required) 要生成的区块数量。
- `maxtries` (numeric, optional) 最大尝试次数（默认为1000000）。

```text
generate nblocks ( maxtries )

Mine up to nblocks blocks immediately (before the RPC call returns) to an address in the wallet.

Arguments:
1. nblocks      (numeric, required) How many blocks are generated immediately.
2. maxtries     (numeric, optional) How many iterations to try (default = 1000000).

Result:
[ blockhashes ]     (array) hashes of blocks generated

Examples:

Generate 11 blocks
> mvc-cli generate 11
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "generate", "params": [11] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```

## generatetoaddress

尝试在节点上挖矿，生成指定数量的区块，并将奖励发送到指定地址。

参数：

- `nblocks` (numeric, required) 要生成的区块数量。
- `address` (string, required) 奖励发送到的地址。
- `maxtries` (numeric, optional) 最大尝试次数（默认为1000000）。

```text
generatetoaddress nblocks address (maxtries)

Mine blocks immediately to a specified address (before the RPC call returns)

Arguments:
1. nblocks      (numeric, required) How many blocks are generated immediately.
2. address      (string, required) The address to send the newly generated mvc to.
3. maxtries     (numeric, optional) How many iterations to try (default = 1000000).

Result:
[ blockhashes ]     (array) hashes of blocks generated

Examples:

Generate 11 blocks to myaddress
> mvc-cli generatetoaddress 11 "myaddress"
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "generatetoaddress", "params": [11, "myaddress"] }' -H 'content-type: text/plain;' http://127.0.0.1:9882/
```
