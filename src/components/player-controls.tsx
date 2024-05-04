import { TouchableOpacity, View, ViewStyle } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/constants/tokens";

type PlayerControlsProps = {
  style?: ViewStyle;
};

type PlayerButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
};

export const PlayerControls = ({ style, iconSize }: PlayerButtonProps) => {
  const { playing } = useIsPlaying();

  return (
    <View style={[{ height: iconSize }, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
      >
        <FontAwesome
          name={playing ? "pause" : "play"}
          size={iconSize}
          color={colors.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToNext()}
    >
      <FontAwesome6 name="forward" size={iconSize} color={colors.icon} />
    </TouchableOpacity>
  );
};

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToPrevious()}
    >
      <FontAwesome6 name="backward" size={iconSize} color={colors.icon} />
    </TouchableOpacity>
  );
};
