import { Label, BaseInput } from "./components";

const InputField = ({
    name,
    label,
    icon,
    isRequired,
    register,
    value,
    onChange,
    className,
    ...rest
}) => {
    const inputProps = {
        id: name,
        ...(register ? register(name, { required: isRequired }) : {}),
        ...(value !== undefined ? { value } : {}),
        ...(onChange ? { onChange } : {}),
        icon,
        ...rest,
    };

    return (
        <div className="w-full">
            {label && (
                <Label
                    htmlFor={name}
                    className={className}
                    isRequired={isRequired}
                >
                    {label}
                </Label>
            )}
            <BaseInput {...inputProps} />
        </div>
    );
};
export default InputField;
