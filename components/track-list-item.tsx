import { TouchableHighlight, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/constants/tokens";
import Entypo from "@expo/vector-icons/Entypo";
import LoaderKit from "react-native-loader-kit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/styles";
import FastImage from "react-native-fast-image";
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player";

interface TrackListItemProps {
  track: Track;
  onTrackSelected: (track: Track) => void;
}

const TrackListItem = ({ track, onTrackSelected }: TrackListItemProps) => {
  const { playing } = useIsPlaying();
  const isActiveTrack = useActiveTrack()?.id === track.id;

  const handleTrackSelect = (track: Track) => {
    onTrackSelected(track);
  };

  return (
    <TouchableHighlight onPress={() => handleTrackSelect(track)}>
      <View
        style={{
          ...styles.trackItemContainer,
        }}
      >
        <View>
          <FastImage
            source={{
              uri: track.artwork,
            }}
            style={{
              ...styles.trackArtworkImage,
            }}
          />
          {isActiveTrack && (
            <View
              style={{
                zIndex: 10,
                position: "absolute",
                top: 0,
                left: 0,
                width: 50,
                height: 50,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            />
          )}
          {isActiveTrack &&
            (playing ? (
              <LoaderKit
                style={styles.trackPlayingIconIndicator}
                name={"LineScaleParty"}
                color={colors.icon}
              />
            ) : (
              <MaterialCommunityIcons
                name="dots-horizontal"
                color={colors.icon}
                size={20}
                style={styles.trackPlayingIconIndicator}
              />
            ))}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* TITLE + ARTIST  */}
          <View style={{ width: "100%" }}>
            <Text
              numberOfLines={1}
              className="font-RPMedium"
              style={{
                ...styles.trackTitleText,
                color: isActiveTrack ? colors.primary : colors.text,
              }}
            >
              {track.title}
            </Text>

            {track.artist && (
              <Text
                className="font-RPLight"
                numberOfLines={1}
                style={{
                  ...styles.trackArtistText,
                }}
              >
                {track.artist}
              </Text>
            )}
          </View>
          {/* ACTION BUTTON  */}
          <Entypo
            name="dots-three-horizontal"
            size={18}
            color={colors.icon}
            onTrackSelected={handleTrackSelect}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default TrackListItem;

const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    paddingRight: 20,
  },
  trackArtworkImage: {
    position: "relative",
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  trackPlayingIconIndicator: {
    zIndex: 20,
    position: "absolute",
    top: 16,
    left: 16,
    width: 16,
    height: 16,
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: fontSize.sm,
    fontWeight: "600",
    maxWidth: "90%",
  },
  trackArtistText: {
    ...defaultStyles.text,
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
});
