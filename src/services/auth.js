import { API } from "../config/axios";

export const signInRequest = async (params) => {
  const response = API().post("login", params);
  return response;
};

export const getLoggedUserDataByToken = async (token) => {
  if (token) {
    try {
      const response = await API().get("profile", token);
      return response;
    } catch (error) {
      console.error("Fetching user data error: ", error);
    }
  }
};
