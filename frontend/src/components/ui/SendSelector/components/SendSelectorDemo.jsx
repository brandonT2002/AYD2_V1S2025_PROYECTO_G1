import { SendSelectorProvider } from "../context/SendSelectorContext";
import { SendCard } from "./SendCard";
import { SelectedInfo } from "./SelectInfo";

export const SendSelectorDemo = ({
    envios = defaultEnvios,
    title = "Selector de Envíos",
    maxHeight = "300px",
}) => {
    return (
        <SendSelectorProvider>
            <div className="max-w-full mx-auto space-y-6">
                <div
                    className="overflow-y-auto overflow-x-hidden rounded-lg bg-white"
                    style={{ maxHeight: maxHeight }}
                >
                    <div
                        className="space-y-4 "
                        role="radiogroup"
                        aria-label="Seleccionar envío"
                    >
                        {envios.map((envio) => (
                            <SendCard key={envio.id} envio={envio} />
                        ))}
                    </div>
                </div>

                <SelectedInfo />
            </div>
        </SendSelectorProvider>
    );
};
