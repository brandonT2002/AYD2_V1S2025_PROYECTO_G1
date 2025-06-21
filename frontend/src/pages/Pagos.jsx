import {
    Title,
    InputField,
    SelectInput,
    TitlePanel,
    IconButton,
    TableComponent,
} from "../components/ui";
import { Panel, PanelSecundary } from "../components/layout";
import { useSelectInput } from "../components/ui/SelectInput";
import { ButtonVariant, ButtonSize } from "../components/ui/Button/config";
import { SendSelectorProvider } from "../components/ui/SendSelector/context/SendSelectorContext";
import { SendSelectorDemo } from "../components/ui/SendSelector";
import {
    LuBadgeDollarSign,
    LuClockAlert,
    LuHash,
    LuPackageSearch,
} from "react-icons/lu";
import { CgMenuGridR } from "react-icons/cg";
import { ImSearch } from "react-icons/im";
import { FiPackage, FiHash, FiCalendar, FiDollarSign } from "react-icons/fi";

import { useForm } from "react-hook-form";
import { useState } from "react";
import {
    requestBuscarVentas,
    requestRegistrarSalida,
} from "../services/bajaBodega";

function PagosPage() {
    const banco = useSelectInput("");
    const criterio = useSelectInput("");
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

    const handlePay = () => {
        console.log("Pago registrado");
        // Aquí deberías enviar los datos del formulario de pago al backend
    };

    const columns = [
        { header: "Producto", key: "producto" },
        { header: "Cantidad", key: "cantidad" },
        { header: "Precio Unit.", key: "precio_unitario" },
        { header: "Cantidad en Unidades", key: "cantidad_unidades" },
        { header: "Precio por fardo/paquete", key: "precio_paquete" },
        { header: "Subtotal", key: "subtotal" },
        { header: "Observaciones", key: "observaciones" },
    ];

    const data = [
        {
            producto: "Filtro de aire",
            cantidad: 12,
            precio_unitario: "Q2.00",
            cantidad_unidades: 4,
            precio_paquete: "Q8.00",
            subtotal: "Q8.00",
            observaciones: "-",
        },
    ];

    return (
        <SendSelectorProvider>
            <div className="flex flex-col bg-gray-100 gap-3">
                <Title>Registrar Pagos</Title>

                <Panel>
                    <TitlePanel>Buscar Venta</TitlePanel>
                    <form
                        className="flex gap-3 w-full justify-between"
                        onSubmit={handleSubmit(searchSells)}
                    >
                        <SelectInput
                            name="criterio"
                            label="Buscar Por"
                            icon={CgMenuGridR}
                            className="text-text-second font-semibold"
                            options={[
                                { value: "envio", label: "Número de envío" },
                                {
                                    value: "cliente",
                                    label: "Nombre de cliente",
                                },
                            ]}
                            {...criterio.bind}
                            register={register}
                        />
                        <InputField
                            name="valor"
                            label="Término de Búsqueda"
                            placeholder="Ingrese término"
                            className="text-text-second font-bold"
                            icon={FiPackage}
                            register={register}
                        />
                        <div className="flex items-end mb-1">
                            <IconButton
                                type="submit"
                                icon={ImSearch}
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.MD}
                            >
                                Buscar
                            </IconButton>
                        </div>
                    </form>
                </Panel>

                <Panel className="overflow-visible">
                    <TitlePanel>Resultados de Búsqueda</TitlePanel>
                    <SendSelectorDemo
                        envios={sells}
                        onSelectChange={(id) => setSelectedId(id)}
                    />
                </Panel>

                <PanelSecundary>
                    <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-400 pb-2 text-text-second">
                        <LuPackageSearch size={20} />
                        <span className="font-bold">Productos</span>
                    </div>
                    <TableComponent data={data} columns={columns} maxHeight="210px" />
                </PanelSecundary>
                <Panel>           
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                    <InputField
                        name="numeroRecibo"
                        label="Número de Recibo de Caja"
                        placeholder="Número de recibo"
                        className="text-text-second font-semibold"
                        icon={FiHash}
                        register={register}
                    />
                    <InputField
                        name="fechaPago"
                        label="Fecha de Pago"
                        placeholder="Fecha"
                        className="text-text-second font-semibold"
                        icon={FiCalendar}
                        register={register}
                    />
                    <SelectInput
                        name="banco"
                        label="Banco"
                        icon={CgMenuGridR}
                        className="text-text-second font-semibold"
                        options={[
                            { value: "banrural", label: "Banrural" },
                            { value: "bi", label: "Banco Industrial" },
                            { value: "promerica", label: "Promerica" },
                            { value: "bac", label: "BAC" },
                        ]}
                        {...banco.bind}
                        register={register}
                    />
                    <InputField
                        name="numeroCuenta"
                        label="Número de Cuenta"
                        placeholder="Número de Cuenta"
                        className="text-text-second font-semibold"
                        icon={FiHash}
                        register={register}
                    />
                    <InputField
                        name="numeroTransferencia"
                        label="No. de Transferencia o Depósito"
                        placeholder="Número de Transferencia"
                        className="text-text-second font-semibold"
                        icon={FiHash}
                        register={register}
                    />
                    <InputField
                        name="montoAbono"
                        label="Monto de Abono"
                        placeholder="Monto"
                        className="text-text-second font-semibold"
                        icon={FiDollarSign}
                        register={register}
                    />
                </div>
                </Panel>         
                <PanelSecundary>
                    <div className="grid grid-cols-4 gap-4 mb-4 border-b-2 border-gray-400 pb-2 text-text-second">
                        <div className="flex flex-col items-start gap-1">
                            <div className="flex items-center gap-2">
                                <LuHash size={15} />
                                <span className="font-bold">Días de Crédito Restantes</span>
                            </div>
                            <span className="text-sm text-gray-500">15 días</span>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                            <div className="flex items-center gap-2">
                                <LuHash size={15} />
                                <span className="font-bold">Total</span>
                            </div>
                            <span className="text-sm text-gray-500">Q 1,500.00</span>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                            <div className="flex items-center gap-2">
                                <LuBadgeDollarSign size={15} />
                                <span className="font-bold">Pagado</span>
                            </div>
                            <span className="text-sm text-gray-500">Q 1,200.00</span>
                        </div>
                        <div className="flex flex-col items-start gap-1">
                            <div className="flex items-center gap-2">
                                <LuClockAlert size={15} />
                                <span className="font-bold">Pendiente</span>
                            </div>
                            <span className="text-sm text-gray-500">Q 300.00</span>
                        </div>
                    </div>
                </PanelSecundary>

                <Panel>
                    <div className="flex justify-end gap-4">
                        <IconButton
                            type="button"
                            variant={ButtonVariant.PRIMARY}
                            onClick={handlePay}
                            size={ButtonSize.MD}
                        >
                            Pagar
                        </IconButton>
                    </div>
                </Panel>
            </div>
        </SendSelectorProvider>
    );
}

export default PagosPage;