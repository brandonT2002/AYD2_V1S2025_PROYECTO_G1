import { FiPackage } from "react-icons/fi";
import { FaRegUserCircle, FaRegCalendar } from "react-icons/fa";
import { useSendSelectorContext } from "../context/SendSelectorContext";

export const SendCard = ({ envio, onSelect, onSelectCobro }) => {
    const {
        id,
        numero_envio,
        nombre_negocio,
        vendedor_nombre,
        vendedor_apellido,
        dte_numero,
        fecha_venta,
        dte_nit,
        tipo_pago,
        dte_nombre,
        fecha_salida_bodega,
        dias_credito,
        total_quetzales,
        estado_venta = "Vigente",
        dias_restantes,
        estado_cobro,
        pagado,
        nombre_contacto,
    } = envio;

    const { selectEnvio, isSelected } = useSendSelectorContext();
    const selected = isSelected(id);

    const handleClick = () => {
        // console.log("Envío seleccionado:", envio);
        selectEnvio(envio);
        if (onSelect) onSelect(id);
        if (onSelectCobro) onSelectCobro({
            diasCredito: dias_restantes,
            pagado: pagado,
            total: total_quetzales,
            pendiente: total_quetzales - pagado,
            currentPagado: pagado,
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <div
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="radio"
            aria-checked={selected}
            aria-labelledby={`envio-${id}-label`}
            className={`
        relative cursor-pointer rounded-lg border p-4 transition-all
        ${
            selected
                ? "border-blue-500 bg-blue-50 shadow-lg focus:ring-blue-500"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
        }
        focus:outline-none focus:ring-1
      `}
        >
            {/* círculo de selección */}
            <span
                className={`
          absolute top-3 right-3 h-4 w-4 rounded-full border-2
          ${
              selected
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300 bg-white"
          }
        `}
            >
                {selected && (
                    <span className="block h-full w-full scale-50 rounded-full bg-white" />
                )}
            </span>

            <div className="flex items-start justify-between pr-6">
                <div className="flex items-center space-x-3">
                    <div
                        className={`rounded-lg p-2 ${
                            selected ? "bg-blue-100" : "bg-gray-100"
                        }`}
                    >
                        <FiPackage
                            className={`h-5 w-5 ${
                                selected ? "text-blue-600" : "text-gray-600"
                            }`}
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                            <span
                                id={`envio-${id}-label`}
                                className={`text-sm font-medium ${
                                    selected ? "text-blue-900" : "text-gray-900"
                                }`}
                            >
                                {numero_envio}
                            </span>
                            <span
                                className={`
                  inline-flex items-center rounded-full px-3 py-1 text-xs font-bold
                  ${
                      estado_cobro === "Pagado"
                          ? selected
                              ? "bg-green-200 text-green-800"
                              : "bg-green-100 text-green-700"
                          : estado_cobro === "Pendiente"
                          ? selected
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                  }
                `}
                            >
                                {estado_cobro}
                            </span>
                        </div>

                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <FaRegUserCircle className="h-4 w-4" />
                            <span>
                                {nombre_negocio} - {nombre_contacto}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div
                        className={`text-lg font-bold ${
                            selected ? "text-blue-600" : "text-gray-900"
                        }`}
                    >
                        Q {Number(total_quetzales).toFixed(2)}
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <FaRegCalendar className="h-4 w-4" />
                        <span>
                            {new Date(fecha_salida_bodega).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
