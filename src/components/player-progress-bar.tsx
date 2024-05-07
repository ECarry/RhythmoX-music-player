import { colors, fontSize } from "@/constants/tokens";
import { defaultStyles, utilsStyles } from "@/styles";
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
      <View style={styles.timeTextContainer}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>
        {/* <Text style={styles.timeText}>{activeTrack?.suffix}</Text> */}
        <Text style={styles.timeText}>-{trackRemainingTime}</Text>
      </View>
    </View>
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
  timeTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 20,
  },
  timeText: {
    ...defaultStyles.text,
    color: colors.text,
    opacity: 0.75,
    fontSize: fontSize.xs,
    letterSpacing: 0.7,
    fontWeight: "500",
  },
});
