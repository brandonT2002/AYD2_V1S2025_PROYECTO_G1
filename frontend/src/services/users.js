import axios from "./axios";

export const requestGetUsuarios = () => axios.get("/api/obtener-usuarios");
export const requestInsertarUsuario = (data) =>
    axios.post("/api/crear-usuario", data);
export const requestActualizarUsuario = (id,data) =>
    axios.put(`/api/actualizar-usuario/${id}`, data);
export const requestEliminarUsuario = (id) =>
    axios.delete(`/api/eliminar-usuario/${id}`);
