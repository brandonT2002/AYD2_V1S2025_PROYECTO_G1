import { Title, InputField, SelectField, SearchButton } from "../components/ui";
import { Panel } from "../components/layout";
import { RiBox3Fill, RiBox3Line, RiFileSearchLine, RiInputMethodFill, RiSearch2Line, RiSwordLine, RiWordpressLine } from "react-icons/ri";

function PaymentPage() {
    return (
        <div className="flex flex-col bg-gray-100">
            <br></br>
            <Title>Registrar Pagos</Title>
            <br></br>
            <Panel>
                <p><strong>Buscar Venta</strong></p>
                <br></br>
                <div className="flex items-end gap-6">
                <div className="w-1/3">
                <SelectField
                name="filtro_busqueda"
                label="Buscar Por"
                options={[
                    { value: "numero_envio", label: "Número de Envío" },
                    { value: "nombre_cliente", label: "Nombre de Cliente" },
                ]}
                />
                </div>
                <div className="w-1/2">
                <InputField
                    name="termino_busqueda"
                    label="Término de Búsqueda"
                    placeholder="Escribe tu término de búsqueda"
                    defaultValue=""
                    icon={RiFileSearchLine}
                />
                </div>
                <div className="w-1/6">
                <SearchButton/>
                </div>
                </div>
            </Panel>
            <br></br>
            <Panel>
            <p><strong>Resultados de Búsqueda</strong> (1 encontrado)</p>
            <div className="flex items-end gap-6">
            <div className="w-1/3">
            <br></br>
                <InputField
                    name="test"
                    label="Test"
                    placeholder="Escribe acá"
                    defaultValue=""
                    className={"font-bold"}
                    icon={RiInputMethodFill}
                />
                </div>
                </div>
            </Panel>
            <br></br>
            <Panel>
                <strong>Información General</strong>
                <div className="flex items-end gap-6 bg-gray-100">
                <div className="w-1/3">
                <br></br>
                <InputField
                    name="test"
                    label="Test"
                    placeholder="Escribe acá"
                    defaultValue=""
                    className={"font-bold"}
                    icon={RiInputMethodFill}
                />
                </div>
                </div>
            </Panel>
            
        </div>
    );
}

export default PaymentPage;