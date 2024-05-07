import { View, ViewProps } from "react-native";
import { Feather } from "@expo/vector-icons";

import { colors } from "@/constants/tokens";

const PlayerToggle = ({ style }: ViewProps) => {
  return (
    <View
      style={[
        style,
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 25,
          opacity: 0.7,
        },
      ]}
    >
      <Feather name="message-circle" size={24} color={colors.icon} />
      <Feather name="airplay" size={24} color={colors.icon} />
      <Feather name="list" size={24} color={colors.icon} />
    </View>
  );
};

export default PlayerToggle;
