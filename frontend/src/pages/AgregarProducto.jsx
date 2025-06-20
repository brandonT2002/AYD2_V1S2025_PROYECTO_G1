import React, { useState } from "react";
import {
    Title,
    InputField,
    SelectInput,
    TitlePanel,
    IconButton,
} from "../components/ui";
import { Panel } from "../components/layout";
import { ButtonVariant, ButtonSize } from "../components/ui/Button/config";
import { FiPackage } from "react-icons/fi";
import { ImSearch } from "react-icons/im";
import { RiEdit2Fill, RiDeleteBin5Fill } from "react-icons/ri";

function AgregarProducto() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        codigo: "",
        nombre: "",
        unidad: "",
        cantidad: "",
    });

    const unidades = [
        { value: "Unidad", label: "Unidad" },
        { value: "Caja", label: "Caja" },
        { value: "Litro", label: "Litro" },
    ];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleGuardar = () => {
        if (!form.codigo || !form.nombre || !form.unidad || !form.cantidad) return;
        setProductos([...productos, form]);
        setForm({ codigo: "", nombre: "", unidad: "", cantidad: "" });
    };

    const handleEliminar = (index) => {
        const copia = [...productos];
        copia.splice(index, 1);
        setProductos(copia);
    };

    return (
        <div className="flex flex-col bg-gray-100 gap-3">
            <Title>Agregar Producto</Title>

            <Panel>
                <TitlePanel>Nuevo Producto</TitlePanel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        name="codigo"
                        label="Código de Producto *"
                        placeholder="Placeholder"
                        icon={FiPackage}
                        value={form.codigo}
                        onChange={handleChange}
                    />
                    <InputField
                        name="nombre"
                        label="Nombre del Producto *"
                        placeholder="Placeholder"
                        icon={FiPackage}
                        value={form.nombre}
                        onChange={handleChange}
                    />
                    <SelectInput
                        name="unidad"
                        label="Unidad de medida *"
                        icon={FiPackage}
                        options={unidades}
                        value={form.unidad}
                        onChange={handleChange}
                    />
                    <InputField
                        name="cantidad"
                        label="Unidades por fardo/paquete *"
                        placeholder="Placeholder"
                        icon={FiPackage}
                        value={form.cantidad}
                        onChange={handleChange}
                        type="number"
                    />
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <IconButton
                        variant={ButtonVariant.SECONDARY}
                        size={ButtonSize.MD}
                        onClick={() =>
                            setForm({ codigo: "", nombre: "", unidad: "", cantidad: "" })
                        }
                    >
                        Cancelar
                    </IconButton>
                    <IconButton
                        variant={ButtonVariant.PRIMARY}
                        size={ButtonSize.MD}
                        onClick={handleGuardar}
                    >
                        Guardar
                    </IconButton>
                </div>
            </Panel>

            <Panel>
                <TitlePanel>Productos</TitlePanel>
                <InputField
                    name="buscar"
                    placeholder="Buscar Producto"
                    icon={ImSearch}
                    onChange={() => {}}
                />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {productos.map((p, i) => (
                        <div key={i} className="border p-4 rounded bg-white shadow-sm">
                            <h3 className="font-bold text-lg">{p.nombre}</h3>
                            <span className="text-xs bg-gray-200 px-2 py-1 inline-block rounded mt-1 font-semibold">
                                {p.codigo}
                            </span>
                            <p className="text-sm mt-2">Unidad de medida: {p.unidad}</p>
                            <p className="text-sm">
                                Unidades por fardo/paquete: {p.cantidad} unidades
                            </p>
                            <div className="flex gap-2 mt-3">
                                <button className="text-blue-600"><RiEdit2Fill /></button>
                                <button className="text-red-600" onClick={() => handleEliminar(i)}><RiDeleteBin5Fill /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </Panel>
        </div>
    );
}

export default AgregarProducto;
