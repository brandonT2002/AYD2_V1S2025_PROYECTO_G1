import axios from "./axios";

export const requestBuscarVentas = (data) =>
    axios.post("/api/buscar-ventas", data);

export const requestRegistrarSalida = (data) =>
    axios.post("/api/registrar-salida", data);

export const requestNuevaVenta = (data) => axios.post("/api/InsertarVenta", data);
