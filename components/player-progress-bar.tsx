import { defaultStyles, utilsStyles } from "@/constants/styles";
import { colors, fontSize } from "@/constants/tokens";
import { formatSecondToMinutes } from "@/utils/formatDate";
import { View, ViewProps, Text, StyleSheet } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import TrackPlayer, {
  useActiveTrack,
  useProgress,
} from "react-native-track-player";

const PlayerProgressBar = ({ style }: ViewProps) => {
  const { duration, position } = useProgress(250);
  const activeTrack = useActiveTrack();

  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  const trackElapsedTime = formatSecondToMinutes(position);
  const trackRemainingTime = formatSecondToMinutes(duration - position);

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }

  return (
    <View style={style}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        containerStyle={utilsStyles.slider}
        thumbWidth={0}
        renderBubble={() => null}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={async (value) => {
          await TrackPlayer.seekTo(value * duration);
        }}
        onSlidingComplete={async (value) => {
          if (!isSliding.value) return;

          isSliding.value = false;

          await TrackPlayer.seekTo(value * duration);
        }}
        theme={{
          minimumTrackTintColor: colors.minimumTrackTintColor,
          maximumTrackTintColor: colors.maximumTrackTintColor,
        }}
      />
      <View className="flex-row justify-between items-center mt-4">
        <Text style={styles.timeText} className="font-RPMedium w-12">
          {trackElapsedTime}
        </Text>
        <View className="bg-gray-300/20 rounded-md p-[1px]">
          <Text className="font-RPMedium w-10 text-center text-xs text-white opacity-75">
            {activeTrack?.suffix}
          </Text>
        </View>
        <Text style={styles.timeText} className="font-RPMedium w-12">
          -{trackRemainingTime}
        </Text>
      </View>
    </View>
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
  timeText: {
    ...defaultStyles.text,
    color: colors.text,
    opacity: 0.75,
    fontSize: fontSize.xs,
    letterSpacing: 0.7,
    fontWeight: "500",
  },
});
