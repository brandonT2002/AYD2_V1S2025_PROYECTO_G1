import { useState } from "react";

export const useSendSelector = (initialValue = null) => {
    const [selectedEnvio, setSelectedEnvio] = useState(initialValue);
    const selectEnvio = (envioData) => {
        setSelectedEnvio(envioData);
    };

    const isSelected = (envioId) => {
        return selectedEnvio?.id === envioId;
    };

    const clearSelection = () => {
        setSelectedEnvio(null);
    };

    return {
        selectedEnvio,
        selectEnvio,
        isSelected,
        clearSelection,
    };
};
