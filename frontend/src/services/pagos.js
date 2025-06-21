import axiosInstance from "./axios";

export const requestInsertarPago = async (datoPago) => {
    try {
        const response = await axiosInstance.post("/api/InsertarPago", datoPago);
        return response;
    } catch (error) {
        console.error("Error al insertar pago:", error);
        throw error;
    }
};
