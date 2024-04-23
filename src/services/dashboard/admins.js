import { API } from "../../config/axios";

export const registerAdmin = async (params) => {
  const response = await API().post("dashboard/register", params);
  return response;
};

export const getAdmins = async () => {
  try {
    const response = await API().get("dashboard/users");
    return response;
  } catch (error) {
    throw new Error("Fetching admins data error: ", error);
  }
};

export const removeAdmin = async (id) => {
  if (!id) {
    throw new Error("ID is missing");
  }
  try {
    const response = await API().delete(`dashboard/users/${id}`);
    return response;
  } catch (error) {
    throw new Error("Admin removing error: ", error);
  }
};
