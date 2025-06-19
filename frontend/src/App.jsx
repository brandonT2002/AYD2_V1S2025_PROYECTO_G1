import IndexPage from "./pages/Index";
import { Navbar } from "./components/layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
                </Routes>
            </main>
        </Router>
    );
}

export default App;
