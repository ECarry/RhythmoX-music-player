import MovingText from "@/components/moving-text";
import { colors, screenPadding } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";
import { FontAwesome } from "@expo/vector-icons";

const PlayerScreen = () => {
  const activeTrack = useActiveTrack();
  const { top, bottom } = useSafeAreaInsets();

  const isFavorite = true;

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

  return (
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
                {/* TITLE  */}
                <View style={styles.trackTitleContainer}>
                  <MovingText
                    text={activeTrack.title ?? ""}
                    animationThreshold={30}
                    style={styles.trackTitle}
                  />
                  {/* <Text>{activeTrack.artist}</Text> */}
                </View>
                {/* FAVORITE BTN  */}
                <FontAwesome
                  name={isFavorite ? "heart" : "heart-o"}
                  size={20}
                  color={isFavorite ? colors.primary : colors.icon}
                  style={{ marginHorizontal: 14 }}
                  onPress={() => {}}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
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
});

export default PlayerScreen;
