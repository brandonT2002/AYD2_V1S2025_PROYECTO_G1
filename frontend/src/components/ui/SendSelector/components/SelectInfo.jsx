import { useSendSelectorContext } from "../context/SendSelectorContext";
import { RiInformation2Line } from "react-icons/ri";
import { PanelSecundary } from "../../../../components/layout";
import { TableComponent } from "../../../../components/ui";
import { useEffect, useState } from "react";
import { LuPackageSearch } from "react-icons/lu";

export const SelectedInfo = ({
    title = "Envío Seleccionado:",
    emptyMessage = "Selecciona un envío para ver la información",
}) => {
    const { selectedEnvio } = useSendSelectorContext();
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    const formatDataToTable = (data) => {
        const columns = [
            { header: "Producto", key: "producto" },
            { header: "Cantidad", key: "cantidad" },
            { header: "Precio Unitario", key: "precioUnitario" },
            { header: "Cantidad Unidades", key: "cantidadUnidades" },
            { header: "Precio por Fardo/Paquete", key: "precioFardo" },
            { header: "Subtotal", key: "subtotal" },
            { header: "Observaciones", key: "observaciones" },
        ];
        const dataTable = data.map((item) => ({
            producto: item.producto,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario.toFixed(2),
            cantidadUnidades: item.cantidadUnidades,
            precioFardo: item.precioFardo.toFixed(2),
            subtotal: item.subtotal.toFixed(2),
            observaciones: item.observaciones,
        }));
        setColumns(columns);
        setData(dataTable);
    };

    useEffect(() => {
        if (selectedEnvio?.productos && selectedEnvio.productos.length > 0) {
            formatDataToTable(selectedEnvio.productos);
        } else {
            setColumns([]);
            setData([]);
        }
    }, [selectedEnvio]); // Add selectedEnvio as dependency

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
                <RiInformation2Line size={20} />
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
            <div className="mt-4">
                <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-400 pb-2 text-text-second">
                    <LuPackageSearch size={20} />
                    <span className="font-bold">Productos</span>
                </div>
                <TableComponent
                    data={data}
                    columns={columns}
                    maxHeight="210px"
                />
            </div>
            <div className="flex justify-end pt-3 gap-2 items-center">
                <span className="text-base text-text-second font-bold">Total</span>
                <span className="font-bold text-text-base text-xl">
                    Q {selectedEnvio.total.toFixed(2)}
                </span>
            </div>
        </div>
    );
};

const InfoItem = ({ label, value, isBlue }) => (
    <div className="text-sm flex flex-col gap-1">
        <span className="text-text-base">{label}:</span>
        <span
            className={`font-bold ${
                isBlue ? "text-blue-600 " : "text-text-base"
            }`}
        >
            {value}
        </span>
    </div>
);
