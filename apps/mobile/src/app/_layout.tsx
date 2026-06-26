// Polyfills must be the first import — crypto + WebSocket shims for React Native
import "jazz-expo/polyfills";

import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

import { AppAccount } from "@squad-log/core";
import { JazzProvider } from "jazz-expo";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";

// Use Jazz Cloud for sync in all environments for now.
// Add an API key query-param here when moving to production.
const JAZZ_SYNC_URL = "wss://cloud.jazz.tools";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <JazzProvider sync={JAZZ_SYNC_URL} AccountSchema={AppAccount}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <AppTabs />
      </ThemeProvider>
    </JazzProvider>
  );
}
