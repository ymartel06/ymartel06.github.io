---
title: "Wait For Debugger"
slug: wait-for-debugger
type: page
date: 2025-01-02T18:48:23
modified: 2025-01-03T16:47:02
original_url: https://unrealution.com/debugging/wait-for-debugger/
---

# Wait For Debugger

### What is the -WaitForDebugger argument?

The `-WaitForDebugger` argument tells Unreal Engine to intentionally pause the execution of your application right after it starts, waiting for a debugger to attach. This can be incredibly useful when you want to start debugging from the very beginning of your application’s execution, or when you need to debug initialization issues that occur before the debugger is typically attached.

### How to use the -WaitForDebugger argument

To use the `-WaitForDebugger` argument, you need to add it to the command line when launching your Unreal Engine executable. This can be done in several ways depending on how you are running your game or application.

**Via Command Line (Standalone):**

- If you’re running the Unreal Engine game executable directly, simply add the `-WaitForDebugger` argument to the command line like this:

```
YourGame.exe -WaitForDebugger
```

### Why use `-WaitForDebugger`?

Using the `-WaitForDebugger` argument can be particularly beneficial in a number of debugging scenarios:

1. **Start Debugging Early:**
   - When running a game, you might want to attach the debugger at the very start of the application to capture early issues—especially if the crash or issue occurs right after startup or during early initialization.
2. **Detecting Early Game Crashes:**
   - If your game crashes before the debugger can attach (for example, during the loading screen or in the first few frames), `-WaitForDebugger` ensures the debugger attaches before the crash, so you can investigate the exact point of failure.
3. **Debugging Initialization Code:**
   - Certain issues may occur in early game initialization, such as memory allocation problems, misconfigured game settings, or issues with game data loading. Using `-WaitForDebugger` allows you to start debugging right at the first frame or step, before the game fully runs.
4. **Remote Debugging:**
   - If you’re debugging on a different machine, console, or device, the `-WaitForDebugger` flag can ensure that the game will pause waiting for you to attach the debugger, which is especially useful in situations where the game starts on one machine but you want to debug it from another.

### Step-by-Step: How to attach a debugger after launch

1. **Launch Your Game with `-WaitForDebugger`:**
   - Run your game or application with the `-WaitForDebugger` flag, either through the command line, Unreal Editor, or shortcut as mentioned above.
2. **The Application Will Pause:**
   - When the game starts, it will immediately pause execution and wait for the debugger to attach. You’ll see a message in the console or log saying something like “Waiting for debugger…”.
3. **Attach Your Debugger:**
   - Open your debugger of choice (e.g., Visual Studio or another IDE with debugging support) and attach it to the running process.
     - In Visual Studio, go to **Debug > Attach to Process** and select your game’s executable from the list of running processes.
4. **Resume Execution:**
   - Once the debugger is attached, you can resume the game’s execution from the point where it was paused. From here, you can set breakpoints, inspect memory, or investigate the call stack to analyze any issues that occur during startup or initialization.

### Use cases for -WaitForDebugger

- **Memory Corruption Debugging:** If you’re trying to track down an elusive memory corruption that might occur during startup or in early memory allocations, attaching the debugger at the start can help you catch it as soon as it happens.
- **Loading Screen Issues:** If there’s a bug or crash right after the loading screen or during the initialization phase (before gameplay begins), `-WaitForDebugger` ensures you can investigate it from the start.
- **Crash on Startup:** Some crashes may happen early in the program’s life cycle (e.g., in the main thread or before the first frame). This argument can prevent those crashes from eluding your debugger.
- **Platform-Specific Issues:** When debugging on specific platforms (e.g., console or mobile), the game may start up and immediately hit a crash or error. The `-WaitForDebugger` argument ensures you can debug that error before the game continues.
