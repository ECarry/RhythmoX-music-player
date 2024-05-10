import { View, Text, ScrollView } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/styles";
import { screenPadding } from "@/constants/tokens";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          paddingHorizontal: screenPadding.horizontal,
        }}
      ></ScrollView>

      <StatusBar style="light" />
    </View>
  );
};

export default Home;
