import { useSendSelectorContext } from "../context/SendSelectorContext";
import { RiInformation2Line } from "react-icons/ri";
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

    const formatDataToTable = (productos) => {
        const columns = [
            { header: "Código", key: "codigo" },
            { header: "Producto", key: "nombre" },
            { header: "Precio Unitario", key: "precio_unidad" },
            { header: "Unidad de Medida", key: "unidad_medida" },
            { header: "Unidades por Fardo", key: "unidades_por_fardo" },
            { header: "Observaciones", key: "observaciones" },
        ];

        const dataTable = productos.map((producto) => ({
            codigo: producto.producto_codigo,
            nombre: producto.producto_nombre,
            precio_unidad: `Q ${producto.precio_unidad}`,
            unidad_medida: producto.unidad_medida,
            unidades_por_fardo: producto.unidades_por_fardo,
            observaciones: producto.observaciones || "Sin observaciones",
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
    }, [selectedEnvio]);

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
                <span className="font-bold">Información General</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-2 text-sm">
                    <InfoItem
                        label="Número de Envío"
                        isBlue={true}
                        value={selectedEnvio.numero_envio}
                    />
                    <InfoItem
                        label="Cliente"
                        value={selectedEnvio.nombre_negocio}
                    />
                    <InfoItem
                        label="Contacto"
                        value={selectedEnvio.nombre_contacto}
                    />
                    <InfoItem
                        label="Vendedor"
                        value={`${selectedEnvio.vendedor_nombre} ${selectedEnvio.vendedor_apellido}`}
                    />
                </div>
                <div className="space-y-2">
                    <InfoItem
                        label="Número de factura DTE"
                        value={selectedEnvio.dte_numero}
                    />
                    <InfoItem
                        label="Fecha de venta"
                        value={new Date(
                            selectedEnvio.fecha_venta
                        ).toLocaleDateString()}
                    />
                    <InfoItem
                        label="Tipo Pago"
                        value={selectedEnvio.tipo_pago}
                    />
                    <InfoItem
                        label="Estado de Cobro"
                        value={selectedEnvio.estado_cobro}
                    />
                </div>
                <div className="space-y-2">
                    <InfoItem
                        label="Fecha de salida de bodega"
                        value={new Date(
                            selectedEnvio.fecha_salida_bodega
                        ).toLocaleDateString()}
                    />
                    <InfoItem
                        label="Días de Crédito"
                        value={selectedEnvio.dias_credito}
                    />
                    <InfoItem
                        label="NIT Factura"
                        value={selectedEnvio.dte_nit}
                    />
                    <InfoItem
                        label="Estado de Venta"
                        value={selectedEnvio.estado_venta}
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
                <span className="text-base text-text-second font-bold">
                    Total
                </span>
                <span className="font-bold text-text-base text-xl">
                    Q {selectedEnvio.total_quetzales}
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
