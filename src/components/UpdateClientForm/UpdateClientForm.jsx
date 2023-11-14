import styles from "./UpdateClientForm.module.scss";

const UpdateClientForm = ({
  setNameToUpdate,
  nameToUpdate,
  setAddressToUpdate,
  addressToUpdate,
  numberToUpdate,
  setNumberToUpdate,
  idToUpdate,
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
          setAddressToUpdate("");
          setNumberToUpdate("");
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
          Dirección
        </label>
        <input
          type="text"
          className={styles.input}
          id="direccion-cliente-input"
          value={addressToUpdate}
          onChange={(e) => setAddressToUpdate(e.target.value)}
        />
        <label htmlFor="telefono-cliente-input" className={styles.label}>
          Teléfono
        </label>
        <input
          type="number"
          className={styles.input}
          id="telefono-cliente-input"
          value={numberToUpdate}
          onChange={(e) => setNumberToUpdate(e.target.value)}
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

export default UpdateClientForm;
