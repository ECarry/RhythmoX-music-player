import { Event, useTrackPlayerEvents } from "react-native-track-player";

const evens = [
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackActiveTrackChanged,
];

export const useLogTrackPlayerState = () => {
  useTrackPlayerEvents(evens, async (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn("Playback error", event);
    }

    if (event.type === Event.PlaybackState) {
      console.log("Playback state", event.state);
    }

    if (event.type === Event.PlaybackActiveTrackChanged) {
      console.log("Playback active track changed", event.index);
    }
  });
};
