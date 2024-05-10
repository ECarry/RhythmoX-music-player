import { screenPadding } from "@/constants/tokens";
import { View, ScrollView } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { defaultStyles } from "@/constants/styles";
import { getRandomSongs } from "@/utils/api";
import TracksList from "@/components/tracks-list";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { trackTitleFilter } from "@/utils/filter";
import { Track } from "react-native-track-player";

const SongsScreen = () => {
  const [songs, setSongs] = useState<Track[]>([]);
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
    },
  });

  const getData = async () => {
    try {
      const data = await getRandomSongs();

      if (data) {
        setSongs(data as Track[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredTracks = useMemo(() => {
    console.log(search);

    if (!search) return songs;

    return songs.filter(trackTitleFilter(search));
  }, [search]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          paddingHorizontal: screenPadding.horizontal,
        }}
      >
        <TracksList
          id="songs"
          tracks={filteredTracks.length !== 0 ? filteredTracks : songs}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default SongsScreen;
