import { API } from "../../config/axios";

export const postCartData = async (data) => {
  if (!data) {
    throw new Error("Cart data is missing");
  }
  try {
    const response = await API().post("site/basket", data);
    return response;
  } catch (error) {
    throw new Error("Cart data post error: ", error);
  }
};

export const getCartData = async () => {
  try {
    const response = await API().get("site/basket");
    return response;
  } catch (error) {
    throw new Error("Cart data get error: ", error);
  }
};

export const updateCartData = async (id, data) => {
  try {
    const response = await API().put(`site/basket/${id}`, data);
    return response;
  } catch (error) {
    throw new Error("Cart product update error: ", error);
  }
};

export const deleteFromCart = async (id) => {
  try {
    const response = await API().delete(`site/basket/${id}`);
    return response;
  } catch (error) {
    throw new Error("Cart product delete error: ", error);
  }
};
