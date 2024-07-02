---
sidebar_position: 4
---

# MetaTxid

Introduction to the implementation principles of MetaTxid and the methods for solving the tracing problem.

## Overview of MetaTxid Technology

First, let's briefly introduce the tracing implementation method of MetaTxid.

Before introducing MetaTxid, let's first introduce a concept: mathematical induction. Mathematical induction is a method
of mathematical proof whose basic idea is: prove the proposition is true when \(n = 1\), then assume the proposition is
true when \(n = k\), and prove it is also true when \(n = k + 1\). This proves that the proposition is true for any
\(n\). The implementation method of MetaTxid is based on the idea of mathematical induction.

To prove the legitimacy of \(n = k + 1\) UTXO (here, legitimacy means that the constraint conditions, state transition
function, and state have not been unexpectedly tampered with, which can be guaranteed by script hash, as will be
detailed later). When \(n = 1\), the token is the genesis transaction and does not need proof. Assuming \(n = k\) is
legitimate, due to the existence
of [descendant constraint capability](/docs/contract/scrypt-language/stateful-contracts), we can certainly prove that
\(n = k + 1\) is legitimate. Mathematical induction ensures that all \(n\) on the UTXO state transition chain are
legitimate, given that the genesis transaction is legitimate and descendant constraint capability exists.

Similarly, when using the above mathematical induction conclusion to determine the legitimacy of the \(k + 1\) UTXO, it
is not necessary to check all links, but only the following points:

1. Whether the genesis transaction is legitimate (the token will carry the genesis transaction information internally).
2. Whether \(n = k\) (the previous UTXO) is legitimate. Demonstrating \(k\)'s legitimacy includes whether the code is
   legitimate and whether \(k\) belongs to the UTXO evidence chain (checking whether the input corresponding to \(k\)
   points to the same chain).
3. Whether the descendant constraint capability (function code hash) is legitimate.

Conversely, if a UTXO is forged, it certainly cannot simultaneously meet the above three conditions. Thus, the above
three conditions can be set as unlocking conditions in the UTXO's state transition function, thereby realizing the UTXO
tracing function.

In simple terms, MetaTxid improves and simplifies some steps to prove the legitimacy of previous transactions without
causing transaction inflation, thus truly achieving pure layer-one state and tracing functions.

## Detailed Explanation of MetaTxid

Next, let's explain the implementation principles of MetaTxid in detail.

### Public Resources

Technical documentation can be viewed using the following link:
[MetaTxid Documentation](https://www.microvisionchain.com/development/metatxid)

### Implementation Method

The original Bitcoin transaction ID calculation uses double SHA-256 hashing on the raw binary transaction. MetaTxid
simplifies the data needed to calculate the transaction ID, not requiring the raw transaction text. Instead, it extracts
each part and hashes them separately into a fixed-length data layer called TxHeader. This TxHeader can be seen as an
intermediate step from rawHex to txid.

This need arose mainly to solve the token contract tracing problem. When using op push tx to constrain subsequent
contracts, the unlocking of the current UTXO contract requires the current UTXO script and previous transaction body to
be passed in to verify that the current UTXO is legitimate. Legitimate UTXOs need to meet the following two conditions:

1. The script of the current UTXO is a legitimate script, with a hash consistent with the expected (code not tampered
   with), and the current UTXO is unlocked by the correct unlocking conditions.
2. The input in the transaction where the current UTXO is located has an ancestor with the same unlocking conditions,
   meaning the current UTXO's source is legitimate and not arbitrarily fabricated.

To prove the above conditions, the unlocking script needs to provide the two pieces of information to prove the current
UTXO's legitimacy. The unlocking script generally uses preimages to help maintain the state.

The preimage contains the following information:

1. nVersion of the transaction (4-byte little endian) (version of the SPENDING TX)
2. hashPrevouts (32-byte hash) (hash of all input outpoints of the SPENDING TX)
3. hashSequence (32-byte hash) (hash of all input nSequences of the SPENDING TX)
4. outpoint (32-byte hash + 4-byte little endian) (outpoint corresponding to the current input of the SPENDING TX)
5. scriptCode of the input (serialized as scripts inside CTxOuts) (UTXO script corresponding to the SPENT TX point)
6. value of the output spent by this input (8-byte little endian) (amount corresponding to the SPENT TX point)
7. nSequence of the input (4-byte little endian) (sequence corresponding to the SPENT TX point)
8. hashOutputs (32-byte hash) (hash of all output scripts and amounts of the SPENDING TX, the core of restricting the
   subsequent transaction format)
9. nLocktime of the transaction (4-byte little endian) (nLockTime of the SPENDING TX)
10. sighash type of the signature (4-byte little endian) (SIGHASH type)

The first point is easily met, as item 5 in the preimage can help verify the UTXO's legitimacy. The focus is on the
second point. The preimage does not include other information in the Spent Tx transaction, only the UTXO script and
amount being spent. Therefore, the preimage alone cannot prove the second point.

To prove the second point, the detailed information of the Spent transaction must be passed to the contract in some way.
The intuitive approach is to pass the rawHex of the Spent transaction as a parameter to the contract for it to verify
the ancestor. However, this causes a severe problem: transaction inflation.

To describe this transaction inflation process, assume a token is spent five times, with UTXOs from A->B->C->D->E.
According to the above method, to spend B, C needs to include the full text of B's transaction, D needs to include the
full text of C (including B), and E needs to include the full text of D (including C, which includes B). Running this
way, the transaction size grows exponentially with the number of transactions. The token will explode in size after a
few uses, making it unusable.

This is the background for the emergence of MetaTxid. MetaTxid was created to solve the problem of infinite expansion
caused by transaction tracing.

## MetaTxid Structure

### First Processing

Unlike traditional txid, which directly performs double SHA-256 hashing on RawHex, MetaTxid first splits and extracts
the transaction into a more refined structure:

1. Version transaction version number (4 bytes)
2. LockTime transaction lock time (4 bytes)
3. InputCount number of inputs in the transaction (4 bytes)
4. OutputCount number of outputs in the transaction (4 bytes)
5. Sha256(List\<InputOutpointWithSequence>)
   Each input's outpoint (previous txid + index) and sequence are linked into bytes and then hashed together (32 bytes)
6. Sha256(List\<Sha256(InputScript)>) Each input's unlocking script's SHA-256 are flattened and then hashed together (32
   bytes)
7. Sha256(List\<outputValue+Sha256(outputScript)>) Each output's satoshiValue and unlocking script hash are flattened
   and then hashed together (32 bytes)

After the first processing, the transaction byte size becomes a constant, regardless of the transaction size. It can be
summarized into a fixed-length (112 bytes) data. We call this fixed-length data TxHeader. It can represent the original
transaction information to some extent and can perform double SHA-256 hashing to obtain txid.

### Second Processing

The final transaction ID is obtained by concatenating all the bytes from the previous step and performing double SHA-256
hashing on the whole. This ID is calculated from all the above 7 points of data, and any change in the data will change
the entire transaction ID.

This approach sets up an intermediate layer in the original txid calculation. The size of this intermediate layer is
fixed and can be used to calculate the txid, but it cannot be tampered with. The ability to use the intermediate layer
to calculate the txid is the fundamental reason for solving the tracing problem without causing transaction size
inflation.

### Solving the Tracing Problem

Compared to previously needing to provide all the information of the spent transaction to the contract, now only the
specific input information of the spent transaction needs to be provided. The input script text to be verified, and
other intermediate layer information are passed as parameters (or evidence) to the contract. At this point, the contract
is unlocked by the following two conditions:

1. The contract calculates whether the input evidence is legitimate and includes this input and other intermediate layer
   information to calculate a txid.
2. The txid calculated by the contract must match the txid in the preimage outpoint (the node guarantees the safety of
   the preimage outpoint).

Consider a scenario of forging a UTXO. A forged UTXO is certainly not from a previous transaction, and the SpentTx
cannot provide a correctly unlocked input as evidence. If an input from another transaction that was correctly unlocked
is used as a placeholder, it will change the calculation of SpentTxid and fail the second validation. In other words, a
forged UTXO can only satisfy one of the two conditions, making it impossible to spend the forged UTXO.

Next, analyze why this does not lead to transaction inflation. Consider the same scenario of a token being spent five
times, with UTXOs from A->B->C->D

->E. Assuming C spends B, the length of the input text to be submitted is L. This L includes the script size S (fixed
size) of the contract plus multiple fixed-length parameters. A simple analysis shows that each spend's original text
length is L. Each spend does not need all the information of the previous transaction but only the fixed-length evidence
information. Therefore, there will be no transaction inflation problem.

### MetaTxid Calculation Logic Go Implementation

[MetaTxid Calculation Logic](https://github.com/metasv/mvcd/blob/master/wire/msgtx.go)
wire/msgtx.go:289

```golang
func newTxHash(msg *MsgTx) (chainhash.Hash, error) {
    if msg.Version != MVCTxVersion10 {
       return chainhash.Hash{}, errors.New("version error")
    }
    buf := bytes.NewBuffer(make([]byte, 0, 0))
    // version
    err := binarySerializer.PutUint32(buf, littleEndian, uint32(msg.Version))
    if err != nil {
       return chainhash.Hash{}, err
    }
    // lock time
    err = binarySerializer.PutUint32(buf, littleEndian, msg.LockTime)
    if err != nil {
       return chainhash.Hash{}, err
    }
    // inputs count
    count := uint32(len(msg.TxIn))
    err = binarySerializer.PutUint32(buf, littleEndian, count)
    if err != nil {
       return chainhash.Hash{}, err
    }
    // output count
    count = uint32(len(msg.TxOut))
    err = binarySerializer.PutUint32(buf, littleEndian, count)
    if err != nil {
       return chainhash.Hash{}, err
    }
    // outpoint and sequence
    inputBuf := bytes.NewBuffer(make([]byte, 0, 0))
    for _, ti := range msg.TxIn {
       inputBuf.Write(ti.PreviousOutPoint.Hash[:])
       err = binarySerializer.PutUint32(inputBuf, littleEndian, ti.PreviousOutPoint.Index)
       if err != nil {
          return chainhash.Hash{}, err
       }
       err = binarySerializer.PutUint32(inputBuf, littleEndian, ti.Sequence)
       if err != nil {
          return chainhash.Hash{}, err
       }
    }
    buf.Write(chainhash.HashB(inputBuf.Bytes()))
    // unlocking script
    inputUnlockingBuf := bytes.NewBuffer(make([]byte, 0, 0))
    for _, ti := range msg.TxIn {
       inputUnlockingBuf.Write(chainhash.HashB(ti.SignatureScript))
    }
    buf.Write(chainhash.HashB(inputUnlockingBuf.Bytes()))
    // outputs
    outputBuf := bytes.NewBuffer(make([]byte, 0, 0))
    for _, to := range msg.TxOut {
       err = binarySerializer.PutUint64(outputBuf, littleEndian, uint64(to.Value))
       if err != nil {
          return chainhash.Hash{}, err
       }
       outputBuf.Write(chainhash.HashB(to.PkScript))
    }
    buf.Write(chainhash.HashB(outputBuf.Bytes()))
    return chainhash.DoubleHashH(buf.Bytes()), nil
}
```

### Contract Implementation

Refer to the FT token tracing logic

```text
// backtrace verify
// backtrace to genesis
bytes genesisTxid = TokenProto.getGenesisTxid(tokenScript, tokenScriptLen);

if (genesisTxid != hash256(prevTokenTxProof.txHeader) + tokenTxInputProof.outputIndexBytes) {
    // backtrace to genesis contract
    bytes genesisHash = TokenProto.getGenesisHash(tokenScript, tokenScriptLen);
    bool backtraceGenesis = (genesisHash == ripemd160(prevTokenTxProof.scriptHash));

    // backtrace to token contract
    // verify prev token script data and script code
    // 此处检查preImage中的脚本和spentTx中input的脚本一致，证明条件1
    bytes prevTokenScript = TokenProto.getNewTokenScript(tokenScript, tokenScriptLen, prevTokenAddress, prevTokenAmount);
    bool backtraceToken = (sha256(prevTokenScript) == prevTokenTxProof.scriptHash);

    require(backtraceGenesis || backtraceToken);
}

// verify tx and prevTx script
bytes thisOutpoint = SigHash.outpoint(txPreimage);
// 此处检查前序关系，证明条件2
Backtrace.verify(thisOutpoint, tokenTxHeader, prevTokenInputIndex, prevTokenTxProof, genesisTxid, tokenTxInputProof);
```

```text
import "txUtil.scrypt";

library Backtrace {
    static function verify(bytes outpoint, bytes txHeader, int prevTxInputIndex, TxOutputProof prevTxProof, bytes genesisTxid, TxInputProof inputProof): bool {

        // verify tx id from preImage is identical with txHeader  
        require(outpoint[:32] == hash256(txHeader));

        // verify the specified output of prevTx is an input of tx
        TxUtil.verifyTxInput(txHeader, prevTxInputIndex, inputProof);

        bytes prevOutpoint = inputProof.txHash + inputProof.outputIndexBytes;
        if (prevOutpoint != genesisTxid) {
            // check if prevTx's script code is same with scriptCodeHash
            TxUtil.verifyTxOutput(prevTxProof, prevOutpoint);
        }

        return true;
    }
}

library TxUtil {
    static const int OUTPOINT_LEN = 36;
    static const int TX_ID_LEN = 32;

    static const int TX_HEADER_LEN = 112;

    // 证明outpoint指向正确的txProof，并且证明txProof合法（satoshi金额，scriptHash在header中并且没有篡改）
    // txProof包括 txHeader，hashProof 也就是TxHeader中第7点的List<outputValue+Sha256(outputScript)>，还有satoshi金额和scriptHash
    static function verifyTxOutput(TxOutputProof txProof, bytes outpoint) : bool {
        require(hash256(txProof.txHeader) == outpoint[:32]);
        int outputIndex = Utils.fromLEUnsigned(outpoint[32:]);

        int outputsLen = Utils.fromLEUnsigned(txProof.txHeader[12: 16]);
        bytes outputHashRoot = txProof.txHeader[80: 112];
        // verify hashProof
        require(len(txProof.hashProof) == outputsLen * 40);
        require(sha256(txProof.hashProof) == outputHashRoot);

        // verify hashValue
        // checking one can confirm two
        //require(len(txProof.satoshiBytes) == 8);
        require(len(txProof.scriptHash) == 32);
        bytes hashValue = txProof.satoshiBytes + txProof.scriptHash;

        require(hashValue == txProof.hashProof[outputIndex * 40: (outputIndex + 1) * 40]);
        return true;
    }

    // 证明txHeader中inputIndex号的input符合proof的信息（input前序性证明）
    // inputProof包括前序交易的outpoint，sequence，以及TxHeader第5项中的List<InputOutpointWithSequence>
    static function verifyTxInput(bytes txHeader, int inputIndex, TxInputProof proof): bool {
        int inputsLen = Utils.fromLEUnsigned(txHeader[8: 12]);
        bytes inputHashRoot = txHeader[16: 48];
        require(inputIndex < inputsLen);

        // verify hashProof
        require(len(proof.hashProof) == inputsLen * 40);
        require(sha256(proof.hashProof) == inputHashRoot);

        // verify hashValue
        // checking two can confirm three
        require(len(proof.txHash) == 32);
        require(len(proof.outputIndexBytes) == 4);
        //require(len(proof.sequenceBytes) == 4);
        bytes hashValue = proof.txHash + proof.outputIndexBytes + proof.sequenceBytes;
        require(hashValue == proof.hashProof[inputIndex * 40: (inputIndex + 1) * 40]);
        return true;
    }

}
```

Where:

1. The outpoint is taken from the preImage point.
2. txHeader is the intermediate layer of the spentTx, referred to here as the header, which can directly calculate the
   txid.
3. prevTxInputIndex is the position of the input that needs to be verified in the spentTx transaction.
4. prevTxProof, the evidence to prove the legitimacy of the previous transaction, is actually a TxOutputProof, which
   includes the txo's txHeader, hashProof, satoshiByte, scriptHash, and other information corresponding to the spentTx.
5. genesisTxid checks whether the input's previous transaction to be verified is the genesis. If it is the genesis, no
   tracing is needed.
6. inputProof is the proof of the input that needs to be verified in the spentTx transaction.

The verification process can be referred to in the source code comments. The main purpose is to prove that the input of
the spentTx exists and has not been forged, and that the codeHash is the same, achieving the tracing goal.
