import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import ErrorDiv from "../components/utils/ErrorDiv";
import LoadingDiv from "../components/utils/LoadingDiv";

import { hasAllProperties } from "../utils/hasAllProperties";

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

export interface OauthProps {
  setOauthToken: React.Dispatch<
    React.SetStateAction<OAuthTokenObject | undefined>
  >;
}

const Oauth = (props: OauthProps) => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(searchParams.get("error"));

  // G auth code used to exchange for refresh token
  const authCode = searchParams.get("code");

  useEffect(() => {
    // If no auth code, set error
    if (!authCode) {
      setError("No auth code provided");
      setLoading(false);
      return;
    }
    // G auth code used to exchange for refresh token
    // In-line anonymous async
    // console.log(authCode);
    (async () => {
      try {
        const tokenParams = new URLSearchParams({
          code: authCode,
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
        // Store tokens in local storage
        localStorage.setItem("G_access_token", resJSON.access_token);
        localStorage.setItem(
          "G_expires_at",
          (Math.floor(Date.now() / 1000) + resJSON.expires_in).toString()
        );
        localStorage.setItem("G_refresh_token", resJSON.refresh_token);
        localStorage.setItem("G_scope", resJSON.scope);
        localStorage.setItem("G_token_type", resJSON.token_type);

        setLoading(false);
      } catch (err: any) {
        console.log(err);
        setError(err?.message || "Something broke , need dev");
      }
    })();
  }, []);

  return (
    <div className="bg-pink-700 text-white flex flex-col justify-center items-center min-h-screen">
      <Link to="/">
        <div className="text-4xl font-bold text-center my-8">DriveLight</div>
      </Link>
      {error ? (
        <ErrorDiv title={error} />
      ) : loading ? (
        <LoadingDiv text="😎 Exchanging super secret codes 😎" />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="text-3xl font-bold text-center">
            😁 Stored your tokens in browser storage 😁
          </div>
          <div className="text-xl text-center">
            You can now use tokens for direct access to your drive
          </div>
          {/* // Go Home */}
          <a href="/">
            <div className="text-xl text-center">
              <button className="text-pink-700 bg-white font-bold py-2 px-4 rounded-full">
                Go Home
              </button>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};
export default Oauth;
