import React from "react";
import { TouchableHighlight, View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import unknownArtistImage from "@/assets/unknown_artist.png";
import unknownTrackImage from "@/assets/unknown_track.png";
import { colors, fontSize } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { getCoverArt } from "@/utils/api";
import { Track } from "react-native-track-player";

interface TrackListItemProps {
  track: Track;
}

const TrackListItem = ({ track }: TrackListItemProps) => {
  const isActiveTrack = false;
  // TODO: Base64 image
  const [cover, setCover] = React.useState(unknownTrackImage);

  const getCover = async () => {
    try {
      if (track.albumId) {
        const data = await getCoverArt(track.albumId);

        setCover(data);
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    getCover();
  }, []);

  return (
    <TouchableHighlight>
      <View
        style={{
          ...styles.trackItemContainer,
        }}
      >
        <View>
          <Image
            source={unknownTrackImage}
            style={{
              ...styles.trackArtworkImage,
            }}
          />
        </View>
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
