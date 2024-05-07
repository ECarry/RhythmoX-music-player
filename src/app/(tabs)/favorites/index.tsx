import TracksList from "@/components/tracks-list";
import { screenPadding } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { getFavoriteSongs } from "@/utils/api";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

const FavoritesScreen = () => {
  const [data, setData] = useState([]);

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

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.text}>Favorites</Text>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          paddingHorizontal: screenPadding.horizontal,
        }}
      >
        <TracksList tracks={data} scrollEnabled={false} />
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
