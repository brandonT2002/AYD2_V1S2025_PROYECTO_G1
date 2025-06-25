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
import { requestBuscarVentas } from "../services/bajaBodega";
import { requestGetAllClientes } from "../services/clientes";
import { requestGetAllVendedores } from "../services/vendedores";
import { requestGetProductos } from "../services/inventario";
import ProductSelector from "../components/ui/ProductSelect/ProductSelect";
import ProductTable from "../components/ui/ProductSelect/ProductTable";
import { toast } from "sonner";

function VentasPage() {
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

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const [ventaData, setVentaData] = useState({
        fecha_venta: getCurrentDate(),
        fecha_salida_bodega: "",
        cliente: "",
        nit_cliente: "",
        tipo_pago: "",
        dias_credito: "",
        estado_cobro: "",
        vendedor_id: "",
        dte_numero: "",
        dte_nombre: "",
        dte_nit: "",
        total_quetzales: "",
        observaciones: "",
    });

    const handleVentaDataChange = (e) => {
        const { name, value } = e.target;
        setVentaData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "cliente") {
            getPaymentMethods({ target: { value } });
        }
    };

    const searchSells = async (formData) => {
        try {
            const response = await requestBuscarVentas(formData);
            setSells(response.data.data);
        } catch (error) {
            console.error("Error buscando ventas:", error);
        }
    };

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

    const insertarVenta = async () => {
        try {
            if (!ventaData.cliente || selectedProducts.length === 0) {
                toast.error(
                    "Por favor, seleccione un cliente y al menos un producto."
                );
                return;
            }

            const ventaCompleta = {
                ...ventaData,
                productos: selectedProducts,
            };
            console.log("Datos de la venta a insertar:", ventaCompleta);
            // const response = await requestNuevaVenta(ventaCompleta);
            // alert(`Venta registrada con éxito: ${response.data}`);

            setVentaData({
                fecha_venta: getCurrentDate(),
                fecha_salida_bodega: "",
                cliente: "",
                nit_cliente: "",
                tipo_pago: "",
                dias_credito: "",
                estado_cobro: "",
                vendedor_id: "",
                dte_numero: "",
                dte_nombre: "",
                dte_nit: "",
                total_quetzales: "",
                observaciones: "",
            });
            setSelectedProducts([]);
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
            <div className="flex flex-col bg-gray-100 gap-3">
                <Title>Registrar Nueva Venta</Title>

                <Panel>
                    <TitlePanel>Detalles de la Venta</TitlePanel>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full">
                        <DatePicker
                            name="fecha_venta"
                            label="Fecha de Venta"
                            placeholder="Fecha de Venta"
                            className="text-text-second font-bold"
                            icon={FiCalendar}
                            defaultValue={getCurrentDate()}
                            value={ventaData.fecha_venta}
                            onChange={handleVentaDataChange}
                            position="top"
                        />
                        <DatePicker
                            name="fecha_salida_bodega"
                            label="Fecha de Salida de Bodega"
                            placeholder="Fecha de Salida"
                            className="text-text-second font-bold"
                            icon={FiCalendar}
                            value={ventaData.fecha_salida_bodega}
                            onChange={handleVentaDataChange}
                            position="top"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full">
                        <SelectInput
                            name="cliente"
                            label="Cliente"
                            icon={FiHome}
                            className="text-text-second font-semibold"
                            options={currentClientes}
                            value={ventaData.cliente}
                            onChange={handleVentaDataChange}
                            {...currentClientes.bind}
                        />
                        <InputField
                            name="nit_cliente"
                            label="NIT del Cliente"
                            placeholder="NIT del Cliente"
                            className="text-text-second font-semibold"
                            icon={FiBox}
                            value={ventaData.nit_cliente}
                            onChange={handleVentaDataChange}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-x-4 gap-y-3 w-full">
                        <SelectInput
                            name="tipo_pago"
                            label="Tipo de Pago"
                            icon={CgMenuGridR}
                            className="text-text-second font-semibold"
                            options={paymentMethods}
                            value={ventaData.tipo_pago}
                            onChange={handleVentaDataChange}
                            {...tipo_pago.bind}
                        />
                        <InputField
                            name="dias_credito"
                            label="Días de Crédito"
                            placeholder="Días de Crédito"
                            className="text-text-second font-semibold"
                            icon={LuClockAlert}
                            value={ventaData.dias_credito}
                            onChange={handleVentaDataChange}
                        />
                        <InputField
                            name="estado_cobro"
                            label="Estado de Cobro"
                            placeholder="Ej: Pagado / Pendiente"
                            className="text-text-second font-semibold"
                            icon={LuBadgeDollarSign}
                            value={ventaData.estado_cobro}
                            onChange={handleVentaDataChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-y-3 w-full">
                        <SelectInput
                            name="vendedor_id"
                            label="Vendedor"
                            icon={CgMenuGridR}
                            className="text-text-second font-semibold"
                            options={currentVendedores}
                            value={ventaData.vendedor_id}
                            onChange={handleVentaDataChange}
                            {...vendedor.bind}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-x-4 gap-y-3 w-full">
                        <InputField
                            name="dte_numero"
                            label="Número Factura DTE"
                            placeholder="Número de Factura"
                            className="text-text-second font-semibold"
                            icon={LuHash}
                            value={ventaData.dte_numero}
                            onChange={handleVentaDataChange}
                        />
                        <InputField
                            name="dte_nombre"
                            label="Nombre de Factura"
                            placeholder="Nombre Factura"
                            className="text-text-second font-semibold"
                            icon={FiFileText}
                            value={ventaData.dte_nombre}
                            onChange={handleVentaDataChange}
                        />
                        <InputField
                            name="dte_nit"
                            label="NIT Factura"
                            placeholder="NIT"
                            className="text-text-second font-semibold"
                            icon={LuHash}
                            value={ventaData.dte_nit}
                            onChange={handleVentaDataChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-y-3 w-full">
                        <InputField
                            name="total_quetzales"
                            label="Total en Quetzales"
                            placeholder="Q0.00"
                            className="text-text-second font-semibold"
                            icon={FiDollarSign}
                            value={ventaData.total_quetzales}
                            onChange={handleVentaDataChange}
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
                </Panel>

                <Panel>
                    <div className="flex justify-end gap-4">
                        <IconButton
                            type="button"
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.MD}
                            onClick={insertarVenta}
                        >
                            Registrar Venta
                        </IconButton>
                    </div>
                </Panel>
            </div>
        </SendSelectorProvider>
    );
}

export default VentasPage;
