import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { getData, storeData } from "@/storage";
import { ping } from "@/utils/api";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Config = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [config, setConfig] = useState({
    username: "",
    password: "",
    server: "",
  });

  useEffect(() => {
    const getConfig = async () => {
      const configData = await getData("config");

      if (configData) {
        setConfig(configData);
      }
    };

    getConfig().catch((err) => console.log(err));
  }, []);

  const onSubmit = async () => {
    await storeData("config", JSON.stringify(config));
  };

  const onTest = async () => {
    const currentConfig = await getData("config");

    if (!currentConfig && !config.server) {
      setError("Please fill server field");
    }

    if (currentConfig) {
      const { server, username, password } = JSON.parse(currentConfig);

      await ping(server, username, password).then((res) => console.log(res));
    }
  };

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: "#000",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View>
          <Text>Config your server</Text>

          <FormField
            label="Server"
            value={config.server}
            onChange={(value) => setConfig({ ...config, server: value })}
            placeholder="http[s]://your-server:port"
          />

          <FormField
            label="Username"
            value={config.username}
            onChange={(value) => setConfig({ ...config, username: value })}
          />

          <FormField
            label="Password"
            value={config.password}
            onChange={(value) => setConfig({ ...config, password: value })}
            secureTextEntry={true}
          />

          {error && <Text style={{ color: "red" }}>{error}</Text>}

          {success && <Text style={{ color: "green" }}>{success}</Text>}

          <Button title="Save" onPress={onSubmit} />

          <Button title="Test" onPress={onTest} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Config;

const styles = StyleSheet.create({});
