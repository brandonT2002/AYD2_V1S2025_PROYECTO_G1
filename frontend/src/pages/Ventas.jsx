import {
    Title,
    InputField,
    SelectInput,
    TitlePanel,
    IconButton,
    TableComponent,
} from "../components/ui";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { Panel, PanelSecundary } from "../components/layout";
import { useSelectInput } from "../components/ui/SelectInput";
import { ButtonVariant, ButtonSize } from "../components/ui/Button/config";
import { SendSelectorProvider } from "../components/ui/SendSelector/context/SendSelectorContext";
import {
    LuBadgeDollarSign,
    LuClockAlert,
    LuHash,
    LuPackageSearch,
} from "react-icons/lu";
import { CgMenuGridR } from "react-icons/cg";
import {
    FiCalendar,
    FiDollarSign,
    FiFileText,
    FiHome,
    FiBox,
    FiHeadphones,
} from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
    requestBuscarVentas,
    requestNuevaVenta,
    requestRegistrarSalida,
} from "../services/bajaBodega";

function VentasPage() {
    const vendedor = useSelectInput("");
    const tipo_pago = useSelectInput("");
    const producto = useSelectInput("");
    const [sells, setSells] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    const searchSells = async (formData) => {
        try {
            const response = await requestBuscarVentas(formData);
            setSells(response.data.data);
        } catch (error) {
            console.error("Error buscando ventas:", error);
        }
    };

    const insertarVenta = async (data) => {
        try {
            const response = await requestNuevaVenta(data);
            //agregar 
            alert(`Venta registrada con éxito: ${response.data}`);
        } catch (error) {
            console.error("Error al insertar venta:", error);
        }

        console.log("Datos de la venta:", data);
    };

    const handleAddProduct = () => {
        console.log("Producto Agregado a la Venta");
    };

    const columns = [
        { header: "Producto", key: "producto" },
        { header: "Cantidad", key: "cantidad" },
        { header: "Precio Unit.", key: "precio_unitario" },
        { header: "Cantidad en Unidades", key: "cantidad_unidades" },
        { header: "Precio por fardo/paquete", key: "precio_paquete" },
        { header: "Subtotal", key: "subtotal" },
        {
            header: "Acciones",
            key: "acciones",
            render: (rowData) => (
                <div className="flex gap-2">
                    <button
                        type="button"
                        aria-label="Ver detalles"
                        onClick={() => alert(`Ver ${rowData.producto}`)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <FiEye />
                    </button>
                    <button
                        type="button"
                        aria-label="Eliminar"
                        onClick={() => alert(`Eliminar ${rowData.producto}`)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <FiTrash2 />
                    </button>
                </div>
            ),
        },
    ];

    const data = [
        {
            producto: "Filtro de aire",
            cantidad: 12,
            precio_unitario: "Q2.00",
            cantidad_unidades: 4,
            precio_paquete: "Q8.00",
            subtotal: "Q8.00",
        },
    ];

    return (
        <SendSelectorProvider>
            <div className="flex flex-col bg-gray-100 gap-3">
                <form onSubmit={handleSubmit(insertarVenta)}>
                    <Title>Registrar Nueva Venta</Title>

                    <Panel>
                        <TitlePanel>Detalles de la Venta</TitlePanel>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full">
                            <InputField
                                name="fecha_venta"
                                label="Fecha de Venta"
                                placeholder="Fecha"
                                className="text-text-second font-bold"
                                icon={FiCalendar}
                                register={register}
                            />
                            <InputField
                                name="fecha_salida_bodega"
                                label="Fecha de Salida de Bodega"
                                placeholder="Fecha de Salida"
                                className="text-text-second font-bold"
                                icon={FiCalendar}
                                register={register}
                            />
                            <InputField
                                name="cliente_id"
                                label="Cliente"
                                placeholder="ID del Cliente"
                                className="text-text-second font-semibold"
                                icon={FiHome}
                                register={register}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-x-4 gap-y-3 w-full">
                            <SelectInput
                                name="tipo_pago"
                                label="Tipo de Pago"
                                icon={CgMenuGridR}
                                className="text-text-second font-semibold"
                                options={[
                                    { value: "contado", label: "Contado" },
                                    { value: "credito", label: "Crédito" },
                                ]}
                                {...tipo_pago.bind}
                                register={register}
                            />
                            <InputField
                                name="dias_credito"
                                label="Días de Crédito"
                                placeholder="Días de Crédito"
                                className="text-text-second font-semibold"
                                icon={LuClockAlert}
                                register={register}
                            />
                            <InputField
                                name="estado_cobro"
                                label="Estado de Cobro"
                                placeholder="Ej: Pagado / Pendiente"
                                className="text-text-second font-semibold"
                                icon={LuBadgeDollarSign}
                                register={register}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-y-3 w-full">
                            <SelectInput
                                name="vendedor_id"
                                label="Vendedor"
                                icon={CgMenuGridR}
                                className="text-text-second font-semibold"
                                options={[
                                    { value: "1", label: "Vendedor 1" },
                                    { value: "2", label: "Vendedor 2" },
                                    { value: "3", label: "Vendedor 3" },
                                ]}
                                {...vendedor.bind}
                                register={register}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-x-4 gap-y-3 w-full">
                            <InputField
                                name="dte_numero"
                                label="Número Factura DTE"
                                placeholder="Número de Factura"
                                className="text-text-second font-semibold"
                                icon={LuHash}
                                register={register}
                            />
                            <InputField
                                name="dte_nombre"
                                label="Nombre de Factura"
                                placeholder="Nombre Factura"
                                className="text-text-second font-semibold"
                                icon={FiFileText}
                                register={register}
                            />
                            <InputField
                                name="dte_nit"
                                label="NIT Factura"
                                placeholder="NIT"
                                className="text-text-second font-semibold"
                                icon={LuHash}
                                register={register}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-y-3 w-full">
                            <InputField
                                name="total_quetzales"
                                label="Total en Quetzales"
                                placeholder="Q0.00"
                                className="text-text-second font-semibold"
                                icon={FiDollarSign}
                                register={register}
                            />
                        </div>
                    </Panel>

                    <Panel>
                        <div className="grid grid-cols-4 gap-4 w-full">
                            <SelectInput
                                name="producto"
                                label="Producto"
                                icon={CgMenuGridR}
                                className="text-text-second font-semibold"
                                options={[
                                    { value: "1", label: "Producto 1" },
                                    { value: "2", label: "Producto 2" },
                                    { value: "3", label: "Producto 3" },
                                ]}
                                {...producto.bind}
                                register={register}
                            />
                            <InputField
                                name="cantidad"
                                label="Cantidad"
                                placeholder="Cantidad"
                                className="text-text-second font-bold"
                                icon={LuHash}
                                register={register}
                            />
                            <InputField
                                name="cantidad_unidades"
                                label="Cantidad en Unidades"
                                placeholder="Cantidad en Unidades"
                                className="text-text-second font-semibold"
                                icon={LuHash}
                                register={register}
                            />
                            <InputField
                                name="precio_paquete"
                                label="Precio por Fardo/Paquete"
                                placeholder="Precio por Fardo"
                                className="text-text-second font-semibold"
                                icon={FiDollarSign}
                                register={register}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-y-3 w-full">
                            <InputField
                                name="observaciones"
                                label="Observaciones"
                                placeholder="Observaciones"
                                className="text-text-second font-semibold"
                                icon={FiHeadphones}
                                register={register}
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <IconButton
                                type="button"
                                variant={ButtonVariant.PRIMARY}
                                onClick={handleAddProduct}
                                size={ButtonSize.MD}
                            >
                                Agregar
                            </IconButton>
                        </div>
                    </Panel>

                    <PanelSecundary>
                        <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-400 pb-2 text-text-second">
                            <LuPackageSearch size={20} />
                            <span className="font-bold">
                                Resumen de Productos
                            </span>
                        </div>
                        <TableComponent
                            data={data}
                            columns={columns}
                            maxHeight="210px"
                        />
                    </PanelSecundary>

                    <Panel>
                        <div className="flex justify-end gap-4">
                            <IconButton
                                type="submit"
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.MD}
                            >
                                Registrar Venta
                            </IconButton>
                        </div>
                    </Panel>
                </form>
            </div>
        </SendSelectorProvider>
    );
}

export default VentasPage;
