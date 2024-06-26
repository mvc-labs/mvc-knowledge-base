---
sidebar_position: 4
---

# MetaTxid

介绍MetaTxid的实现原理以及解决溯源问题的方法。

## MetaTxid技术概述

首先简单介绍一下MetaTxid的溯源实现方法。

介绍MetaTxid之前，我们先介绍一个概念：数学归纳法。数学归纳法是一种数学证明方法，它的基本思想是：证明当n=1时命题成立，然后假设n=k时命题成立，证明n=k+1时命题也成立，这样就证明了对于任意的n，命题都成立。MetaTxid的实现方法就是基于数学归纳法的思想。

我们要证明n=k+1的utxo合法（这里合法的意思是约束条件，状态转移函数，还有状态没有发生非预期的篡改，这个可以通过脚本hash来保证，后面会详细介绍具体做法）。n=1时，token是创世交易，无需证明。而假定n=k合法，由于[后代约束能力](/docs/contract/scrypt-language/stateful-contracts)
的存在，我们一定可以证明出n=k+1合法。数学归纳法保证了在创世交易合法以及后代约束能力存在的情况下，utxo状态转移链上的所有n都是合法的。

同理，应用上面数学归纳法的结论来判断第k+1个utxo是否合法的时候，也无需判断所有链路，只需判断如下几点：

1. 创世交易是否合法（token内部会携带创世交易信息）。
2. n=k（前序utxo）是否合法。论证k合法包括代码是否合法，k是否属于utxo证据链中（查看一下k对应的input是不是指向相同的链条）。
3. 后代约束能力（函数代码hash）是否合法。

反之如果一个UTXO是伪造的，那么它一定无法同时满足上面三个条件，这样就可以把上面3个条件作为解锁条件设置到UTXO的状态转移函数中，从而实现了UTXO的溯源功能。

而MetaTxid的作用简而言之，就是将证明前序交易合法的部分步骤进行了改良和简化，可以在不引起交易膨胀的前提下，证明条件2。从而真正实现了纯一层的状态和溯源功能。

## MetaTxid详解

接下来详细介绍MetaTxid的实现原理。

### 公共资源

技术文档可以使用下面的链接查看：
https://www.microvisionchain.com/development/metatxid

### 实现方式

原版比特币交易Id计算使用的是对二进制生交易进行两次sha256运算，metaTxid精简了计算txid需要的数据，并不需要生交易原文，而是在生交易的基础上进行一次抽取，抽取各个部分并分别hash出来一层称为TxHeader的定长数据。这个txHeader可以看作从rawHex到txid的一个中间步骤。

这个需求产生的背景主要是为了解决token合约的溯源问题。使用op push
tx对后续合约进行约束的时候，当前utxo合约的解锁需要传入当前utxo的脚本以及前序交易体，用来校验当前utxo是合法utxo。合法utxo需要满足以下两个条件：

1. 当前utxo的script是合法脚本，脚本的hash和预期保持一致（代码未经篡改），当前utxo被正确的解锁条件所解锁
2. 当前utxo所在的交易input中，存在相同解锁条件的祖先，也就是说当前的utxo的来源是合法的，不是被随意编造出来的。
   根据上述的要求，解锁脚本中需要提供上面两个信息才能证明当前utxo合法。解锁脚本一般都会使用原像来辅助维护状态。

原像中包含以下信息：

1. nVersion of the transaction (4-byte little endian) （SPENDING TX的版本）
2. hashPrevouts (32-byte hash) （SPENDING TX所有input outpoint的hash）
3. hashSequence (32-byte hash) （SPENDING TX所有input的nSequence的hash）
4. outpoint (32-byte hash + 4-byte little endian) （SPENDING TX当前input对应的outpoint）
5. scriptCode of the input (serialized as scripts inside CTxOuts) （SPENT TX点位对应的UTXO脚本）
6. value of the output spent by this input (8-byte little endian) （SPENT TX点位对应的金额）
7. nSequence of the input (4-byte little endian) （SPENT TX点位对应的sequence）
8. hashOutputs (32-byte hash) （SPENDING TX当前所有output脚本和金额的hash，这是限制后续交易格式的核心）
9. nLocktime of the transaction (4-byte little endian) （SPENDING TX的nLockTime）
10. sighash type of the signature (4-byte little endian) （SIGHASH类型）
    第一点很好满足，原像中的5就可以辅助验证utxo合法，重点是第二点，原像中并不包含Spent
    Tx交易中的其他信息，只有被花费的utxo脚本还有金额。因此单纯通过原像是无法证明第二点的。
    要证明第二点，需要将Spent交易的详细信息以某种方式传递给合约，首先直觉想到就是将Spent交易的rawHex作为参数传递给合约，让合约去校验祖先。但是这就会引起一个严重的问题：交易膨胀。
    为了描述这个交易膨胀的过程，我们假定一个token被花费5次，UTXO分别从A->B->C->D->
    E。那么根据上面的方式，要花费B，则C中需要包括B交易的全文，D中需要包括C中的全文（套娃包括了B），E中需要包括D的全文（套娃包括了C（套娃包括了B）），以此运行下去的话，交易体积会随着交易次数成指数级增长。token用不了几次就会体积爆炸，不可再使用。
    这就是MetaTxid产生的背景，MetaTxid就是为了解决交易溯源导致无限膨胀的问题而产生的。
    方法和思路
    要解决交易膨胀，核心还是要将Spent交易的信息传递给合约，但是不能使用rawHex作为参数传递给合约，因为rawHex可能随使用次数增长。
    那换一个想法，能不能将rawHex中的某些信息摘要出来，不是提供全量交易信息，而是提供部分信息，足以能够证明spent交易中存在合法input即可。

## MetaTxid 结构

### 一次处理

与传统txid直接对RawHex进行double sha256 hash不同，metaTxid首先将交易拆分和摘要成更精细的结构

1. Version 交易版本号(4 bytes)
2. LockTime 交易锁定时间(4 bytes)
3. InputCount 交易input数量(4bytes)
4. OutputCount 交易output数量(4bytes)
5. Sha256(List\<InputOutpointWithSequence>)
   每一个input的outpoint（前序txid+index）以及sequence的字节链接起来然后整体进行hash(32bytes)
6. Sha256(List\<Sha256(InputScript)>) 每一个input的解锁脚本的sha256平铺起来，再整体做一次Sha256(32bytes)
7. Sha256(List\<outputValue+Sha256(outputScript)>) 每一个output的satoshiValue和解锁脚本hash平铺之后，再整体做一次Sha256(
   32bytes)
   可以看到，经过一次处理之后的交易字节数量是个确定的常量，无论什么大小的交易都可以被摘要成一个固定长度(112bytes)
   的数据。我们将这个固定长度的数据称为TxHeader。它从一定程度上可以代表原交易的信息，它进行两次sha256计算可以得到txid。

### 二次处理

最终的交易id由上一步骤中的所有字节链接起来之后，整体做double
sha256运算，就可以得到最终的metaTxid。这个id是由所有上述7点数据计算出来的，任意一份数据发生改变，整个交易id都会发生改变。
这样的处理相当于在原来txid的计算里架设了一个中间层，中间层的大小是固定的，可以拿中间层来计算txid，但是中间层同样不可以被篡改。可以用中间层计算txid这个特性，是解决溯源问题同时不带来交易体积膨胀的根本原因。
解决溯源问题
相比原来需要提供给合约spentTx所有的信息，现在只需要提供给合约spentTx中，特定的input信息即可，将需要校验的input脚本原文，以及其他中间层信息作为参数（或者说证据）传递给合约。此时合约被以下两个条件所解锁：

1. 合约计算input证据是否合法，并且加入这个input和其他中间层信息计算出一个txid。
2. 合约计算的txid必须要和原像outpoint中的txid保持一致（原像outpoint由节点保证安全）。
   设想一种伪造utxo的情形，伪造的utxo肯定不是来自于前序交易，SpentTx中无法提供一个被正确解锁的input作为证据。如果此时那一个其他交易中被正确解锁的input来充数的话，那么会导致SpentTxid的计算发生改变，无法通过第二个校验。也就是说伪造utxo只能同时满足上面两点中的一个，即无法花费伪造utxo。
   接下来分析为什么这样不会导致交易膨胀，还是一个token被花费5次，UTXO分别从A->B->C->D->
   E。假设C花费B，需要提交的input原文长度为L，注意这个L中包括合约脚本大小S（确定大小）外加多个定长参数，简单分析就可以得知，每一次花费都是的原文长度都是L，每一次花费都不需要前序交易的所有信息，而是定长的证据信息即可，因此不再会产生交易膨胀的问题。

### MetaTxid计算逻辑 go 语言实现

https://github.com/metasv/mvcd/blob/master/wire/msgtx.go
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

### 合约实现

参考ft token的溯源逻辑

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

其中

1. outpoint就是从preImage中取出来的点位
2. txHeader是spentTx的中间层，我们这里称为header，它可以直接计算出txid
3. prevTxInputIndex 就是spentTx交易中需要被校验的input所在的位置
4. prevTxProof，证明前序交易合法的证据，其实是一个TxOutputProof，内部包括这个spentTx所对应的txo的txHeader，hashProof，satoshiByte，scriptHash等信息。
5. genesisTxid 判断spentTx需要检验的input前序交易是否为genesis，如果是genesis无需溯源
6. inputProof spentTx 交易中需要被检验的input的证明
   证明过程可以参考源码注释，主要目的就是证明spentTx的input存在没有被伪造，并且codeHash相同，达到溯源的目的。
