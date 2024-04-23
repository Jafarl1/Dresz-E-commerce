import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoadingRED } from "../../../redux/loading/loadingSlice";
import { getProductsListRED } from "../../../redux/common/productsSlice";
import { resetForm, isDataValid } from "../../../utils/utils";
import {
  createProduct,
  getProducts,
} from "../../../services/dashboard/products";
import Swal from "sweetalert2";
import Select from "../../components/Select";
import FormInput from "../../components/FormInput";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import closeMiniIcon from "../../../assets/icons/close-mini-icon.png";

function AddProducts() {
  const dispatch = useDispatch();
  const brandsList = useSelector((state) => state.brands);
  const productFormRef = useRef();

  const [productData, setProductData] = useState({
    brandId: "",
    title: "",
    description: "",
    productPrice: "",
    salePrice: "",
    stock: "",
    images: [],
  });

  const handleProductData = (fieldName, value) => {
    setProductData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const uploadProductImage = (event) => {
    const image = event.target.files[0];

    if (productData.images.length <= 3) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setProductData((prevState) => ({
          ...prevState,
          images: [...prevState.images, base64Data],
        }));
      };
      reader.readAsDataURL(image);
    } else {
      alert("Maximum image count is 4");
    }
  };

  const resetFormData = () => {
    resetForm(productFormRef);
    setProductData(
      Object.fromEntries(
        Object.keys(productData).map((key) => {
          if (key === "images") {
            return [key, []];
          } else {
            return [key, ""];
          }
        })
      )
    );
  };

  const addNewProduct = async (e) => {
    e.preventDefault();
    if (isDataValid(productData)) {
      dispatch(setLoadingRED(true));
      try {
        productData.isPublish = true;
        productData.isDeal = productData.salePrice > 0 ? true : false;

        const response = await createProduct(productData);
        const { data: createdData } = response.data;

        const newListResponse = await getProducts();
        const { product: newData } = newListResponse.data.data;

        dispatch(getProductsListRED(newData));

        Swal.fire({
          icon: "success",
          title: createdData
            ? `Product ${createdData.title} is created!`
            : "Brand is created successfully!",
          text: "You have successfully created a new brand!",
        });
      } catch (error) {
        console.error("Product creating error: ", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Unknown error.",
        });
      }
      resetFormData();
    } else {
      alert("Please fill all blanks and upload at least 1 image.");
    }
    dispatch(setLoadingRED(false));
  };

  const removeProductImage = (value) => {
    const filtered = productData.images.filter((image) => image !== value);

    setProductData((prevState) => ({
      ...prevState,
      images: filtered,
    }));
  };

  return (
    <form
      autoComplete="off"
      ref={productFormRef}
      onSubmit={addNewProduct}
      className="newAnnouncementForm"
    >
      <AccordionDetails className="accordionDetails">
        <div className="accordionDetailsHalfDiv">
          <Select
            label="Brand"
            data={brandsList}
            selected={(value) => handleProductData("brandId", value)}
            classname="cabinetSelectComponent"
          />
          <FormInput
            classname="cabinetSelectComponent"
            type="text"
            label="title"
            placeholder="Enter the product title"
            onchange={(value) => handleProductData("title", value)}
          />
          <FormInput
            classname="cabinetSelectComponent"
            type="text"
            label="description"
            placeholder="Enter the product description"
            onchange={(value) => handleProductData("description", value)}
          />
        </div>
        <div className="accordionDetailsHalfDiv">
          <FormInput
            classname="cabinetSelectComponent"
            type="number"
            label="stock"
            placeholder="Enter the count of the stock"
            onchange={(value) => handleProductData("stock", value)}
          />
          <FormInput
            classname="cabinetSelectComponent"
            type="number"
            step="0.01"
            label="price, usd"
            placeholder="Enter the price in usd"
            onchange={(value) => handleProductData("productPrice", value)}
          />
          <FormInput
            classname="cabinetSelectComponent"
            type="number"
            step="0.01"
            label="sale price"
            placeholder="Enter the discount price"
            onchange={(value) => handleProductData("salePrice", value)}
          />
        </div>
      </AccordionDetails>
      <AccordionDetails className="accordionDetails">
        <div className="accordionDetailsHalfDiv">
          <label htmlFor="productImage" className="additionalInfo">
            <input
              type="file"
              name="productImage"
              id="productImage"
              onChange={uploadProductImage}
            />
            <div className="photoIcon"></div>
            <ul className="photoRequirements">
              <li>Minimum 4 images.</li>
              <li>Optimal size is 1024x768.</li>
              <li>
                Please upload some photos where your product is clearly visible
                from all sides.
              </li>
            </ul>
          </label>
          <div className="imagesContainer">
            {productData.images.map((image) => (
              <div className="miniImageContainer" key={image}>
                <img src={image} alt="Product" className="productsMiniImage" />
                <img
                  src={closeMiniIcon}
                  alt="delete"
                  className="deleteMiniImage"
                  onClick={() => removeProductImage(image)}
                />
              </div>
            ))}
          </div>
        </div>
      </AccordionDetails>
      <AccordionActions className="accordionButtonsGroup">
        <Button onClick={resetFormData}>Reset</Button>
        <Button type="submit">Agree</Button>
      </AccordionActions>
    </form>
  );
}

export default AddProducts;
