const Label = ({ htmlFor, children, className = "", ...rest }) => (
    <label
        htmlFor={htmlFor}
        className={`block text-gray-300 mb-1  ${className}`}
        {...rest}
    >
        {children}
    </label>
);

export default Label;
