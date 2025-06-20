import { useSendSelectorContext } from "../context/SendSelectorContext";
import { IoIosInformationCircleOutline } from "react-icons/io";
export const SelectedInfo = ({
    title = "Envío Seleccionado:",
    emptyMessage = "Selecciona un envío para ver la información",
}) => {
    const { selectedEnvio } = useSendSelectorContext();

    if (!selectedEnvio) {
        return (
            <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="p-4 bg-[#eef0f4] rounded-lg">
            <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-400 pb-2 text-text-second">
                <IoIosInformationCircleOutline size={20} />
                <span className="font-bold">Informacion General</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-2 text-sm">
                    <InfoItem
                        label="Número de Envío"
                        isBlue={true}
                        value={selectedEnvio.num_env}
                    />
                    <InfoItem label="Cliente" value={selectedEnvio.cliente} />
                    <InfoItem label="Vendedor" value={selectedEnvio.vendedor} />
                    <InfoItem
                        label="Número de factura DTE"
                        value={selectedEnvio.fechaDTE}
                    />
                </div>
                <div className="space-y-2">
                    <InfoItem
                        label="Fecha de venta"
                        value={`Q ${selectedEnvio.fechaventa}`}
                    />
                    <InfoItem
                        label="Nit del Cliente"
                        value={selectedEnvio.nitCliente}
                    />
                    <InfoItem
                        label="Tipo Pago"
                        value={selectedEnvio.tipoPago}
                    />
                    <InfoItem
                        label="Nombre Factura"
                        value={selectedEnvio.nombreFactura}
                    />
                </div>
                <div className="space-y-2">
                    <InfoItem
                        label="Fecha de salida de bodega"
                        value={`Q ${selectedEnvio.fechasalidaBodega}`}
                    />
                    <InfoItem
                        label="Días de Crédito"
                        value={selectedEnvio.diasCredito}
                    />
                    <InfoItem
                        label="Nit Factura"
                        value={selectedEnvio.nitFactura}
                    />
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value, isBlue }) => (
    <div className="text-sm flex flex-col gap-1">
        <span className="text-text-base">{label}:</span>{" "}
        {/* <span className="text-text-base font-bold">{value}</span> */}
        <span
            className={`font-bold ${
                isBlue ? "text-blue-600 " : "text-text-base"
            }`}
        >
            {value}
        </span>
    </div>
);
