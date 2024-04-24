import { useState, useEffect, Fragment } from "react";
import Switch from "./Switch";
import closeIcon from "../../assets/icons/close-icon.png";
import deleteIcon from "../../assets/icons/delete-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { getProductsListRED } from "../../redux/common/productsSlice";
import { updateProduct } from "../../services/dashboard/products";

function Modal({ title, data, deleteFunction, closeModal }) {
  const [formattedData, setFormattedData] = useState([]);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const formatDataToString = (data) => {
    return data ? "true" : "false";
  };

  const formatPropsData = () => {
    const tempData = [];
    Object.entries(data).map((ent) =>
      tempData.push({
        key: ent[0],
        value: ent[1],
      })
    );
    setFormattedData(tempData);
  };

  const toggleSwitch = async (data) => {
    const id = data.find((el) => el.key === "_id").value;
    const currentProduct = products.find((product) => product._id === id);

    const updatedProduct = {
      ...currentProduct,
      isPublish: !currentProduct.isPublish,
    };

    let updatedList = products.filter((product) => product._id !== id);
    updatedList.push(updatedProduct);

    dispatch(getProductsListRED(updatedList));
    updateProduct(id, updatedProduct);
  };

  const visualizeData = (data) => {
    return (
      <>
        {data.map((item) => {
          if (
            item.key == "createdAt" ||
            item.key == "updatedAt" ||
            item.key == "password" ||
            item.key === "brandId" ||
            item.key === "images" ||
            item.key == "_id"
          ) {
            return <Fragment key={item.key}></Fragment>;
          } else if (item.key === "image") {
            return (
              <div className="modalBrandImageContainer" key={item.key}>
                <img src={item.value.url} alt="Brand" />
              </div>
            );
          } else if (item.key.endsWith("Price")) {
            return (
              <span key={item.key}>
                {item.key}:<span>{item.value}$</span>
              </span>
            );
          } else if (item.key === "isPublish") {
            return (
              <span
                key={item.key}
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                {item.key}:
                <div>
                  <Switch
                    products={products}
                    data={data}
                    selector={item.value}
                    toggle={() => toggleSwitch(data)}
                  />
                </div>
              </span>
            );
          } else if (item.key === "isDeal") {
            return (
              <span key={item.key}>
                {item.key}:<span>{formatDataToString(item.value)}</span>
              </span>
            );
          } else {
            return (
              <span key={item.key}>
                {item.key}:<span>{item.value}</span>
              </span>
            );
          }
        })}
      </>
    );
  };

  useEffect(() => {
    formatPropsData();
  }, []);

  return (
    <div className="modal">
      <div className="modalWindow">
        <div className="modalHead">
          <h2>{title}</h2>
          <img src={closeIcon} alt="close" onClick={closeModal} />
        </div>
        <div className="modalBody">
          <div className="modalBodyInfo">
            {data && data.images ? (
              <div
                style={{ width: "100%", display: "flex", marginBottom: "15px" }}
              >
                {data.images.map((element) => (
                  <img
                    src={element.url}
                    key={element.url}
                    alt="product image"
                    width={100}
                    height={100}
                    className="modalProductsImage"
                  />
                ))}
              </div>
            ) : (
              ""
            )}
            {visualizeData(formattedData)}
          </div>
          <div
            className="deleteBtn"
            onClick={() => {
              closeModal();
              deleteFunction(data._id);
            }}
          >
            <img src={deleteIcon} alt="delete" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
