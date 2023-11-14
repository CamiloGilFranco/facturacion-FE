import { useState } from "react";
import styles from "./NewClientModalForm.module.scss";
import { toast } from "react-toastify";
import { routes } from "../../constants/routes";
import axios from "axios";

const NewClientModalForm = ({ showForm, setShowForm, setRefresh, refresh }) => {
  const [NOMBRE_CLIENTE, setNOMBRE_CLIENTE] = useState("");
  const [DIRECCIO_CLIENTE, setDIRECCIO_CLIENTE] = useState("");
  const [TELEFON_CLIENTE, setTELEFON_CLIENTE] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!NOMBRE_CLIENTE) {
      toast.error("El cliente debe tener nombre");
      return;
    }

    if (!DIRECCIO_CLIENTE) {
      toast.error("El cliente debe tener dirección");
      return;
    }

    if (!TELEFON_CLIENTE) {
      toast.error("El cliente debe tener teléfono");
      return;
    }

    try {
      const response = await axios.post(`${routes.api}clientes`, {
        NOMBRE_CLIENTE,
        DIRECCIO_CLIENTE,
        TELEFON_CLIENTE,
      });

      setRefresh(!refresh);
      toast.success("Cliente creado");
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
        <h2 className={styles.subtitle}>Nuevo Cliente</h2>
        <label htmlFor="nombre-cliente-input" className={styles.label}>
          Nombre
        </label>
        <input
          type="text"
          className={styles.input}
          id="nombre-cliente-input"
          value={NOMBRE_CLIENTE}
          onChange={(e) => setNOMBRE_CLIENTE(e.target.value)}
        />
        <label htmlFor="direccion-cliente-input" className={styles.label}>
          Dirección
        </label>
        <input
          type="text"
          className={styles.input}
          id="direccion-cliente-input"
          value={DIRECCIO_CLIENTE}
          onChange={(e) => setDIRECCIO_CLIENTE(e.target.value)}
        />
        <label htmlFor="telefono-cliente-input" className={styles.label}>
          Teléfono
        </label>
        <input
          type="number"
          className={styles.input}
          id="telefono-cliente-input"
          value={TELEFON_CLIENTE}
          onChange={(e) => setTELEFON_CLIENTE(e.target.value)}
        />
        <input type="submit" className={styles.submit_button} />
      </form>
    </div>
  );
};

export default NewClientModalForm;
