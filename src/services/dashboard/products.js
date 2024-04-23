import { API } from "../../config/axios";

export const createProduct = async (data) => {
  if (!data) {
    throw new Error("Brand data is missing");
  }
  try {
    const response = await API().post("dashboard/products", data);
    return response;
  } catch (error) {
    throw new Error("Brand creating error: ", error);
  }
};

export const removeProduct = async (id) => {
  if (!id) {
    throw new Error("ID is missing");
  }
  try {
    const response = await API().delete(`dashboard/products/${id}`);
    return response;
  } catch (error) {
    throw new Error("Brand removing data error: ", error);
  }
};

export const getProducts = async () => {
  try {
    const response = await API().get("dashboard/products");
    return response;
  } catch (error) {
    throw new Error("Fetching products data error: ", error);
  }
};

export const updateProduct = async (id, data) => {
  if (!id) {
    throw new Error("ID is missing");
  }
  try {
    const response = await API().put(`dashboard/products/${id}`, data);
    return response;
  } catch (error) {
    throw new Error("Brand removing data error: ", error);
  }
};
