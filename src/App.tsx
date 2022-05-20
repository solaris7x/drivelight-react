import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorDiv from "./components/utils/ErrorDiv";
import { OAuthContext, OAuthTokenObject } from "./context/OAuthContext";
import Drive from "./pages/Drive";
import Home from "./pages/Home";
import Oauth from "./pages/Oauth";
import { hasAllProperties } from "./utils/hasAllProperties";

const App = () => {
  // Get tokens from local storage
  const OauthLocalToken = {
    access_token: localStorage.getItem("G_access_token"),
    expires_at: localStorage.getItem("G_expires_at"),
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
  return (
    <OAuthContext.Provider value={[oauthToken, setOauthToken]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drive" element={<Drive />}>
            <Route path=":folderId" element={<Drive />} />
          </Route>
          <Route path="/teamdrive" element={<Drive />}>
            <Route path=":teamDriveId/:folderId" element={<Drive />} />
          </Route>
          <Route path="/oauth" element={<Oauth />} />
          {/* Default Route */}
          <Route
            path="*"
            element={
              <div className="bg-pink-700 text-white flex flex-col justify-center items-center min-h-screen">
                <div className="text-4xl py-8 font-bold text-center">
                  DriveLight
                </div>
                <ErrorDiv message="Lost?" />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </OAuthContext.Provider>
  );
};

export default App;
