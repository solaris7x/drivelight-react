import { Link } from "react-router-dom";
import getOauthUrl from "../components/functions/getOauthUrl";

const Home = () => {
  return (
    <div className="bg-pink-700 text-white flex flex-col justify-center items-center min-h-screen">
      <Link to="/">
        <div className="text-4xl font-bold text-center my-8">DriveLight</div>
      </Link>
      {/* // Login with Google */}
      <a
        href={getOauthUrl(
          import.meta.env.VITE_G_CLIENT_ID,
          import.meta.env.VITE_G_REDIRECT_URI
        )}
      >
        <div className="bg-white text-gray-600 shadow-lg p-4 rounded-lg ">
          Login with Google
        </div>
      </a>
    </div>
  );
};
export default Home;
