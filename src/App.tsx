import { BrowserRouter, Routes, Route } from "react-router-dom";
import Drive from "./pages/Drive";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:folderId" element={<Drive />}></Route>
        <Route path="/:teamDriveId/:folderId" element={<Drive />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
