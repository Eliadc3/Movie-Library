import { Route, Routes } from "react-router-dom";
import Favorites_Page from "./pages/content/Favorites_Page.js";
import Movies_Page from "./pages/content/Movies_Page.js";
import TV_Page from "./pages/content/TV_Page.js";
import SignUp_Page from "./pages/user/SignUp_Page";
import "./App.css";
import MainLayout from "./layouts/MainLayout.js";

function App() {
  // App file
  return (
    <div className="App">
      <MainLayout>
        <Routes>
          <Route path="/signup" element={<SignUp_Page />} />
          <Route path="/Favorites_Page" element={<Favorites_Page />} />
          <Route path="/movies_page" element={<Movies_Page />} />
          <Route path="/tv_page" element={<TV_Page />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
