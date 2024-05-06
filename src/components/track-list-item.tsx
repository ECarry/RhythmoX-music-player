import { TouchableHighlight, View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { colors, fontSize } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { Track, useActiveTrack } from "react-native-track-player";
import Entypo from "@expo/vector-icons/Entypo";

interface TrackListItemProps {
  track: Track;
  onTrackSelected: (track: Track) => void;
}

const TrackListItem = ({ track, onTrackSelected }: TrackListItemProps) => {
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
          <Image
            source={{
              uri: track.artwork,
            }}
            style={{
              ...styles.trackArtworkImage,
            }}
          />
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
              style={{
                ...styles.trackTitleText,
                color: isActiveTrack ? colors.primary : colors.text,
              }}
            >
              {track.title}
            </Text>

            {track.artist && (
              <Text
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
    borderRadius: 8,
    width: 50,
    height: 50,
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
