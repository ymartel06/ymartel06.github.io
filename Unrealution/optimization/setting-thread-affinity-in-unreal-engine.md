---
title: "Setting Thread Affinity"
slug: setting-thread-affinity-in-unreal-engine
type: page
date: 2025-01-24T13:47:27
modified: 2025-01-24T13:47:52
original_url: https://unrealution.com/optimization/setting-thread-affinity-in-unreal-engine/
---

# Setting Thread Affinity

When developing high-performance games or applications in Unreal Engine, optimizing thread usage can make a significant difference. One powerful optimization tool is setting thread affinity to allocate specific threads to particular CPU cores. This can help maximize performance by reducing contention and ensuring critical threads get the processing power they need.

#### Understanding Thread Affinity

Thread affinity specifies which CPU cores a thread is allowed to run on. By default, threads can execute on any core, but in scenarios where certain threads (like the Game Thread) require consistent and predictable performance, it is beneficial to limit their execution to specific cores.

#### Default Thread Affinity Configuration

The default thread affinity in Unreal Engine can be configured in the platform-specific configuration file. For instance, on a custom platform named `MySecretPlatform`, you can find the configuration in the following file:

```
\Engine\Platforms\MySecretPlatform\Config\MySecretPlatformEngine.ini
```

An example configuration might look like this:

```
[/Script/Engine.Engine]
.ThreadConfigs=Task:TPri_Normal:0x3e
```

Here is a breakdown of this configuration:

- **ThreadName**: `Task` – This specifies the thread type.
- **ThreadPriority**: `TPri_Normal` – The priority assigned to this thread.
- **AffinityMask**: `0x3e` – A hexadecimal bitmask that defines the cores the thread can run on.

#### Decoding the Affinity Mask

The affinity mask `0x3e` in binary is `00111110`. Each bit represents a core, starting with core 0 on the rightmost side. A value of `1` indicates the thread is allowed to execute on that core. For `0x3e`, the thread can execute on cores 1, 2, 3, 4, and 5, but **not** on core 0.

Core 0 is often reserved for the **Game Thread** (`GT`) to ensure it has consistent performance without interference from other threads.

#### Available Thread Names

Unreal Engine uses several named threads, and you can set affinity for each one as needed:

- **GT**: Game Thread
- **RT**: Render Thread
- **RHI**: Render Hardware Interface Thread
- **Task**: General Task Threads
- **TaskBP**: Task Blueprints

#### Thread Priority Options

You can also specify the priority of each thread. Unreal Engine provides the following priority levels:

- `TPri_TimeCritical`
- `TPri_Highest`
- `TPri_AboveNormal`
- `TPri_Normal` (default)
- `TPri_SlightlyBelowNormal`
- `TPri_BelowNormal`
- `TPri_Lowest`

Choose an appropriate priority based on the thread’s importance to your application.

#### Practical Example

To reserve core 0 exclusively for the Game Thread and allow a task thread to run only on cores 1 to 5, you would configure the `.ini` file as follows:

```
[/Script/Engine.Engine]
.ThreadConfigs=GT:TPri_Highest:0x1
.ThreadConfigs=Task:TPri_Normal:0x3e
```

- **GT** is restricted to core 0 (`0x1` = `00000001`).
- **Task** is restricted to cores 1 through 5 (`0x3e` = `00111110`).
