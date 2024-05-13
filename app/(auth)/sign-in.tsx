import Logo from "@/components/logo";
import { StatusBar } from "expo-status-bar";
import { set, useForm } from "react-hook-form";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/ui/form-field";
import Button from "@/components/ui/button";
import { storeData } from "@/utils/storage";
import { ping } from "@/utils/api";
import { configSchema } from "@/schemas";
import { useState } from "react";
import { router } from "expo-router";

export const formSchema = configSchema;

const SignIn = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      server: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    const data = form.getValues();

    await storeData("config", JSON.stringify(data));
    router.push("/(tabs)/home");
  };

  const onTest = async () => {
    setSuccess("");
    setError("");
    const config = form.getValues();

    await ping(config).then((res) => {
      if (res && res.status) {
        setSuccess("Success!");
      } else {
        setError(
          "Could not connect to server. Make sure the URL is correct and the server is running."
        );
      }
    });
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="flex-1 items-center justify-start relative">
          <Image
            source={require("@/assets/images/navidrome.png")}
            resizeMode="contain"
            className="absolute -right-10 top-10 h-[180px] w-[180px]"
          />
          <Logo />

          <View className="w-full px-4 mt-7">
            <FormField
              label="Server"
              name="server"
              control={form.control}
              placeholder="http[s]://navidrome.example.com[:port]"
              rules={{ required: "Server is required" }}
              keyboardType="url"
            />
            {form.formState.errors.server && (
              <Text className="text-rose-500 pl-4 mt-1">
                {form.formState.errors.server.message}
              </Text>
            )}

            <FormField
              label="Username"
              name="username"
              control={form.control}
              rules={{ required: "Username is required" }}
            />
            {form.formState.errors.username && (
              <Text className="text-rose-500 pl-4 mt-1">
                {form.formState.errors.username.message}
              </Text>
            )}

            <FormField
              label="Password"
              name="password"
              control={form.control}
              rules={{ required: "Password is required" }}
              secureTextEntry
            />
            {form.formState.errors.password && (
              <Text className="text-rose-500 pl-4 mt-1">
                {form.formState.errors.password.message}
              </Text>
            )}

            {error && <Text className="text-rose-500 pl-4 mt-2">{error}</Text>}

            {success && (
              <Text className="text-green-500 pl-4 mt-2">{success}</Text>
            )}

            <Button
              title="Test"
              onPress={onTest}
              disabled={!form.formState.isValid}
              containerStyles={`${
                error ? "bg-rose-500" : "bg-secondary-200"
              } mt-4 rounded-full`}
              textStyles="text-white"
            />

            <Button
              title="Save"
              onPress={form.handleSubmit(onSubmit)}
              disabled={!form.formState.isValid}
              containerStyles="bg-secondary-200 mt-4 rounded-full"
              textStyles="text-white"
            />
          </View>
        </View>
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default SignIn;
