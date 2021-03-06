import { OAuthTokenObject } from "../../pages/Oauth";
import refreshAccessToken from "./refreshAccessToken";

const getAccessToken = async (
  Oauth: OAuthTokenObject,
  setOauthToken: React.Dispatch<
    React.SetStateAction<OAuthTokenObject | undefined>
  >
) => {
  // Check if the access token is expired
  if (Oauth.expires_at <= Date.now() / 1000) {
    // console.log("Refreshing access token");
    // If it is expired, refresh it
    return await refreshAccessToken(Oauth, setOauthToken);
  }
  // Return the access token
  return Oauth.access_token;
};

export default getAccessToken;
