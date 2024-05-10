import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/ui/button";
import { router } from "expo-router";
import Logo from "@/components/logo";
import { useEffect } from "react";
import { getData } from "@/utils/storage";
import { ping } from "@/utils/api";

const index = () => {
  useEffect(() => {
    const getConfig = async () => {
      const data = await getData("config");

      await ping(JSON.parse(data)).then((res) => {
        if (res && res.status) {
          router.push("/(tabs)/home");
        }
        return;
      });
    };

    getConfig();
  }, []);

  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <SafeAreaView className="h-full z-20">
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="h-full w-full flex flex-col justify-between items-center px-4">
            {/* LOGO & NAME  */}
            <Logo />

            {/* BOTTOM TEXT & BUTTON  */}
            <View className="mt-4 relative">
              <Text className="text-3xl text-white font-RPBold text-center">
                Stream Your Favorite Music With{" "}
                <Text className="text-secondary-100">
                  Rhythm<Text className="text-secondary-200">oX</Text>
                </Text>
              </Text>
              <Text className="text-gray-400 mt-4 text-center font-RPLight">
                Stream Music Anywhere, Anytime With RhythmoX, Connect your
                Navidrome Server and Enjoy Your Music!
              </Text>
              <Image
                source={require("@/assets/images/path.png")}
                className="w-[136px] h-[15px] absolute bottom-[150px] -right-1"
                resizeMode="contain"
              />
              <Button
                title="Let's Go!"
                onPress={() => router.push("sign-in")}
                containerStyles="mt-7 rounded-full bg-secondary-200 mb-7"
                textStyles="text-white font-RPBold"
              />
            </View>
          </View>
        </ScrollView>
        <StatusBar style="dark" />
      </SafeAreaView>
      <LinearGradient
        colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,1)"]}
        style={styles.linearGradient}
      />
    </ImageBackground>
  );
};

export default index;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  linearGradient: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});
