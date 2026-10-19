---
title: "Managing Third-Party Header Warnings"
slug: managing-third-party-header-warnings
type: page
date: 2025-01-14T19:04:01
modified: 2025-01-14T19:04:01
original_url: https://unrealution.com/tips/managing-third-party-header-warnings/
---

# Managing Third-Party Header Warnings

When integrating third-party libraries into an Unreal Engine project, developers often encounter a flurry of compilation warnings originating from the headers of these external dependencies. These warnings can clutter the build logs, making it harder to spot issues in your code. Unreal Engine provides a convenient way to suppress such warnings using the `THIRD_PARTY_INCLUDES_START` and `THIRD_PARTY_INCLUDES_END` macros.

Here’s how you can use these macros effectively:

```
THIRD_PARTY_INCLUDES_START
#include "steam/isteamutils.h"
#include "steam/steam_api_common.h"
THIRD_PARTY_INCLUDES_END
```

By wrapping third-party includes within these macros, Unreal Engine temporarily adjusts the compiler settings to ignore warnings, keeping your build logs clean and focused on your codebase.
