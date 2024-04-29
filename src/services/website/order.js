import { API } from "../../config/axios";

export const createOrder = async (data) => {
  try {
    const response = await API().post("site/orders", data);
    return response;
  } catch (error) {
    throw new Error("Order creating error: ", error);
  }
};
