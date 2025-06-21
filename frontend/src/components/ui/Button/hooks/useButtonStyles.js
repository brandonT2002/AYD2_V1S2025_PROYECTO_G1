import { buttonStyles, ButtonVariant, ButtonSize } from "../config";

export const useButtonStyles = () => {
    const getStyles = (
        variant = ButtonVariant.PRIMARY,
        size = ButtonSize.MD,
        disabled = false,
        className = ""
    ) => {
        const variantStyle =
            buttonStyles.variants[variant] ||
            buttonStyles.variants[ButtonVariant.PRIMARY];
        const sizeStyle =
            buttonStyles.sizes[size] || buttonStyles.sizes[ButtonSize.MD];
        const stateStyle = disabled
            ? buttonStyles.states.disabled
            : buttonStyles.states.enabled;

        return `${buttonStyles.base} ${variantStyle} ${sizeStyle} ${stateStyle} ${className}`;
    };

    return { getStyles };
};
