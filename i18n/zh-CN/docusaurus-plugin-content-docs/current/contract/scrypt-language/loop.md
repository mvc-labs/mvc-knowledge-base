---
sidebar_position: 3
---
# 循环

介绍如何在Scrypt合约中使用循环。

比特币脚本内部没有提供循环功能，sCrypt实现循环的方式是重复loop内部的数据脚本n次。

```c
loop (maxLoopCount) [: loopIndex]{
    loopBody
}

loop (10) {x = x * 2;} // 等效于x = x * 2;展开十次
```
由于循环展开是发生在编译期，因此循环次数必须在编译期已知，并且是常量。

## 循环增量

循环增量是指在循环体内对循环变量进行递增或递减操作。

```c
// int[3][4] matrix;
// i & j are induction variables
loop (3) : i {
    // i is the outer loop index
    loop (4) : j {
        // j is the inner loop index
        matrix[i][j] = i + j;
    }
}
```

## 循环内部可以增加if条件
```c
loop (3) {
    // place condition here
    if (x < 8) {
        x = x * 2;
    }
}
```

## 退出循环

在循环体内使用如下方式退出循环：

```c
bool done = false;
loop (3) {
    if (!done) {
        x = x * 2;
        if (x >= 8) {
            done = true;
        }
    }
}
```
