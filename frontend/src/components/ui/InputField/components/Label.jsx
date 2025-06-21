const Label = ({ htmlFor, isRequired ,children, className = "", ...rest }) => (
    <label
        htmlFor={htmlFor}
        className={`block text-gray-300 mb-1  ${className}`}
        {...rest}
    >
        {children}
        {isRequired && <span className="text-red-500">*</span>}
    </label>
);

export default Label;
