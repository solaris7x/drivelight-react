import {
  OAuthTokenObject,
  OAuthTokenResponse,
} from "../../context/OAuthContext";
import { hasAllProperties } from "../../utils/hasAllProperties";

const refreshAccessToken = async (
  Oauth: OAuthTokenObject,
  setOauthToken: React.Dispatch<
    React.SetStateAction<OAuthTokenObject | undefined>
  >
) => {
  // Create the refresh token request
  const request = {
    client_id: import.meta.env.VITE_G_CLIENT_ID,
    client_secret: import.meta.env.VITE_G_CLIENT_SECRET,
    refresh_token: Oauth.refresh_token,
    grant_type: "refresh_token",
  };
  // Make the request to the refresh token endpoint
  const res = await fetch(`https://oauth2.googleapis.com/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const resJSON = await res.json();

  // Throw if the request failed or response body is invalid
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
    throw new Error(resJSON?.error_description || "Could not refresh token");
  }

  // Update the OAuth token object in localStorage
  localStorage.setItem("G_access_token", resJSON.access_token);
  localStorage.setItem(
    "G_expires_at",
    (Math.floor(Date.now() / 1000) + resJSON.expires_in).toString()
  );
  localStorage.setItem("G_refresh_token", resJSON.refresh_token);
  localStorage.setItem("G_scope", resJSON.scope);
  localStorage.setItem("G_token_type", resJSON.token_type);

  // Update Oauth state
  setOauthToken({
    ...resJSON,
    expires_at: Math.floor(Date.now() / 1000) + resJSON.expires_in,
  });

  // Return the new access token
  return Oauth.access_token;
};

export default refreshAccessToken;
