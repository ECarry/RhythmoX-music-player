import { screenPadding } from "@/constants/tokens";
import { View, ScrollView } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { defaultStyles } from "@/constants/styles";
import { getRandomSongs } from "@/utils/api";
import TracksList from "@/components/tracks-list";

const SongsScreen = () => {
  const [songs, setSongs] = useState([]);

  const getData = async () => {
    try {
      await getRandomSongs().then((res) => {
        setSongs(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          paddingHorizontal: screenPadding.horizontal,
        }}
      >
        <TracksList tracks={songs} scrollEnabled={false} />
      </ScrollView>
    </View>
  );
};

export default SongsScreen;
