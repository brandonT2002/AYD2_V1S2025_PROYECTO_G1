import axios from './axios';

export const requestRegistrarPago = (data) => axios.post('/api/InsertarPago', data);