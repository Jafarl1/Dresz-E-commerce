import { API } from "../../config/axios";

export const getAllBrands = async () => {
  try {
    const response = await API().get("site/brands");
    return response;
  } catch (error) {
    throw new Error("Fetching brands data error: ", error);
  }
};
