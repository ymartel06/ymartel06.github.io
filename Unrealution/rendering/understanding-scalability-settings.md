---
title: "Understanding Scalability Settings"
slug: understanding-scalability-settings
type: page
date: 2025-02-17T18:30:01
modified: 2025-02-17T18:30:01
original_url: https://unrealution.com/rendering/understanding-scalability-settings/
---

# Understanding Scalability Settings

## Scalability Groups and Indexes

Unreal Engine provides scalability settings to adjust performance and visual quality across a wide range of hardware. These settings are categorized into groups with predefined index values:

- **Low**: 0
- **Medium**: 1
- **High**: 2
- **Epic**: 3

## Configuring Scalability in Unreal Engine

### Default and Custom Scalability Configuration

The base scalability settings for the engine are found in:

```
Engine\Config\BaseScalability.ini
```

These settings define the default behavior for scalability in Unreal Engine. However, you can override them for your game by creating a custom configuration file:

```
YourGame\Config\DefaultScalability.ini
```

Values are initially taken from `BaseScalability.ini` but can be overridden by defining them in `DefaultScalability.ini`. For example:

```
[FoliageQuality@0]
foliage.DensityScale=0.2
grass.DensityScale=0.2
```

In this case, when **FoliageQuality** is set to **Low (0)**, both foliage and grass density are reduced to **20%** of their full quality.

## Setting Scalability Defaults in a Cooked Build

By default, when you package a game (cooked build), all scalability groups are set to **Epic (3)**. If you want to modify this and use different default values, you must configure a **DeviceProfile** for your platform.

For example, to set all groups to **High (2)** on Windows, create or modify:

```
YourGame\Config\Windows\WindowsDeviceProfiles.ini
```

With the following content:

```
[Windows DeviceProfile]
+CVars=sg.AntiAliasingQuality=2
+CVars=sg.ViewDistanceQuality=2
+CVars=sg.ShadowQuality=2
+CVars=sg.GlobalIlluminationQuality=2
+CVars=sg.ReflectionQuality=2
+CVars=sg.PostProcessQuality=2
+CVars=sg.TextureQuality=2
+CVars=sg.EffectsQuality=2
+CVars=sg.FoliageQuality=2
+CVars=sg.ShadingQuality=2
```

This ensures that all scalability settings default to **High** instead of **Epic**.

## Performance Index Thresholds

Unreal Engine uses **Performance Index Thresholds** to determine the appropriate scalability settings based on the system’s hardware. These thresholds are defined in:

```
Config\DefaultScalability.ini
```

Example:

```
[ScalabilitySettings]
; Adjust thresholds for a high-end 2018 GPU
PerfIndexThresholds_ResolutionQuality="GPU 18 115 350"
PerfIndexThresholds_ViewDistanceQuality="GPU 18 115 250"
PerfIndexThresholds_AntiAliasingQuality="GPU 18 115 500"
PerfIndexThresholds_ShadowQuality="GPU 18 115 500"
PerfIndexThresholds_GlobalIlluminationQuality="GPU 18 115 500"
PerfIndexThresholds_ReflectionQuality="GPU 18 115 350"
PerfIndexThresholds_PostProcessQuality="GPU 18 115 350"
PerfIndexThresholds_TextureQuality="GPU 18 115 250"
PerfIndexThresholds_EffectsQuality="GPU 18 115 350"
PerfIndexThresholds_FoliageQuality="GPU 18 115 250"
PerfIndexThresholds_ShadingQuality="GPU 18 115 250"
```

### How Performance Index Thresholds Work

These thresholds define the quality level a system should use based on its performance index. The format consists of:

- **Performance Index Type**: `CPU`, `GPU`, or `Min` (the lower of the two)
- **Threshold Values**: The numbers determine the quality level:
  - **Below the first value** → Low (0)
  - **Between the first and second** → Medium (1)
  - **Between the second and third** → High (2)
  - **Above the third value** → Epic (3)

## Checking System Performance for Scalability

To check the performance index values of your system, you can use the following console command inside Unreal Engine:

```
SynthBenchmark
```

This command measures CPU and GPU performance, which can help determine the best scalability settings for the target hardware.
