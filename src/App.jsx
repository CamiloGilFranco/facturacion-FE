import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routes } from "./constants/routes";
import Home from "./pages/Home/Home";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import Clientes from "./pages/Clientes/Clientes";
import { ToastContainer } from "react-toastify";
import toastStyle from "react-toastify/dist/ReactToastify.css";
import Productos from "./pages/Productos/Productos";
import Facturas from "./pages/Facturas/Facturas";
import Reporte from "./pages/Reporte/Reporte";
import InformeFactura from "./pages/InformeFactura/InformeFactura";

function App() {
  return (
    <div>
      <HeaderComponent />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.clientes} element={<Clientes />} />
        <Route path={routes.productos} element={<Productos />} />
        <Route path={routes.facturas} element={<Facturas />} />
        <Route path={routes.reporte} element={<Reporte />} />
        <Route path={routes.informeFactura} element={<InformeFactura />} />
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
