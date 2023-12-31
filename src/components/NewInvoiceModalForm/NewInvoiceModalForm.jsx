import { useState, useEffect } from "react";
import styles from "./NewInvoiceModalForm.module.scss";
import { toast } from "react-toastify";
import { routes } from "../../constants/routes";
import axios from "axios";
import cross from "../../assets/crosss.svg";

const NewInvoiceModalForm = ({
  setShowForm,
  setRefresh,
  refresh,
  productsList,
  setProductsList,
  clientsList,
}) => {
  const [ID_CLIENTE, setID_CLIENTE] = useState("Escoge Uno");

  const [productName, setProductName] = useState("Elige uno");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [invoiceProductList, setInvoiceProductList] = useState([]);
  const [productQuantity, setProductQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [quantityAvailable, setQuantityAvailable] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (invoiceProductList.length === 0) {
      toast.error("No se puede crear una factura sin productos");
      return;
    }

    if (ID_CLIENTE === "Escoge Uno") {
      toast.error("No se puede crear una factura sin un cliente");
      return;
    }

    try {
      const response = await axios.post(`${routes.api}factura`, {
        ID_CLIENTE,
        VALOR_FACTURA: total,
        productos: invoiceProductList,
      });

      setRefresh(!refresh);
      toast.success("Factura creada");
      setShowForm(false);
      setID_CLIENTE("Escoge Uno");
      setInvoiceProductList([]);
    } catch (error) {
      console.log(error);
      toast.error("Algo salio mal, inténtalo mas tarde");
    }
  };

  const handleAddProductToList = () => {
    const targetProduct = productsList.find((e) => {
      return e.NOMBRE_PRODUCTO === productName;
    });

    if (productName === "Elige uno") {
      toast.error("Debes elegir un producto");
      return;
    }

    if (targetProduct.STOCK_PRODUCTO < productQuantity) {
      toast.error("No hay suficientes unidades, prueba otra cantidad");
      return;
    }

    if (parseInt(productQuantity) < 1) {
      toast.error("Debes agregar al menos una unidad");
      return;
    }

    const existingProduct = invoiceProductList.findIndex(
      (element) => element.NOMBRE_PRODUCTO === productName
    );

    const foundToStock = productsList.find(
      (element) => element.NOMBRE_PRODUCTO === productName
    );

    if (existingProduct !== -1) {
      if (
        parseInt(invoiceProductList[existingProduct].cantidad) +
          parseInt(productQuantity) >
        foundToStock.STOCK_PRODUCTO
      ) {
        toast.error(
          "Se supero el numero de unidades disponibles, reduce la cantidad"
        );
        return;
      }

      const originalProduct = {
        ...invoiceProductList[existingProduct],
        cantidad:
          parseInt(invoiceProductList[existingProduct].cantidad) +
          parseInt(productQuantity),
        newStock:
          foundToStock.STOCK_PRODUCTO -
          invoiceProductList[existingProduct].cantidad -
          productQuantity,
      };

      const newArray = [...invoiceProductList];
      newArray.splice(existingProduct, 1);

      setInvoiceProductList([...newArray, originalProduct]);
      setProductName("Elige uno");
      setProductQuantity(0);
      setQuantityAvailable(0);

      setShowAddProduct(false);
      return;
    }

    const newStock = foundToStock.STOCK_PRODUCTO - productQuantity;

    setInvoiceProductList([
      ...invoiceProductList,
      { ...targetProduct, cantidad: productQuantity, newStock },
    ]);

    setProductName("Elige uno");
    setProductQuantity(0);
    setQuantityAvailable(0);

    setShowAddProduct(false);
  };

  useEffect(() => {
    let subtotal = 0;
    invoiceProductList.forEach((e) => {
      subtotal = e.PRECIO_PRODUCTO * e.cantidad + subtotal;
    });
    setTotal(subtotal);
  }, [invoiceProductList]);

  const quantityAvailableCalc = (event) => {
    setProductName(event.target.value);

    if (event.target.value === "Elige uno") {
      setQuantityAvailable(0);
      return;
    }

    const productQuantityFound = productsList.find(
      (e) => e.NOMBRE_PRODUCTO === event.target.value
    );

    setQuantityAvailable(productQuantityFound.STOCK_PRODUCTO);
    return;
  };

  const handleDeleteItem = (producto) => {
    const index = invoiceProductList.findIndex(
      (e) => e.NOMBRE_PRODUCTO === producto.NOMBRE_PRODUCTO
    );

    const newArray = [...invoiceProductList];

    newArray.splice(index, 1);

    setInvoiceProductList(newArray);
  };

  return (
    <div className={styles.new_client}>
      <div
        className={styles.background}
        onClick={() => {
          setShowForm(false);
          setRefresh(!refresh);
        }}
      ></div>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <h2 className={styles.subtitle}>Nueva Factura</h2>
        <label htmlFor="nombre-cliente-input" className={styles.label}>
          ID de cliente
        </label>
        <select
          className={styles.input}
          id="nombre-cliente-input"
          value={ID_CLIENTE}
          onChange={(e) => setID_CLIENTE(e.target.value)}
        >
          <option value="Escoge Uno">Escoge Uno</option>
          {clientsList.map((e, index) => {
            return (
              <option key={index} value={e.ID_CLIENTE}>
                {e.ID_CLIENTE}
              </option>
            );
          })}
        </select>
        <div className={styles.product_item_header}>
          <span className={styles.header_table_item}>Producto</span>
          <span className={styles.header_table_item}>V. Unitario</span>
          <span className={styles.header_table_item}>Cantidad</span>
          <span className={styles.header_table_item}>Valor</span>
          <span className={styles.header_table_item2}></span>
        </div>

        {invoiceProductList.map((product, index) => {
          return (
            <div className={styles.product_item} key={index}>
              <span className={styles.table_item}>
                {product.NOMBRE_PRODUCTO}
              </span>
              <span className={styles.table_item}>
                {product.PRECIO_PRODUCTO}
              </span>
              <span className={styles.table_item}>{product.cantidad}</span>
              <span className={styles.table_item}>
                {product.PRECIO_PRODUCTO * product.cantidad}
              </span>
              <span
                className={styles.table_item3}
                onClick={() => handleDeleteItem(product)}
              >
                <img src={cross} alt="" className={styles.cross} />
              </span>
            </div>
          );
        })}
        {showAddProduct ? (
          <div className={styles.product_sub_form}>
            <div className={styles.sub_container1}>
              <label className={styles.label}>Producto</label>
              <select
                name=""
                id=""
                className={styles.select_products}
                value={productName}
                onChange={quantityAvailableCalc}
              >
                <option value="Elige uno">Elige uno</option>
                {productsList.map((product, index) => {
                  return (
                    <option value={product.NOMBRE_PRODUCTO} key={index}>
                      {product.NOMBRE_PRODUCTO}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.sub_container2}>
              <label htmlFor="" className={styles.label}>
                Cantidad
              </label>
              <input
                type="number"
                placeholder={`Máximo ${quantityAvailable}`}
                className={styles.quantity_input}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </div>
            <span
              className={styles.add_product_button}
              onClick={handleAddProductToList}
            >
              Agregar
            </span>
          </div>
        ) : (
          <span
            className={styles.add_product_button}
            onClick={() => setShowAddProduct(true)}
          >
            Agregar Producto
          </span>
        )}
        <span className={styles.total}>Total: ${total}</span>
        <input
          type="submit"
          className={styles.submit_button}
          value="Crear Factura"
        />
      </form>
    </div>
  );
};

export default NewInvoiceModalForm;
