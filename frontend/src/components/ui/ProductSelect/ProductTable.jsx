import { FaRegTrashCan } from "react-icons/fa6";

const ProductTable = ({ selectedProducts, onRemoveProduct }) => {
    const total = selectedProducts.reduce(
        (sum, product) => sum + product.subtotal,
        0
    );

    if (selectedProducts.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
                <h3 className="text-lg font-semibold mb-4">
                    Resumen de Productos
                </h3>
                <p className="text-gray-500 text-center py-8">
                    No hay productos seleccionados
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
            <h3 className="text-lg font-semibold mb-4">Resumen de Productos</h3>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="text-left p-3 font-medium text-gray-700">
                                Código
                            </th>
                            <th className="text-left p-3 font-medium text-gray-700">
                                Producto
                            </th>
                            <th className="text-left p-3 font-medium text-gray-700">
                                Cantidad
                            </th>
                            <th className="text-left p-3 font-medium text-gray-700">
                                Precio Unit.
                            </th>
                            <th className="text-left p-3 font-medium text-gray-700">
                                Unidades por{" "}
                                {selectedProducts[0]?.unidadMedida || "Unidad"}
                            </th>
                            <th className="text-left p-3 font-medium text-gray-700">
                                Subtotal
                            </th>
                            <th className="text-left p-3 font-medium text-gray-700">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedProducts.map((product) => (
                            <tr
                                key={product.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="p-3 font-mono text-sm">
                                    {product.codigo}
                                </td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">
                                    {product.quantity} {product.unidadMedida}
                                </td>
                                <td className="p-3">
                                    Q{product.unitPrice.toFixed(2)}
                                </td>
                                <td className="p-3">
                                    {product.unitsQuantity} unidades
                                </td>
                                <td className="p-3">
                                    Q{product.subtotal.toFixed(2)}
                                </td>
                                <td className="p-3">
                                    <div className="flex gap-2 ">
                                        <button
                                            onClick={() =>
                                                onRemoveProduct(product.id)
                                            }
                                            className="text-red-600 hover:text-red-800 p-1"
                                            title="Eliminar"
                                        >
                                            <FaRegTrashCan className="w-4 h-4" />
                                        </button>
                                        
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <div className="text-lg font-semibold">
                    Total: Q{total.toFixed(2)}
                </div>
            </div>
        </div>
    );
};
export default ProductTable;
