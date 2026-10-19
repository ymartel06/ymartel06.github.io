---
title: "Avoiding Hitches During the First ensure"
slug: avoiding-hitches-during-the-first-ensure
type: page
date: 2025-04-25T13:58:25
modified: 2025-04-25T13:58:25
original_url: https://unrealution.com/tips/avoiding-hitches-during-the-first-ensure/
---

# Avoiding Hitches During the First ensure

---

When debugging in Unreal Engine, the `ensure()` macro is a powerful tool to detect and report unexpected behavior without crashing the game. However, developers may observe a noticeable hitch when the first `ensure()` is triggered, especially in non-editor builds.

## Why the First `ensure()` Causes a Hitch

On its first invocation, `ensure()` performs a stack trace to help identify where the unexpected condition occurred. To do this, Unreal loads debug symbols and initializes the platform stack walking system. This process is expensive and can cause a significant frame drop—sometimes long enough to trigger a hitch warning or impact gameplay.

This cost only happens once—subsequent calls to `ensure()` are much faster because the symbol loading and stack walking systems are already initialized.

## How to Avoid the Hitch

To avoid the performance impact during gameplay, you can manually initialize the stack walking system early—typically during game startup. This ensures that the necessary systems and symbol resolution are already warmed up before any `ensure()` is triggered in a critical path.

### Solution

Call the following function during your game’s startup sequence:

```
FPlatformStackWalk::InitStackWalking();
```

This proactively initializes the stack walking system, so when an `ensure()` is later triggered, the engine can resolve the stack trace with minimal overhead.

## When to Use This

This technique is particularly useful for:

- Shipping builds where unexpected `ensure()`s can severely affect player experience.
- Games with high frame rate sensitivity, like competitive shooters or VR.
- Debugging sessions where you want smooth behavior despite many `ensure()` calls.

## Caveats

- This does introduce a slight startup cost as the symbol handler is initialized. In most cases, this cost is negligible compared to the runtime benefit.
- Be aware that this does not replace good practice: remove or resolve `ensure()`s in production paths where possible.
