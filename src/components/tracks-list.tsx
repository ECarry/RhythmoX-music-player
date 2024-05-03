import { FlatList, FlatListProps, View } from "react-native";
import TrackListItem from "./track-list-item";
import { utilsStyles } from "@/styles";
import { Track } from "react-native-track-player";

export type TracksListProps = Partial<FlatListProps<Track>> & {
  tracks: Track[];
};

const TracksList = ({ tracks, ...flatListProps }: TracksListProps) => {
  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ListFooterComponent={tracks.length > 0 ? ItemDivider : <View />}
      ItemSeparatorComponent={ItemDivider}
      renderItem={({ item: track }) => <TrackListItem track={track} />}
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
