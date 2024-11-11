import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Platform } from "react-native";

import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// To hydrate persisted stores
import { useAppStore, useSessionStore } from "@/store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import {
  setStatusBarStyle,
  setStatusBarBackgroundColor,
} from "expo-status-bar";
import { LoadingOverlay } from "@/components/LoadingOverlay";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const path = usePathname();

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    Syncopate: require("../assets/fonts/Syncopate-Bold.ttf"),
    ...FontAwesome.font,
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    setStatusBarStyle("light");
    if (Platform.OS === "android")
      setStatusBarBackgroundColor(Colors.primary600, true);
  }, [path]);

  // Hydrate the store
  useEffect(() => {
    useSessionStore.persist.rehydrate();
  }, []);

  const isLoading = useAppStore((state) => state.isLoading);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>

      {isLoading && <LoadingOverlay />}
    </SafeAreaView>
  );
}

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
  },
});
