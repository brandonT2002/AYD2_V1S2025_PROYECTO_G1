import {
    Title,
    InputField,
    SelectInput,
    TitlePanel,
    IconButton,
    DatePicker,
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

import { get, set, useForm } from "react-hook-form";
import { useState } from "react";
import {
    requestBuscarVentas,
    requestRegistrarSalida,
} from "../services/bajaBodega";
import { requestRegistrarPago } from "../services/pagos";
import { toast } from "sonner";

function PagosPage() {
    const banco = useSelectInput("");
    const criterio = useSelectInput("");
    const [sells, setSells] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [infoCobranza, setInfoCobranza] = useState({
        diasCredito: 0,
        total: 0,
        pagado: 0,
        pendiente: 0,
        currentPagado: 0,
    });
    const [date, setDate] = useState("");
    const {
        register: registerSearch,
        handleSubmit: handleSubmitSearch,
        reset: resetSearch,
    } = useForm();

    const {
        register: registerPayment,
        handleSubmit: handleSubmitPayment,
        reset: resetPayment,
    } = useForm();

    const searchSells = async (searchTerm) => {
        try {
            const response = await requestBuscarVentas(searchTerm);
            if (response.data.data.length === 0) {
                toast.error("No se encontraron ventas con ese criterio");
                setSells([]);
                return;
            }
            setSells(response.data.data);
        } catch (error) {
            toast.error("Error al buscar ventas");
            console.error("Error al buscar ventas:", error);
        }
    };
    const handlePay = async (datoPago) => {
        try {
            const paymentData = {
                ...datoPago,
                venta_id: selectedId,
                pendiente: infoCobranza.total- infoCobranza.currentPagado,
                fecha_pago: date,
            };
            console.log("Datos del pago:", paymentData);
            const response = await requestRegistrarPago(paymentData);
            console.log("Respuesta del servidor:", response);
            toast.success("Pago registrado exitosamente");
        } catch (error) {
            toast.error("Error al registrar el pago");
            console.error("Error al registrar el pago:", error);
            return;
        }
    };

    const getTotalPendiente = () => {
        const totalPendiente =
            parseFloat(infoCobranza.total) -
            parseFloat(infoCobranza.currentPagado);
        if (isNaN(totalPendiente)) {
            return "0.00";
        }
        return totalPendiente.toFixed(2);
    }

    return (
        <SendSelectorProvider>
            <div className="flex flex-col bg-gray-100 gap-3">
                <Title>Registrar Pagos</Title>
                <Panel>
                    <TitlePanel>Buscar Venta</TitlePanel>{" "}
                    <form
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
                    <TitlePanel>Resultados de Búsqueda</TitlePanel>{" "}
                    <div>
                        <SendSelectorDemo
                            envios={sells}
                            onSelectChange={(id) => setSelectedId(id)}
                            onSelectChangeCobro={(info) => {
                                setInfoCobranza(info);
                            }}
                        />
                    </div>
                </Panel>
                <Panel>
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
                            <DatePicker
                                name="fecha_pago_1"
                                label="Fecha de Salida de Bodega"
                                placeholder="Fecha de Salida"
                                className="text-text-second font-bold"
                                icon={FiCalendar}
                                position="top"
                                register={registerSearch}
                                onDateChange={(date) => setDate(date)}
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
                                    {
                                        value: "Industrial",
                                        label: "Banco Industrial",
                                    },
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
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (
                                        value >
                                        infoCobranza.total - infoCobranza.pagado
                                    ) {
                                        toast.error(
                                            "El monto no puede ser mayor al pendiente"
                                        );
                                        let max =
                                            parseFloat(infoCobranza.pendiente)+
                                            parseFloat(infoCobranza.pagado);
                                        // max = max + parseFloat(infoCobranza.pagado);
                                        // max = max.toFixed(2);
                                        console.log("Maximo:", max);
                                        e.target.value = infoCobranza.pendiente;
                                        setInfoCobranza((prev) => ({
                                            ...prev,
                                            currentPagado: max,
                                        }));
                                        return;
                                    }
                                    if (value < 0) {
                                        toast.error(
                                            "El monto no puede ser negativo"
                                        );
                                        e.target.value = "";
                                    }
                                    const nuevo =
                                        parseFloat(infoCobranza.pagado) +
                                        parseFloat(e.target.value);
                                    setInfoCobranza((prev) => ({
                                        ...prev,
                                        currentPagado: nuevo,
                                    }));

                                    if (isNaN(value)) {
                                        setInfoCobranza((prev) => ({
                                            ...prev,
                                            currentPagado: infoCobranza.pagado,
                                        }));
                                    }
                                }}
                                required
                            />
                        </div>
                        <PanelSecundary>
                            <div className="grid grid-cols-4 gap-4 mb-2 text-text-second">
                                <div className="flex flex-col items-start gap-1">
                                    <div className="flex items-center gap-2">
                                        <LuHash size={15} />
                                        <span className="font-bold">
                                            Días de Crédito Restantes
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {infoCobranza.diasCredito} días
                                    </span>
                                </div>
                                <div className="flex flex-col items-start gap-1">
                                    <div className="flex items-center gap-2">
                                        <LuHash size={15} />
                                        <span className="font-bold">Total</span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        Q {infoCobranza.total}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start gap-1">
                                    <div className="flex items-center gap-2">
                                        <LuBadgeDollarSign size={15} />
                                        <span className="font-bold">
                                            Pagado
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        Q {infoCobranza.currentPagado}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start gap-1">
                                    <div className="flex items-center gap-2">
                                        <LuClockAlert size={15} />
                                        <span className="font-bold">
                                            Pendiente
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        Q{" "}
                                        {getTotalPendiente()}
                                    </span>
                                </div>
                            </div>
                        </PanelSecundary>
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
            </div>
        </SendSelectorProvider>
    );
}

export default PagosPage;
