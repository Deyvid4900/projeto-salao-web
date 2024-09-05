import axios  from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

export const Api = axios.create({
    baseURL:"https://reqres.in/api/",
})

Api.interceptors.request.use(
    (config)=>{
        const user = getUserLocalStorage();
        config.headers.Authorization =user?.token;
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export const fetchColaboradores = axios.create({
    baseURL:'http://localhost:8000/colaborador/salao/66d1fc606938c910b08d0b20'
})