---
title: "How to Display Custom Stats in Unreal Engine"
slug: how-to-display-custom-stats-in-unreal-engine
type: page
date: 2025-06-19T14:22:56
modified: 2025-06-19T14:22:56
original_url: https://unrealution.com/tips/how-to-display-custom-stats-in-unreal-engine/
---

# How to Display Custom Stats in Unreal Engine

Unreal Engine provides a robust system for displaying runtime statistics via the `stat` console command system. While there are many built-in stat groups like `stat unit`, `stat fps`, or `stat memory`, you can also **create your own custom stats** and have them rendered directly on the screen. This is especially useful for debugging systems, visualizing internal states, or giving quick insights to developers or QA.

In this guide, we’ll walk through the process of registering and rendering your own stat using the `AddEngineStat` function.

---

## Step 1: Understanding `AddEngineStat`

The core API for adding a stat renderer is available via `UEngine::AddEngineStat`, defined in `Engine.h`. Here’s the function signature:

```
void AddEngineStat(
	const FName& InCommandName,
	const FName& InCategoryName,
	const FText& InDescriptionString,
	FEngineStatRender InRenderFunc = nullptr,
	FEngineStatToggle InToggleFunc = nullptr,
	const bool bInIsRHS = false
);
```

- `InCommandName`: The name of the stat command (e.g., `STAT_MyStat`)
- `InCategoryName`: The category (e.g., `STATCAT_MyStat`)
- `InDescriptionString`: Text shown in the `stat list` command output
- `InRenderFunc`: Your custom render function
- `InToggleFunc`: Optional toggle behavior function
- `bInIsRHS`: Whether to draw the stat on the right-hand side of the screen

---

## Step 2: Registering Your Custom Stat

In your class (typically in an `Init`, `PostLoad`, or similar initialization method), you can register your custom stat if `GEngine` is valid:

```
if (GEngine)
{
	GEngine->AddEngineStat(
		TEXT("STAT_MyStat"),
		TEXT("STATCAT_MyStat"),
		LOCTEXT("MyStatDesc", "My Description"),
		UEngine::FEngineStatRender::CreateUObject(this, &UMyFile::RenderStat),
		nullptr,
		false // Draw on left side
	);
}
```

This makes your stat available via the in-game console:

```
stat MyStat
```

You can also use `stat list` to see your new stat listed alongside its description.

---

## Step 3: Implementing the Stat Renderer

Your stat rendering function must match this signature:

```
int32 UMyFile::RenderStat(
	UWorld* World,
	FViewport* Viewport,
	FCanvas* Canvas,
	int32 X,
	int32 Y,
	const FVector* ViewLocation,
	const FRotator* ViewRotation)
```

Here’s a basic example that displays a cyan-colored string at the specified coordinates:

```
int32 UMyFile::RenderStat(
	UWorld* World,
	FViewport* Viewport,
	FCanvas* Canvas,
	int32 X,
	int32 Y,
	const FVector* ViewLocation,
	const FRotator* ViewRotation)
{
	UFont* Font = FPlatformProperties::SupportsWindowedMode()
		? GEngine->GetSmallFont()
		: GEngine->GetMediumFont();

	const int32 RowHeight = FMath::TruncToInt(Font->GetMaxCharHeight() * 1.1f);
	const FString Title = TEXT("My Super Title");

	Canvas->DrawShadowedString(X, Y, *Title, Font, FColor::Cyan);
	Y += RowHeight;

	return Y;
}
```

This function is called every frame while the stat is active. You can use it to draw multiple lines, update data in real-time, or even visualize debug info like performance metrics or gameplay data.

---

## Final Thoughts

Creating custom stats in Unreal Engine is a powerful way to surface internal data without building full UI systems. Whether you’re debugging AI behavior, monitoring gameplay logic, or tracking rendering performance, a well-placed `stat` command can save you time and help your team spot issues faster.

Don’t forget to unregister your stat if needed when cleaning up (though `AddEngineStat` currently has no built-in removal function—you may need to wrap registration in a singleton or static check to avoid duplicates in editor workflows).
