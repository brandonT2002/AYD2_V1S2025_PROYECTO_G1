import {
    Title,
    InputField,
    SelectInput,
    TitlePanel,
    IconButton,
    DatePicker,
    TableComponent,
} from "../components/ui";
import { Panel, PanelSecundary } from "../components/layout";
import { RiInputMethodFill } from "react-icons/ri";
import { useSelectInput } from "../components/ui/SelectInput";
import { ButtonVariant, ButtonSize } from "../components/ui/Button/config";
function IndexPage() {
    const genero = useSelectInput("");
    const handleSearch = () => console.log("Search action triggered");
    const columns = [
        { header: "Nombre", key: "nombre" },
        { header: "Edad", key: "edad" },
        { header: "País", key: "país" },
    ];

    const data = [
        { nombre: "Ana", edad: 25, país: "Guatemala" },
        { nombre: "Luis", edad: 30, país: "México" },
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
                        icon={RiInputMethodFill}
                        className={"text-text-second font-semibold"}
                        options={[
                            { value: "rock", label: "Rock" },
                            { value: "jazz", label: "Jazz" },
                            { value: "pop", label: "Pop" },
                        ]}
                        {...genero.bind}
                    />
                    <InputField
                        name="username"
                        label="Nombre de usuario"
                        placeholder="Escribe tu nombre"
                        defaultValue="Test User"
                        className={"text-text-accent font-bold"}
                        icon={RiInputMethodFill}
                    />

                    <div className="flex items-end mb-1">
                        <IconButton
                            icon={RiInputMethodFill}
                            variant={ButtonVariant.PRIMARY}
                            onClick={handleSearch}
                            size={ButtonSize.MD}
                        >
                            Buscar
                        </IconButton>
                    </div>
                </div>
            </Panel>
            <Panel className="relative overflow-visible">
                <TitlePanel>Resultados de Búsqueda</TitlePanel>
                <PanelSecundary>
                    <TableComponent data={data} columns={columns} />
                </PanelSecundary>
                <div className="relative flex flex-col gap-1 w-full overflow-visible">
                    <DatePicker onDateChange={(date) => console.log(date)} />
                </div>
                <div className="flex justify-end gap-4">
                    <IconButton
                        icon={RiInputMethodFill}
                        variant={ButtonVariant.SECONDARY}
                        onClick={handleSearch}
                        size={ButtonSize.MD}
                    >
                        Cancelar
                    </IconButton>
                    <IconButton
                        icon={RiInputMethodFill}
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
