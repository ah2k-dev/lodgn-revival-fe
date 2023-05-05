import axios from "axios";
import { getToken } from "../hooks/auth";

export const baseURL = "http://192.168.0.196:8001";

// export const baseURL = "https://logdn-revival-be-production.up.railway.app";

const custAxios = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// attaching jwt token to axios so that it can be used in all the requests and the server can verify the user
export const attachToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    // axios.headers.Authorization = `${token}`;
    custAxios.defaults.headers.common["Authorization"] = `${token}`;
  }
};

export default custAxios;
