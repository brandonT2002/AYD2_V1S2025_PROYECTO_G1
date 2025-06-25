import {
    Title,
    InputField,
    SelectInput,
    TitlePanel,
    IconButton,
    TableComponent,
    DatePicker,
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
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { requestNuevaVenta } from "../services/bajaBodega";
import { requestGetAllClientes } from "../services/clientes";
import { requestGetAllVendedores } from "../services/vendedores";
import { requestGetProductos } from "../services/inventario";
import ProductSelector from "../components/ui/ProductSelect/ProductSelect";
import ProductTable from "../components/ui/ProductSelect/ProductTable";
import { toast } from "sonner";

function VentasPage() {
    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const vendedor = useSelectInput("");
    const tipo_pago = useSelectInput("");
    const producto = useSelectInput("");
    const cliente = useSelectInput("");
    const [sells, setSells] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [currentClientes, setCliente] = useState([]);
    const [allClientes, setAllClientes] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [currentVendedores, setCurrentVendedores] = useState([]);
    const [currentProductos, setCurrentProductos] = useState([]);
    const [allProductos, setAllProductos] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const { register, handleSubmit, reset, watch } = useForm();
    const [date, setDate] = useState(getCurrentDate());
    const [dateExit, setDateExit] = useState("");

    const getProductos = async () => {
        try {
            const response = await requestGetProductos();
            console.log("Productos obtenidos:", response.data);
            setCurrentProductos(response.data);
        } catch (error) {
            console.error("Error obteniendo productos:", error);
        }
    };

    const getVendedores = async () => {
        try {
            const response = await requestGetAllVendedores();
            const formattedVendedores = response.data.map((vendedor) => ({
                value: vendedor.id,
                label: vendedor.nombre + " " + vendedor.apellido,
            }));
            setCurrentVendedores(formattedVendedores);
        } catch (error) {
            console.error("Error obteniendo vendedores:", error);
        }
    };

    const insertarVenta = async (ventaData) => {
        // console.log("Datos de la venta:", ventaData,selectedProducts);
        try {
            if (!ventaData.cliente_id || ventaData.cliente_id === 0 || selectedProducts.length === 0) {
                toast.error(
                    "Por favor, seleccione un cliente y al menos un producto."
                );
                return;
            }
            const total = selectedProducts.reduce(
                (acc, product) => acc + product.subtotal,
                0
            );
            const ventaCompleta = {
                ...ventaData,
                productos: selectedProducts,
                total_quetzales: total,
                fecha_venta: date,
                fecha_salida_bodega: dateExit,
            };
            const response = await requestNuevaVenta(ventaCompleta);
            // alert(`Venta registrada con éxito: ${response.data}`);
            toast.success("Venta registrada con éxito.");
            setSelectedProducts([]);
            setDate(getCurrentDate());
            setDateExit(getCurrentDate());
            reset()
        } catch (error) {
            console.error("Error al insertar venta:", error);
        }
    };

    const getClientes = async () => {
        try {
            const response = await requestGetAllClientes();
            const formattedClientes = response.data.map((cliente) => ({
                value: cliente.id,
                label: cliente.nombre_contacto,
            }));
            formattedClientes.unshift({
                value: 0,
                label: "Seleccione un cliente",
            });
            setAllClientes(response.data);
            setCliente(formattedClientes);
        } catch (error) {
            console.error("Error obteniendo clientes:", error);
        }
    };

    const getPaymentMethods = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        const selectCliente = allClientes.find(
            (cliente) => cliente.id === selectedValue
        );

        if (selectCliente) {
            if (selectCliente.tipo_venta === "Credito") {
                setPaymentMethods([{ value: "credito", label: "Crédito" }]);
            } else if (selectCliente.tipo_venta === "Contado") {
                setPaymentMethods([{ value: "contado", label: "Contado" }]);
            } else {
                setPaymentMethods([
                    { value: "credito", label: "Crédito" },
                    { value: "contado", label: "Contado" },
                ]);
            }
        } else {
            setPaymentMethods([]);
        }
    };

    const handleAddProduct = (product) => {
        setSelectedProducts((prev) => [...prev, product]);
    };

    const handleRemoveProduct = (id) => {
        setSelectedProducts((prev) =>
            prev.filter((product) => product.id !== id)
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getClientes();
                await getVendedores();
                await getProductos();
            } catch (error) {
                console.error("Error en las peticiones:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (currentClientes.length > 0) {
            getPaymentMethods({ target: { value: currentClientes[0].value } });
        }
    }, [currentClientes[0], allClientes]);

    return (
        <SendSelectorProvider>
            <form
                className="flex flex-col bg-gray-100 gap-3"
                onSubmit={handleSubmit(insertarVenta)}
            >
                <Title>Registrar Nueva Venta</Title>

                <Panel>
                    <TitlePanel>Detalles de la Venta</TitlePanel>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full">
                        <DatePicker
                            name="fecha_venta_1"
                            label="Fecha de Venta"
                            value={date}
                            placeholder="Fecha de Venta"
                            className="text-text-second font-bold"
                            icon={FiCalendar}
                            position="top"
                            register={register}
                            onDateChange={(selectedDate) => {
                                setDate(selectedDate);
                            }}
                        />
                        <DatePicker
                            name="fecha_salida_bodega_1"
                            label="Fecha de Salida de Bodega"
                            placeholder="Fecha de Salida"
                            className="text-text-second font-bold"
                            icon={FiCalendar}
                            position="top"
                            register={register}
                            onDateChange={(date) => setDateExit(date)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full">
                        <SelectInput
                            name="cliente_id"
                            label="Cliente"
                            icon={FiHome}
                            className="text-text-second font-semibold"
                            options={currentClientes}
                            onChange={(e) => {
                                getPaymentMethods(e);
                            }}
                            register={register}
                            {...currentClientes.bind}
                        />
                        <InputField
                            name="nit_cliente"
                            label="NIT del Cliente"
                            placeholder="NIT del Cliente"
                            className="text-text-second font-semibold"
                            icon={FiBox}
                            register={register}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-x-4 gap-y-3 w-full">
                        <SelectInput
                            name="tipo_pago"
                            label="Tipo de Pago"
                            icon={CgMenuGridR}
                            className="text-text-second font-semibold"
                            options={paymentMethods}
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
                            options={currentVendedores}
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
                </Panel>

                <Panel>
                    <TitlePanel>Seleccionar Productos</TitlePanel>
                    <ProductSelector
                        products={currentProductos}
                        onAddProduct={handleAddProduct}
                    />
                    <ProductTable
                        selectedProducts={selectedProducts}
                        onRemoveProduct={handleRemoveProduct}
                    />
                    <div className="flex justify-end gap-4">
                        <IconButton
                            type="subbmit"
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.MD}
                        >
                            Registrar Venta
                        </IconButton>
                    </div>
                </Panel>
            </form>
        </SendSelectorProvider>
    );
}

export default VentasPage;
