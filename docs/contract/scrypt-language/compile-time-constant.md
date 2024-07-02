---
sidebar_position: 6
---

# Compile Time Constants

An introduction to the concept and usage of Compile Time Constants (CTCs).

Compile Time Constants (CTCs) are values that can be calculated at compile time. There are four types of compile time
constants:

- Literals
- Induction variables
- Static constant properties of a contract initialized with literals
- Static constant function parameters

There are several cases where only compile time constants can be used:

- Loop boundaries
- Array sizes
- Writing to array elements using the indexing operator
- Declaring static constant function parameters, such as `size` in `reverseBytes(bytes b, static const int size)`
  and `repeat(T e, static const int size)`

```c
contract CTC {
    static const int N = 4;
    static const int LOOPCOUNT = 30;

    // A is not a CTC because the right-hand side is an expression, not a literal
    static const int A = 2 + 1;
    // B is not a CTC because it is not static
    const int B;

    // FC is declared as a CTC in the function parameter
    // It can be used within this function, including in parameters and return types declared after it
    function incArr(static const int FC, int[FC] x) : int[FC] {
        loop(FC): i {
            x[i] += i; // Induction variable CTC
        }
        return x;
    }

    public function unlock(int y) {
        int[N] arr0 = [1, 2, 3, 4];
        // Using `N` to initialize the CTC parameter `FC` of the function `incArr`
        int[N] arr1 = this.incArr(N, repeat(1, N));
        loop(N): i {
            require(arr0[i] == arr1[i]);
        }

        int z = 0;
        loop(LOOPCOUNT) {
            if (z < y) z += 4;
        }
        require(y == 1);
    }
}
```

Note: Order matters: when declaring function parameters, `const static` is not allowed, but it is allowed when declaring
properties.
