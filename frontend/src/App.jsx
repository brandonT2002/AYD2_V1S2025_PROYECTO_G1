import IndexPage from "./pages/Index";
import { Navbar } from "./components/layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventory from "./pages/Inventory";
import AgregarProducto from "./pages/AgregarProducto";
import ClientePage from "./components/Clientes/ClientePage";
import Vendedores from "./pages/Vendedores";
import PaymentPage from "./pages/Pagos";
import VentaPage from "./pages/Ventas";
import { Toaster } from "sonner";
import LoginPage from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import { getNavigationItemsForUser } from "./components/layout/Navbar";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
    const { user } = useAuth();
    const navigationItemsbyRole = getNavigationItemsForUser(
        user.rol_id ? user.rol_id : 0
    );
    return (
        <Router>
            <Toaster position="top-center" richColors />
            <Navbar
                logoTitle="IMPORCOMGUA"
                navigationItems={navigationItemsbyRole}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-2">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route
                        element={<ProtectedRoutes rolesPermitidos={[1, 3]} />}
                    >
                        <Route path="/bodega" element={<IndexPage />} />
                        <Route path="/inventario" element={<Inventory />} />
                        <Route
                            path="/mantenimiento/productos"
                            element={<AgregarProducto />}
                        />
                    </Route>
                    <Route
                        element={<ProtectedRoutes rolesPermitidos={[1, 2]} />}
                    >
                        <Route path="/cobranzas" element={<PaymentPage />} />
                        <Route path="/ventas" element={<VentaPage />} />

                        <Route
                            path="/mantenimiento/clientes"
                            element={<ClientePage />}
                        />
                        <Route
                            path="/mantenimiento/vendedores"
                            element={<Vendedores />}
                        />
                    </Route>
                </Routes>
            </main>
        </Router>
    );
}

export default App;
