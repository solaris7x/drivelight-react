import { createContext } from "react";

export interface OAuthTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface OAuthTokenObject
  extends Omit<OAuthTokenResponse, "expires_in"> {
  expires_at: number;
}

export const OAuthContext = createContext<
  | [
      OAuthTokenObject | undefined,
      React.Dispatch<React.SetStateAction<OAuthTokenObject | undefined>>
    ]
  | undefined
>(undefined);
