import { FlatList, FlatListProps, Text, View } from "react-native";
import TrackListItem from "@/components/track-list-item";
import { utilsStyles } from "@/constants/styles";
import TrackPlayer, { Track } from "react-native-track-player";
import { useQueue } from "@/store/queue";
import { useRef } from "react";

export type TracksListProps = Partial<FlatListProps<Track>> & {
  tracks: Track[];
  id: string;
};

const TracksList = ({ id, tracks, ...flatListProps }: TracksListProps) => {
  const queueOffset = useRef(0);
  const { activeQueueID, setActiveQueueID } = useQueue();

  const handleTrackSelect = async (selectedTrack: Track) => {
    // await TrackPlayer.load(track);
    // await TrackPlayer.play();
    const trackIndex = tracks.findIndex((t) => t.id === selectedTrack.id);

    if (trackIndex === -1) return;

    const isChangingQueue = activeQueueID !== id;

    if (isChangingQueue) {
      const beforeTracks = tracks.slice(0, trackIndex);
      const afterTracks = tracks.slice(trackIndex + 1);

      await TrackPlayer.reset();

      // construct the new queue
      await TrackPlayer.add(selectedTrack);
      await TrackPlayer.add(afterTracks);
      await TrackPlayer.add(beforeTracks);

      await TrackPlayer.play();

      queueOffset.current = trackIndex;
      setActiveQueueID(id);
    } else {
      const nextTrackIndex =
        trackIndex - queueOffset.current < 0
          ? tracks.length + trackIndex - queueOffset.current
          : trackIndex - queueOffset.current; // if the track is before the current track, we need to add the length of the queue to the index

      await TrackPlayer.skip(nextTrackIndex);
      await TrackPlayer.play();
    }
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
