export const ButtonVariant = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    SUCCESS: "success",
    DANGER: "danger",
};

export const ButtonSize = {
    SM: "sm",
    MD: "md",
    LG: "lg",
    FULL: "full",
};

export const IconPosition = {
    LEFT: "left",
    RIGHT: "right",
    ONLY: "only",
};

export const buttonStyles = {
    base: "font-bold inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
    variants: {
        [ButtonVariant.PRIMARY]:
            "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
        [ButtonVariant.SECONDARY]:
            "hover:bg-gray-700 focus:ring-gray-500 text-gray-500 border-2 border-gray-600 hover:text-white font-bold",
        [ButtonVariant.SUCCESS]:
            "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
        [ButtonVariant.DANGER]:
            "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    },
    sizes: {
        [ButtonSize.SM]: "px-3 py-2 text-sm gap-1.5",
        [ButtonSize.MD]: "px-4 py-3 text-sm gap-2",
        [ButtonSize.LG]: "px-6 py-3 text-base gap-2.5",
        [ButtonSize.FULL]: "w-full px-4 py-3 text-sm gap-2",
    },
    states: {
        disabled: "opacity-50 cursor-not-allowed",
        enabled: "cursor-pointer active:scale-95",
    },
};
