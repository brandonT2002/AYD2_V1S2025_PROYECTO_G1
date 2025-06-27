// Configuración simplificada sin roles
export const navigationItems = [
    {
        label: "Mantenimiento",
        type: "dropdown",
        items: [
            {
                label: "Productos",
                to: "/mantenimiento/productos",
            },
            {
                label: "Vendedores",
                to: "/mantenimiento/vendedores",
            },
            {
                label: "Clientes",
                to: "/mantenimiento/clientes",
            },
        ],
    },
    {
        label: "Inventario",
        to: "/inventario",
    },
    {
        label: "Ventas",
        to: "/ventas",
    },
    {
        label: "Bodega",
        to: "/bodega",
    },
    {
        label: "Pagos",
        to: "/cobranzas",
    },
];

export const getNavigationItemsForUser = (userRole) => {
    switch (userRole) {
        // Gerencia General
        case 1:
            return navigationItems;
        //Gerente de Ventas y Finanzas
        case 2:
            return navigationItems
                .map((item) => {
                    if (item.type === "dropdown") {
                        const filteredItems = item.items.filter((subItem) =>
                            ["Clientes"].includes(subItem.label)
                        );
                        if (filteredItems.length > 0) {
                            return { ...item, items: filteredItems };
                        }
                        return null;
                    }
                    if (["Ventas", "Pagos"].includes(item.label)) {
                        return item;
                    }
                    return null;
                })
                .filter(Boolean);
        //Gerente de Inventario
        case 3:
            return navigationItems
                .map((item) => {
                    if (item.type === "dropdown") {
                        const filteredItems = item.items.filter((subItem) =>
                            ["Productos"].includes(subItem.label)
                        );
                        if (filteredItems.length > 0) {
                            return { ...item, items: filteredItems };
                        }
                        return null;
                    }
                    if (["Inventario", "Bodega"].includes(item.label)) {
                        return item;
                    }
                    return null;
                })
                .filter(Boolean);
        default:
            return navigationItems;
    }
};
