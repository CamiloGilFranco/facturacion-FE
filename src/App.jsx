import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routes } from "./constants/routes";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import LanguageButton from "./components/LanguageButton/LanguageButton";

function App() {
  return (
    <div>
      <LanguageButton />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.user} element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
