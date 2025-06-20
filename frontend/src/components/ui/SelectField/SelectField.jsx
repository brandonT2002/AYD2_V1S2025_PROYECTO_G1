import { Label } from "../InputField/components";

const SelectField = ({ name, label, options = [], register, className = "", ...rest }) => {
    const selectProps = {
        id: name,
        ...(register ? register(name, { required: true }) : {}),
        ...rest,
    };

    return (
        <div>
            {label && (
                <Label htmlFor={name} className={className}>
                    {label}
                </Label>
            )}
            <select
                {...selectProps}
                className={`w-full px-3 py-2 border border-gray-300 bg-white text-text-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${className}`}
            >
                <option value="" enabled>
                    Selecciona una opción
                </option>
                {options.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
