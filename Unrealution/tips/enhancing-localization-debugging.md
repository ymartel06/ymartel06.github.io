---
title: "Enhancing Localization Debugging"
slug: enhancing-localization-debugging
type: page
date: 2025-01-21T18:24:56
modified: 2025-01-21T18:24:56
original_url: https://unrealution.com/tips/enhancing-localization-debugging/
---

# Enhancing Localization Debugging

Localization is a crucial aspect of game development, ensuring that your game resonates with audiences worldwide. Unreal Engine provides robust tools for localizing content, and among these, the `-culture=keys` debug culture stands out as an invaluable feature for developers and QA teams.

#### What is `-culture=keys`?

The `-culture=keys` setting is a debug culture that replaces localized text in your project with its corresponding localization keys. This allows developers and QA teams to:

- Easily identify the localization key for any piece of text in the UI.
- Detect unlocalized text, which will appear in its original format instead of as a key.
- Quickly pinpoint misformatted or mistranslated strings for further investigation.

#### Activating `-culture=keys`

You can enable the `-culture=keys` debug culture using either the console or the command line. Here’s how:

1. **Command Line:** Add `-culture=keys` to the command line arguments when launching your game or editor. For example: `MyGame.exe -culture=keys`

#### Benefits for Localization QA

Using `-culture=keys` streamlines the localization debugging process by making it easier to:

- **Verify String Mappings:** See exactly which localization key corresponds to each piece of text.
- **Spot Missing Localizations:** Unlocalized text is immediately apparent, as it won’t display a localization key.
- **Check Consistency:** Ensure that all keys are correctly mapped to localized content.

#### Best Practices

To make the most of the `-culture=keys` feature:

1. **Include Key Documentation:** Maintain a clear and well-documented localization key structure, making it easier for QA to trace and correct issues.
2. **Test Regularly:** Incorporate `-culture=keys` into regular QA workflows to catch localization issues early.
3. **Coordinate with Translators:** Share insights from the debug culture with translators to improve the overall quality of localized content.
4. **Automate Detection:** Use automation tools to flag unlocalized or improperly localized text during builds.
