import { useContext } from "react";
import { Link } from "react-router-dom";
import getOauthUrl from "../components/oAuth/getOauthUrl";
import AuthContext, { AuthContextEnum } from "../context/AuthContext";

const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="bg-pink-700 text-white flex flex-col justify-center items-center gap-4 min-h-screen">
      <Link to="/">
        <div className="text-4xl font-bold text-center my-8">DriveLight</div>
      </Link>
      {/* // Login with Google */}
      {auth.type != AuthContextEnum.Oauth2 ? (
        <a
          href={getOauthUrl(
            import.meta.env.VITE_G_CLIENT_ID,
            import.meta.env.VITE_G_REDIRECT_URI
          )}
        >
          <div className="bg-white text-gray-600 text-lg shadow-lg p-4 rounded-lg ">
            Get token from Google
          </div>
        </a>
      ) : (
        <button className="bg-white text-gray-600 text-lg p-3 shadow-lg rounded-lg">
          <div className="">Clear local token</div>
        </button>
      )}
    </div>
  );
};
export default Home;
