---
sidebar_position: 3
---

# Loops

Introduction to using loops in sCrypt contracts.

Bitcoin Script does not provide built-in loop functionality. sCrypt implements loops by repeating the loop's internal
data script n times.

```c
loop (maxLoopCount) [: loopIndex]{
    loopBody
}

loop (10) {x = x * 2;} // Equivalent to unfolding x = x * 2; ten times
```

Since loop unfolding occurs at compile time, the number of iterations must be known at compile time and must be a
constant.

## Loop Increment

Loop increment refers to the operation of incrementing or decrementing the loop variable within the loop body.

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

## Adding Conditions Inside the Loop

```c
loop (3) {
    // place condition here
    if (x < 8) {
        x = x * 2;
    }
}
```

## Exiting the Loop

To exit the loop within the loop body, use the following method:

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
