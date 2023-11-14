import { useEffect, useState } from "react";
import styles from "./Productos.module.scss";
import NewClientModalForm from "../../components/NewClientModalForm/NewClientModalForm";
import axios from "axios";
import { routes } from "../../constants/routes";
import deleteImg from "../../assets/delete.svg";
import updateImg from "../../assets/update.svg";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import UpdateClientForm from "../../components/UpdateClientForm/UpdateClientForm";
import NewProductModalForm from "../../components/NewProductModalForm/NewProductModalForm";
import UpdateProducttForm from "../../components/UpdateProducttForm/UpdateProducttForm";

const Productos = () => {
  const [showForm, setShowForm] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [nameToUpdate, setNameToUpdate] = useState("");
  const [priceToUpdate, setPriceToUpdate] = useState("");
  const [stockToUpdate, setStockToUpdate] = useState("");
  const [idToUpdate, setIdToUpdate] = useState("");

  useEffect(() => {
    getData();
  }, [refresh]);

  const getData = async () => {
    try {
      const productsData = await axios.get(`${routes.api}productos`);

      setProductsList(productsData.data.productos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (client) => {
    const areYouSure = await Swal.fire({
      title: "¿Estas seguro de querer eliminar este producto?",
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
      await axios.delete(`${routes.api}productos/${client.ID_PRODUCTO}`);

      toast.success("Cliente eliminado");
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const areYouSure = await Swal.fire({
      title: "¿Estas seguro de querer actualizar la información este producto?",
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
      await axios.put(`${routes.api}productos/${idToUpdate}`, {
        NOMBRE_PRODUCTO: nameToUpdate,
        PRECIO_PRODUCTO: priceToUpdate,
        STOCK_PRODUCTO: stockToUpdate,
      });

      toast.success("Información actualizada");
      setNameToUpdate("");
      setPriceToUpdate("");
      setStockToUpdate("");
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
        Nuevo Producto
      </span>
      <div className={styles.table_header}>
        <span className={styles.campoh}>Nombre</span>
        <span className={styles.campoh}>Precio</span>
        <span className={styles.campoh}>Stock</span>
        <span className={styles.button}></span>
        <span className={styles.button}></span>
      </div>
      <div className={styles.list_container}>
        {productsList.map((product, index) => {
          return (
            <div className={styles.client_item} key={index}>
              <span className={styles.campo}>{product.NOMBRE_PRODUCTO}</span>
              <span className={styles.campo}>{product.PRECIO_PRODUCTO}</span>
              <span className={styles.campo}>{product.STOCK_PRODUCTO}</span>
              <span
                className={styles.button_action}
                onClick={() => handleDelete(product)}
              >
                <img src={deleteImg} alt="" className={styles.icon} />
              </span>
              <span
                className={styles.button_action}
                onClick={() => {
                  setShowUpdateForm(true);
                  setNameToUpdate(product.NOMBRE_PRODUCTO);
                  setPriceToUpdate(product.PRECIO_PRODUCTO);
                  setIdToUpdate(product.ID_PRODUCTO);
                  setStockToUpdate(product.STOCK_PRODUCTO);
                }}
              >
                <img src={updateImg} alt="" className={styles.icon} />
              </span>
            </div>
          );
        })}
      </div>
      {showForm ? (
        <NewProductModalForm
          showForm={showForm}
          setShowForm={setShowForm}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ) : null}
      {showUpdateForm ? (
        <UpdateProducttForm
          showUpdateForm={showUpdateForm}
          setShowUpdateForm={setShowUpdateForm}
          setNameToUpdate={setNameToUpdate}
          nameToUpdate={nameToUpdate}
          setPriceToUpdate={setPriceToUpdate}
          priceToUpdate={priceToUpdate}
          stockToUpdate={stockToUpdate}
          setStockToUpdate={setStockToUpdate}
          idToUpdate={idToUpdate}
          setIdToUpdate={setIdToUpdate}
          handleUpdate={handleUpdate}
        />
      ) : null}
    </div>
  );
};

export default Productos;
