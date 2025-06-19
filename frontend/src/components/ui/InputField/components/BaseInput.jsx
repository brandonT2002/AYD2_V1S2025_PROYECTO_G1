const BaseInput = ({
    icon: Icon,
    className = "",
    leftPadding = "pl-10",
    children,
    ...inputProps
}) => (
    <div className="relative">
        {Icon && (
            <Icon className="w-6 h-6 text-gray-400 absolute left-3 top-2.5 pointer-events-none " />
        )}
        <input
            {...inputProps}
            className={`w-full ${leftPadding} pr-12 py-2 bg-panel-dark rounded-sm
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none border-2 border-border-second
                ${className}`}
        />
        {children}
    </div>
);

export default BaseInput;
