# 🚗 ClearQuote React Native Sample Project

This repository contains a **sample React Native application** demonstrating how to integrate the **ClearQuote SDK** into a React Native project.

The project serves as a **reference implementation** for third-party developers who want to integrate ClearQuote’s native SDKs into their React Native apps.

---

## 📱 Supported Platforms

- **iOS** — ClearQuote iOS SDK integrated via native bridge
- **Android** — ⚠️ **Implementation pending** (React Native app shell only; ClearQuote Android SDK not integrated yet)
- React Native (New Architecture compatible)
- Tested on **iOS 16+**

---

## 🧰 Prerequisites

### Shared
- Node.js **22.11+**
- React Native CLI
- Valid **ClearQuote SDK key**

### iOS
- macOS
- Xcode **16.1+**
- CocoaPods **1.15.2+**

### Android
- To be implemented

---

## 📦 Project Setup

### Clone the repository
```bash
git clone https://github.com/clearquotetech/react-native-sample-project.git
cd react-native-sample-project
```

### Install JS dependencies
```bash
npm install
# or
yarn install
```

---

## 🍎 iOS

### Install dependencies
```bash
cd ios
pod install
cd ..
open ios/MyApp.xcworkspace
```

### Required permissions
Add the following to `ios/MyApp/Info.plist`:
```xml
<key>NSCameraUsageDescription</key>
<string>For capturing vehicle images</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Location is used to tag vehicle inspection photos.</string>
```

### Run the app
```bash
npm run ios
# or
npx react-native run-ios
```

### Native bridge
The iOS native bridge (`ClearQuoteModule`) exposes ClearQuote SDK methods to React Native:

| Method | Description |
|--------|-------------|
| `initSDK(key)` | Initialize the SDK with your key |
| `startInspection(clientAttrs, inputDetails, userFlowParams)` | Start a vehicle inspection |
| `logout()` | Log out and clear session |
| `getDealerCode()` | Return the current dealer code |
| `isSDKInitialized()` | Check whether the SDK is initialized |

Additional ClearQuoteSDK APIs can be exposed through the native bridge as needed. See the [ClearQuote iOS SDK integration guide](https://docs.google.com/document/d/1eqHUg3L7mqA4E8vqslzpLoqoC_8qxv7wTUn_JneKQmY/edit?tab=t.0#heading=h.7jb0pjtyuhqy) AND [ClearQuote SDK Android integration doc](https://docs.google.com/document/d/1qaoIRasNhM7pLG6hKX2aLnKaZr35R-_8GSMnZpDO9Sw/edit?tab=t.0#heading=h.7jb0pjtyuhqy). for the full list of supported methods.

---

## 🤖 Android

> ⚠️ **Status: Implementation pending**
>
> ClearQuote Android SDK integration (native module / bridge) is **not available yet**. The `android/` folder is a standard React Native shell only. SDK init, inspection, and related APIs will not work on Android until this work lands.

---

## 🧪 Sample Usage
```js
import { ClearQuoteSDK } from './src/ClearQuoteSDK';

await ClearQuoteSDK.initSDK('YOUR_SDK_KEY');
await ClearQuoteSDK.startInspection(clientAttrs, inputDetails, userFlowParams);
```

---

## 📬 Support

- https://github.com/clearquotetech/cq-ios-sdk/issues
- sharath@clearquote.io
- sanket@clearquote.io
- akhila@clearquote.io

---

## 📜 License
For reference and integration purposes only.
