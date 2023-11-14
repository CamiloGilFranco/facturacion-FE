import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.home} onClick={() => navigate(routes.user)}>
      <h1 className={styles.welcome}>Bienvenido</h1>
    </div>
  );
};

export default Home;
