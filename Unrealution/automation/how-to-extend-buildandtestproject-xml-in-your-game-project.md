---
title: "How to Extend BuildAndTestProject.xml in Your Game Project"
slug: how-to-extend-buildandtestproject-xml-in-your-game-project
type: page
date: 2026-02-24T18:17:57
modified: 2026-02-24T18:21:27
original_url: https://unrealution.com/automation/how-to-extend-buildandtestproject-xml-in-your-game-project/
---

# How to Extend BuildAndTestProject.xml in Your Game Project

When working with Unreal Engine’s BuildGraph system, the default pipeline defined in `BuildAndTestProject.xml` already provides a solid foundation for building, cooking, testing, and packaging your project.

However, real productions often require additional steps:

- Custom validation
- Game-specific automation
- Extra packaging logic
- Internal tools
- Uploading artifacts
- Console-specific steps

Instead of modifying the engine’s `BuildAndTestProject.xml` (which would break on engine upgrades), the correct approach is to **extend it inside your game project**.

This article explains how to do it cleanly and safely.

---

## Where to Put Your Custom Graph

Your custom BuildGraph file should live in:

```
Game\Build\Graph\BuildAndTestExtended.xml
```

This keeps:

- Engine graph files untouched
- Game-specific logic versioned with the project
- The pipeline upgrade-safe

---

# Understanding `BuildAndTestProject.xml`

The engine file:

```
Engine/Build/Graph/Tasks/BuildAndTestProject.xml
```

Declares:

- Default options
- Core build targets
- Test targets
- An aggregate named:

```
BuildAndTest $(ProjectName)
```

This aggregate is the entry point for the default project pipeline.

We will:

1. Include this graph
2. Add additional requirements
3. Create a new aggregate that extends it

---

# Extending the Graph

Here is the complete example:

```
<?xml version='1.0' ?>
<BuildGraph xmlns="http://www.epicgames.com/BuildGraph" 
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
            xsi:schemaLocation="http://www.epicgames.com/BuildGraph ../../../Engine/Build/Graph/Schema.xsd" >

	<!-- Additional game specific options and property -->
	<Include Script="Inc/MyCustomOptions.xml" />

	<!-- This will declare an aggregate called BuildAndTest -->
	<Property Name="DefaultProjectName" Value="MyGame" />
	<Property Name="DefaultProjectPath" Value="MyGame" />
	<Property Name="DefaultEditorPlatforms" Value="Win64" />
	<Property Name="DefaultTargetConfigurations" Value="Development" />
	<Include Script="../../../Engine/Build/Graph/Tasks/BuildAndTestProject.xml" />

	<!-- Add BuildAndTest project target node as the base requirement -->
	<Property Name="BuildAndTestExtendedRequirements" 
	          Value="BuildAndTest $(ProjectName)" />

	<!-- Custom pipeline that runs after BuildAndTestProject.xml -->
	<Include Script="Inc/MyCustomPipeline.xml" />
		
	<!-- Define the final aggregated build command -->
	<Aggregate Name="BuildAndTestExtended $(ProjectName)" 
	           Requires="$(BuildAndTestExtendedRequirements)" />

</BuildGraph>
```
