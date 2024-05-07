import { XMLParser } from "fast-xml-parser";

interface AnyObject {
  [key: string]: any;
}

function removePrefix(obj: AnyObject): AnyObject {
  for (let key in obj) {
    if (key.startsWith("@_")) {
      const value = obj[key];
      delete obj[key];
      obj[key.substring(2)] = value;
    }
    if (typeof obj[key] === "object") {
      removePrefix(obj[key]);
    }
  }
  return obj;
}

const url = process.env.EXPO_PUBLIC_SUBSONIC_API_URL;
const username = process.env.EXPO_PUBLIC_SUBSONIC_API_U;
const password = process.env.EXPO_PUBLIC_SUBSONIC_API_P;

//TODO: USE TOKEN

const XMLToJSON = (xml: string) => {
  const XMLOptions = {
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  };

  const parser = new XMLParser(XMLOptions);
  let jObj = parser.parse(xml);

  return removePrefix(jObj);
};

export const getRandomSongs = async () => {
  try {
    const res = await fetch(
      `${url}/getRandomSongs?u=${username}&p=${password}&v=1.16.1&c=ecarry&size=200`
    );

    const xmlData = await res.text();

    const data = XMLToJSON(xmlData);
    const status = data["subsonic-response"].status;

    if (status === "ok") {
      const res = data["subsonic-response"].randomSongs.song;

      const songs = res.map((song: AnyObject) => {
        return {
          ...song,
          url: `${url}/stream?u=${username}&p=${password}&v=1.16.1&c=ecarry&id=${song.id}`,
          artwork: `${url}/getCoverArt?u=${username}&p=${password}&v=1.16.1&c=ecarry&id=${song.albumId}`,
          isFavorite: song.starred ? true : false,
        };
      });

      console.log(songs.length);

      return songs;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getFavoriteSongs = async () => {
  try {
    const res = await fetch(
      `${url}/getStarred?u=${username}&p=${password}&v=1.16.1&c=ecarry`
    );

    const xmlData = await res.text();

    const data = XMLToJSON(xmlData);

    const status = data["subsonic-response"].status;

    if (status === "ok") {
      const res = data["subsonic-response"].starred.song;
      const songs = res.map((song: AnyObject) => {
        return {
          ...song,
          url: `${url}/stream?u=${username}&p=${password}&v=1.16.1&c=ecarry&id=${song.id}`,
          artwork: `${url}/getCoverArt?u=${username}&p=${password}&v=1.16.1&c=ecarry&id=${song.albumId}`,
          isFavorite: song.starred ? true : false,
        };
      });
      return songs;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const starSong = async (id: string) => {
  try {
    const res = await fetch(
      `${url}/star?u=${username}&p=${password}&v=1.16.1&c=ecarry&id=${id}`
    );

    const xmlData = await res.text();
    const data = XMLToJSON(xmlData);

    const status = data["subsonic-response"].status;

    if (status === "ok") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const unstarSong = async (id: string) => {
  try {
    const res = await fetch(
      `${url}/unstar?u=${username}&p=${password}&v=1.16.1&c=ecarry&id=${id}`
    );

    const xmlData = await res.text();
    const data = XMLToJSON(xmlData);

    const status = data["subsonic-response"].status;

    if (status === "ok") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
