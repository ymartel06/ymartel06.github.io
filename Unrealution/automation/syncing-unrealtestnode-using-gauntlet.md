---
title: "Syncing UnrealTestNode Using Gauntlet"
slug: syncing-unrealtestnode-using-gauntlet
type: page
date: 2025-02-11T18:08:01
modified: 2025-02-11T18:08:01
original_url: https://unrealution.com/automation/syncing-unrealtestnode-using-gauntlet/
---

# Syncing UnrealTestNode Using Gauntlet

When running automated tests using Gauntlet in Unreal Engine, it is sometimes necessary to synchronize multiple roles before executing certain test steps. This article explains how to use the `DeferredLaunch` flag in `UnrealTestRole` to manage this synchronization effectively.

## Understanding `DeferredLaunch`

The `DeferredLaunch` flag allows specific test roles to be launched at a later time instead of immediately when the test begins. This is useful when one role (e.g., the main client) needs to reach a certain state before launching another role.

```
DeferredLaunch: Whether this role will be launched by the test node at a later time, typically during TickTest(). By default, all roles are launched immediately.
```

By setting `DeferredLaunch = true`, the test node will not launch the role immediately but will instead wait until it is explicitly triggered within `TickTest`.

## Waiting for a Log Signal from the Main Client

To synchronize roles, you can make the main client print a specific log message, which `UnrealTestNode` can listen for before proceeding with the deferred role launch.

```
ClientLogParser = new(SessionInstance.ClientApps.First().GetLogBufferReader());
ClientLogParser.ReadStream();
```

Here, `ClientLogParser` reads the log buffer from the first client application. You can then use methods like `GetLogLinesContaining()` or `GetLogLinesMatchingPattern()` to check for specific log messages that indicate when the deferred role should be launched.

## Launching the Deferred Role

Once the expected log message is detected, you can launch the deferred role using the following function:

```
private void LaunchDeferredRole(UnrealSessionInstance SessionInstance)
{
    IEnumerable<RoleInstance> DeferredRoles = SessionInstance.DeferredRoles;
    if (DeferredRoles.Count().Equals(1))
    {
        try
        {
            SessionInstance.LaunchDeferredRole(DeferredRoles.First().Role);
        }
        catch
        {
            throw new AutomationException("Couldn't launch client");
        }
    }
    else
    {
        MarkTestComplete();
        SetUnrealTestResult(Gauntlet.TestResult.Failed);
    }
}
```

This function checks for deferred roles and launches the first available one. If no deferred roles are found or an error occurs, the test is marked as failed.
