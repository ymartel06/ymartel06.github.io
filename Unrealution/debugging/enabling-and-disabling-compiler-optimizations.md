---
title: "Enabling and Disabling Compiler Optimizations"
slug: enabling-and-disabling-compiler-optimizations
type: page
date: 2025-01-03T16:43:48
modified: 2025-01-03T16:44:18
original_url: https://unrealution.com/debugging/enabling-and-disabling-compiler-optimizations/
---

# Enabling and Disabling Compiler Optimizations

In game development, performance is crucial, and Unreal Engine offers a range of tools and techniques to help developers optimize their code. One such tool is the ability to control compiler optimizations, which can help fine-tune how your code is compiled for performance. In Unreal Engine, this is achieved using the `PRAGMA_ENABLE_OPTIMIZATION` directive, which gives you control over optimization levels in specific parts of your code.

In this article, we’ll explore how `PRAGMA_ENABLE_OPTIMIZATION` works, why and when you might want to use it, and how to enable or disable compiler optimizations within your Unreal Engine project.

---

### What is compiler optimization?

Compiler optimization refers to techniques used by compilers to make code run more efficiently, both in terms of speed and memory usage. These optimizations can range from simple ones like removing unused variables to more complex ones such as loop unrolling, inlining functions, and simplifying expressions.

While compiler optimizations generally improve performance, there are scenarios where you may want to **disable optimizations** temporarily to achieve specific results, like debugging, profiling, or working with specific low-level operations.

### PRAGMA_ENABLE_OPTIMIZATION: Overview

In Unreal Engine, **`PRAGMA_ENABLE_OPTIMIZATION`** is a preprocessor directive that allows you to control the application of compiler optimizations. By default, Unreal Engine (with the compiler help) applies optimizations to your code to improve runtime performance, but sometimes, you may want to disable these optimizations for debugging purposes or to ensure certain parts of your code behave predictably.

The counterpart to `PRAGMA_ENABLE_OPTIMIZATION` is `PRAGMA_DISABLE_OPTIMIZATION`, which can be used to disable optimizations for specific code sections.

When you enable optimizations using `PRAGMA_ENABLE_OPTIMIZATION`, you’re essentially telling the compiler to resume applying optimizations after they have been temporarily disabled.

### Common pitfalls to avoid

PRAGMA_ENABLE_OPTIMIZATION is cross platform. However

```
#pragma optimize("", off)
```

doesn’t work with all compilers. You must avoid using it.

### Disabling code optimization for a module

In Unreal Engine, another way to control compiler optimizations is through the `OptimizeCode` property in the build configuration, specifically by setting it to `CodeOptimization.Never`. This setting disables all compiler optimizations for the specified build configuration, ensuring that the compiler does not attempt to optimize the code for speed or size. It’s particularly useful when you need to debug or profile code without the compiler altering the behavior of the code through optimizations such as inlining, constant propagation, or loop unrolling. Setting `OptimizeCode = CodeOptimization.Never` is typically used in development builds or when working on sections of code where you require predictable behavior, such as when debugging low-level systems, analyzing specific function calls, or inspecting memory layouts. However, be cautious when using this setting in production builds, as it can result in lower performance, since optimizations that could enhance execution speed are not applied.

### Disabling code optimization when using adaptive unity builds

`bAdaptiveUnityDisablesOptimizations` is a build configuration setting in Unreal Engine designed to disable compiler optimizations when Adaptive Unity builds are enabled, facilitating easier debugging. Compiler optimizations can make debugging more challenging by rearranging code, inlining functions, or altering variable lifetimes, which obscures the relationship between source code and compiled output. By setting `bAdaptiveUnityDisablesOptimizations` to `true`, developers can ensure a closer correlation between their code and its compiled behavior, aiding in the debugging process. This option is configured in the `BuildConfiguration.xml` file. To enable it, add the following entry:

```
<Configuration>
<bAdaptiveUnityDisablesOptimizations>true</bAdaptiveUnityDisablesOptimizations>
</Configuration>
```
