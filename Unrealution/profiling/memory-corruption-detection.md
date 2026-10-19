---
title: "Memory Corruption Detection"
slug: memory-corruption-detection
type: page
date: 2025-01-02T16:43:34
modified: 2025-01-05T21:25:40
original_url: https://unrealution.com/profiling/memory-corruption-detection/
---

# Memory Corruption Detection

Memory corruption is one of the most challenging types of bugs to diagnose in game development. In Unreal Engine, you can use specific techniques to track down memory corruption, and one effective way is by using the `-stompmalloc` flag in combination with a debugger. This method can help you pinpoint the exact location where the corruption occurs, and in this article, we’ll walk through the steps to set up and use these tools for debugging memory issues.

### What is Memory Corruption?

Memory corruption occurs when data in memory is unintentionally overwritten or misused, leading to undefined behavior, crashes, or subtle bugs. In Unreal Engine, this could happen in a variety of places, such as in unmanaged memory or during interaction with the engine’s complex systems. Identifying the exact moment and location of memory corruption is crucial, and Unreal Engine offers a handy debugging tool to make this process easier.

### Using the stompmalloc flag

Unreal Engine provides an allocator called `StompMalloc`, which is designed specifically to detect memory corruption. When enabled, it slows down execution significantly but helps catch corruption by triggering a breakpoint whenever an issue is detected.

1. **How to use `-stompmalloc`:**
   - To use this allocator, launch your game or application with the `-stompmalloc` command-line argument. You can do this by modifying your shortcut or adding it directly to the command line:

```
YourGame.exe -stompmalloc
// or
YourGame.exe -stomp2malloc
```

1. **Why is execution slower?**
   - The `-stompmalloc` flag causes the engine to perform more rigorous checks on memory operations. This means that execution will be significantly slower, but the trade-off is that you’ll be able to identify memory corruption with a greater level of precision. As soon as corruption is detected, the debugger will break, providing you with valuable insight into what went wrong.
2. **What happens when corruption is detected?**
   - When the memory corruption occurs, Unreal Engine will hit a breakpoint in the debugger. This breakpoint will trigger just after the corruption happens, giving you a snapshot of the state of the program at the moment the corruption was detected.

### Attaching the debugger

1. **Attach your debugger:**
   - You can use any standard debugger, such as Visual Studio, to attach to your running executable.
2. **Breakpoints and Call Stacks:**
   - Once the debugger catches the memory corruption, you’ll want to examine the call stack. The call stack will give you a history of function calls leading up to the point where corruption occurred, helping you identify which function or section of code is responsible.
3. **What to look for:**
   - Focus on the functions listed in the call stack. The bottom-most entry is typically the function where the corruption happened, and earlier entries may indicate which parts of your code were interacting with that memory at the time. This can help you trace back to the root cause.
4. **Additional debugging tips:**
   - While you’re examining the call stack, be sure to check for any patterns. For instance, you may notice that memory is being freed or written to in an unexpected order or that certain objects are being manipulated after they’ve already been deallocated.
