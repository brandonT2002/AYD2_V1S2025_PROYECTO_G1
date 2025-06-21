import { useState, useEffect } from "react";

const useNavigation = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const closeAllDropdowns = () => {
        setActiveDropdown(null);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Cerrar dropdowns al hacer click fuera
    useEffect(() => {
        const handleClickOutside = () => {
            closeAllDropdowns();
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                closeAllDropdowns();
                closeMobileMenu();
            }
        };

        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    // Cerrar menú móvil cuando cambie el tamaño de pantalla
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                // lg breakpoint
                closeMobileMenu();
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {
        activeDropdown,
        isMobileMenuOpen,
        toggleDropdown,
        closeAllDropdowns,
        toggleMobileMenu,
        closeMobileMenu,
    };
};

export default useNavigation;
