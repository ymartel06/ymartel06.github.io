---
title: "Enabling logs for Test and Shipping configurations"
slug: enabling-logs-for-test-and-shipping-configurations
type: page
date: 2025-01-05T15:44:02
modified: 2025-01-05T15:44:03
original_url: https://unrealution.com/packaging/enabling-logs-for-test-and-shipping-configurations/
---

# Enabling logs for Test and Shipping configurations

When developing games in Unreal Engine, having robust debugging tools and detailed logs can make all the difference during testing and shipping. A useful yet often overlooked feature is enabling logging in Test and Shipping configuration. This is achieved by setting the `bUseLoggingInShipping` variable to `true` in the game’s Target.cs file.

#### Why Enable Logs in Shipping?

By default, logs are disabled in Test and Shipping builds to optimize performance and minimize output. However, there are scenarios where enabling logs in these builds can be beneficial:

1. **Debugging**: Having access to logs allows you to diagnose issues that occur exclusively in the Shipping configuration.
2. **Test Automation**: Unreal Engine’s automation framework, Gauntlet, heavily relies on logs to compute test results. Enabling logging ensures that critical data is available to evaluate the success or failure of automated tests.

#### How to Enable Logs in Test and Shipping

To enable logging, follow these steps:

1. Open the Target.cs file for your game project. For instance, this file might be named `MyGame.Target.cs`.
2. Locate or add the `bUseLoggingInShipping` property in the constructor of your target class.
3. Set the property to `true` as shown below:

```
public class MyGameTarget : TargetRules
{
    public MyGameTarget(TargetInfo Target) : base(Target)
    {
        Type = TargetType.Game;

        // Enable logging in test / shipping builds
        bUseLoggingInShipping = true;
    }
}
```

4. Save the changes and rebuild your project.

#### Considerations

While enabling logging in Shipping builds is advantageous for specific use cases, it’s essential to weigh the potential trade-offs:

- **Performance Impact**: Logs can introduce minor performance overhead. Ensure that the logging level is appropriately configured to minimize unnecessary output.
- **Security**: Logs can sometimes contain sensitive information. Always sanitize logs before enabling them in public builds.
