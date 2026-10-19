---
title: "Invalidate Cached Shaders"
slug: invalidate-cached-shaders
type: page
date: 2025-01-03T18:51:46
modified: 2025-01-03T18:54:55
original_url: https://unrealution.com/rendering/invalidate-cached-shaders/
---

# Invalidate Cached Shaders

### Understanding r.InvalidateCachedShaders in Unreal Engine

When working with Unreal Engine, optimizing shaders and managing their cache is critical for performance and workflow efficiency. One powerful tool at your disposal is the `r.InvalidateCachedShaders` console command, which forces the engine to recompile shaders by invalidating the existing cache. This article explores how to use this command effectively and an alternative approach through manual GUID changes.

#### Shaders caching

Shader caching in Unreal Engine is designed to reduce the overhead of recompiling shaders every time you make changes. However, there are times when manual intervention is necessary to ensure that the shaders reflect the latest changes.

#### Using r.InvalidateCachedShaders

The `r.InvalidateCachedShaders` console command is a quick way to invalidate all cached shaders during runtime. This is especially useful when:

- You’ve made changes to global shader files.
- Debugging complex shader issues.
- Testing how changes affect performance and visual fidelity.

To use this command, open the in-game console (`~` key by default) and type:

```
r.InvalidateCachedShaders
```

Upon execution, Unreal Engine will discard all cached shaders and recompile them from scratch. Be aware that recompiling shaders can be time-consuming, especially in large projects with numerous materials.

#### Manually changing the GUID in ShaderVersion.ush

Another method to invalidate shader caches is by modifying the GUID in the `ShaderVersion.ush` file. This file is located at:

```
Engine\Shaders\Public\ShaderVersion.ush
```

The file contains a unique identifier (GUID) that the engine uses to track shader versions. By changing this GUID, you force Unreal Engine to treat all shaders as outdated, triggering a recompile.

##### Steps to Change the GUID:

1. Navigate to the `ShaderVersion.ush` file in your Unreal Engine installation directory.
2. Open the file in a text editor.
3. Locate the GUID value, which typically looks like this:

```
#pragma message("UESHADERMETADATA_VERSION 226C088E-0B2F-4768-AB17-6C8932D98D03")
```

4. Modify the GUID to a new value. For example:

```
#pragma message("UESHADERMETADATA_VERSION 226C088E-0B2F-4768-AB17-6C8932D98D00")
```

5. Save the file and close the editor.
6. Restart the Unreal Editor to trigger the shader recompilation process.

#####
