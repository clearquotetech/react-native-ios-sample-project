# 🚗 ClearQuote React Native iOS Sample Project

This repository contains a **sample React Native iOS application** demonstrating how to integrate the **ClearQuote iOS SDK** into a React Native project.

The project serves as a **reference implementation** for third-party developers who want to integrate ClearQuote’s native iOS SDK into their React Native apps.

---

## 📱 Supported Platform

- **iOS only**
- React Native (New Architecture compatible)
- Tested on **iOS 16+**

---

## 🧰 Prerequisites

- macOS
- Xcode **15.4+**
- Node.js **18+**
- CocoaPods **1.15+**
- React Native CLI
- Valid **ClearQuote SDK key**

---

## 📦 Project Setup

### Clone the repository
```bash
git clone https://github.com/clearquotetech/react-native-ios-sample-project.git
cd react-native-ios-sample-project
```

### Install JS dependencies
```bash
npm install
# or
yarn install
```

### Install iOS dependencies
```bash
cd ios
pod install
open react-native-ios-sample-project.xcworkspace
```

---

## ⚙️ iOS Configuration

### Required Permissions
Add the following to `Info.plist`:
```xml
<key>NSCameraUsageDescription</key>
<string>For capturing vehicle images</string>
```

---

## 🔌 Native Bridge Integration

Native bridge exposes ClearQuote SDK methods to React Native.

### Exposed Methods
- `initSDK(key)`
- `startInspection()`
- `logout()`

---

## ▶️ Running the App
```bash
npx react-native run-ios
```

---

## 🧪 Sample Usage
```js
import { NativeModules } from 'react-native';

const { ClearQuoteModule } = NativeModules;

await ClearQuoteModule.initSDK('YOUR_SDK_KEY');
await ClearQuoteModule.startInspection();
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
