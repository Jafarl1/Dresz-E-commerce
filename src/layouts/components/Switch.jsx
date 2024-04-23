import { useState, useEffect } from "react";

function Switch({ selector, products, data, toggle }) {
  const [publish, setPublish] = useState();

  const handleData = () => {
    const id = data.find((el) => el.key === "_id").value;
    const currentProduct = products.find((el) => el._id === id);
    setPublish(currentProduct.isPublish);
  };

  useEffect(() => {
    handleData();
  }, [products]);

  return (
    <div
      className="switch"
      style={{ justifyContent: publish ? "end" : "start" }}
      onClick={toggle}
    >
      <div
        className="slider"
        style={{ backgroundColor: publish ? "var(--main)" : "var(--dark)" }}
      ></div>
    </div>
  );
}

export default Switch;
