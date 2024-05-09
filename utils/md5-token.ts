import { stringMd5 } from "react-native-quick-md5";

const generateSlat = (length = 6) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = "";
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
};

export const generateTokenAndSalt = (password: string) => {
  const salt = generateSlat();

  const token = stringMd5(password + salt);

  return {
    token,
    salt,
  };
};
