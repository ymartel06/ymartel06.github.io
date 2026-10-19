---
title: "Profiling a Development Build with Unreal Insights: Recommended Launch"
slug: profiling-a-development-build-with-unreal-insights-recommended-launch
type: page
date: 2026-01-28T14:12:50
modified: 2026-07-21T12:04:27
original_url: https://unrealution.com/optimization/profiling-a-development-build-with-unreal-insights-recommended-launch/
---

# Profiling a Development Build with Unreal Insights: Recommended Launch

---

Profiling a **Development** build with **Unreal Insights** is often the best compromise between realism and debuggability. You keep asserts, logging, and symbols, while still getting performance characteristics close to what you’ll see on console devkits.

However, Development builds come with extra overhead that can *pollute* your profiling data if you don’t control it. This article explains a set of **recommended launch arguments**, why they matter, and how to group them logically to get cleaner, more comparable traces.

At the end, you’ll find a full example command line ready to use.

---

## Why Development Builds Need Special Care

Compared to Shipping builds, Development builds include:

- Additional GC verification
- Extra logging
- Ensures and defensive checks
- OS-driven thread scheduling variability on PC

All of these can introduce noise in Unreal Insights traces. The goal of these arguments is **not to “cheat” performance**, but to:

- Reduce artificial overhead
- Improve determinism
- Make PC traces closer to **PS5 / XSX devkit behavior**

---

## 1. Trace Configuration (Unreal Insights)

These arguments define *what* Unreal Insights will capture.

### `-trace=default,task,counters`

Enables the most useful baseline trace channels:

- **default**: Bookmark, Cpu, Frame, Gpu, Log, Region, Screenshot0
- **task**: task graph execution (async work, parallelism)
- **counters**: Add counters

This combination gives excellent visibility into:

- Game thread vs render thread behavior
- Task graph saturation
- Async work stealing and stalls

### `-statnamedevents`

Adds readable stat names to trace events.

Without this, many events appear as opaque IDs in Unreal Insights. With it enabled:

- Scopes map directly to `STAT_*` macros
- Engine and gameplay timings are much easier to interpret
- You spend less time guessing what a scope actually represents

---

## 2. CPU Topology & Determinism (Grouped)

These arguments should always be considered **together**.

### `-corelimit=8`

Limits Unreal Engine to using a fixed number of CPU cores.

### `-processaffinity=8`

Restricts the process to a specific set of CPU cores at the OS level.

#### Why these matter

On PC, Unreal will happily scale across:

- 12, 16, or even 32 logical cores
- SMT / hyperthreading
- OS scheduling quirks

Console devkits (PS5 / XSX) operate under **much more controlled CPU conditions**. By limiting core usage on PC:

- Thread contention becomes more representative
- Task graph behavior is closer to console
- Frame pacing becomes more consistent across machines

**Key rule:**  
👉 Always use the **same values across all profiling machines**. Consistency matters more than picking the “perfect” number.

---

## 3. Garbage Collection Noise Reduction (Grouped)

These arguments target GC-related overhead that is useful for debugging, but harmful for profiling.

### `-NoVerifyGC`

Disables expensive GC verification passes.

### `-DPCvars="gc.VerifyAssumptionsOnFullPurge=0"`

Disables additional assumption checks during full GC purges.

#### Why group these?

Both arguments target **GC validation**, and they should always be enabled together.

In Development builds, GC verification can:

- Add spikes during collection
- Inflate GC time in traces
- Make GC-heavy frames look worse than they really are

For profiling purposes:

- You care about **real GC cost**, not validation overhead
- Validation should be tested separately (QA, soak tests, debug sessions)

These flags make GC behavior much closer to Shipping builds while keeping the rest of Development instrumentation intact.

---

## 4. Garbage Collection Visibility (Optional but Useful)

### `-LogCmds="LogGarbage Verbose"`

Enables verbose GC logging.

This doesn’t directly affect Unreal Insights, but it’s extremely useful when:

- Correlating GC events with frame hitches
- Understanding *why* a GC happened
- Matching log timestamps to trace spikes

Use it selectively—verbose GC logs can get noisy—but it’s invaluable when investigating memory churn.

---

## 5. Ensures & Error Handling Stability

### `-HandleEnsurePercent=0`

Disables probabilistic ensure handling.

By default, ensures can be:

- Throttled
- Randomized
- Handled differently depending on runtime conditions

For profiling, this introduces non-deterministic behavior:

- Some runs trigger ensures
- Others don’t
- Performance characteristics subtly change

Setting this to `0` ensures:

- Predictable behavior
- No hidden cost from ensure handling
- Cleaner comparisons between runs

---

## Full Recommended Command Line

Here’s the complete example with everything combined:

```
-trace=default,task,counters 
-statnamedevents 
-corelimit=8 
-processaffinity=8  
-NoVerifyGC 
-DPCvars="gc.VerifyAssumptionsOnFullPurge=0" 
-LogCmds="LogGarbage Verbose" 
-HandleEnsurePercent=0
```

---
