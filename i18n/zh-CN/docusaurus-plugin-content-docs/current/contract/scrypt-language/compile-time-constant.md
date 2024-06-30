---
sidebar_position: 6
---
# 编译时常量

介绍编译期常量 (Compile Time Constant)  的概念和使用方法。

编译时常量（CTC）是可以在编译时计算的值。编译时常量有四种类型：

- 字面量
- 归纳变量
- 用字面量初始化的合约的静态常量属性
- 静态常量函数参数

有几种情况下只能使用编译时常量：

- 循环边界
- 数组大小
- 使用索引操作符写入数组元素
- 声明为静态常量的函数参数，例如`reverseBytes(bytes b, static const int size)`中的`size`和`repeat(T e, static const int size)`

```c
contract CTC {
    static const int N = 4;
    static const int LOOPCOUNT = 30;

    // A 不是 CTC，因为右边是一个表达式，而不是字面量
    static const int A = 2 + 1;
    // B 不是 CTC，因为它不是静态的
    const int B;

    // FC 是在函数参数中声明的 CTC
    // 它可以在这个函数内使用，包括在它之后的参数和返回类型
    function incArr(static const int FC, int[FC] x) : int[FC] {
        loop(FC): i {
            x[i] += i; // 归纳变量 CTC
        }
        return x;
    }

    public function unlock(int y) {
        int[N] arr0 = [1, 2, 3, 4];
        // 使用 `N` 初始化函数 `incArr` 的 CTC 参数 `FC`
        int[N] arr1 = this.incArr(N, repeat(1, N));
        loop(N): i {
            require(arr0[i] == arr1[i]);
        }

        int z = 0;
        loop (LOOPCOUNT) {
            if (z < y) z += 4;
        }
        require(y == 1);
    }
}
```

注意：顺序很重要：在声明函数参数时，不允许使用 `const static`，但在声明属性时允许。
