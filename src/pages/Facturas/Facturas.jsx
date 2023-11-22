import { useEffect, useState } from "react";
import styles from "./Facturas.module.scss";
import NewClientModalForm from "../../components/NewClientModalForm/NewClientModalForm";
import axios from "axios";
import { routes } from "../../constants/routes";
import deleteImg from "../../assets/delete.svg";
import updateImg from "../../assets/update.svg";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import UpdateClientForm from "../../components/UpdateClientForm/UpdateClientForm";
import NewInvoiceModalForm from "../../components/NewInvoiceModalForm/NewInvoiceModalForm";
import dolar from "../../assets/dolar.svg";
import { useNavigate } from "react-router-dom";

const Facturas = () => {
  const [showForm, setShowForm] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [clientsList, setClientsList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [refresh]);

  const getData = async () => {
    try {
      const invoicesData = await axios.get(`${routes.api}factura`);
      setInvoiceList(invoicesData.data.facturas);

      const productsData = await axios.get(`${routes.api}productos`);
      setProductsList(productsData.data.productos);

      const clientsData = await axios.get(`${routes.api}clientes`);
      setClientsList(clientsData.data.clientes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (factura) => {
    const areYouSure = await Swal.fire({
      title: "¿Estas seguro de querer eliminar esta factura?",
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
      await axios.delete(`${routes.api}factura/${factura.NUMERO_FACTURA}`);

      toast.success("Factura eliminada");
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.clientes_page}>
      <span
        className={styles.new_client_button}
        onClick={() => setShowForm(true)}
      >
        Crear Factura
      </span>
      <div className={styles.table_header}>
        <span className={styles.campoh}># Factura</span>
        <span className={styles.campoh}>Fecha</span>
        <span className={styles.campoh}>#Cliente</span>
        <span className={styles.campoh}>Cliente</span>
        <span className={styles.campoh}>Valor </span>
        <span className={styles.button}></span>

        <span className={styles.button}></span>
      </div>
      <div className={styles.list_container}>
        {invoiceList.map((factura, index) => {
          const fecha = new Date(factura.FECHA_FACTURA);
          let day = fecha.getDate().toString();
          let month = (fecha.getMonth() + 1).toString();
          let year = fecha.getFullYear().toString();

          if (day.length === 1) {
            day = `0${day}`;
          }

          if (month.length === 1) {
            month = `0${month}`;
          }

          return (
            <div className={styles.client_item} key={index}>
              <span className={styles.campo}>{factura.NUMERO_FACTURA}</span>
              <span className={styles.campo}>{`${day}/${month}/${year}`}</span>
              <span className={styles.campo}>{factura.CLIENTE.ID_CLIENTE}</span>
              <span className={styles.campo}>
                {factura.CLIENTE.NOMBRE_CLIENTE}
              </span>
              <span className={styles.campo}>
                ${factura.VALOR_FACTURA.toLocaleString()}
              </span>
              <span
                className={styles.button_action}
                onClick={() => handleDelete(factura)}
              >
                <img src={deleteImg} alt="" className={styles.icon} />
              </span>

              <span
                className={styles.button_action}
                onClick={() => {
                  navigate(`${routes.facturas}/${factura.NUMERO_FACTURA}`);
                }}
              >
                <img src={dolar} alt="" className={styles.icon} />
              </span>
            </div>
          );
        })}
      </div>
      {showForm ? (
        <NewInvoiceModalForm
          showForm={showForm}
          setShowForm={setShowForm}
          setRefresh={setRefresh}
          refresh={refresh}
          productsList={productsList}
          setProductsList={setProductsList}
          clientsList={clientsList}
        />
      ) : null}
    </div>
  );
};

export default Facturas;
