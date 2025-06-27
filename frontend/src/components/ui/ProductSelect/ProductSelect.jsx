import { useState } from "react";
import { LuPackage2 } from "react-icons/lu";
import { toast } from "sonner";

const ProductSelector = ({ products, onAddProduct }) => {
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const [notes, setNotes] = useState("");

    const handleProductSelect = (productId) => {
        setSelectedProduct(productId);
    };

    const handleAddProduct = () => {
        if (!selectedProduct || !quantity) {
            toast.error("Por favor, selecciona un producto y una cantidad.");
            return;
        }

        const product = products.find(
            (p) => p.id === parseInt(selectedProduct)
        );
        const totalPrice =
            parseFloat(quantity) * parseFloat(product.precio_unidad);

        const newProduct = {
            id: Date.now(),
            productId: product.id,
            codigo: product.codigo,
            name: product.nombre,
            quantity: parseFloat(quantity),
            unitPrice: parseFloat(product.precio_unidad),
            unitsQuantity: product.unidades_por_fardo,
            unidadMedida: product.unidad_medida,
            pricePerBundle: totalPrice,
            subtotal: totalPrice,
            notes: notes,
        };

        onAddProduct(newProduct);

        setSelectedProduct("");
        setQuantity("");
        setNotes("");
    };

    const selectedProductData = products.find(
        (p) => p.id === parseInt(selectedProduct)
    );

    return (
        <div className="bg-white p-4 border-2 border-border-second rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* Selector de Producto */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Producto
                    </label>
                    <select
                        value={selectedProduct}
                        onChange={(e) => handleProductSelect(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Seleccionar producto</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.codigo} - {product.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Cantidad */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cantidad (
                        {selectedProductData?.unidad_medida || "Unidad"})
                    </label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="0"
                        min="0"
                        step="0.01"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Cantidad en unidades */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unidades por{" "}
                        {selectedProductData?.unidad_medida || "Unidad"}
                    </label>
                    <div className="w-full p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-700">
                        {selectedProductData?.unidades_por_fardo || "0"}
                    </div>
                </div>

                {/* Precio por fardo/paquete*/}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Precio por{" "}
                        {selectedProductData?.unidad_medida || "Unidad"}
                    </label>
                    <div className="w-full p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-700">
                        Q
                        {selectedProductData && quantity
                            ? (
                                  parseFloat(quantity) *
                                  parseFloat(selectedProductData.precio_unidad)
                              ).toFixed(2)
                            : "0.00"}
                    </div>
                </div>
            </div>

            {/* Información del producto */}
            {selectedProductData && (
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <LuPackage2 className="w-4 h-4 mr-1" />
                        Precio unitario: Q
                        {parseFloat(selectedProductData.precio_unidad).toFixed(
                            2
                        )}
                    </div>
                </div>
            )}

            {/* Observaciones */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Observaciones
                </label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Agregar observaciones..."
                    rows="2"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <button
                type="button"
                onClick={handleAddProduct}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
                Agregar
            </button>
        </div>
    );
};
export default ProductSelector;
