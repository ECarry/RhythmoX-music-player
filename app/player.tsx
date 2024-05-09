import MovingText from "@/components/moving-text";
import { colors, fontSize, screenPadding } from "@/constants/tokens";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
//import { useActiveTrack } from "react-native-track-player";
import { FontAwesome } from "@expo/vector-icons";
import PlayerProgressBar from "@/components/player-progress-bar";
import { PlayerControls } from "@/components/player-controls";
import PlayerVolumeBar from "@/components/player-volume-bar";
import PlayerToggle from "@/components/player-toggle";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import { defaultStyles } from "@/constants/styles";
import usePlayerBackground from "@/hooks/usePlayerBackground";

const PlayerScreen = () => {
  const activeTrack = {
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

  //const activeTrack = useActiveTrack();
  const { top, bottom } = useSafeAreaInsets();
  // const { imageColors } = usePlayerBackground(activeTrack?.artwork ?? "");
  //const { imageColors } = usePlayerBackground("");
  // if (!activeTrack) {
  //   return (
  //     <View
  //       style={[
  //         defaultStyles.container,
  //         {
  //           justifyContent: "center",
  //         },
  //       ]}
  //     >
  //       <ActivityIndicator color={colors.icon} />
  //     </View>
  //   );
  // }

  const handleFavToggle = async () => {
    //await starSong(activeTrack.id);
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      // colors={
      //   imageColors
      //     ? [imageColors.background, imageColors.primary]
      //     : [colors.background]
      // }
      colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,1)"]}
    >
      <View style={styles.overlayContainer}>
        <DismissPlayerSymbol />

        <View
          style={{
            flex: 1,
            marginTop: top + 70,
            marginBottom: bottom,
          }}
        >
          <View style={styles.artworkImageContainer}>
            <Image
              source={{ uri: activeTrack.artwork }}
              resizeMode="cover"
              style={styles.artworkImage}
            />
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ marginTop: "auto" }}>
              <View style={{ height: 60 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* TITLE & ARTIST  */}
                  <View style={styles.trackTitleContainer}>
                    <MovingText
                      text={activeTrack.title ?? ""}
                      animationThreshold={30}
                      style={styles.trackTitle}
                    />
                    <Text numberOfLines={1} style={styles.trackArtist}>
                      {activeTrack.artist}
                    </Text>
                  </View>
                  {/* FAVORITE BTN  */}
                  <View style={styles.actionBtnContainer}>
                    <FontAwesome
                      name={activeTrack.isFavorite ? "heart" : "heart-o"}
                      size={20}
                      color={
                        activeTrack.isFavorite ? colors.primary : colors.icon
                      }
                      style={{ marginHorizontal: 14 }}
                      onPress={handleFavToggle}
                    />
                    <Entypo
                      name="dots-three-horizontal"
                      size={18}
                      color={colors.icon}
                    />
                  </View>
                </View>
              </View>

              <PlayerProgressBar style={{ marginTop: 32 }} />

              <PlayerControls
                style={{
                  marginTop: 40,
                }}
              />
            </View>
            <PlayerVolumeBar style={{ marginTop: "auto", marginBottom: 30 }} />
            <View>
              <PlayerToggle style={{ marginBottom: 6 }} />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const DismissPlayerSymbol = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        top: top + 8,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View
        accessible={false}
        style={{
          width: 50,
          height: 8,
          borderRadius: 8,
          backgroundColor: "rgba(255,255,255, 0.7)",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  artworkImageContainer: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 11,
    flexDirection: "row",
    justifyContent: "center",
    height: "45%",
  },
  artworkImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
  },
  trackTitle: {
    ...defaultStyles.text,
    fontSize: 22,
    fontWeight: "700",
  },
  trackArtist: {
    ...defaultStyles.text,
    fontSize: fontSize.base,
    color: colors.textMuted,
    marginTop: 6,
  },
  actionBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    opacity: 0.7,
    paddingRight: 5,
  },
});

export default PlayerScreen;
