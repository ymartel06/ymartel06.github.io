---
title: "Understanding the Relationship Between BuildGraph Agent Names and Horde Agents"
slug: understanding-the-relationship-between-buildgraph-agent-names-and-horde-agents
type: page
date: 2025-02-04T12:58:52
modified: 2025-02-04T12:58:52
original_url: https://unrealution.com/automation/understanding-the-relationship-between-buildgraph-agent-names-and-horde-agents/
---

# Understanding the Relationship Between BuildGraph Agent Names and Horde Agents

## Defining Agent Types in BuildGraph

When setting up a BuildGraph script, you must define agent types explicitly. This is done using the `Type` attribute inside an `Agent` tag:

```
<Agent Name="Compile Clients" Type="CompileWin64">
```

If you run the script locally, this definition has no direct impact. However, when executed using [Unreal Horde](https://dev.epicgames.com/documentation/en-us/uefn/horde), the agent type plays a crucial role in selecting a compatible agent. If no matching agent is available, the build will fail.

## Agent Type Mapping in Horde

To ensure agents are properly matched in Horde, agent types must be defined inside the build stream configuration file (typically named something like `Project-Stream.stream.json`). This file includes an `agentTypes` section that maps agent types to specific pools and workspaces:

```
"agentTypes":
{
    "Win64":
    {
        "pool": "win-ue5",
        "workspace": "Full"
    },
    "CompileWin64":
    {
        "pool": "win-ue5",
        "workspace": "Full"
    }
}
```

The `workspace` parameter refers to a workspace type defined elsewhere in the same file.

## Defining Workspace Types

Horde uses workspace types to determine how Perforce workspaces should be set up and managed for different agents. These are defined in the `workspaceTypes` section:

```
"workspaceTypes":
{
    "Full":
    {
        "identifier": "MyStream",
        "method": "name=managedWorkspace&preferNativeClient=true"
    },
    "Incremental":
    {
        "identifier": "MyStreamI",
        "incremental": true,
        "method": "name=managedWorkspace&preferNativeClient=true"
    }
}
```

- `Full` workspaces ensure that everything is fully synchronized for the build.
- `Incremental` workspaces avoid cleaning workspace contents after each build to optimize performance.

## Configuring Agent Pools in Horde

Agents in Horde are grouped into pools based on their platform and capabilities. These pools are defined inside `globals.json`:

```
"pools": [
    {
        "name": "Win-UE5",
        "condition": "Platform == 'Win64'",
        "color": "Blue"
    },
    {
        "name": "Win-UE5-GPU",
        "condition": "Platform == 'Win64' && Interactive == true",
        "color": "Blue"
    },
    {
        "name": "Mac-UE5",
        "condition": "Platform == 'Mac'",
        "color": "Green"
    },
    {
        "name": "Linux-UE5",
        "condition": "Platform == 'Linux'",
        "color": "Orange"
    }
]
```

When an agent connects to Horde, it is assigned to one or more pools based on the defined conditions. An agent may belong to multiple pools, allowing it to be used flexibly across different build tasks.
