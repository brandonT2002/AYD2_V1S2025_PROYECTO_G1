import React, { createContext, useContext, useState } from "react";

// --- Contexto ---
const EnvioSelectorContext = createContext();

const EnvioSelectorProvider = ({ children }) => {
    const [selectedEnvio, setSelectedEnvio] = useState(null);

    const selectEnvio = (envio) => setSelectedEnvio(envio);
    const clearSelection = () => setSelectedEnvio(null);

    return (
        <EnvioSelectorContext.Provider
            value={{ selectedEnvio, selectEnvio, clearSelection }}
        >
            {children}
        </EnvioSelectorContext.Provider>
    );
};

const useEnvioSelectorContext = () => {
    const context = useContext(EnvioSelectorContext);
    if (!context)
        throw new Error("Debe usarse dentro de EnvioSelectorProvider");
    return context;
};

// --- EnvioCard ---
const EnvioCard = ({ id, codigo, cliente, fecha, precio, estado }) => {
    const { selectedEnvio, selectEnvio } = useEnvioSelectorContext();
    const isSelected = selectedEnvio?.id === id;

    return (
        <div
            onClick={() =>
                selectEnvio({ id, codigo, cliente, fecha, precio, estado })
            }
            className={`border p-4 rounded-lg cursor-pointer transition-all ${
                isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-100"
            }`}
        >
            <p className="font-semibold">{codigo}</p>
            <p>Cliente: {cliente}</p>
            <p>Fecha: {fecha}</p>
            <p>Precio: Q{precio}</p>
            <p
                className={`mt-1 inline-block px-2 py-1 text-sm rounded bg-opacity-20 ${
                    estado === "Vigente"
                        ? "bg-green-400 text-green-800"
                        : "bg-yellow-400 text-yellow-800"
                }`}
            >
                {estado}
            </p>
        </div>
    );
};

// --- SelectedInfo ---
const SelectedInfo = ({ title, emptyMessage }) => {
    const { selectedEnvio } = useEnvioSelectorContext();

    if (!selectedEnvio) {
        return <p className="text-gray-500 italic">{emptyMessage}</p>;
    }

    return (
        <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p>
                <strong>Código:</strong> {selectedEnvio.codigo}
            </p>
            <p>
                <strong>Cliente:</strong> {selectedEnvio.cliente}
            </p>
            <p>
                <strong>Fecha:</strong> {selectedEnvio.fecha}
            </p>
            <p>
                <strong>Precio:</strong> Q{selectedEnvio.precio}
            </p>
            <p>
                <strong>Estado:</strong> {selectedEnvio.estado}
            </p>
        </div>
    );
};

// --- ActionButtons ---
const ActionButtons = () => {
    const { selectedEnvio, clearSelection } = useEnvioSelectorContext();

    if (!selectedEnvio) return null;

    const handleProcess = () =>
        alert(`Procesando envío: ${selectedEnvio.codigo}`);
    const handleEdit = () => alert(`Editando envío: ${selectedEnvio.codigo}`);

    return (
        <div className="mt-4 space-y-2">
            <button
                onClick={handleProcess}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Procesar Envío
            </button>
            <button
                onClick={handleEdit}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
                Editar Envío
            </button>
            <button
                onClick={clearSelection}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
                Limpiar Selección
            </button>
        </div>
    );
};

// --- EnvioSelector principal (reutilizable) ---
const EnvioSelector = ({ title = "Mis Envíos", envios = [] }) => {
    return (
        <EnvioSelectorProvider>
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-8">{title}</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            Selecciona un envío:
                        </h2>
                        {envios.map((envio) => (
                            <EnvioCard key={envio.id} {...envio} />
                        ))}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Información del envío:
                        </h2>
                        <SelectedInfo
                            title="Detalles del envío seleccionado"
                            emptyMessage="Por favor selecciona un envío de la lista"
                        />
                        <ActionButtons />
                    </div>
                </div>
            </div>
        </EnvioSelectorProvider>
    );
};

export default EnvioSelector;
