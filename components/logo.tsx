import { View, Text, Image } from "react-native";

const Logo = () => {
  return (
    <View className="flex flex-row items-center gap-2">
      <Image
        source={require("@/assets/images/wave.png")}
        className="w-8 h-8"
        resizeMode="contain"
      />
      <Text className="text-secondary-100 text-lg font-RPMedium">
        Rhythm<Text className="text-secondary-200 text-lg">oX</Text>
      </Text>
    </View>
  );
};

export default Logo;
