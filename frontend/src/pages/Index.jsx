import {
    Title,
    InputField,
    SelectInput,
    TitlePanel,
    IconButton,
} from "../components/ui";
import { Panel } from "../components/layout";
import { RiInputMethodFill } from "react-icons/ri";
import { useSelectInput } from "../components/ui/SelectInput";
import { ButtonVariant, ButtonSize } from "../components/ui/Button/config";

import { SendSelectorDemo } from "../components/ui/SendSelector/index";
import { CgMenuGridR } from "react-icons/cg";
import { ImSearch } from "react-icons/im";
import { FiPackage } from "react-icons/fi";

import {
    SendSelectorProvider,
    SendCard,
    SelectedInfo,
    useSendSelectorContext,
} from "../components/ui/SendSelector/index";
import SimplePicker from "../components/ui/DatePicker/SimplePicker";

function IndexPage() {
    const genero = useSelectInput("");
    const handleSearch = () => console.log("Search action triggered");

    const defaultEnvios = [
        {
            id: 1,
            num_env: "ENV2025001",
            cliente: "María González",
            vendedor: "ds5",
            fechaDTE: "09-06-2025",
            fechaventa: "1250.00",
            nitCliente: "1234567-8",
            tipoPago: "Contado",
            nombreFactura: "María G.",
            fechasalidaBodega: "10-06-2025",
            diasCredito: "0",
            nitFactura: "1234567-8",
            total: 1250.0,
            productos: [
                {
                    producto: "Producto A",
                    cantidad: 10,
                    precioUnitario: 125.0,
                    cantidadUnidades: 100,
                    precioFardo: 1250.0,
                    subtotal: 1250.0,
                    observaciones: "Entrega inmediata",
                },
            ],
        },
        {
            id: 2,
            num_env: "ENV2025002",
            cliente: "Carlos Mendoza",
            vendedor: "sd",
            fechaDTE: "10-06-2025",
            fechaventa: "10-06-2025",
            nitCliente: "9876543-2",
            tipoPago: "Crédito",
            nombreFactura: "Carlos M.",
            fechasalidaBodega: "11-06-2025",
            diasCredito: "15",
            nitFactura: "9876543-2",
            total: 2250.0,
            productos: [
                {
                    producto: "Producto A",
                    cantidad: 10,
                    precioUnitario: 125.0,
                    cantidadUnidades: 100,
                    precioFardo: 1250.0,
                    subtotal: 1250.0,
                    observaciones: "Entrega inmediata",
                },
                {
                    producto: "Producto B",
                    cantidad: 5,
                    precioUnitario: 200.0,
                    cantidadUnidades: 50,
                    precioFardo: 1000.0,
                    subtotal: 1000.0,
                    observaciones: "Entrega programada",
                },
            ],
        },
        {
            id: 3,
            num_env: "ENV2025003",
            cliente: "Ana Rodríguez",
            vendedor: "z2025",
            fechaDTE: "11-06-2025",
            fechaventa: "1500.00",
            nitCliente: "1928374-5",
            tipoPago: "Contado",
            nombreFactura: "Ana R.",
            fechasalidaBodega: "12-06-2025",
            diasCredito: "0",
            nitFactura: "1928374-5",
            total: 1500.0,
            productos: [
                {
                    producto: "Producto C",
                    cantidad: 20,
                    precioUnitario: 75.0,
                    cantidadUnidades: 200,
                    precioFardo: 1500.0,
                    subtotal: 1500.0,
                    observaciones: "Entrega inmediata",
                },
            ],
        },
    ];

    return (
        <div className="flex flex-col bg-gray-100 gap-3">
            <Title>Registrar Salida</Title>
            <Panel>
                <TitlePanel>Buscar Venta</TitlePanel>
                <div className="flex gap-3 w-full justify-between">
                    <SelectInput
                        name="genero"
                        label="Buscar Por"
                        icon={CgMenuGridR}
                        className={"text-text-second font-semibold"}
                        options={[
                            { value: "0", label: "Número de envío" },
                            { value: "1", label: "Nombre de cliente" },
                        ]}
                        {...genero.bind}
                    />
                    <InputField
                        name="username"
                        label="Termino de Búsqueda"
                        placeholder="Ingrese término"
                        className={"text-text-second font-bold"}
                        icon={FiPackage}
                    />

                    <div className="flex items-end mb-1">
                        <IconButton
                            icon={ImSearch}
                            variant={ButtonVariant.PRIMARY}
                            onClick={handleSearch}
                            size={ButtonSize.MD}
                        >
                            Buscar
                        </IconButton>
                    </div>
                </div>
            </Panel>
            <Panel className="overflow-visible">
                <TitlePanel>Resultados de Búsqueda</TitlePanel>
                <div>
                    <SendSelectorDemo envios={defaultEnvios} />
                </div>

                <div className="flex flex-col">
                    <SimplePicker
                        id="fechaNacimiento"
                        name="fecha_nacimiento"
                        label="Fecha de Salida"
                        onDateChange={(date) => console.log(date)}
                        isRequired={true}
                        position="top"
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <IconButton
                        variant={ButtonVariant.SECONDARY}
                        onClick={handleSearch}
                        size={ButtonSize.MD}
                    >
                        Cancelar
                    </IconButton>
                    <IconButton
                        variant={ButtonVariant.PRIMARY}
                        onClick={handleSearch}
                        size={ButtonSize.MD}
                    >
                        Guardar
                    </IconButton>
                </div>
            </Panel>
        </div>
    );
}

export default IndexPage;
