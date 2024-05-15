import { useContext, createContext, ReactNode } from 'react';

interface Config {
  apiUrl: string;
}

const ConfigContext = createContext<Config | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const config: Config = {
    apiUrl: process.env.REACT_APP_API_URL || ''
  };

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): Config => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
