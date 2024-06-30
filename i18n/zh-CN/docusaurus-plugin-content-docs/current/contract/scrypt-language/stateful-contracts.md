---
sidebar_position: 7
---
# 有状态合约

sCrypt合约使用未花费交易输出（UTXO）模型：合约位于一个UTXO中，规定了UTXO中的比特币如何被花费。当一个UTXO被花费时（即成功调用sCrypt合约的公共函数时），合约会被终止。为了让合约保持状态并能够在携带可变状态的情况下被多次调用，需要遵循以下步骤。

## 状态修饰符

使用修饰符@state声明任何作为状态部分的属性。状态属性可以像常规属性一样使用。

```c
contract Counter {
    @state
    int counter;

    constructor(int counter) {
        this.counter = counter;
    }
}
```

## 更新状态

通过将状态存储在锁定脚本中，合约可以在链式交易中保持状态。在以下示例中，合约从state0变为state1，然后变为state2。交易1 tx1的输入花费了tx0中的UTXO，而tx2花费了tx1。

## 保持状态

当你准备将新状态传递到下一个UTXO时，只需调用内置函数`this.updateState()`，并传入两个参数：
- `txPreimage`：当前花费交易的预镜像。它必须只有一个输出并包含新状态。
- `amount`：该单一输出中的satoshi数量。

对于每个有状态合约（即，至少有一个用@state装饰的属性的合约），该函数会自动生成。如果需要自定义sighash类型（不同于默认的SigHash.ALL | SigHash.FORKID），可以使用`updateStateSigHashType`。

以下是一个记录`increment()`调用次数的示例合约：

```c
contract Counter {
    @state
    int counter;

    public function increment(SigHashPreimage txPreimage, int amount) {
        // 改变状态
        this.counter++;

        require(this.updateState(txPreimage, amount));

        // 自定义sighash类型
        // require(this.updateStateSigHashType(txPreimage, amount, SigHash.SINGLE | SigHash.FORKID));
    }
}
```

## 进阶

如果你需要更细粒度地控制状态，例如在花费交易中有多个输出，可以调用另一个内置函数`this.getStateScript()`来获取包含最新状态属性的锁定脚本。

接下来，使用`OP_PUSH_TX`确保包含状态的输出进入当前花费交易。这相当于上述合约使用`this.updateState()`。

```c
contract Counter {
    @state
    int counter;

    public function increment(SigHashPreimage txPreimage, int amount) {
        // 改变状态
        this.counter++;

        require(Tx.checkPreimage(txPreimage));

        // 获取包含最新状态属性的锁定脚本
        bytes outputScript = this.getStateScript();

        // 从锁定脚本和satoshi数量构造一个输出
        bytes output = Utils.buildOutput(outputScript, amount);
        // 这里只使用一个输入
        require(hash256(output) == SigHash.hashOutputs(txPreimage));
    }
}
```

## 限制

对于任何公共函数访问有状态属性，必须包含一个通过`Tx.checkPreimage()`验证的SighashPreimage参数，即使用`OP_PUSH_TX`。这不适用于任何非公共函数，包括构造函数。

```c
contract Counter {
    @state
    int counter;

    constructor(int counter) {
        // 可以：非公共函数
        this.counter = counter;
    }

    public function increment(SigHashPreimage txPreimage, int amount) {
        // 可以
        this.counter++;

        require(Tx.checkPreimage(txPreimage));
    }

    public function foo(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimageOpt(txPreimage));

        // 可以
        this.counter++;

        require(true);
    }

    public function bar(SigHashPreimage txPreimage) {
        // 不可以：缺少Tx.checkPreimage*()
        this.counter++;

        require(true);
    }

    public function baz(int i) {
        // 不可以：缺少SigHashPreimage
        this.counter++;

        require(true);
    }

    function baz() : int {
        // 可以：非公共函数
        return this.counter;
    }
}
```
