import { SplashScreen, Stack } from "expo-router";
import { useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import GlobalProvider from "@/context/global-provider";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import TrackPlayer from "react-native-track-player";
import { playbackService } from "@/utils/playbackService";

SplashScreen.preventAutoHideAsync();

TrackPlayer.registerPlaybackService(() => playbackService);

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "ReadexPro-Bold": require("@/assets/fonts/ReadexPro-Bold.ttf"),
    "ReadexPro-ExtraLight": require("@/assets/fonts/ReadexPro-ExtraLight.ttf"),
    "ReadexPro-Light": require("@/assets/fonts/ReadexPro-Light.ttf"),
    "ReadexPro-Medium": require("@/assets/fonts/ReadexPro-Medium.ttf"),
    "ReadexPro-Regular": require("@/assets/fonts/ReadexPro-Regular.ttf"),
    "ReadexPro-SemiBold": require("@/assets/fonts/ReadexPro-SemiBold.ttf"),
  });

  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });

  useLogTrackPlayerState();

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GlobalProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigation />

          <StatusBar style="dark" />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </GlobalProvider>
  );
};

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="player"
        options={{
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "vertical",
          animationDuration: 400,
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
