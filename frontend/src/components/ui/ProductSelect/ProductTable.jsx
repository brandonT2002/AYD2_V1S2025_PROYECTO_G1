import { FaRegTrashCan } from "react-icons/fa6";

const ProductTable = ({ selectedProducts, onRemoveProduct }) => {
    const total = selectedProducts.reduce(
        (sum, product) => sum + product.subtotal,
        0
    );

    if (selectedProducts.length === 0) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-sm border-2 mt-6 border-border-second">
                <h3 className="text-lg font-semibold mb-2">
                    Resumen de Productos
                </h3>
                <p className="text-gray-500 text-center py-8">
                    No hay productos seleccionados
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg border-2 mt-6 border-border-second">
            <h3 className="text-lg font-semibold mb-4">Resumen de Productos</h3>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#eef0f4] sticky top-0">
                        <tr className="border-b bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                Código
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                Producto
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                Cantidad
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                Precio Unit.
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                Unidades por{" "}
                                {selectedProducts[0]?.unidadMedida || "Unidad"}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                Subtotal
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {selectedProducts.map((product) => (
                            <tr
                                key={product.id}
                                className="hover:bg-gray-100 transition-colors duration-150"
                            >
                                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap font-mono font-bold">
                                    {product.codigo}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{product.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                                    {product.quantity} {product.unidadMedida}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                                    Q{product.unitPrice.toFixed(2)}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                                    {product.unitsQuantity} unidades
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                                    Q{product.subtotal.toFixed(2)}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
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

            <div className="flex justify-end items-center mt-4 pt-4 border-t border-gray-500">
                <div className="text-lg font-semibold">
                    Total: Q{total.toFixed(2)}
                </div>
            </div>
        </div>
    );
};
export default ProductTable;
