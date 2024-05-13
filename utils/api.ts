import { z } from "zod";
import { generateTokenAndSalt } from "./md5-token";
import { getData } from "./storage";
import { Config, Song, SubsonicResponse } from "./types";
import { configSchema } from "@/schemas";

const CLIENT = "RhythmoX";
const IMAGE_SIZE = 500;
const CLIENT_V = "1.16.1";

export const ping = async (values: z.infer<typeof configSchema>) => {
  const validatedFields = configSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { server, username, password } = values;

  const { salt, token } = generateTokenAndSalt(password);

  const url = `${server}/rest/ping?u=${username}&t=${token}&s=${salt}&v=1.16.1&c=${CLIENT}&f=json`;

  try {
    const response = await fetch(url);

    const data: SubsonicResponse = await response.json();

    if (!data["subsonic-response"].status && data["subsonic-response"].error) {
      return {
        error: data["subsonic-response"].error.message,
        status: false,
      };
    }

    return { status: true };
  } catch (error) {
    console.log(error);
  }
};

export const getRandomSongs = async () => {
  const config = await getData("config");

  const { server, username, password } = JSON.parse(config) as Config;

  const { salt, token } = generateTokenAndSalt(password);

  const url = `${server}/rest/getRandomSongs?u=${username}&t=${token}&s=${salt}&v=1.16.1&c=${CLIENT}&f=json&size=200`;

  try {
    const res = await fetch(url);

    const data: SubsonicResponse = await res.json();

    if (
      data["subsonic-response"].status &&
      data["subsonic-response"].randomSongs
    ) {
      const songs = data["subsonic-response"].randomSongs.song.map(
        (song: Song) => {
          return {
            ...song,
            url: `${server}/rest/stream?u=${username}&t=${token}&s=${salt}&v=${CLIENT_V}&c=${CLIENT}&f=json&id=${song.id}`,
            artwork: `${server}/rest/getCoverArt?u=${username}&t=${token}&s=${salt}&v=${CLIENT_V}&c=${CLIENT}&id=${song.albumId}&size=${IMAGE_SIZE}`,
            isFavorite: song.starred ? true : false,
          };
        }
      );

      return songs;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};
