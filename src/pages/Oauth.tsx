import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import getRefreshToken, {
  GetRefreshTokenParams,
} from "../components/oAuth/getRefreshToken";

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
  const [triggered, setTriggered] = useState(false);

  // Form state
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<GetRefreshTokenParams>();

  // G auth code used to exchange for refresh token
  const authCode = searchParams.get("code");

  // Form submit handler
  const onSubmit: SubmitHandler<GetRefreshTokenParams> = async ({
    authCode,
  }) => {
    try {
      setTriggered(true);
      setLoading(true);
      const refreshRes = await getRefreshToken({ authCode });

      // Store tokens in local storage
      localStorage.setItem("G_access_token", refreshRes.access_token);
      localStorage.setItem("G_expires_at", refreshRes.expires_at.toString());
      localStorage.setItem("G_refresh_token", refreshRes.refresh_token);
      localStorage.setItem("G_scope", refreshRes.scope);
      localStorage.setItem("G_token_type", refreshRes.token_type);
    } catch (err: any) {
      // console.log(err);
      setError(err?.message || "Something broke , need dev");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-pink-700 text-white flex flex-col justify-center items-center min-h-screen">
      <Link to="/">
        <div className="text-4xl font-bold text-center my-8">DriveLight</div>
      </Link>
      <form
        className="md:w-1/2 flex flex-col justify-center items-center gap-4 my-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          htmlFor="authCode"
          className="flex flex-col md:flex-row justify-center items-center w-full"
        >
          <div className="p-2 text-lg font-semibold">Auth Code</div>
          <input
            type="text"
            defaultValue={authCode || undefined}
            {...register("authCode", { required: true })}
            className="p-2 text-lg font-semibold text-black w-full md:w-1/2"
          />
        </label>
        {formErrors.authCode && <div className="">No auth code provided</div>}
        <button
          type="submit"
          className="p-2 text-lg font-semibold bg-orange-500"
        >
          😎 Exchange super secret codes 😎
        </button>
      </form>
      {triggered &&
        (error ? (
          <ErrorDiv title={error} />
        ) : loading ? (
          <div className="px-10">
            <LoadingDiv text="😎 Exchanging super secret codes 😎" />
          </div>
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
        ))}
    </div>
  );
};
export default Oauth;
