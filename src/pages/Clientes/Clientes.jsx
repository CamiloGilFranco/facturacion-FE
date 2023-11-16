import { useEffect, useState } from "react";
import styles from "./Clientes.module.scss";
import NewClientModalForm from "../../components/NewClientModalForm/NewClientModalForm";
import axios from "axios";
import { routes } from "../../constants/routes";
import deleteImg from "../../assets/delete.svg";
import updateImg from "../../assets/update.svg";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import UpdateClientForm from "../../components/UpdateClientForm/UpdateClientForm";

const Clientes = () => {
  const [showForm, setShowForm] = useState(false);
  const [clientsList, setClientsList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [nameToUpdate, setNameToUpdate] = useState("");
  const [addressToUpdate, setAddressToUpdate] = useState("");
  const [numberToUpdate, setNumberToUpdate] = useState("");
  const [idToUpdate, setIdToUpdate] = useState("");

  useEffect(() => {
    getData();
  }, [refresh]);

  const getData = async () => {
    try {
      const clientsData = await axios.get(`${routes.api}clientes`);

      setClientsList(clientsData.data.clientes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (client) => {
    const areYouSure = await Swal.fire({
      title: "¿Estas seguro de querer eliminar este cliente?",
      text: "Esta operación no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6d28d9",
      cancelButtonColor: "#ef4444",
      confirmButtonText: `Continuar`,
      cancelButtonText: `Cancelar`,
    });

    if (!areYouSure.isConfirmed) {
      return;
    }

    try {
      await axios.delete(`${routes.api}clientes`, {
        data: { id: client.ID_CLIENTE },
      });

      toast.success("Cliente eliminado");
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const areYouSure = await Swal.fire({
      title: "¿Estas seguro de querer actualizarla información este cliente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6d28d9",
      cancelButtonColor: "#ef4444",
      confirmButtonText: `Continuar`,
      cancelButtonText: `Cancelar`,
    });

    if (!areYouSure.isConfirmed) {
      return;
    }

    try {
      await axios.put(`${routes.api}clientes/${idToUpdate}`, {
        NOMBRE_CLIENTE: nameToUpdate,
        DIRECCIO_CLIENTE: addressToUpdate,
        TELEFON_CLIENTE: numberToUpdate,
      });

      toast.success("Información actualizada");
      setNameToUpdate("");
      setAddressToUpdate("");
      setNumberToUpdate("");
      setIdToUpdate("");
      setShowUpdateForm(false);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      toast.error("Algo salio mal, inténtalo mas tarde");
    }
  };

  return (
    <div className={styles.clientes_page}>
      <span
        className={styles.new_client_button}
        onClick={() => setShowForm(true)}
      >
        Crear Cliente
      </span>
      <div className={styles.table_header}>
        <span className={styles.campoh}>#ID</span>
        <span className={styles.campoh}>Nombre</span>
        <span className={styles.campoh}>Dirección</span>
        <span className={styles.campoh}>Teléfono</span>
        <span className={styles.button}></span>
        <span className={styles.button}></span>
      </div>
      <div className={styles.list_container}>
        {clientsList.map((client, index) => {
          return (
            <div className={styles.client_item} key={index}>
              <span className={styles.campo}>{client.ID_CLIENTE}</span>
              <span className={styles.campo}>{client.NOMBRE_CLIENTE}</span>
              <span className={styles.campo}>{client.DIRECCIO_CLIENTE}</span>
              <span className={styles.campo}>{client.TELEFON_CLIENTE}</span>
              <span
                className={styles.button_action}
                onClick={() => handleDelete(client)}
              >
                <img src={deleteImg} alt="" className={styles.icon} />
              </span>
              <span
                className={styles.button_action}
                onClick={() => {
                  setShowUpdateForm(true);
                  setNameToUpdate(client.NOMBRE_CLIENTE);
                  setAddressToUpdate(client.DIRECCIO_CLIENTE);
                  setIdToUpdate(client.ID_CLIENTE);
                  setNumberToUpdate(client.TELEFON_CLIENTE);
                }}
              >
                <img src={updateImg} alt="" className={styles.icon} />
              </span>
            </div>
          );
        })}
      </div>
      {showForm ? (
        <NewClientModalForm
          showForm={showForm}
          setShowForm={setShowForm}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ) : null}
      {showUpdateForm ? (
        <UpdateClientForm
          showUpdateForm={showUpdateForm}
          setShowUpdateForm={setShowUpdateForm}
          setNameToUpdate={setNameToUpdate}
          nameToUpdate={nameToUpdate}
          setAddressToUpdate={setAddressToUpdate}
          addressToUpdate={addressToUpdate}
          numberToUpdate={numberToUpdate}
          setNumberToUpdate={setNumberToUpdate}
          idToUpdate={idToUpdate}
          setIdToUpdate={setIdToUpdate}
          handleUpdate={handleUpdate}
        />
      ) : null}
    </div>
  );
};

export default Clientes;
