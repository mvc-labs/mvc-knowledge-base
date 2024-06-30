---
sidebar_position: 2
---

# 基本语法

介绍Scrypt语言的基本语法和规则。

参考资料： https://scryptdoc.readthedocs.io/en/latest/

## 构造器

每一个合约只有一个构造器，用来初始化成员变量。如果没有构造器被指定的话，会生成一个默认的构造器，将所有的成员初始化。

![img.png](/img/scrypt-constructor.png)

## Require()

require函数指定合约条件，接受一个bool类型的参数，如果参数为false，就会中断合约执行并返回失败。

参数为true的时候就会校验通过。

## 公共函数

每一个合约都至少有一个Public
function，这个函数并不返回值（void返回）。这个函数可以看作锁定脚本，也可以看作整个合约入口，只有当公共函数中的所有require条件都满足并正常结束的时候，合约才可以被解锁。

多个公共函数的情况下，可以看作这个合约有多个解锁方式，每个解锁方式都可以解锁这个输出。

## 基本数据结构

- Bool true or false
- Int 任意长度的十进制或者16进制有符号整数
- byte类型，以b加单引号开头的16进制格式，或者双引号包裹的utf8字符
  数组类型
  以逗号分隔，数组长度必须固定

```c
bool[3] b = [false, false && true || false, true || (1 > 2)];
int[3] c = [72, -4 - 1 - 40, 833 * (99 + 9901) + 8888];
bytes[3] a = [b'ffee', b'11', b'22'];
int[2][3] d = [[11, 12, 13], [21, 22, 23]];
// array demension can be omitted when declared
int[] e = [1, 4, 2];  // e is of type int[3]
int[][] f = [[11, 12, 13], [21, 22, 23]]; // f is of type int[2][3]
```

数组可以使用repeat函数将值置为相同的。

```text
// a == [0, 0, 0]
int[3] a = repeat(0, 3);
```

数组可以使用index进行索引，索引从0开始，如果出现越界则直接判定合约失败。

两个数组可以认为完全相等，如果元素数量相同并且每个元素都相同。

## 结构体类型

结构体是一组变量成员，可以是基本数据结构也可以进行结构体嵌套。

使用数组的时候，直接使用.引用就可以获取成员变量。

类型推断：使用auto关键字将自动推断基本数据类型。

类型别名：可以给特定数据类型起别名。

## 范型

范型可以被定义在library和struct中，使用范型的时候，需要显示声明对应的类型。

```c
library HashedMap<K, V> {
    // user them as function parameter's type
    function set(K k, V v, int idx) {
        ...
    }
}

struct ST<T,P> {
    T t;
    P p;
}

```

## 领域类型

领域类型是基本类型的子类型，主要用于和比特币交易相关的类型，使用领域类型可以增强类型安全性。

- PublicKey：PubKey(b'0200112233445566778899aabbccddeeffffeeddccbbaa99887766554433221100');
- Sig sig = Sig(
  b'3045022100b71be3f1dc001e0a1ad65ed84e7a5a0bfe48325f2146ca1d677cf15e96e8b80302206d74605e8234eae3d4980fcd7b2fdc1c5b9374f0ce71dea38707fccdbd28cf7e41');
- Ripemd160 r = Ripemd160(b'0011223344556677889999887766554433221100');
- PubKeyHash aliceAddress = PubKeyHash(b'0011223344556677889999887766554433221100');
- Sha1 s = Sha1(b'0011223344556677889999887766554433221100');
- Sha256 s = Sha256(b'00112233445566778899aabbccddeeffffeeddccbbaa99887766554433221100');
- SigHashType s = SigHashType(b'01'); SigHashType s = SigHash.ALL | SigHash.ANYONECANPAY;
- SigHashPreimage s = SigHashPreimage(b'0100000028bcef7e73248aa273db19d73');
- OpCodeType s = OpCode.OP_DUP + OpCode.OP_ADD;
- PrivKey privKey = PrivKey(0x00112233445566778899aabbccddeeffffeeddccbbaa99887766554433221100);

## 常量

常量声明之后无法修改

```text
contract Test { 
    const int x;
    
    constuctor(int x) {
        this.x = x
    }
    
    public function equal(const int y) {
        y = 1; // error
        const int a = 36;
        a = 11; // error
    }
}
```

## If  条件

if条件用于控制程序逻辑流，除了bool之外，int和bytes也可以使用if。int 0和byte b'', b'00'会被看作false。

## exit方法

exit方法提前结束函数逻辑，参数可以传入true或者false。

## Code Separator

三个或者更多 * 会插入一个OP_CODESEPARATOR操作符，这个操作会影响签名的计算。

## 访问控制

- Default: no keyword required
- Private
- Public: only applies to functions

| Access Level | Same Contract | Other Contract | Externally |
|--------------|---------------|----------------|------------|
| Default      | Yes           | Yes            | No         |
| Private      | Yes           | No             | No         |
| Public       | Yes           | Yes            | Yes        |
