import { routes } from "../../constants/routes";
import styles from "./HeaderComponent.module.scss";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <span
        className={styles.header_button}
        onClick={() => navigate(routes.clientes)}
      >
        CLIENTES
      </span>
      <span
        className={styles.header_button}
        onClick={() => navigate(routes.productos)}
      >
        PRODUCTOS
      </span>
      <span
        className={styles.header_button}
        onClick={() => navigate(routes.facturas)}
      >
        FACTURAS
      </span>
      <span
        className={styles.header_button}
        onClick={() => navigate(routes.reporte)}
      >
        REPORTE
      </span>
    </div>
  );
};

export default HeaderComponent;
