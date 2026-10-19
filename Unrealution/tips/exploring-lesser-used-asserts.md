---
title: "Exploring Lesser-Used Asserts"
slug: exploring-lesser-used-asserts
type: page
date: 2025-01-08T13:43:33
modified: 2025-01-08T13:43:33
original_url: https://unrealution.com/tips/exploring-lesser-used-asserts/
---

# Exploring Lesser-Used Asserts

Unreal Engine provides an extensive set of debugging tools, including assertions that help developers catch issues early during development. While many are familiar with `check()` and `ensure()`, there are several lesser-known assertions that serve unique purposes. This article will dive into four such asserts: `checkNoEntry()`, `checkNoReentry()`, `checkNoRecursion()`, and `unimplemented()`. Understanding their use cases can improve code clarity, stability, and maintainability.

---

### 1. `checkNoEntry()`

**Purpose**: Halts execution if the line is ever hit.  
**Use Case**: This is a specialized version of `check(false)` intended for marking code paths that should never be executed.

```
void ProcessInput(int Input)
{
    switch (Input)
    {
    case 1:
        DoSomething();
        break;
    case 2:
        DoSomethingElse();
        break;
    default:
        checkNoEntry(); // Ensure no unexpected inputs
    }
}
```

**Why Use It?**  
`checkNoEntry()` signals explicitly that the code path is unreachable, making it easier to understand intent and catch logic errors early.

---

### 2. `checkNoReentry()`

**Purpose**: Halts execution if the line is hit more than once.  
**Use Case**: Detects unintended re-entry into a code block, which can happen with multithreading or improper flow control.

```
void PerformCriticalOperation()
{
    checkNoReentry(); // Ensure this function is not re-entered
    // Perform operation
}
```

**Why Use It?**  
This assert is invaluable for debugging multithreaded code or ensuring that functions critical to state integrity are not called recursively.

---

### 3. `checkNoRecursion()`

**Purpose**: Halts execution if the line is hit more than once without leaving the current scope.  
**Use Case**: Prevents unintended recursion, especially in complex algorithms or event-driven code.

```
void UpdateGraph(GraphNode* Node)
{
    checkNoRecursion(); // Ensure no recursive calls
    for (auto* Neighbor : Node->Neighbors)
    {
        UpdateGraph(Neighbor); // Recursive operation
    }
}
```

**Why Use It?**  
Recursion can lead to stack overflows if not carefully managed. This assert helps developers catch such issues during testing.

---

### 4. `unimplemented()`

**Purpose**: Halts execution if the line is hit.  
**Use Case**: Marks virtual functions that must be overridden by derived classes.

```
class BaseCharacter
{
public:
    virtual void PerformAction()
    {
        unimplemented(); // This function must be overridden
    }
};
```

**Why Use It?**  
Using `unimplemented()` explicitly communicates that the base implementation should never be called, reducing ambiguity and enforcing proper usage of virtual functions.
