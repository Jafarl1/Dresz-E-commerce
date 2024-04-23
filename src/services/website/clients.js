import { API } from "../../config/axios";

export const registerClient = async (params) => {
  const response = API().post("site/register", params);
  return response;
};
