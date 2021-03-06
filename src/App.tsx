import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Drive from "./pages/Drive";
import Home from "./pages/Home";
import Oauth, { OAuthTokenObject } from "./pages/Oauth";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

import ErrorDiv from "./components/utils/ErrorDiv";
import { hasAllProperties } from "./utils/hasAllProperties";
import AuthContext, {
  AuthContextType,
  AuthContextEnum,
} from "./context/AuthContext";
import getAccessToken from "./components/oAuth/getAccessToken";

const App = () => {
  // Get tokens from local storage
  const oAuthExpireAt = localStorage.getItem("G_expires_at");
  const OauthLocalToken = {
    access_token: localStorage.getItem("G_access_token"),
    expires_at: oAuthExpireAt ? parseInt(oAuthExpireAt) : undefined,
    refresh_token: localStorage.getItem("G_refresh_token"),
    scope: localStorage.getItem("G_scope"),
    token_type: localStorage.getItem("G_token_type"),
  };

  const [oauthToken, setOauthToken] = useState<OAuthTokenObject | undefined>(
    hasAllProperties<OAuthTokenObject>(OauthLocalToken, [
      "access_token",
      "expires_at",
      "refresh_token",
      "scope",
      "token_type",
    ])
      ? OauthLocalToken
      : undefined
  );

  // Set value in provider
  const authContextValue: AuthContextType = oauthToken?.access_token
    ? {
        type: AuthContextEnum.Oauth2,
        key: oauthToken.access_token,
        paramString: async () => {
          return `access_token=${await getAccessToken(
            oauthToken,
            setOauthToken
          )}`;
        },
      }
    : {
        type: AuthContextEnum.API_KEY,
        key: import.meta.env.VITE_GAPIKEY,
        paramString: () => `key=${import.meta.env.VITE_GAPIKEY}`,
      };

  return (
    <AuthContext.Provider value={authContextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home setOauthToken={setOauthToken} />} />
          <Route path="/drive" element={<Drive />}>
            <Route path=":folderId" element={<Drive />} />
          </Route>
          <Route path="/teamdrive" element={<Drive />}>
            <Route path=":teamDriveId/:folderId" element={<Drive />} />
          </Route>
          <Route
            path="/oauth"
            element={<Oauth setOauthToken={setOauthToken} />}
          />
          {/* Other Routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          {/* Default Route */}
          <Route
            path="*"
            element={
              <div className="bg-pink-700 text-white flex flex-col justify-center items-center min-h-screen">
                <Link to="/">
                  <div className="text-4xl py-8 font-bold text-center">
                    DriveLight
                  </div>
                </Link>
                <ErrorDiv message="Lost?" />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
