---
title: "Improving Minidump on Windows"
slug: improving-minidump-on-windows
type: page
date: 2025-01-05T15:57:21
modified: 2025-01-05T15:57:21
original_url: https://unrealution.com/debugging/improving-minidump-on-windows/
---

# Improving Minidump on Windows

### Improving Minidump Utility in Unreal Engine on Windows

Minidumps are an essential tool for debugging, particularly when a crash occurs in a deployed application. By default, Unreal Engine uses the `MiniDumpNormal` type for generating minidumps. This default setting includes just enough information to capture stack traces for all existing threads in a process. While this is sufficient for basic debugging, it often lacks critical information necessary for deeper analysis.

In this article, we will explore how to enhance the utility of minidumps by modifying the Unreal Engine’s settings to include more detailed information.

#### Understanding Minidump Types

The default `MiniDumpNormal` type provides:

- Stack traces for all threads.
- Minimal additional context.

While this keeps the dump file size small, it excludes useful details such as handle data and indirectly referenced memory, which can be invaluable for diagnosing complex issues.

#### Modifying the Minidump Type in Unreal Engine

To generate more informative minidumps, you can modify the `WindowsPlatformCrashContext.cpp` file in the Unreal Engine source code. Specifically, adjust the `MINIDUMP_TYPE` to include additional flags:

```
MINIDUMP_TYPE MinidumpType = (MINIDUMP_TYPE)(MiniDumpWithHandleData | MiniDumpWithIndirectlyReferencedMemory);
```

Here’s what these additional flags do:

- **MiniDumpWithHandleData**: Includes high-level information about operating system handles that are active when the minidump is made. This can help in identifying resource leaks or other handle-related issues.
- **MiniDumpWithIndirectlyReferencedMemory**: Includes memory pages referenced by local variables or other stack memory. This provides greater insight into the memory state of the application at the time of the crash.

#### Considerations for Minidump Size

Keep in mind that adding more information to the minidump will increase its size. While the enhanced data is often worth the trade-off, it’s crucial to balance the level of detail with practical constraints such as storage and upload bandwidth.

#### Learning More

For a complete list of minidump options and their descriptions, refer to the [official Microsoft documentation](https://learn.microsoft.com/en-us/windows/win32/api/minidumpapiset/ne-minidumpapiset-minidump_type).
