import React from "react";
import { useForm } from "react-hook-form";

// Componente Observaciones reutilizable
const ObservacionesField = ({
    register,
    name = "observaciones",
    placeholder = "Placeholder",
    error,
    label = "Observaciones",
    required = false,
    rows = 4,
    maxLength = 500,
    className = "",
}) => {
    return (
        <div className={`w-full ${className}`}>
            <label
                htmlFor={name}
                className="font-semibold text-text-base mb-3 block"
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="relative">
                <textarea
                    id={name}
                    {...register(name, {
                        required: required ? `${label} es requerido` : false,
                        maxLength: maxLength
                            ? {
                                  value: maxLength,
                                  message: `Máximo ${maxLength} caracteres`,
                              }
                            : undefined,
                    })}
                    placeholder={placeholder}
                    rows={rows}
                    maxLength={maxLength}
                    className={`
            w-full px-3 py-2 border rounded-md shadow-sm resize-none
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            placeholder-gray-400 text-gray-900
            ${
                error
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
            }
            ${error ? "bg-red-50" : "bg-white"}
            hover:border-gray-400 transition-colors duration-200
          `}
                />
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default ObservacionesField;
