import { useState } from "react";

export const useSelectInput = (initialValue = "") => {
    const [selectedValue, setSelectedValue] = useState(initialValue);

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    };

    return {
        selectedValue,
        setSelectedValue,
        bind: {
            value: selectedValue,
            onChange: handleChange,
        },
    };
};
