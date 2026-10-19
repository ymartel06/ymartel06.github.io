---
title: "Optimizing Horde Parallelization with BuildGraph’s RunEarly Property"
slug: optimizing-horde-parallelization-with-buildgraphs-runearly-property
type: page
date: 2025-02-05T13:37:09
modified: 2025-02-05T13:37:09
original_url: https://unrealution.com/automation/optimizing-horde-parallelization-with-buildgraphs-runearly-property/
---

# Optimizing Horde Parallelization with BuildGraph’s RunEarly Property

When working with **Horde** for build automation in Unreal Engine, ensuring efficient parallelization is crucial for reducing build times. One of the key ways to improve task distribution is by utilizing the **`RunEarly`** property in BuildGraph scripts.

## Understanding `RunEarly`

The **`RunEarly`** property allows a node to start execution as soon as its dependencies are met, without waiting for all dependencies of its assigned agent to be completed. This can significantly enhance parallelization, especially when dealing with multiple tasks assigned to a single agent.

### Default Behavior vs. `RunEarly` Optimization

By default, **Horde waits for all dependencies of an agent to be resolved before executing any assigned nodes.** This can lead to inefficient scheduling where tasks that could have started earlier are blocked by unrelated dependencies of the same agent.

With `RunEarly="true"`, a node can start executing as soon as **its specific dependencies** are resolved, leading to better resource utilization and reduced idle time for build agents.

## Example: Implementing `RunEarly`

Below is an example of a BuildGraph script that utilizes `RunEarly` to optimize execution order:

```
<Agent Name="$(CompileNodeName)" Type="$(CompileAgentType)">
    <Node Name="$(CompileNodeName)" Requires="$(ToolsNodeName)" Produces="#$(CompileNodeName) Binaries" RunEarly="true">
        <Compile Target="$(ProjectName)" Platform="$(Platform)" Configuration="$(Configuration)" />
    </Node>
    
    <Node Name="$(ExtraNodeName)" Requires="$(AnotherNodeName)">
        <!-- AnotherAction -->
    </Node>
</Agent>
```

### Breakdown of the Script

- The **`CompileNodeName`** node requires `ToolsNodeName` and produces binary output.
- `RunEarly="true"` ensures that **as soon as `ToolsNodeName` is available, compilation can begin**, rather than waiting for all of the agent’s dependencies.
- Another node, **`ExtraNodeName`**, has a different dependency (`AnotherNodeName`) and does not use `RunEarly`, meaning it will follow the standard scheduling behavior.
