import { useParams } from "react-router-dom";
import styles from "./InformeFactura.module.scss";
import dw from "../../assets/DW.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { routes } from "../../constants/routes";

const InformeFactura = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const params = useParams();

  const getData = async () => {
    try {
      const invoice = await axios.get(
        `${routes.api}factura/${params.NUMERO_FACTURA}`
      );

      setInvoiceData(invoice.data.factura);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const dateFormat = () => {
    const fecha = new Date(invoiceData?.FECHA_FACTURA);
    let day = fecha.getDate().toString();
    let month = (fecha.getMonth() + 1).toString();
    let year = fecha.getFullYear().toString();

    if (day.length === 1) {
      day = `0${day}`;
    }

    if (month.length === 1) {
      month = `0${month}`;
    }

    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.informe_factura}>
      {invoiceData ? (
        <div className={styles.factura}>
          <div className={styles.header}>
            <img src={dw} alt="" className={styles.logo} />
            <h1 className={styles.title}>
              Factura No.{" "}
              <span className={styles.numero_factura}>
                {invoiceData?.NUMERO_FACTURA}
              </span>
            </h1>
          </div>
          <div className={styles.client_data}>
            <div className={styles.client_data_left}>
              <span
                className={`${styles.client_data_title} ${styles.border_top_right}`}
              >
                SEÑOR(A)
              </span>
              <span
                className={`${styles.client_data_item} ${styles.border_top}`}
              >
                {invoiceData?.CLIENTE.NOMBRE_CLIENTE}
              </span>
              <span className={[styles.client_data_title]}>DIRECCIÓN</span>
              <span className={styles.client_data_item}>
                {invoiceData?.CLIENTE.DIRECCIO_CLIENTE}
              </span>
              <span className={[styles.client_data_title]}>TELÉFONO</span>
              <span className={styles.client_data_item}>
                {invoiceData?.CLIENTE.TELEFON_CLIENTE}
              </span>
              <span className={[styles.client_data_title]}># CLIENTE</span>
              <span className={styles.client_data_item}>
                {invoiceData?.CLIENTE.ID_CLIENTE}
              </span>
            </div>
            <div className={styles.client_data_right}>
              <span className={styles.client_data_title_right}>
                FECHA DE FACTURACIÓN
              </span>
              <span className={styles.client_data_item_right}>
                {dateFormat()}
              </span>
            </div>
          </div>
          <table className={styles.table}>
            <thead>
              <tr className={styles.table_header}>
                <th className={styles.column1}>PRODUCTO</th>
                <th className={styles.column2}>PRECIO</th>
                <th className={styles.column2}>CANTIDAD</th>
                <th className={styles.column2}>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData?.DETALLE.map((product, index) => {
                return (
                  <tr key={index}>
                    <th className={styles.column3}>
                      {product.NOMBRE_PRODUCTO}
                    </th>
                    <th className={styles.column4}>
                      ${product.PRECIO_PRODUCTO.toLocaleString()}
                    </th>
                    <th className={styles.column4}>
                      {product.CANTIDA_PRODUCTO}
                    </th>
                    <th className={styles.column5}>
                      ${product.VALOR_PRODUCTO.toLocaleString()}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.total_container}>
            <span className={styles.total}>TOTAL:</span>
            <span className={styles.total}>
              ${invoiceData?.VALOR_FACTURA.toLocaleString()}
            </span>
          </div>
        </div>
      ) : (
        <h1 className={styles.not_found}>404 Factura no encontrada</h1>
      )}
    </div>
  );
};

export default InformeFactura;
