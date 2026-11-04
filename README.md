# UppLink AI — Mobile Application

A pixel-perfect, bare **React Native** implementation of the **UppLink AI** onboarding experience, built directly from Figma with fluid spring physics, hardware-accelerated SVG glow auras, and tactile micro-interactions.

---

## ✨ Features

- **4-Screen Onboarding Flow**:
  1. **Login**: Central UppLink emblem with floating gradient badges (asynchronous sinusoidal levitation physics), Google & Apple authentication buttons, and terms footer.
  2. **Language Selection**: Centered living AI Sphere with radiant cyan aura, dynamic location greeting, active language chips (English, Spanish, Italian, French, Arabic, Chinese, Hindi), and tactile feedback.
  3. **Know You Better**: Minimalist holographic AI hero screen with custom typography and smooth progression.
  4. **App Selection**: Real-time search filtering, official app icons (YouTube, Chrome, Reddit, Instagram, Snapchat, Edge, Facebook, TikTok), and animated gradient radio buttons.

- **Physics-Driven Animations**:
  - **Fluid Horizontal Slider**: Native continuous pager with spring physics (`damping: 18`, `stiffness: 110`, `mass: 0.8`, `useNativeDriver: true`) for silky smooth transitions.
  - **Living Holographic AI Sphere**: Floating levitation loop (`translateY: [-7, 7]`) combined with an aura breathing cycle and depth-parallax inner emblem.
  - **Twinkling AI Sparkle Particles**: 4 ambient orbital sparkle stars with staggered cosine twinkle loops.
  - **Tactile Button Physics (`BouncyButton`)**: Snappy micro-scale feedback (`scale: 0.95` on press-in, bouncy recovery on release) across all buttons, chips, and radio items.

- **Hardware-Accelerated Glow**:
  - Custom SVG `RadialGradient` aura that eliminates Android elevation shadow artifacts and renders a vibrant, smooth cyan bloom (`#00E5FF` → `#02D1FE` → `#03A9F4`) across the subtle background grid.

- **Edge-to-Edge & Safe Area Handling**:
  - Dynamic insets supporting camera punch-holes, dynamic island pill cutouts, and bottom gesture bars.
  - Custom bundled font (**Audiowide**) for futuristic brand headers.

---

## 🛠 Tech Stack

- **Framework**: Bare React Native CLI `0.88.1` (no Expo)
- **Core Library**: React `19.3.0`
- **Language**: TypeScript `6.0.3`
- **Vector Graphics**: `react-native-svg` `15.16.0`
- **Layout & Insets**: `react-native-safe-area-context` `5.5.2`
- **Bundler**: Metro
- **Platform**: Android & iOS (Native Projects)

---

## 📁 Project Structure

```
App_dev/
├── android/                   # Native Android project configuration
│   └── app/src/main/assets/   # Bundled assets (Audiowide-Regular.ttf)
├── ios/                       # Native iOS project configuration
├── src/
│   ├── assets/
│   │   ├── images/            # High-res PNG assets (AI sphere, app icons)
│   │   ├── images.ts          # Central typed asset exports
│   │   └── svgs.tsx           # Typed SVG wrappers and vector paths
│   ├── components/
│   │   ├── BouncyButton.tsx   # Spring physics tactile touch wrapper
│   │   ├── GlowingSphere.tsx  # Animated AI sphere with SVG radial aura & sparkles
│   │   └── GridBackground.tsx # Subtle background grid pattern
│   └── screens/
│       ├── LoginScreen.tsx
│       ├── LanguageSelectionScreen.tsx
│       ├── KnowYouBetterScreen.tsx
│       └── AppSelectionScreen.tsx
├── App.tsx                    # Continuous horizontal slider pager
├── index.js                   # Application entry point with LogBox suppression
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 22`
- Android Studio & Android SDK (API 34/35)
- Java 17+ (OpenJDK)
- Physical Android device connected via USB with **USB Debugging** enabled (or Android Emulator)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Android SDK

Ensure `android/local.properties` specifies your Android SDK directory:

```properties
sdk.dir=/Users/YOUR_USER/Library/Android/sdk
```

### 3. Start Metro Dev Server

```bash
npx react-native start
```

### 4. Build and Install via ADB

In a separate terminal, forward the Metro port and run:

```bash
# Reverse port for physical device over USB
adb reverse tcp:8081 tcp:8081

# Build debug APK and install onto connected device
cd android
./gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk

# Launch the app
adb shell am start -n com.upplinkapp/.MainActivity
```

---

## 🧪 Testing & Verification

Run the TypeScript type checker and Jest test suite:

```bash
# TypeScript verification
npx tsc --noEmit

# Jest unit tests
npm test
```

---

## 📄 License

This project is proprietary and owned by **KADVA KORP**.
