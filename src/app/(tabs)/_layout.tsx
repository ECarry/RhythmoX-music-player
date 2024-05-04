import { colors, fontSize } from "@/constants/tokens";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";
import FloatingPlayer from "@/components/floating-player";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: {
            fontSize: fontSize.xs,
            fontWeight: "500",
          },
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 0,
            paddingTop: 8,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={95}
              style={{
                ...StyleSheet.absoluteFillObject,
                overflow: "hidden",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={20} name="heart" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            title: "Playlists",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="playlist-music"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(songs)"
          options={{
            title: "Songs",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={20} name="music" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            title: "Artists",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="users-line" size={20} color={color} />
            ),
          }}
        />
      </Tabs>

      <FloatingPlayer
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          bottom: 78,
        }}
      />
    </>
  );
}
