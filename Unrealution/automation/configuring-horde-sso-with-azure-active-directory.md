---
title: "Configuring Horde SSO with Azure Active Directory"
slug: configuring-horde-sso-with-azure-active-directory
type: page
date: 2025-10-08T14:20:53
modified: 2025-10-08T14:20:53
original_url: https://unrealution.com/automation/configuring-horde-sso-with-azure-active-directory/
---

# Configuring Horde SSO with Azure Active Directory

When setting up **Horde**, Epic’s build orchestration system, in a production environment, enabling **Single Sign-On (SSO)** makes authentication smoother and more secure. Horde supports **OpenID Connect (OIDC)**, which integrates seamlessly with **Azure Active Directory (Azure AD)**.

This guide explains how to configure Horde to use your Azure SSO.

---

### 1. Create an App Registration in Azure

1. Go to your **Azure Portal** → **Azure Active Directory** → **App registrations**.
2. Click **New registration** and give your application a descriptive name (e.g., *HordeSSO*).
3. Under **Supported account types**, you can leave the default (“Accounts in this organizational directory only”).
4. In **Redirect URI**, choose **Mobile and desktop applications**.

You’ll need to add at least **two Redirect URIs**:

```
http://my-horde-endpoint/signin-oidc
http://localhost:8749/ugs.client
```

> 💡 The second URL (`http://localhost:8749/ugs.client`) is used by **Unreal Game Sync (UGS)**, so make sure to include it even if you’re primarily using the Horde web interface.

Finally, under **Authentication**, scroll down and **enable “Allow public client flows”**. This allows desktop clients (like UGS) to use the same authentication flow as web clients.

---

### 2. Configure Horde

In your Horde installation, open or edit your `server.json` file and set the following values:

```
"AuthMethod": "OpenIdConnect",
"OidcClientId": "{Application (client) ID}",
"OidcAuthority": "https://login.microsoftonline.com/{Directory (tenant) ID}/v2.0",
"OidcAudience": "aud:{Application (client) ID}"
```

You can find the `{`variables`}` in your Azure dashboard under:

**Azure Active Directory → App registrations → [Your App] → Overview**

---

### 3. (Optional) Enable OIDC Debugging

If you encounter issues during authentication, Horde provides a debug mode for OIDC:

```
"OidcDebugMode": true
```

This will output detailed logs to help you identify configuration or authentication problems.

---

### 4. Test Your Setup

Once configured:

- Restart your Horde server.
- Open your Horde URL in a browser and verify that it redirects to your Microsoft login page.
- If using Unreal Game Sync, confirm that it can authenticate with Azure as well.

---
