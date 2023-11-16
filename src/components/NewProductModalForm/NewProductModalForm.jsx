import { useState } from "react";
import styles from "./NewProductModalForm.module.scss";
import { toast } from "react-toastify";
import { routes } from "../../constants/routes";
import axios from "axios";

const NewProductModalForm = ({
  setShowForm,
  setRefresh,
  refresh,
  productsList,
}) => {
  const [NOMBRE_PRODUCTO, setNOMBRE_PRODUCTO] = useState("");
  const [PRECIO_PRODUCTO, setPRECIO_PRODUCTO] = useState("");
  const [STOCK_PRODUCTO, setSTOCK_PRODUCTO] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!NOMBRE_PRODUCTO) {
      toast.error("El producto debe tener nombre");
      return;
    }

    if (!PRECIO_PRODUCTO) {
      toast.error("El producto debe tener precio");
      return;
    }

    if (!STOCK_PRODUCTO) {
      toast.error("El producto debe tener stock");
      return;
    }

    const productFound = productsList.find(
      (element) => element.NOMBRE_PRODUCTO === NOMBRE_PRODUCTO
    );

    if (productFound) {
      toast.error("Este producto ya existe");
      return;
    }

    try {
      const response = await axios.post(`${routes.api}productos`, {
        NOMBRE_PRODUCTO,
        PRECIO_PRODUCTO,
        STOCK_PRODUCTO,
      });

      setRefresh(!refresh);
      toast.success("Producto creado");
      setShowForm(false);
    } catch (error) {
      console.log(error);
      toast.error("Algo salio mal, inténtalo mas tarde");
    }
  };

  return (
    <div className={styles.new_client}>
      <div
        className={styles.background}
        onClick={() => setShowForm(false)}
      ></div>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <h2 className={styles.subtitle}>Nuevo Producto</h2>
        <label htmlFor="nombre-producto-input" className={styles.label}>
          Nombre
        </label>
        <input
          type="text"
          className={styles.input}
          id="nombre-producto-input"
          value={NOMBRE_PRODUCTO}
          onChange={(e) => setNOMBRE_PRODUCTO(e.target.value)}
        />
        <label htmlFor="precio-producto-input" className={styles.label}>
          Precio
        </label>
        <input
          type="number"
          className={styles.input}
          id="precio-producto-input"
          value={PRECIO_PRODUCTO}
          onChange={(e) => setPRECIO_PRODUCTO(e.target.value)}
        />
        <label htmlFor="stock-producto-input" className={styles.label}>
          Stock
        </label>
        <input
          type="number"
          className={styles.input}
          id="stock-producto-input"
          value={STOCK_PRODUCTO}
          onChange={(e) => setSTOCK_PRODUCTO(e.target.value)}
        />
        <input type="submit" className={styles.submit_button} />
      </form>
    </div>
  );
};

export default NewProductModalForm;
