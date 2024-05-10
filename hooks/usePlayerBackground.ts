import { colors } from "@/constants/tokens";
import React from "react";
import { Platform } from "react-native";
import { getColors } from "react-native-image-colors";
import {
  IOSImageColors,
  AndroidImageColors,
} from "react-native-image-colors/build/types";

const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColors] = React.useState<
    IOSImageColors | AndroidImageColors | null
  >(null);

  React.useEffect(() => {
    getColors(imageUrl, {
      fallback: colors.background,
      cache: true,
      key: imageUrl,
    }).then((colors) => {
      const platformColors = Platform.select({
        ios: colors as IOSImageColors,
        android: colors as AndroidImageColors,
        default: colors as IOSImageColors | AndroidImageColors,
      });

      setImageColors(platformColors);
    });
  }, [imageUrl]);

  return {
    imageColors,
  };
};

export default usePlayerBackground;
