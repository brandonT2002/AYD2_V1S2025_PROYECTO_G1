import { SendSelectorProvider } from "../context/SendSelectorContext";
import { SendCard } from "./SendCard";
import { SelectedInfo } from "./SelectInfo";

export const SendSelectorDemo = ({
    envios = defaultEnvios,
    title = "Selector de Envíos",
    maxHeight = "300px",
}) => {
    return (
        <SendSelectorProvider>
            <div className="max-w-full mx-auto space-y-6">

                <div
                    className="overflow-y-auto overflow-x-hidden rounded-lg bg-white"
                    style={{ maxHeight: maxHeight }}
                >
                    <div
                        className="space-y-4 "
                        role="radiogroup"
                        aria-label="Seleccionar envío"
                    >
                        {envios.map((envio) => (
                            <SendCard key={envio.id} envio={envio} />
                        ))}
                    </div>
                </div>

                <SelectedInfo />
            </div>
        </SendSelectorProvider>
    );
};

// Datos de ejemplo
const defaultEnvios = [
    {
        id: 1,
        codigo: "ENV2025001",
        cliente: "María González",
        fecha: "09-06-2025",
        precio: "1250.00",
        estado: "Vigente",
    },
    {
        id: 2,
        codigo: "ENV2025002",
        cliente: "Carlos Mendoza",
        fecha: "10-06-2025",
        precio: "950.00",
        estado: "Vigente",
    },
    {
        id: 3,
        codigo: "ENV2025003",
        cliente: "Ana Rodríguez",
        fecha: "11-06-2025",
        precio: "1500.00",
        estado: "Pendiente",
    },
    {
        id: 4,
        codigo: "ENV2025004",
        cliente: "Luis Herrera",
        fecha: "12-06-2025",
        precio: "780.00",
        estado: "Vigente",
    },
];
