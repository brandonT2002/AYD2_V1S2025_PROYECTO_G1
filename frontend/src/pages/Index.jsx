import { Title, InputField } from "../components/ui";
import { Panel } from "../components/layout";
import { RiInputMethodFill } from "react-icons/ri";

function IndexPage() {
    return (
        <div className="flex flex-col bg-gray-100">
            <Title>Registrar Salida</Title>
            <Panel>
                <p>Contenido de la página de productos.</p>
                <InputField
                    name="username"
                    label="Nombre de usuario"
                    placeholder="Escribe tu nombre"
                    defaultValue="Test User"
                    className={"text-text-accent font-bold"}
                    icon={RiInputMethodFill}
                />
            </Panel>
        </div>
    );
}

export default IndexPage;
