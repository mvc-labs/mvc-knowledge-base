---
sidebar_position: 7
---

# Stateful Contracts

sCrypt contracts use the Unspent Transaction Output (UTXO) model: contracts reside within a UTXO and define how the
Bitcoin within the UTXO can be spent. When a UTXO is spent (i.e., a public function of the sCrypt contract is
successfully called), the contract is terminated. To maintain the contract's state and allow it to be called multiple
times with variable states, follow these steps.

## State Modifiers

Use the modifier `@state` to declare any attribute as part of the state. State attributes can be used like regular
attributes.

```c
contract Counter {
    @state
    int counter;

    constructor(int counter) {
        this.counter = counter;
    }
}
```

## Updating State

By storing the state in the locking script, the contract can maintain state across chained transactions. In the
following example, the contract transitions from state0 to state1, and then to state2. Transaction tx1's input spends
the UTXO from tx0, and tx2 spends tx1.

## Maintaining State

When you are ready to pass the new state to the next UTXO, simply call the built-in function `this.updateState()` with
two parameters:

- `txPreimage`: The preimage of the current spending transaction. It must have a single output that contains the new
  state.
- `amount`: The number of satoshis in that single output.

This function is automatically generated for every stateful contract (i.e., a contract with at least one property
decorated with `@state`). If you need to customize the sighash type (different from the
default `SigHash.ALL | SigHash.FORKID`), you can use `updateStateSigHashType`.

Here is an example contract that records the number of `increment()` calls:

```c
contract Counter {
    @state
    int counter;

    public function increment(SigHashPreimage txPreimage, int amount) {
        // Change state
        this.counter++;

        require(this.updateState(txPreimage, amount));

        // Custom sighash type
        // require(this.updateStateSigHashType(txPreimage, amount, SigHash.SINGLE | SigHash.FORKID));
    }
}
```

## Advanced

If you need more granular control over the state, such as having multiple outputs in the spending transaction, you can
call another built-in function `this.getStateScript()` to get the locking script containing the latest state properties.

Next, use `OP_PUSH_TX` to ensure the output containing the state is included in the current spending transaction. This
is equivalent to using `this.updateState()` in the contract above.

```c
contract Counter {
    @state
    int counter;

    public function increment(SigHashPreimage txPreimage, int amount) {
        // Change state
        this.counter++;

        require(Tx.checkPreimage(txPreimage));

        // Get the locking script containing the latest state properties
        bytes outputScript = this.getStateScript();

        // Construct an output from the locking script and the satoshi amount
        bytes output = Utils.buildOutput(outputScript, amount);
        // Use only one input here
        require(hash256(output) == SigHash.hashOutputs(txPreimage));
    }
}
```

## Limitations

For any public function accessing stateful properties, a SigHashPreimage parameter verified by `Tx.checkPreimage()` must
be included, using `OP_PUSH_TX`. This does not apply to any non-public functions, including constructors.

```c
contract Counter {
    @state
    int counter;

    constructor(int counter) {
        // Allowed: Non-public function
        this.counter = counter;
    }

    public function increment(SigHashPreimage txPreimage, int amount) {
        // Allowed
        this.counter++;

        require(Tx.checkPreimage(txPreimage));
    }

    public function foo(SigHashPreimage txPreimage, int amount) {
        require(Tx.checkPreimageOpt(txPreimage));

        // Allowed
        this.counter++;

        require(true);
    }

    public function bar(SigHashPreimage txPreimage) {
        // Not allowed: Missing Tx.checkPreimage*()
        this.counter++;

        require(true);
    }

    public function baz(int i) {
        // Not allowed: Missing SigHashPreimage
        this.counter++;

        require(true);
    }

    function baz() : int {
        // Allowed: Non-public function
        return this.counter;
    }
}
```
