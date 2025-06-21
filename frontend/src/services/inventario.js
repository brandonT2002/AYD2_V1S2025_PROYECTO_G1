import axios from "./axios";

export const requestInsertarInventario = (data) =>
    axios.post("/api/insertar-inventario", data);

export const requestGetProductos = () =>
    axios.get("/api/GetAllProductos");
