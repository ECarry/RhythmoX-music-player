import React from "react";
import { Track, useActiveTrack } from "react-native-track-player";

const useLastActiveTrack = () => {
  const activeTrack = useActiveTrack();
  const [lastActiveTrack, setLastActiveTrack] = React.useState<Track>();

  React.useEffect(() => {
    if (!activeTrack) return;

    setLastActiveTrack(activeTrack);
  }, [activeTrack]);
  return lastActiveTrack;
};

export default useLastActiveTrack;
