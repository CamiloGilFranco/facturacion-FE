import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routes } from "./constants/routes";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import Clientes from "./pages/Clientes/Clientes";
import { ToastContainer } from "react-toastify";
import toastStyle from "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <HeaderComponent />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.clientes} element={<Clientes />} />
        <Route path={routes.productos} element={<User />} />
        <Route path={routes.facturas} element={<User />} />
        <Route path={routes.reporte} element={<User />} />
      </Routes>
      <ToastContainer
        className={toastStyle}
        position="bottom-center"
        theme="colored"
      />
    </div>
  );
}

export default App;
