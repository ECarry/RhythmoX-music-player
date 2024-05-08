import { colors } from "@/constants/tokens";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  containerStyles?: string;
  onPress: () => void;
  isLoading?: boolean;
  textStyles?: string;
}

const Button = ({
  title,
  containerStyles,
  onPress,
  isLoading,
  textStyles,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isLoading}
      style={[styles.container]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    minHeight: 50,
  },
  text: {
    color: colors.text,
  },
});
