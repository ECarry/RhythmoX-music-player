import { FlatList, FlatListProps, Text, View } from "react-native";
import TrackListItem from "@/components/track-list-item";
import { utilsStyles } from "@/constants/styles";

export type TracksListProps = Partial<FlatListProps<any>> & {
  tracks: any[];
};

const TracksList = ({ tracks, ...flatListProps }: TracksListProps) => {
  const handleTrackSelect = async (track: any) => {};

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
