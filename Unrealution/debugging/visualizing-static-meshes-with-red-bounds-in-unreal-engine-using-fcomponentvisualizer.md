---
title: "Visualizing Static Meshes with Red Bounds in Unreal Engine Using FComponentVisualizer"
slug: visualizing-static-meshes-with-red-bounds-in-unreal-engine-using-fcomponentvisualizer
type: page
date: 2025-11-30T14:51:05
modified: 2025-11-30T14:51:05
original_url: https://unrealution.com/debugging/visualizing-static-meshes-with-red-bounds-in-unreal-engine-using-fcomponentvisualizer/
---

# Visualizing Static Meshes with Red Bounds in Unreal Engine Using FComponentVisualizer

When working on large scenes in Unreal Engine, it’s often helpful to highlight certain objects visually without altering their actual materials or geometry. For example, you might want to draw a **red bounding box** around meshes that have special metadata, making them easy to spot in the **Editor viewport**.

This is where **FComponentVisualizer** comes in. It’s an editor-only tool that lets you draw custom overlays for components directly in the viewport.

---

## **Why Use FComponentVisualizer?**

- **Non-destructive**: Doesn’t modify materials or assets.
- **Editor-only**: Perfect for debugging or visualization during level design.
- **Lightweight**: Draws simple lines or shapes without heavy rendering overhead.

---

## **Step 1: Create a Visualizer Class**

Start by creating a new editor module (or plugin) and add a class that inherits from `FComponentVisualizer`.

```cpp
// MyStaticMeshComponentVisualizer.h
#include "ComponentVisualizer.h"

class FMyStaticMeshComponentVisualizer : public FComponentVisualizer
{
public:
    virtual void DrawVisualization(
        const UActorComponent* Component,
        const FSceneView* View,
        FPrimitiveDrawInterface* PDI
    ) override;
};
```

---

## **Step 2: Implement the Drawing Logic**

In the `.cpp` file, check if the component is a `UStaticMeshComponent` and whether it has your special tag. Then draw a red wireframe box around its bounds.

```cpp
// MyStaticMeshComponentVisualizer.cpp
#include "MyStaticMeshComponentVisualizer.h"
#include "Components/StaticMeshComponent.h"
#include "Engine/EngineTypes.h"

static FName SpecialTag(TEXT("Special"));

void FMyStaticMeshComponentVisualizer::DrawVisualization(
    const UActorComponent* Component,
    const FSceneView* View,
    FPrimitiveDrawInterface* PDI)
{
    const UStaticMeshComponent* SMC = Cast<UStaticMeshComponent>(Component);
    if (!SMC || !SMC->GetStaticMesh()) return;

    const bool IsSpecial = SMC->ComponentHasTag(SpecialTag) || SMC->GetOwner()->Tags.Contains(SpecialTag);
    if (!IsSpecial) return;

    const FLinearColor Red(1.f, 0.f, 0.f, 1.f);
    const FBoxSphereBounds Bounds = SMC->CalcBounds(SMC->GetComponentTransform());

    // Draw a red wire box around the mesh bounds
    DrawWireBox(PDI, Bounds.GetBox(), Red, SDPG_World);
}
```

---

## **Step 3: Register the Visualizer**

In your editor module’s `StartupModule()`:

```cpp
#include "UnrealEdGlobals.h"
#include "Editor/UnrealEdEngine.h"
#include "MyStaticMeshComponentVisualizer.h"

void FMyEditorModule::StartupModule()
{
    if (GUnrealEd)
    {
        TSharedPtr<FComponentVisualizer> Visualizer = MakeShareable(new FMyStaticMeshComponentVisualizer());
        GUnrealEd->RegisterComponentVisualizer(UStaticMeshComponent::StaticClass()->GetFName(), Visualizer);
        Visualizer->OnRegister();
    }
}

void FMyEditorModule::ShutdownModule()
{
    if (GUnrealEd)
    {
        GUnrealEd->UnregisterComponentVisualizer(UStaticMeshComponent::StaticClass()->GetFName());
    }
}
```

---

## **Result**

Now, any `StaticMeshComponent` tagged as `"Special"` will display a **red bounding box** in the editor viewport. This is perfect for debugging metadata-driven workflows without touching your game’s runtime visuals.

---

### **Pro Tips**

- You can draw more than just boxes: spheres, lines, or even mesh outlines using `FPrimitiveDrawInterface`.
- Combine this with `UAssetUserData` or custom metadata for a robust pipeline.
- Keep visualizers lightweight, they run every frame in the editor viewport.
