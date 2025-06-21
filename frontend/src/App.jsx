import IndexPage from "./pages/Index";
import { Navbar } from "./components/layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventory from "./pages/Inventory";
import AgregarProducto from "./pages/AgregarProducto";
import ClientePage from "./components/Clientes/ClientePage";


function App() {
    return (
        <Router>
            <Navbar logoTitle="IMPORCOMGUA" />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-2">
                <Routes>
                    <Route
                        path="/mantenimiento/productos"
                        element={<IndexPage />}
                    />
                    <Route path="/inventario" element={<Inventory />} />
                    <Route 
                        path="/mantenimiento/agregar-producto" 
                        element={<AgregarProducto />} 
                    />
                    <Route path="/mantenimiento/clientes" element={<ClientePage />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
