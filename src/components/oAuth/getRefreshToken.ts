import { hasAllProperties } from "../../utils/hasAllProperties";

import { OAuthTokenObject, OAuthTokenResponse } from "../../pages/Oauth";

export interface GetRefreshTokenParams {
  authCode: string;
}
/**
 * Use G auth code used to exchange for refresh token
 * */

const getRefreshToken = async (params: GetRefreshTokenParams) => {
  // If authCode is not provided, throw error
  if (!params.authCode) {
    throw new Error("No auth code provided");
  }

  const tokenParams = new URLSearchParams({
    code: params.authCode,
    redirect_uri: import.meta.env.VITE_G_REDIRECT_URI,
    client_id: import.meta.env.VITE_G_CLIENT_ID,
    client_secret: import.meta.env.VITE_G_CLIENT_SECRET,
    scope: "https://www.googleapis.com/auth/drive.readonly",
    grant_type: "authorization_code",
  });

  // Exchange auth code for refresh token
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: tokenParams,
  });

  // Response body
  const resJSON = await res.json();

  if (
    !res.ok ||
    !hasAllProperties<OAuthTokenResponse>(resJSON, [
      "access_token",
      "expires_in",
      "refresh_token",
      "scope",
      "token_type",
    ])
  ) {
    throw new Error("Invalid refresh token response");
  }

  const oAuthToken: OAuthTokenObject = {
    ...resJSON,
    expires_at: Math.floor(Date.now() / 1000) + resJSON.expires_in,
  };

  return oAuthToken;
};

export default getRefreshToken;
