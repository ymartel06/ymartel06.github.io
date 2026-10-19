---
title: "Performance Profiling in Unreal Engine 5: Best Practices and Setup"
slug: performance-profiling-in-unreal-engine-5-best-practices-and-setup
type: page
date: 2025-09-16T17:45:14
modified: 2025-09-16T17:45:14
original_url: https://unrealution.com/optimization/performance-profiling-in-unreal-engine-5-best-practices-and-setup/
---

# Performance Profiling in Unreal Engine 5: Best Practices and Setup

Performance profiling is one of the most important steps in shipping a smooth Unreal Engine 5 game. While *Development* builds are convenient for everyday debugging, they do **not** represent the real runtime behavior of your game. If you want to measure CPU and GPU usage accurately, you should always profile in the **Test** configuration.

## Why Profile in Test and Not Development?

Development builds include a lot of debugging features, editor hooks, and runtime checks that will skew performance data. They’re designed to make your workflow safer and easier, not to be representative of final shipping performance.

The **Test** configuration, on the other hand, is much closer to a *Shipping* build but still allows you to selectively enable profiling tools. This ensures your captures reflect the performance players will actually see, while giving you enough visibility to investigate bottlenecks.

---

## Enabling Stats in Test Builds

By default, the Test configuration disables most of Unreal’s stat systems. To make them available, add this line to your **YourGame.Target.cs** file:

```
TargetRules.GlobalDefinitions.Add("FORCE_USE_STATS=1");
```

This re-enables Unreal’s `stat` commands and related profiling features. Be aware that stats add a slight overhead, but they are invaluable for diagnosing CPU usage, memory, and rendering behavior.

---

## Enabling GPU Profiling in Test

To capture GPU performance markers in Test builds, you also need:

```
bAllowProfileGPUInTest = true;
```

With this set, GPU timings will show up properly in **Unreal Insights**, renderdoc captures, or the built-in `stat gpu` command.

---

## Draw Event Debugging

Unreal can also emit draw events for materials and lights, which show up in GPU captures. These are useful when diagnosing rendering bottlenecks, though they do add some cost:

```
r.ShowMaterialDrawEvents=1
r.Shadow.Virtual.ShowLightDrawEvents=1
```

These flags will annotate GPU captures with material and light draw calls, making it much easier to pinpoint expensive shaders or lighting setups.

---

## Automating Profiling with the CSV Profiler

For automated testing or large-scale performance analysis, Unreal’s **CSV Profiler** is the right tool. It lets you programmatically capture profiling data into `.csv` files that can be processed outside of Unreal.

In C++ code:

```
FCsvProfiler::Get()->BeginCapture();
// ... gameplay or test section ...
FCsvProfiler::Get()->EndCapture();
```

The CSV files will be written to:

```
Client\Profiling\
```

---

### Enabling Extra GPU Stats in CSV

By default, GPU stats may be limited in CSV captures. To expand them, enable:

```
IConsoleManager::Get().FindConsoleVariable(TEXT("r.GPUCsvStatsEnabled"));
```

This ensures GPU timings are recorded in the CSV alongside CPU stats, giving you a holistic view of performance.

---

## Conclusion

When profiling Unreal Engine 5 projects, always:

1. Use **Test builds** for representative performance numbers.
2. Enable stats and GPU profiling selectively for visibility.
3. Use draw events for deeper rendering investigations.
4. Automate profiling with the **CSV Profiler** for repeatability and regression tracking.

By setting up your Test configuration correctly, you’ll avoid misleading data and gain the insights you need to ship a performant game.
