---
title: "Setting a Define Inside a BuildGraph Script"
slug: setting-a-define-inside-a-buildgraph-script
type: page
date: 2025-01-31T14:15:12
modified: 2025-01-31T14:15:12
original_url: https://unrealution.com/automation/setting-a-define-inside-a-buildgraph-script/
---

# Setting a Define Inside a BuildGraph Script

When working with Unreal Engine’s BuildGraph system, you may need to define custom preprocessor macros (defines) at build time. While Unreal Build Tool (UBT) allows defines to be injected via command-line arguments, the process differs slightly depending on whether you’re using a `BuildCookRun` or `Compile` node within BuildGraph.

## Injecting Defines into Unreal Build Tool (UBT)

UBT provides a straightforward way to inject defines using command-line arguments:

- Global define: `-Define:YOUR_DEFINE=WhatYouWant`
- Project-level define: `-ProjectDefine:YOUR_DEFINE=WhatYouWant`

## Setting a Define in BuildGraph

### Using Defines in `BuildCookRun`

For `BuildCookRun`, you can pass the define to UBT using the `-ubtargs` parameter when invoking `BuildCookRun`:

```
<Command Name="BuildCookRun" Arguments="-ubtargs=&quot;-Define:YOUR_DEFINE=WhatYouWant&quot;"/>
```

This ensures that the define is passed correctly to UBT when running the BuildCookRun process.

### Using Defines in `Compile` Nodes

For `Compile` nodes, you can directly inject the define using the `Arguments` attribute:

```
<Compile Arguments="-Define:YOUR_DEFINE=WhatYouWant" />
```

This approach simplifies the process, ensuring that the define is included when compiling the specified modules within BuildGraph.
