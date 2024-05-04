import { Image, TouchableOpacity, View, Text, ViewProps } from "react-native";
import { Track, useActiveTrack } from "react-native-track-player";
import { StyleSheet } from "react-native";
import { defaultStyles } from "@/styles";
import { PlayerControls, SkipToNextButton } from "@/components/player-controls";

const FloatingPlayer = ({ style }: ViewProps) => {
  const activeTrack = useActiveTrack();

  console.log("activeTrack", activeTrack);

  //if (!activeTrack) return null;

  const displayTrack: Track = activeTrack ?? {
    url: "https://audio.jukehost.co.uk/vTRYaTEbpaYRCxiWGgL2S91mnOuMKfLw",
    title: "Guess I'll Never Know",
    artist: "TrackTribe",
    artwork: "https://f4.bcbits.com/img/a3736661212_65",
    rating: 1,
    playlist: ["Chill 🌱"],
  };

  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.container, style]}>
      <>
        <Image
          source={{ uri: displayTrack.artwork }}
          style={styles.trackArtworkImage}
        />
        <View style={styles.trackTitleContainer}>
          <Text style={styles.trackTitle}>{displayTrack.title}</Text>
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});
