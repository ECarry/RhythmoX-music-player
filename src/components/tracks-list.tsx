import { FlatList, FlatListProps, Text, View } from "react-native";
import TrackListItem from "@/components/track-list-item";
import { utilsStyles } from "@/styles";
import TrackPlayer, { Track } from "react-native-track-player";
import { colors } from "@/constants/tokens";

export type TracksListProps = Partial<FlatListProps<Track>> & {
  tracks: Track[];
};

const TracksList = ({ tracks, ...flatListProps }: TracksListProps) => {
  const handleTrackSelect = async (track: Track) => {
    console.log(track);

    await TrackPlayer.load(track);
  };

  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ListFooterComponent={tracks ? ItemDivider : <View />}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No songs found</Text>
        </View>
      }
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
