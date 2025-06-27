import { createContext, useContext, useState, useEffect } from "react";
import { requestLogin } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : { rol_id: 0 };
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    const login = async (userData) => {
        try {
            const res = await requestLogin(userData);
            const response = res.data.user_info;
            localStorage.setItem("user", JSON.stringify(response));
            setUser(response);
        } catch (error) {
            console.log(error);
            setErrors((prevErrors) => [
                ...prevErrors,
                { error: "Usuario o contraseña incorrectos" },
            ]);
        }
    };

    const logout = () => {
        setUser({ rol_id: 0 });
        localStorage.removeItem("user");
    };

    const checkLogin = async () => {
        if (user.rol_id == 0) setLoading(false);
        else setLoading(false);
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, errors, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
