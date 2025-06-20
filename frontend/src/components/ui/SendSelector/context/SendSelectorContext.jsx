import { createContext, useContext } from "react";
import { useSendSelector } from "../hooks/useSendSelector";

const SendSelectorContext = createContext();

export const SendSelectorProvider = ({ children, initialValue = null }) => {
    const selectorState = useSendSelector(initialValue);

    return (
        <SendSelectorContext.Provider value={selectorState}>
            {children}
        </SendSelectorContext.Provider>
    );
};

export const useSendSelectorContext = () => {
    const context = useContext(SendSelectorContext);

    if (!context) {
        throw new Error(
            "useEnvioSelectorContext debe ser usado dentro de EnvioSelectorProvider"
        );
    }

    return context;
};
