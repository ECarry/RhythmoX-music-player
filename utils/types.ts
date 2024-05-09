export type Config = {
  server: string;
  username: string;
  password: string;
};

export type SubsonicResponse = {
  "subsonic-response": {
    status: string;
    version: string;
    type: string;
    serverVersion: string;
    openSubsonic: boolean;
    error?: {
      code: number;
      message: string;
    };
    randomSongs?: {
      song: Song[];
    };
  };
};

export type Genre = {
  name: string;
};

export type ReplayGain = {
  trackPeak: number;
  albumPeak: number;
};

export type Song = {
  id: string;
  parent: string;
  isDir: boolean;
  title: string;
  album: string;
  artist: string;
  track: number;
  year: number;
  genre: string;
  coverArt: string;
  size: number;
  contentType: string;
  suffix: string;
  duration: number;
  bitRate: number;
  path: string;
  playCount: number;
  created: string;
  albumId: string;
  artistId: string;
  type: string;
  isVideo: boolean;
  played: string;
  bpm: number;
  starred?: string;
  comment: string;
  sortName: string;
  mediaType: string;
  musicBrainzId: string;
  genres: Genre[];
  replayGain: ReplayGain;
  channelCount: number;
};
