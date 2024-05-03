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

const url = `http://192.168.0.98:4533/rest/getRandomSongs?u=username&p=password&v=1.16.1&c=ecarry&size=30`;
const coverUrl = `http://192.168.0.98:4533/rest/getCoverArt?u=username&p=password&v=1.16.1&c=ecarry`;

export const getRandomSongs = async () => {
  try {
    const res = await fetch(url);

    const xmlData = await res.text();

    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    };
    const parser = new XMLParser(options);
    let jObj = parser.parse(xmlData);

    const data = removePrefix(jObj);
    const status = data["subsonic-response"].status;

    if (status === "ok") {
      const res = data["subsonic-response"].randomSongs.song;

      return res;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCoverArt = async (id: string) => {
  try {
    const cover = fetch(`${coverUrl}&id=${id}`);

    return cover;
  } catch (error) {
    console.log(error);
  }
};
