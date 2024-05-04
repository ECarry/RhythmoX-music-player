import { FlatList, FlatListProps, View } from "react-native";
import TrackListItem from "./track-list-item";
import { utilsStyles } from "@/styles";
import TrackPlayer, { Track } from "react-native-track-player";

export type TracksListProps = Partial<FlatListProps<Track>> & {
  tracks: Track[];
};

const TracksList = ({ tracks, ...flatListProps }: TracksListProps) => {
  const handleTrackSelect = async (track: Track) => {
    const track1 = {
      url: "https://audio.jukehost.co.uk/vTRYaTEbpaYRCxiWGgL2S91mnOuMKfLw",
      title: "Guess I'll Never Know",
      artist: "TrackTribe",
      artwork: "https://f4.bcbits.com/img/a3736661212_65",
      rating: 1,
      playlist: ["Chill 🌱"],
    };

    await TrackPlayer.load(track1);
  };

  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ListFooterComponent={tracks ? ItemDivider : <View />}
      ItemSeparatorComponent={ItemDivider}
      renderItem={({ item: track }) => (
        <TrackListItem track={track} onTrackSelected={handleTrackSelect} />
      )}
      {...flatListProps}
    />
  );
};

export default TracksList;

const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}
  />
);
