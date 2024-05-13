import MovingText from "@/components/moving-text";
import { colors, fontSize, screenPadding } from "@/constants/tokens";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";
import { FontAwesome } from "@expo/vector-icons";
import PlayerProgressBar from "@/components/player-progress-bar";
import { PlayerControls } from "@/components/player-controls";
import PlayerVolumeBar from "@/components/player-volume-bar";
import PlayerToggle from "@/components/player-toggle";
import Entypo from "@expo/vector-icons/Entypo";
import usePlayerBackground from "@/hooks/usePlayerBackground";
import { LinearGradient } from "expo-linear-gradient";
import { defaultStyles } from "@/constants/styles";
import FastImage from "react-native-fast-image";
//import { starSong } from "@/utils/api";

const PlayerScreen = () => {
  const activeTrack = useActiveTrack();
  const { top, bottom } = useSafeAreaInsets();
  const { imageColors } = usePlayerBackground(activeTrack?.artwork ?? "");

  if (!activeTrack) {
    return (
      <View
        style={[
          defaultStyles.container,
          {
            justifyContent: "center",
          },
        ]}
      >
        <ActivityIndicator color={colors.icon} />
      </View>
    );
  }

  const handleFavToggle = async () => {
    //await starSong(activeTrack.id);
  };
  let gradientColors;
  if (imageColors) {
    imageColors.platform === "ios"
      ? (gradientColors = [imageColors.background, imageColors.primary])
      : (gradientColors = [
          imageColors.dominant,
          imageColors.darkMuted,
          imageColors.lightMuted,
          imageColors.muted,
        ]);
  } else {
    gradientColors = [colors.background, colors.background];
  }

  return (
    <LinearGradient style={{ flex: 1 }} colors={gradientColors}>
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
            <FastImage
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
                    <Text
                      className="font-RPLight"
                      numberOfLines={1}
                      style={styles.trackArtist}
                    >
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
