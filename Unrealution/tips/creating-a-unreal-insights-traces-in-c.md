---
title: "Creating a Unreal Insights Traces in CPP"
slug: creating-a-unreal-insights-traces-in-c
type: page
date: 2025-02-24T20:15:53
modified: 2025-02-24T20:16:17
original_url: https://unrealution.com/tips/creating-a-unreal-insights-traces-in-c/
---

# Creating a Unreal Insights Traces in CPP

Unreal Insights is a powerful profiling tool in Unreal Engine that allows developers to analyze performance and debugging information. To capture trace data for Unreal Insights, you can manually start and stop tracing within your C++ code using `FTraceAuxiliary`. This article explains how to enable, disable, and manage trace channels effectively.

## Starting a Trace

To begin tracing, you need to configure and start the trace using `FTraceAuxiliary::Start`. The example below demonstrates how to do this:

```
#if UE_TRACE_ENABLED
FTraceAuxiliary::FOptions TracingOptions;
TracingOptions.bExcludeTail = true;
FTraceAuxiliary::Start(FTraceAuxiliary::EConnectionType::File, *TraceFileName, nullptr, &TracingOptions);
#endif
```

Here, `TracingOptions.bExcludeTail = true;` ensures that any trace data collected before starting the trace is not included in the final trace file. The trace will be saved to the specified file, and Unreal Insights can later open it for analysis.

## Stopping a Trace

Stopping a trace is straightforward:

```
#if UE_TRACE_ENABLED
FTraceAuxiliary::Stop();
#endif
```

This will finalize the trace file and make it available for inspection in Unreal Insights.

## Disabling All Trace Channels

By default, Unreal Engine enables various trace channels. If you want to disable all active trace channels dynamically, you can iterate over them and disable each one:

```
#if UE_TRACE_ENABLED
UE::Trace::EnumerateChannels([](const ANSICHAR* ChannelName, bool bEnabled, void*)
{
    if (bEnabled)
    {
        FString ChannelNameFString(ChannelName);
        UE::Trace::ToggleChannel(ChannelNameFString.GetCharArray().GetData(), false);
    }
}, nullptr);
#endif
```

This snippet iterates over all available channels, checks if they are enabled, and disables them.

## Enabling or Disabling a Specific Trace Channel

Sometimes, you may only want to enable or disable a specific channel. The following example shows how to toggle the `Frame` channel:

```
#if UE_TRACE_ENABLED
UE::Trace::ToggleChannel(TEXT("Frame"), true); // Enable "Frame" channel
#endif
```

A complete list of available trace channels can be found in the [Unreal Insights Reference](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-insights-reference-in-unreal-engine-5).

## Locating and Opening Trace Files

Once the trace is completed, the `.utrace` file can be found in the `Saved/Profiling` directory of your Unreal Engine project. To analyze the recorded data, open the file using Unreal Insights.
