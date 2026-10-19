---
title: "Remote Debugging using Visual Studio"
slug: remote-debugging-using-visual-studio
type: page
date: 2025-01-15T13:50:18
modified: 2025-01-15T13:50:18
original_url: https://unrealution.com/debugging/remote-debugging-using-visual-studio/
---

# Remote Debugging using Visual Studio

Debugging a crash or assertion remotely in Unreal Engine can be a powerful way to understand and address issues in non-shipping builds. By configuring your project to prompt for a remote debugger, you can attach a debugger at critical moments and analyze the process in real time.

---

#### Enabling Remote Debugging

##### Via Configuration File

You can enable remote debugging by adding the following settings to your `DefaultEngine.ini` file:

To prompt for remote debugging on crashes:

```
[Engine.ErrorHandling]
bPromptForRemoteDebugging=True
```

To prompt for remote debugging on ensures:

```
[Engine.ErrorHandling]
bPromptForRemoteDebugOnEnsure=True
```

##### Via Command Line

Alternatively, you can enable the functionality through command-line arguments:

- To prompt for remote debugging on crashes: `-PromptRemoteDebug`
- To prompt for remote debugging on ensures: `-PromptRemoteDebugEnsure`

---

#### Configuring the Remote Debugging Service

The remote debug service can be configured to wait for the debugger to attach before launching the title. This setup allows you to set breakpoints in early initialization code, such as `MyGame.exe`.

1. **Install the Required Visual Studio Extension** Install the [Microsoft Child Process Debugging Power Tool](https://marketplace.visualstudio.com/items?itemName=vsdbgplat.MicrosoftChildProcessDebuggingPowerTool) extension for Visual Studio on your development host.
2. **Enable Child Process Debugging** Once installed, enable child process debugging by navigating to:
   - `Debug > Other Debug Targets > Child Process Debugging Settings`
3. **Attach to the Remote Process** Use Visual Studio’s debugging interface to attach to the remote process:
   - Open the “Attach to Process” dialog.
   - Click on “Find…” in the “Connection target” field to locate the remote machine or process.

---

#### Debugging Workflow

1. Configure your project with the desired `DefaultEngine.ini` settings or command-line arguments.
2. Launch your non-shipping build.
3. Wait for the remote debugging prompt to appear.
4. Attach your Visual Studio debugger to the prompted process.
5. Debug as needed, setting breakpoints and inspecting the state of the application.

By leveraging these tools, you can efficiently debug crashes or assertions remotely and gain deeper insights into issues occurring in non-shipping builds.
