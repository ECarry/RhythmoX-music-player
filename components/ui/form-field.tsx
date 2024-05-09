import { Controller, FieldValues, RegisterOptions } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

interface FormFieldProps<T> {
  label: string;
  name: string;
  control: any;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "url";
  containerStyle?: string;
  placeholder?: string;
}

const FormField = <T extends Record<string, any>>({
  label,
  name,
  control,
  rules,
  secureTextEntry,
  keyboardType,
  containerStyle,
  placeholder,
}: FormFieldProps<T>) => {
  return (
    <View className={`space-y-2 mt-4 ${containerStyle}`}>
      <Text className="text-base text-gray-100 font-RPRegular  pl-4">
        {label}
      </Text>
      <View className="w-full h-14 px-4 bg-black/20 rounded-full items-center flex flex-row">
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              placeholder={placeholder}
              placeholderTextColor="#7B7B8b"
              className="flex-1 text-white font-RPSemiBold text-base"
            />
          )}
        />
      </View>
    </View>
  );
};

export default FormField;
