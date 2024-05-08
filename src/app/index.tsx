import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/tokens";
import { Link } from "expo-router";

const index = () => {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          color: colors.text,
        }}
      >
        index
      </Text>
      <Link
        href="/(config)"
        style={{
          color: colors.text,
        }}
      >
        Config your server
      </Link>

      <Link
        href="/(tabs)/(songs)"
        style={{
          color: colors.text,
        }}
      >
        Enter Player
      </Link>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
