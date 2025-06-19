import { useCallback } from "react";

export const useButtonAction = (onAction) => {
    const handleAction = useCallback(
        (event) => {
            if (onAction) {
                onAction(event);
            }
        },
        [onAction]
    );

    return { handleAction };
};
