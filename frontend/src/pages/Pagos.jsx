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
import { requestInsertarPago } from "../services/pagos";

function PagosPage() {    const banco = useSelectInput("");
    const criterio = useSelectInput("");
    const [sells, setSells] = useState([]);
    let selectedId = 0; // Para pruebas, establecer un ID de venta fijo
    
    // Formulario para búsqueda de ventas
    const { register: registerSearch, handleSubmit: handleSubmitSearch, reset: resetSearch } = useForm();
    
    // Formulario para registro de pagos
    const { register: registerPayment, handleSubmit: handleSubmitPayment, reset: resetPayment } = useForm();

    // Log para mostrar el estado actual de las variables importantes
    console.log("Estado actual de variables:");
    console.log("- selectedId:", selectedId);
    console.log("- banco.value:", banco.value);
    console.log("- criterio.value:", criterio.value);
    console.log("- sells.length:", sells.length);    const searchSells = async (formData) => {
        console.log("=== BÚSQUEDA DE VENTAS ===");
        console.log("Datos de búsqueda:", formData);
        try {
            const response = await requestBuscarVentas(formData);
            console.log("Respuesta de búsqueda:", response.data);
            setSells(response.data.data);
            console.log("Ventas encontradas:", response.data.data.length);
        } catch (error) {
            console.error("Error buscando ventas:", error);
        }
    };const handlePay = async (datoPago) => {
        console.log("=== INICIANDO PROCESO DE PAGO ===");
        console.log("1. Datos del formulario recibidos:", datoPago);
        console.log("2. ID de venta seleccionada:", selectedId);
        console.log("3. Valor del banco seleccionado:", banco.value);
       
        
        try {


            // Preparar los datos del pago
            const paymentData = {
                ...datoPago
            };

            console.log("4. Datos finales a enviar al endpoint:");
            console.log(JSON.stringify(paymentData, null, 2));
            console.log("5. URL del endpoint: http://localhost:5000/api/InsertarPago");
            
            const response = await requestInsertarPago(paymentData);
            console.log("6. Respuesta del servidor:", response);
              if (response.status === 200 || response.status === 201) {
                console.log("✅ PAGO REGISTRADO EXITOSAMENTE");
                alert("Pago registrado exitosamente");
                resetPayment(); // Limpiar el formulario de pago
                // Opcional: refrescar la lista de ventas
                // await searchSells({ criterio: criterio.value, valor: "" });
            }
        } catch (error) {
            console.error("❌ ERROR registrando pago:", error);
            console.error("Detalles del error:", error.response?.data || error.message);
            alert("Error al registrar el pago. Por favor intente nuevamente.");
        }
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
        
    ];

    return (
        <SendSelectorProvider>
            <div className="flex flex-col bg-gray-100 gap-3">
                <Title>Registrar Pagos</Title>

                <Panel>
                    <TitlePanel>Buscar Venta</TitlePanel>                    <form
                        className="flex gap-3 w-full justify-between"
                        onSubmit={handleSubmitSearch(searchSells)}
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
                            register={registerSearch}
                        />
                        <InputField
                            name="valor"
                            label="Término de Búsqueda"
                            placeholder="Ingrese término"
                            className="text-text-second font-bold"
                            icon={FiPackage}
                            register={registerSearch}
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
                    <TitlePanel>Resultados de Búsqueda</TitlePanel>                    <SendSelectorDemo
                        envios={sells}
                        onSelectChange={(id) => {
                            console.log("=== VENTA SELECCIONADA ===");
                            console.log("ID de venta seleccionada:", id);
                        }}
                    />
                </Panel>

                <PanelSecundary>
                    <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-400 pb-2 text-text-second">
                        <LuPackageSearch size={20} />
                        <span className="font-bold">Productos</span>
                    </div>
                    <TableComponent data={data} columns={columns} maxHeight="210px" />
                </PanelSecundary>                <Panel>
                    <form onSubmit={handleSubmitPayment(handlePay)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mb-4">
                            <InputField
                                name="recibo_caja"
                                label="Número de Recibo de Caja"
                                placeholder="Número de recibo"
                                className="text-text-second font-semibold"
                                icon={FiHash}
                                register={registerPayment}
                                required
                            />
                            <InputField
                                name="fecha_pago"
                                label="Fecha de Pago"
                                type="date"
                                className="text-text-second font-semibold"
                                icon={FiCalendar}
                                register={registerPayment}
                                required
                            />
                            <SelectInput
                                name="banco"
                                label="Banco"
                                icon={CgMenuGridR}
                                className="text-text-second font-semibold"
                                options={[
                                    { value: "Banrural", label: "Banrural" },
                                    { value: "BAM", label: "BAM" },
                                    { value: "G&T", label: "G&T" },
                                    { value: "Industrial", label: "Bnaco Industrial" },
                                ]}
                                {...banco.bind}
                                register={registerPayment}
                                required
                            />
                            <InputField
                                name="numero_cuenta"
                                label="Número de Cuenta"
                                placeholder="Número de Cuenta"
                                className="text-text-second font-semibold"
                                icon={FiHash}
                                register={registerPayment}
                                required
                            />
                            <InputField
                                name="numero_transaccion"
                                label="No. de Transferencia o Depósito"
                                placeholder="Número de Transferencia"
                                className="text-text-second font-semibold"
                                icon={FiHash}
                                register={registerPayment}
                                required
                            />
                            <InputField
                                name="monto_abono"
                                label="Monto de Abono"
                                placeholder="Monto"
                                type="number"
                                step="0.01"
                                className="text-text-second font-semibold"
                                icon={FiDollarSign}
                                register={registerPayment}
                                required
                            />
                            <InputField
                                name="venta_id"
                                label="ID de Venta"
                                placeholder="ID de Venta"
                                className="text-text-second font-semibold"
                                icon={FiHash}
                                register={registerPayment}
                                required
                            />
                        </div>
                        
                        <div className="flex justify-end gap-4 px-4">
                            <IconButton
                                type="submit"
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.MD}
                            >
                                Pagar
                            </IconButton>
                        </div>
                    </form>
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
                    </div>                </PanelSecundary>
            </div>
        </SendSelectorProvider>
    );
}

export default PagosPage;