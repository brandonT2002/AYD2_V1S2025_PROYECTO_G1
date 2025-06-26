import axios from "./axios";

export const requestGetAllClientes = () => axios.get("/api/clientes");
