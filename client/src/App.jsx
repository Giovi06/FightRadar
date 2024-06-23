import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import Matches from "./pages/matches";
import ProfileSetttings from "./pages/profileSettings";

function App() {
  return (
    <div className=" min-h-full min-w-full ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<Home />}></Route>
          <Route path="/matches" element={<Matches />}></Route>
          <Route path="/profilesettings" element={<ProfileSetttings />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;