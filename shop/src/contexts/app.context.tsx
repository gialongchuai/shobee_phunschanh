import React, { createContext } from "react";
import { getAccessTokenFromLS } from "../utils/auth";

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => {},
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    initialAppContext.isAuthenticated,
  );

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};
