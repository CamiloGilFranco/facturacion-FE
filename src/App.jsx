import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routes } from "./constants/routes";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import LanguageButton from "./components/LanguageButton/LanguageButton";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";

function App() {
  return (
    <div>
      <HeaderComponent />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.clientes} element={<User />} />
        <Route path={routes.productos} element={<User />} />
        <Route path={routes.facturas} element={<User />} />
        <Route path={routes.reporte} element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
