import axios from "axios";
import { API_URL } from "../../config/connect"

const instance = axios.create({
    baseURL: API_URL,
});

export default instance;