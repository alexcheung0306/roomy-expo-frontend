# Roomy

A modern mobile application built with Expo and React Native that helps users create profiles, search for rooms, and connect with potential roommates.

## 📱 Features

- **User Profiles**: Create and manage your profile
- **Room Search**: Search and browse available rooms
- **Roommate Matching**: Connect with potential roommates
- **Cross-Platform**: Works on iOS, Android, and Web

## 🛠 Tech Stack

### Core Framework
- **[Expo](https://expo.dev/)** (v54.0.0) - React Native framework for building cross-platform apps
- **[React Native](https://reactnative.dev/)** (v0.81.5) - Mobile app framework
- **[React](https://react.dev/)** (v19.1.0) - UI library
- **[TypeScript](https://www.typescriptlang.org/)** (v5.9.2) - Type-safe JavaScript

### Navigation & Routing
- **[Expo Router](https://docs.expo.dev/router/introduction/)** (v6.0.10) - File-based routing for Expo
- **[React Navigation](https://reactnavigation.org/)** (v7.1.6) - Navigation library

### Styling
- **[NativeWind](https://www.nativewind.dev/)** - Tailwind CSS for React Native
- **[Tailwind CSS](https://tailwindcss.com/)** (v3.4.0) - Utility-first CSS framework
- Custom theme system with dark mode support

### UI Components
- Custom NativeWind UI components (`@/components/nativewindui/`)
- **[@rn-primitives](https://github.com/react-native-primitives)** - Primitive UI components
- **[@expo/vector-icons](https://docs.expo.dev/guides/icons/)** - Icon library
- **[@shopify/flash-list](https://github.com/Shopify/flash-list)** - High-performance list component

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Expo Dev Client](https://docs.expo.dev/development/introduction/)** - Custom development build

### Additional Libraries
- **expo-haptics** - Haptic feedback
- **expo-font** - Custom fonts
- **expo-linking** - Deep linking
- **react-native-reanimated** - Smooth animations
- **react-native-gesture-handler** - Gesture handling
- **class-variance-authority** & **clsx** - Conditional styling utilities

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional, can use `npx expo`)

For mobile development:
- **iOS**: [Xcode](https://developer.apple.com/xcode/) (macOS only)
- **Android**: [Android Studio](https://developer.android.com/studio)

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd roomy-expo-frontend
```

2. Install dependencies:
```bash
npm install
```

### Running the App

#### Start the development server:
```bash
npm start
```

This will start the Expo development server. You can then:
- Press `i` to open in iOS simulator
- Press `a` to open in Android emulator
- Scan the QR code with Expo Go app on your physical device
- Press `w` to open in web browser

#### Platform-specific commands:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📁 Project Structure

```
roomy-expo-frontend/
├── app/                    # Expo Router pages (file-based routing)
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home screen
│   └── ...
├── components/            # Reusable components
│   └── nativewindui/     # Custom UI components
├── lib/                   # Utility functions
├── theme/                 # Theme configuration
├── assets/                # Images, fonts, and other assets
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 📜 Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Start the app in iOS simulator
- `npm run android` - Start the app in Android emulator
- `npm run web` - Start the app in web browser
- `npm run lint` - Run ESLint and Prettier checks
- `npm run format` - Format code with ESLint and Prettier

## 🎨 Styling

This project uses NativeWind (Tailwind CSS for React Native) for styling. The theme system supports:
- Dark mode (class-based)
- Custom color palette
- Platform-specific styling (iOS/Android)

## 🔧 Configuration

- **TypeScript**: Configured with strict mode enabled
- **Path Aliases**: `@/*` maps to the root directory
- **Expo Router**: File-based routing with typed routes
- **Dark Mode**: Manual toggle support

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private.

## 📞 Support

For support, please open an issue in the repository.

---

Built with ❤️ using Expo and React Native

