import { Label } from "../InputField/components";

const SelectInput = ({ name, label, className, isRequired, options = [], icon: Icon, ...rest }) => {
    const baseClass = `w-full pr-12 py-2.5 bg-panel-dark text- rounded-sm 
    focus:border-blue-500 focus:ring-1 focus:ring-blue-50/10 focus:outline-none border-2 border-border-second`;

    return (
        <div className="w-full">
            {label && <Label htmlFor={name} className={className} isRequired={isRequired}>{label}</Label>}
            <div className="relative">
                {Icon && (
                    <Icon className="w-5 h-5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                )}
                <select
                    id={name}
                    name={name}
                    className={`pl-10 ${baseClass}`}
                    {...rest}
                >
                    <option value="" disabled hidden>
                        -- Selecciona una opción --
                    </option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectInput;
