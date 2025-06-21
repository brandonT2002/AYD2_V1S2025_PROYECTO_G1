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
                label: "Proveedores",
                to: "/mantenimiento/proveedores",
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
        label: "Cobranzas",
        to: "/cobranzas",
    },
];
