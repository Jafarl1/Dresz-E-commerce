import { API } from "../../config/axios";

export const getAllProducts = async () => {
  try {
    const response = await API().get("site/products");
    return response;
  } catch (error) {
    throw new Error("Fetching products data error: ", error);
  }
};

export const getSingleProduct = async (id) => {
  try {
    const response = await API().get(`site/products/${id}`);
    return response;
  } catch (error) {
    throw new Error("Fetching products data error: ", error);
  }
};
