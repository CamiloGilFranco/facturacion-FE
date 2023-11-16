import styles from "./Reporte.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { routes } from "../../constants/routes";

const Reporte = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [total, setTotal] = useState(0);

  const getData = async () => {
    try {
      const invoice = await axios.get(`${routes.api}factura/report/main`);

      setInvoiceData(invoice.data.productos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    totalCalc();
  }, [invoiceData]);

  const totalCalc = () => {
    let newTotal = 0;
    invoiceData?.forEach((e) => {
      newTotal = newTotal + e.total;
    });
    setTotal(newTotal);
  };

  console.log(invoiceData);

  return (
    <div className={styles.informe_factura}>
      <div className={styles.factura}>
        <div className={styles.header}>
          <h1 className={styles.title}>Informe de Ventas</h1>
        </div>

        <table className={styles.table}>
          <thead>
            <tr className={styles.table_header}>
              <th className={styles.column1}>PRODUCTO</th>
              <th className={styles.column2}>PRECIO</th>
              <th className={styles.column2}>STOCK</th>
              <th className={styles.column2}>U. VENDIDAS</th>
              <th className={styles.column2}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData?.map((product, index) => {
              return (
                <tr key={index}>
                  <th className={styles.column3}>{product.NOMBRE_PRODUCTO}</th>
                  <th className={styles.column4}>
                    ${product.PRECIO_PRODUCTO.toLocaleString()}
                  </th>
                  <th className={styles.column4}>{product.STOCK_PRODUCTO}</th>
                  <th className={styles.column4}>{product.vendidos}</th>
                  <th className={styles.column5}>
                    ${product.total.toLocaleString()}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.total_container}>
          <span className={styles.total}>TOTAL:</span>
          <span className={styles.total}>${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Reporte;
