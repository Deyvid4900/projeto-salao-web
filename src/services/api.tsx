import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

// export const api = axios.create({
//   baseURL: "http://localhost:8000",
// });
export const api = axios.create({
  baseURL: "https://api-production-70cb.up.railway.app/",
});

export  const Api = axios.create({
  baseURL: "https://reqres.in/api/",
});

Api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();
    config.headers.Authorization = user?.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const id_salao = localStorage.getItem("_dSlun");

export const fetchColaboradores = axios.create({
  baseURL: `https://api-production-70cb.up.railway.app/colaborador/salao/${id_salao}`,
});
// export const fetchColaboradores = axios.create({
//     baseURL:`https://api-production-cc80.up.railway.app/colaborador/salao/${id_salao}`
// })
