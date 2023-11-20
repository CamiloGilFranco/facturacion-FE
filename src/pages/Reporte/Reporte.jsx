import styles from "./Reporte.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { routes } from "../../constants/routes";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Reporte = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [total, setTotal] = useState(0);
  const [graphData, setGraphData] = useState({});

  const getData = async () => {
    try {
      const invoice = await axios.get(`${routes.api}factura/report/main`);

      const arr = invoice.data.productos;

      arr.sort((a, b) => b.vendidos - a.vendidos);

      setInvoiceData(arr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    totalCalc();
    setData();
  }, [invoiceData]);

  const random = () => {
    return Math.floor(Math.random() * 256);
  };

  const totalCalc = () => {
    let newTotal = 0;
    invoiceData?.forEach((e) => {
      newTotal = newTotal + e.total;
    });
    setTotal(newTotal);
  };

  const setData = () => {
    const labels = [];
    const data = [];
    const backgroundColor = [];
    const label = "U. VENDIDAS";

    invoiceData?.forEach((e) => {
      labels.push(e.NOMBRE_PRODUCTO);
      data.push(e.vendidos);
      backgroundColor.push(`rgba(${random()}, ${random()}, ${random()}, 1)`);
    });

    setGraphData({
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor,
        },
      ],
    });
  };

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
        <div className={styles.graph}>
          {!invoiceData || invoiceData.length === 0 || total === 0 ? null : (
            <Pie data={graphData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reporte;
