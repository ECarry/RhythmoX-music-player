import { Stack } from "expo-router";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { defaultStyles } from "@/constants/styles";
import { View } from "react-native";

const HomeLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Home",
          }}
        />
      </Stack>
    </View>
  );
};

export default HomeLayout;
