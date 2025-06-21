import { useButtonStyles, useButtonAction } from "./hooks";
import { ButtonVariant, ButtonSize, IconPosition } from "./config";

const Button = ({
    children,
    className = "",
    variant = ButtonVariant.PRIMARY,
    size = ButtonSize.MD,
    onClick,
    disabled = false,
    type = "button",
    // Icon props
    icon: IconComponent,
    iconSize = 20,
    iconPosition = IconPosition.LEFT,
    ...props
}) => {
    const { getStyles } = useButtonStyles();
    const { handleAction } = useButtonAction(onClick);

    const buttonClassName = getStyles(variant, size, disabled, className);

    const renderIcon = () =>
        IconComponent ? <IconComponent size={iconSize} /> : null;

    const renderContent = () => {
        if (!IconComponent) return children;

        if (iconPosition === IconPosition.ONLY) return renderIcon();
        if (iconPosition === IconPosition.RIGHT)
            return (
                <>
                    {children}
                    {renderIcon()}
                </>
            );
        return (
            <>
                {renderIcon()}
                {children}
            </>
        );
    };

    return (
        <button
            type={type}
            className={buttonClassName}
            onClick={handleAction}
            disabled={disabled}
            {...props} // solo props válidos como id, aria, etc.
        >
            {renderContent()}
        </button>
    );
};

export default Button;
