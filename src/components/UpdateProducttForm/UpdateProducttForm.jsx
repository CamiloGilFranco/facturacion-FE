import styles from "./UpdateProducttForm.module.scss";

const UpdateProducttForm = ({
  setNameToUpdate,
  nameToUpdate,
  setPriceToUpdate,
  priceToUpdate,
  stockToUpdate,
  setStockToUpdate,
  setIdToUpdate,
  handleUpdate,
  setShowUpdateForm,
}) => {
  return (
    <div className={styles.new_client}>
      <div
        className={styles.background}
        onClick={() => {
          setNameToUpdate("");
          setPriceToUpdate("");
          setStockToUpdate("");
          setIdToUpdate("");
          setShowUpdateForm(false);
        }}
      ></div>
      <form className={styles.form_container} onSubmit={handleUpdate}>
        <h2 className={styles.subtitle}>Actualizar Información</h2>
        <label htmlFor="nombre-cliente-input" className={styles.label}>
          Nombre
        </label>
        <input
          type="text"
          className={styles.input}
          id="nombre-cliente-input"
          value={nameToUpdate}
          onChange={(e) => setNameToUpdate(e.target.value)}
        />
        <label htmlFor="direccion-cliente-input" className={styles.label}>
          Precio
        </label>
        <input
          type="number"
          className={styles.input}
          id="direccion-cliente-input"
          value={priceToUpdate}
          onChange={(e) => setPriceToUpdate(e.target.value)}
        />
        <label htmlFor="telefono-cliente-input" className={styles.label}>
          Stock
        </label>
        <input
          type="number"
          className={styles.input}
          id="telefono-cliente-input"
          value={stockToUpdate}
          onChange={(e) => setStockToUpdate(e.target.value)}
        />
        <input
          type="submit"
          className={styles.submit_button}
          value="Actualizar"
        />
      </form>
    </div>
  );
};

export default UpdateProducttForm;
