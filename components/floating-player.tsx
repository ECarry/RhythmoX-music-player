import { Image, TouchableOpacity, View, ViewProps } from "react-native";
import { useActiveTrack } from "react-native-track-player";
import { StyleSheet } from "react-native";
import {
  PlayerPauseButton,
  SkipToNextButton,
} from "@/components/player-controls";
import useLastActiveTrack from "@/hooks/useLastActiveTrack";
import MovingText from "./moving-text";
import { useRouter } from "expo-router";
import { defaultStyles } from "@/constants/styles";

const FloatingPlayer = ({ style }: ViewProps) => {
  const router = useRouter();
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();

  const displayTrack = activeTrack ?? lastActiveTrack;

  if (!displayTrack) return null;

  return (
    <TouchableOpacity
      onPress={() => router.navigate("/player")}
      activeOpacity={0.9}
      style={[styles.container, style]}
    >
      <>
        <Image
          source={{ uri: displayTrack.artwork }}
          style={styles.trackArtworkImage}
        />
        <View style={styles.trackTitleContainer}>
          <MovingText
            style={styles.trackTitle}
            text={displayTrack.title ?? ""}
            animationThreshold={25}
          />
        </View>

        <View style={styles.trackControlsContainer}>
          <PlayerPauseButton iconSize={24} />
          <SkipToNextButton iconSize={22} />
        </View>
      </>
    </TouchableOpacity>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    padding: 8,
    borderRadius: 12,
    paddingVertical: 10,
  },
  trackArtworkImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
    marginLeft: 10,
  },
  trackTitle: {
    ...defaultStyles.text,
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});
