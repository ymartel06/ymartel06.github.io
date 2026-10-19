---
title: "Signing Windows Binaries Using BuildGraph"
slug: signing-windows-binaries-using-buildgraph-in-unreal-engine
type: page
date: 2025-03-09T23:24:07
modified: 2025-03-09T23:24:51
original_url: https://unrealution.com/automation/signing-windows-binaries-using-buildgraph-in-unreal-engine/
---

# Signing Windows Binaries Using BuildGraph

## Introduction

In Unreal Engine, BuildGraph provides a powerful mechanism to automate build processes, including signing Windows binaries. This article will guide you through setting up a BuildGraph script to sign `.exe` and `.dll` files using Microsoft’s `signtool.exe`.

## Prerequisites

Before proceeding, ensure you have:

- A valid code signing certificate installed on your machine.
- `signtool.exe` available (part of the Windows SDK).
- Unreal Engine with BuildGraph support enabled.

## Writing the BuildGraph Script

The following `Sign.xml` script automates the signing process for all `.exe` and `.dll` files in a given game output directory.

```
<?xml version='1.0' ?>
<BuildGraph xmlns="http://www.epicgames.com/BuildGraph" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.epicgames.com/BuildGraph ../../Engine/Build/Graph/Schema.xsd" >
  <Option Name="GameOutputDir" DefaultValue="" Description ="Game directory"/>
  <Option Name="ExceptFiles" DefaultValue="" Description ="Patterns to exclude from the matched list"/>
  
  <Agent Name="Target Platforms Win64" Type="CompileWin64">
    <Node Name="Sign Game Windows" Produces="#Game Windows Signed">
      <Tag Files="\$(GameOutputDir)/.../*.exe;\$(GameOutputDir)/.../*.dll" Except="\$(ExceptFiles)" With="#Exe And Dll"/>
      <Log Message="Produced files:" Files="#Exe And Dll"/>
      <Sign Files="#Exe And Dll" Tag="#Game Windows Signed"/>
    </Node>
  </Agent>
</BuildGraph>
```

### Explanation of the Script

- **Options**: `GameOutputDir` defines the game directory, and `ExceptFiles` allows excluding specific files.
- **Tagging Files**: The `Tag` command identifies all `.exe` and `.dll` files in the output directory, excluding specified patterns.
- **Logging**: The `Log` command outputs the matched files.
- **Signing**: The `Sign` task applies code signing to the tagged files and assigns a new tag for tracking.

## Executing the BuildGraph Script

Use the following command to execute the signing process:

```
BuildGraph -target="Sign Game Windows" -script=Sign.xml -set:GameOutputDir="C:\YourGamePath" -set:ExceptFiles=""
```

Ensure `signtool.exe` is correctly configured on your system and that your signing certificate is installed.

## Understanding the Sign Task

The `Sign` task supports various attributes:

```
<xs:complexType name="SignTaskType">
  <xs:attribute name="Files" type="tns:BalancedStringType" use="required" />
  <xs:attribute name="Description" type="tns:BalancedStringType" use="optional" />
  <xs:attribute name="Tag" type="tns:TagListType" use="optional" />
  <xs:attribute name="Parallel" type="tns:BooleanType" use="optional" />
  <xs:attribute name="If" type="tns:BalancedStringType" use="optional" />
</xs:complexType>
```

Notable attributes:

- **Files**: Specifies which files to sign.
- **Description**: Optional text for logging.
- **Tag**: Assigns a tag to signed files.
- **Parallel**: Allows parallel execution.
- **If**: Provides conditional execution.

## Additional Resources

For more details on `signtool.exe`, refer to the official documentation: [SignTool.exe](https://learn.microsoft.com/en-us/dotnet/framework/tools/signtool-exe)

## Conclusion

Automating binary signing using BuildGraph in Unreal Engine simplifies the deployment process and ensures compliance with security best practices. By integrating this script into your build pipeline, you can systematically sign all necessary files without manual intervention.
