---
title: "Shader Debugging Workflow for a Custom Platform"
slug: shader-debugging-workflow-for-a-custom-platform
type: page
date: 2025-05-05T13:37:24
modified: 2025-05-05T13:37:24
original_url: https://unrealution.com/rendering/shader-debugging-workflow-for-a-custom-platform/
---

# Shader Debugging Workflow for a Custom Platform

Debugging shaders is a critical part of validating and improving your rendering pipeline, especially when developing for a **custom platform**. Whether you’re tracking down rendering bugs or validating performance-critical shaders, having access to **shader symbols** greatly improves visibility into what the GPU is doing. This article explains how to enable and manage shader symbol generation for your custom platform.

---

## Why Shader Symbols Matter

Shader symbols give you a way to correlate compiled shader code with your source HLSL. This makes GPU debugging and profiling (using tools like RenderDoc or platform-specific GPU debuggers) significantly more effective.

Shader symbols allow:

- Viewing original HLSL lines during GPU debugging
- Matching compiled shaders back to the pipeline state
- Easier cross-referencing between tools and Unreal’s shader pipeline

---

## Enabling Shader Symbols for Your Custom Platform

To enable shader symbol generation for a custom platform, you’ll need to update the platform-specific engine configuration file. This is typically located at:

```
MyGame/Platforms/CustomPlatform/Config/CustomPlatformEngine.ini
```

Add the following entries under the `[ShaderCompiler]` section:

```
[ShaderCompiler]
; Enable generation of shader symbols (required for debugging)
r.Shaders.Symbols=1

; Generate shader symbols in memory (intermediate step)
r.Shaders.GenerateSymbols=1

; Write generated symbols to disk
r.Shaders.WriteSymbols=1

; Optional: Combine all symbols into a single zip archive
;r.Shaders.WriteSymbols.Zip=1
```

These settings ensure the symbols are both generated and stored locally for debugging.

---

## Enabling Symbols on the Build Machine

If your shaders are compiled as part of a distributed build system or CI process, you can enable symbol generation specifically for the build machine to ensure all built shaders include symbol data. Add the following to the same `.ini` file:

```
[ShaderCompiler_BuildMachine]
r.Shaders.GenerateSymbols=1
r.Shaders.WriteSymbols=1
r.Shaders.WriteSymbols.Zip=1
```

This setup ensures:

- Symbols are always generated in automated builds
- They are written to disk for later inspection
- Symbols are archived into a `.zip` file to simplify storage and retrieval

---

## Optional Tips

- **Zip output**: Enabling `r.Shaders.WriteSymbols.Zip=1` helps reduce disk clutter and simplifies artifact upload for CI systems.
- **Platform-specific symbols**: Symbols are typically generated for each shader platform (e.g., Vulkan, DirectX). Ensure you’re compiling for the correct `ShaderFormat` relevant to your custom platform.
- **Cooked Builds**: Symbols can be preserved and distributed alongside cooked builds for debugging on target hardware.

---
