import { colors } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { StyleProps } from "react-native-reanimated";

interface FormFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  style?: StyleProps;
}

const FormField = ({
  label,
  value,
  placeholder,
  onChange,
  secureTextEntry,
  keyboardType,
  style,
}: FormFieldProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.labelStyle}>{label}</Text>

      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={onChange}
          secureTextEntry={label === "Password" ? true : false}
        />
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  labelStyle: {
    ...defaultStyles.text,
    color: colors.textMuted,
  },
  inputContainer: {
    width: "100%",
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  inputStyle: {
    ...defaultStyles.text,
    color: colors.textMuted,
  },
});
