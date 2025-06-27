import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoutes({ rolesPermitidos = [] }) {
    const { loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <h1>Cargando...</h1>
                    <p>Verificando autenticación...</p>
                </div>
            </div>
        );
    }

    if (!user || user.rol_id === 0) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (!user.rol_id && user.rol_id !== 0) {
        console.error("Usuario sin rol definido:", user);
        return <Navigate to="/error" replace />;
    }

    if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(user.rol_id)) {
        console.warn(
            `Acceso denegado. Rol requerido: ${rolesPermitidos}, Rol actual: ${user.rol_id}`
        );
        return <Navigate to="/acceso-denegado" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoutes;
