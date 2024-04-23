import axios from "axios";

export const API = () => {
  return axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_API_KEY}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};
