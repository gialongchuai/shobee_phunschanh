import React, { createContext } from "react";
import { getAccessTokenFromLS, getProfileFromLS } from "../utils/auth";

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: String | null;
  setProfile: React.Dispatch<React.SetStateAction<String | null>>;
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => {},
  profile: getProfileFromLS(),
  setProfile: () => null,
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    initialAppContext.isAuthenticated,
  );
  const [profile, setProfile] = React.useState(initialAppContext.profile);

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}
    >
      {children}
    </AppContext.Provider>
  );
};
