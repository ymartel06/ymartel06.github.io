---
title: "Debugging Asset References During Cook in Unreal Engine"
slug: debugging-asset-references-during-cook-in-unreal-engine
type: page
date: 2026-05-19T14:53:42
modified: 2026-05-19T14:53:42
original_url: https://unrealution.com/packaging/debugging-asset-references-during-cook-in-unreal-engine/
---

# Debugging Asset References During Cook in Unreal Engine

When tracking down unexpected cooked assets in Unreal Engine, one of the most useful hidden debugging options is the `-cookshowinstigators=true` argument.

By default, the cook process only tells you *what* asset is being cooked. It does not explain *why* that asset was included. In large projects, especially with indirect references, plugins, or accidentally hard-linked content, this can make debugging cook size and dependency issues extremely painful.

You can enable detailed reference tracing with:

```
-run=Cook -cookshowinstigators=true
```

When enabled, the cooker prints the instigator responsible for each asset being added to the cook. This helps identify:

- Unexpected hard references
- Assets pulled in through Blueprint dependencies
- Plugin content being cooked unintentionally
- Circular or indirect asset chains
- Why a supposedly unused asset still appears in packaged builds

Example cook command:

```
UnrealEditor-Cmd.exe MyProject.uproject -run=Cook -TargetPlatform=Win64 -cookshowinstigators=true
```

The output log will now include additional lines explaining which package or object requested each asset.

This argument is especially useful when:

- Optimizing package size
- Investigating long cook times
- Cleaning unused content
- Debugging Asset Manager rules
- Tracking dependency explosions after a refactor

Because the output can become very verbose, it is usually best used on focused cooks or while reproducing a specific issue rather than during normal CI packaging workflows.
