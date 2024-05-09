import { View, ViewProps } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { colors } from "@/constants/tokens";
import { Ionicons } from "@expo/vector-icons";
import { Slider } from "react-native-awesome-slider";

import { useTrackPlayerVolume } from "@/hooks/useTrackPlayerVolume";
import { utilsStyles } from "@/constants/styles";

const PlayerVolumeBar = ({ style }: ViewProps) => {
  const { volume, updateVolume } = useTrackPlayerVolume();

  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  progress.value = volume ?? 0;

  return (
    <View style={style}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="volume-off"
          size={16}
          color={colors.icon}
          style={{ opacity: 0.8 }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: 10,
          }}
        >
          <Slider
            minimumValue={min}
            maximumValue={max}
            progress={progress}
            thumbWidth={0}
            containerStyle={utilsStyles.slider}
            renderBubble={() => null}
            onValueChange={(value) => {
              updateVolume(value);
            }}
            theme={{
              minimumTrackTintColor: colors.minimumTrackTintColor,
              maximumTrackTintColor: colors.maximumTrackTintColor,
            }}
          />
        </View>

        <Ionicons
          name="volume-high"
          size={16}
          color={colors.icon}
          style={{ opacity: 0.8 }}
        />
      </View>
    </View>
  );
};

export default PlayerVolumeBar;
