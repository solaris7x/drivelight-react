import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import getOauthUrl from "../components/oAuth/getOauthUrl";
import { OAuthTokenObject } from "./Oauth";

import AuthContext, { AuthContextEnum } from "../context/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";

interface HomeProps {
  setOauthToken: React.Dispatch<
    React.SetStateAction<OAuthTokenObject | undefined>
  >;
}

interface NavigateFormFields {
  folderId: string;
  driveId?: string;
}

const Home = (props: HomeProps) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // Navigate Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NavigateFormFields>();
  const navigateFormSubmit: SubmitHandler<NavigateFormFields> = (data) => {
    if (data.driveId) {
      navigate(`/teamdrive/${data.driveId}/${data.folderId}`);
      return;
    }
    navigate(`/drive/${data.folderId}`);
  };

  return (
    <div className="bg-pink-700 text-white flex flex-col justify-center items-center gap-4 min-h-screen">
      <Link to="/">
        <h1 className="text-4xl font-bold text-center my-8">DriveLight</h1>
      </Link>
      {/* // Login with Google */}
      <h2 className="text-xl font-semibold">Login With Google</h2>
      {auth.type != AuthContextEnum.Oauth2 ? (
        <a
          href={getOauthUrl(
            import.meta.env.VITE_G_CLIENT_ID,
            import.meta.env.VITE_G_REDIRECT_URI
          )}
        >
          <div className="bg-white text-gray-600 text-lg shadow-lg p-4 rounded-lg ">
            Get token
          </div>
        </a>
      ) : (
        <button
          className="bg-white text-gray-600 text-lg p-3 shadow-lg rounded-lg"
          onClick={() => {
            // Clear token from localDB
            localStorage.removeItem("G_access_token");
            localStorage.removeItem("G_expires_at");
            localStorage.removeItem("G_refresh_token");
            localStorage.removeItem("G_scope");
            localStorage.removeItem("G_token_type");
            props.setOauthToken(undefined);
          }}
        >
          <div className="">Clear local token</div>
        </button>
      )}
      {/* Navigate form */}
      <h2 className="text-xl font-semibold">Navigate</h2>
      <form className="w-2/3" onSubmit={handleSubmit(navigateFormSubmit)}>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="text-black grow">
            <input
              type="text"
              placeholder="FolderID"
              {...register("folderId", { required: true })}
              className="w-full p-2"
            />
            {errors.folderId && (
              <div className="text-red-500 text-lg text-center font-bold px-1 bg-white md:w-1/2 mx-auto">
                {errors.folderId.message || "FolderID is required"}
              </div>
            )}
          </div>
          <div className="text-black grow">
            <input
              type="text"
              placeholder="DriveID (Optional)"
              {...register("driveId")}
              className="w-full p-2"
            />
            {errors.driveId && (
              <div className="text-red-500 text-lg text-center font-bold px-1 bg-white md:w-1/2 mx-auto">
                {errors.driveId.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center my-4">
          <button
            className="bg-white text-pink-700 text-xl font-semibold p-2 shadow-lg rounded-lg"
            type="submit"
          >
            {"Go >"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Home;
