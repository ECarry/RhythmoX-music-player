import { Image, TouchableOpacity, View, Text, ViewProps } from "react-native";
import TrackPlayer, { Track, useActiveTrack } from "react-native-track-player";
import { StyleSheet } from "react-native";
import { defaultStyles } from "@/styles";
import { PlayerControls, SkipToNextButton } from "@/components/player-controls";
import useLastActiveTrack from "@/hooks/useLastActiveTrack";
import MovingText from "./moving-text";

const FloatingPlayer = ({ style }: ViewProps) => {
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();

  const displayTrack = activeTrack ?? lastActiveTrack;

  if (!displayTrack) return null;

  //TrackPlayer.play();

  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.container, style]}>
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
          <PlayerControls iconSize={24} />
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
