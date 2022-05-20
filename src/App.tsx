import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorDiv from "./components/utils/ErrorDiv";
import Drive from "./pages/Drive";
import Home from "./pages/Home";
import Oauth from "./pages/Oauth";

const App = () => {
  return (
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
  );
};

export default App;
