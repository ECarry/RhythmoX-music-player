import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  containerStyles?: string;
  onPress: () => void;
  isLoading?: boolean;
  textStyles?: string;
  disabled?: boolean;
}

const Button = ({
  title,
  containerStyles,
  onPress,
  isLoading,
  textStyles,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isLoading || disabled}
      className={`bg-secondary rounded-xl min-h-[50px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } ${disabled ? "bg-gray-400" : ""}`}
    >
      <Text className={`text-lg font-RPBold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
