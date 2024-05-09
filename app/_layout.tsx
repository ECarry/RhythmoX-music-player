import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import GlobalProvider from "@/context/global-provider";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "ReadexPro-Bold": require("@/assets/fonts/ReadexPro-Bold.ttf"),
    "ReadexPro-ExtraLight": require("@/assets/fonts/ReadexPro-ExtraLight.ttf"),
    "ReadexPro-Light": require("@/assets/fonts/ReadexPro-Light.ttf"),
    "ReadexPro-Medium": require("@/assets/fonts/ReadexPro-Medium.ttf"),
    "ReadexPro-Regular": require("@/assets/fonts/ReadexPro-Regular.ttf"),
    "ReadexPro-SemiBold": require("@/assets/fonts/ReadexPro-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GlobalProvider>
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

        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
