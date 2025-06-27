import axios from "./axios";

export const requestLogin = (data) => axios.post("/api/login", data);
export const requestCreateUser = (data) =>
    axios.post("/api/crear-usuario", data);
