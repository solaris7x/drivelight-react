import { createContext } from "react";

export interface AuthContextType {
  type: AuthContextEnum;
  key: string;
  paramString: () => Promise<string> | string;
}

export enum AuthContextEnum {
  API_KEY = "API Key",
  Oauth2 = "Oauth2",
}

const AuthContext = createContext<AuthContextType>({
  type: AuthContextEnum.API_KEY,
  key: import.meta.env.VITE_GAPIKEY,
  paramString: () => `key=${import.meta.env.VITE_GAPIKEY}`,
});

export default AuthContext;
