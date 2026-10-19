---
title: "Profiling the GPU in Test and Shipping Configurations"
slug: profiling-the-gpu-in-test-and-shipping-configurations
type: page
date: 2025-01-10T13:45:22
modified: 2025-01-10T13:45:22
original_url: https://unrealution.com/rendering/profiling-the-gpu-in-test-and-shipping-configurations/
---

# Profiling the GPU in Test and Shipping Configurations

---

Profiling the GPU is an essential step in optimizing the performance of your Unreal Engine projects. While profiling is straightforward in the Development configuration, enabling GPU profiling in Test and Shipping configurations requires specific configurations. This article outlines the steps to set up and execute GPU captures in these configurations.

---

### Enabling GPU Profiling in Test and Shipping Configurations

To enable GPU profiling in Test or Shipping configurations, you need to modify the target build settings in your `YourGame.Target.cs` file. Unreal Engine provides two flags for this purpose:

- **`bAllowProfileGPUInTest`**: Enables GPU profiling in Test builds.
- **`bAllowProfileGPUInShipping`**: Enables GPU profiling in Shipping builds.

Here’s how to set these flags:

```
public class YourGameTarget : TargetRules
{
    public YourGameTarget(TargetInfo Target) : base(Target)
    {
        Type = TargetType.Game;

        // Enable GPU profiling for Test builds
        bAllowProfileGPUInTest = true;

        // Enable GPU profiling for Shipping builds
        bAllowProfileGPUInShipping = true;
    }
}
```

Setting these flags to `true` ensures that GPU profiling tools can function in the specified build configurations. Do not ship your game with ProfileGPU enabled.

---

### Using PIX or RenderDoc for GPU Capture

Both [PIX for Windows](https://devblogs.microsoft.com/pix/) and [RenderDoc](https://renderdoc.org/) are powerful GPU debugging and profiling tools. Here’s how to use them to perform GPU captures in Unreal Engine:

1. **Start the Application with the Required Launch Parameter**:
   - For PIX, use the `-AttachPIX` parameter: `YourGame.exe -AttachPIX`
   - For RenderDoc, use the `-AttachRenderDoc` parameter: `YourGame.exe -AttachRenderDoc`
2. **Attach the Tool to the Application**:
   - Open the respective tool (PIX or RenderDoc) and attach it to your application process.
3. **Initiate a GPU Capture**:
   - Follow the tool’s instructions to start a GPU capture. This will record detailed information about GPU workloads.
4. **Analyze the GPU Capture**:
   - Use the analysis tools provided by PIX or RenderDoc to identify performance bottlenecks and optimize your rendering pipeline.

---

### Best Practices for GPU Profiling in Test and Shipping Configurations

1. **Test in Realistic Scenarios**: Ensure you’re profiling in environments and scenarios that mimic real-world use cases.
2. **Monitor Build Configuration Changes**: Be aware that enabling profiling tools in Test or Shipping builds may have a slight impact on performance. Use these configurations strictly for profiling purposes.
3. **Collaborate with Artists and Designers**: Share insights from GPU profiling with your team to address performance bottlenecks holistically.

---
