import { API } from "../../config/axios";

export const createBrand = async (data) => {
  if (!data) {
    throw new Error("Brand data is missing");
  }
  try {
    const response = await API().post("dashboard/brands", data);
    return response;
  } catch (error) {
    throw new Error("Brand creating error: ", error);
  }
};

export const getBrands = async () => {
  try {
    const response = await API().get("dashboard/brands");
    return response;
  } catch (error) {
    throw new Error("Fetching brands data error: ", error);
  }
};

export const removeBrand = async (id) => {
  if (!id) {
    throw new Error("ID is missing");
  }
  try {
    const response = await API().delete(`dashboard/brands/${id}`);
    return response;
  } catch (error) {
    throw new Error("Brand removing data error: ", error);
  }
};
