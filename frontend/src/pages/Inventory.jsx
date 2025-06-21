import {
    Title,
    InputField,
    SelectInput,
    TitlePanel,
    IconButton,
    DatePicker,
} from "../components/ui";
import { ButtonVariant, ButtonSize } from "../components/ui/Button/config";

import { Panel } from "../components/layout";

import { CgMenuGridR } from "react-icons/cg";
import { PiListNumbersDuotone } from "react-icons/pi";
import { FiPackage } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { PiPencilLineLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { requestGetProductos } from "../services/inventario";

function Inventory() {
    const handleSearch = () => console.log("Search action triggered");
    const [products, setProducts] = useState([
        { value: "0", label: "Cargando..." },
    ]);

    const getProducts = async () => {
        try {
            const response = await requestGetProductos();
            console.log("Productos obtenidos:", response.data);
            const productOptions = response.data.map((product) => ({
                value: product.id,
                label: product.nombre,
            }));
            console.log("Opciones de productos:", productOptions);
            setProducts(productOptions);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="flex flex-col bg-gray-100 gap-3">
            <Title>Recepción de Mercancía</Title>
            <Panel>
                <div className="flex gap-3">
                    <SelectInput
                        name="producto"
                        label="Producto"
                        options={products}
                        className={"text-text-base font-semibold"}
                        isRequired={true}
                        icon={CgMenuGridR}
                    />
                    <DatePicker
                        label="Fecha de Recepción"
                        isRequired={true}
                        onDateChange={(date) => console.log(date)}
                        position="top"
                    />
                </div>
                <div className="flex gap-3">
                    <InputField
                        name="cantidad"
                        label="Cantidad en fardos/paquetes"
                        type="number"
                        placeholder="Ingrese cantidad"
                        className={"text-text-base font-semibold"}
                        isRequired={true}
                        icon={PiListNumbersDuotone}
                    />
                    <InputField
                        name="unidades"
                        label="Unidades por fardo/paquete"
                        placeholder="Ingrese unidades"
                        className={"text-text-base font-semibold"}
                        isRequired={true}
                        icon={FiPackage}
                    />
                    <InputField
                        name="unidadesTotales"
                        label="Unidades Totales"
                        placeholder="Ingrese unidades totales"
                        className={"text-text-base font-semibold"}
                        isRequired={false}
                        icon={PiPencilLineLight}
                    />
                </div>
                <div className="flex gap-3">
                    <InputField
                        name="noContenedor"
                        label="Número de Contenedor"
                        placeholder="Ingrese número de contenedor"
                        className={"text-text-base font-semibold"}
                        isRequired={true}
                        icon={FiEdit}
                    />
                </div>
                <div className="flex gap-3">
                    <InputField
                        name="noDuca"
                        label="Número de DUCA"
                        placeholder="Ingrese número de DUCA"
                        className={"text-text-base font-semibold"}
                        isRequired={true}
                        icon={FiPackage}
                    />
                    <DatePicker
                        label="Fecha de DUCA"
                        isRequired={true}
                        onDateChange={(date) => console.log(date)}
                    />
                    <InputField
                        name="noDucaRec"
                        label="Número de DUCA rectificada"
                        placeholder="Ingrese número de DUCA rectificada"
                        className={"text-text-base font-semibold"}
                        icon={FiPackage}
                    />
                    <DatePicker
                        label="Fecha de DUCA rectificada"
                        onDateChange={(date) => console.log(date)}
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <IconButton
                        variant={ButtonVariant.SECONDARY}
                        onClick={handleSearch}
                        size={ButtonSize.MD}
                    >
                        Cancelar
                    </IconButton>
                    <IconButton
                        variant={ButtonVariant.PRIMARY}
                        onClick={handleSearch}
                        size={ButtonSize.MD}
                    >
                        Guardar
                    </IconButton>
                </div>
            </Panel>
        </div>
    );
}

export default Inventory;
