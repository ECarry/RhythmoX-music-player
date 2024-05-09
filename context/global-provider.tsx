import { getData } from "@/utils/storage";
import { Config } from "@/utils/types";
import { createContext, useContext, useEffect, useState } from "react";

interface GlobalContextType {
  config: Config | null;
}

const GlobalContext = createContext<GlobalContextType | null>({
  config: null,
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    const getConfig = async () => {
      const config = await getData("config");

      if (config) {
        setConfig(config);
      }
    };

    getConfig();
  }, [config]);

  return (
    <GlobalContext.Provider value={{ config }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
