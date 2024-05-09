import { Image, TouchableOpacity, View, ViewProps } from "react-native";
//import { useActiveTrack } from "react-native-track-player";
import { StyleSheet } from "react-native";
import {
  PlayerPauseButton,
  SkipToNextButton,
} from "@/components/player-controls";
//import useLastActiveTrack from "@/hooks/useLastActiveTrack";
import MovingText from "./moving-text";
import { useRouter } from "expo-router";
import { defaultStyles } from "@/constants/styles";

const FloatingPlayer = ({ style }: ViewProps) => {
  const router = useRouter();
  // const activeTrack = useActiveTrack();
  // const lastActiveTrack = useLastActiveTrack();

  // const displayTrack = activeTrack ?? lastActiveTrack;
  const displayTrack = {
    album: "Lover",
    albumId: "c746360e9c21b2fabd7c1d3a3a344bd9",
    artist: "Taylor Swift",
    artistId: "28239d6140b4b5d6e1a8d8d4b3a05751",
    artwork:
      "https://music.ecarry.cc:88/rest/getCoverArt?u=ecarry&t=3163d91b1ff334988863fdab44009690&s=zKhCqi&v=1.16.1&c=RhythmoX&id=c746360e9c21b2fabd7c1d3a3a344bd9",
    bitRate: 1455,
    bpm: 0,
    channelCount: 2,
    comment: "",
    contentType: "audio/flac",
    coverArt: "mf-f06687802b1ae825736dde611af0d45a_6638eef9",
    created: "2024-05-06T14:52:57.24014263Z",
    duration: 201,
    genre: "Pop",
    genres: [],
    id: "f0687802b1ae825736dde611af0d45a",
    isDir: false,
    isFavorite: false,
    isVideo: false,
    mediaType: "song",
    musicBrainzId: "",
    parent: "c746360e9c21b2fabd7c1d3a3a344bd9",
    path: "Taylor Swift/Lover/12 - Soon You’ll Get Better.flac",
    replayGain: { trackPeak: 1, albumPeak: 1 },
    size: 36757659,
    sortName: "",
    suffix: "flac",
    title: "Soon You’ll Get Better",
    track: 12,
    type: "music",
    url: "https://music.ecarry.cc:88/rest/stream?u=ecarry&t=3163d91b1ff334988863fdab44009690&s=zKhCqi&v=1.16.1&c=RhythmoX&f=json&id=f06687802b1ae825736dde611af0d45a",
    year: 2019,
  };
  //if (!displayTrack) return null;

  //TrackPlayer.play();

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
