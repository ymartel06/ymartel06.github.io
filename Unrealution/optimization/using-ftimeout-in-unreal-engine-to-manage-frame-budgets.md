---
title: "Using FTimeout in Unreal Engine to Manage Frame Budgets"
slug: using-ftimeout-in-unreal-engine-to-manage-frame-budgets
type: page
date: 2025-08-12T14:26:27
modified: 2025-08-12T14:27:42
original_url: https://unrealution.com/optimization/using-ftimeout-in-unreal-engine-to-manage-frame-budgets/
---

# Using FTimeout in Unreal Engine to Manage Frame Budgets

---

When working on performance-sensitive code in Unreal Engine whether it’s in AI, procedural generation, or heavy background processing, you often need to respect a strict time budget per frame.

Traditionally, you might have handled this by manually capturing the start time, calculating the end time, and checking if you’re still within your budget:

```
const double StartTime = FPlatformTime::Seconds();
const double EndTime = StartTime + BudgetSeconds;

if (FPlatformTime::Seconds() < EndTime)
{
    // Still within the budget
}
```

While this works, it’s a bit verbose and easy to get wrong. Fortunately, Unreal Engine offers a more convenient approach: `FTimeout`.

---

### Introducing `FTimeout`

`FTimeout` is a small utility that encapsulates a timeout duration and makes it easy to:

- Track how much time has elapsed.
- Check whether the timeout has expired.
- Avoid manual `StartTime`/`EndTime` calculations.

To use it, include the header:

```
#include "Misc/Timeout.h"
```

You can create a timeout with a duration specified as an `FTimespan`:

```
UE::FTimeout Timeout(FTimespan::FromSeconds(TimeoutInSeconds));
```

---

### Measuring Elapsed Time

Once the timeout is created, you can check how long it has been running:

```
const double ElapsedMs = Timeout.GetElapsedTime().GetTotalMilliseconds();
```

This can be useful for debugging or for adaptive algorithms that adjust based on how much time is left.

---

### Checking Expiration

Instead of manually comparing timestamps, `FTimeout` provides a straightforward method:

```
if (Timeout.IsExpired())
{
    // Time budget exceeded
}
else
{
    // Still within the time limit
}
```

---

### Why Use `FTimeout`?

- **Cleaner code** – No need to manually store and compare timestamps.
- **Less error-prone** – Avoids common mistakes with unit conversions or wrong variable naming.
- **More expressive** – Your code reads closer to intent: “check if timeout expired” instead of “compare two doubles.”

---

**Example in Context**

```
UE::FTimeout Timeout(FTimespan::FromSeconds(0.001)); // 1 ms budget

while (!Timeout.IsExpired())
{
    // Perform work until time runs out
}
```

This makes it crystal clear that the loop will only run for 1 millisecond, without juggling `StartTime` and `EndTime` variables.
