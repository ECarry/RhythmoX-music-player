import TracksList from "@/components/tracks-list";
import { screenPadding } from "@/constants/tokens";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { defaultStyles } from "@/styles";
import { getFavoriteSongs } from "@/utils/api";
import { trackTitleFilter } from "@/utils/filter";
import { useEffect, useMemo, useState } from "react";
import { View, ScrollView } from "react-native";

const FavoritesScreen = () => {
  const [data, setData] = useState([]);
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Find in songs",
    },
  });

  const getSongs = async () => {
    try {
      const data = await getFavoriteSongs();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  const filteredTracks = useMemo(() => {
    if (!search) return data;

    return data.filter(trackTitleFilter(search));
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
          tracks={search ? filteredTracks : data}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
