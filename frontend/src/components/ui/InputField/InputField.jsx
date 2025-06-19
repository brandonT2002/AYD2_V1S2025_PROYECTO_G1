import { Label, BaseInput } from "./components";

const InputField = ({ name, label, icon, register, className, ...rest }) => {
    const inputProps = {
        id: name,
        ...(register ? register(name, { required: true }) : {}),
        icon,
        ...rest,
    };

    return (
        <div className="w-full">
            {label && (
                <Label htmlFor={name} className={className}>
                    {label}
                </Label>
            )}
            <BaseInput {...inputProps} />
        </div>
    );
};

export default InputField;
