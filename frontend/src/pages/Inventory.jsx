import {
    Title,
    InputField,
    SelectInput,
    TitlePanel,
    IconButton,
    DatePicker,
    TextArea,
} from "../components/ui";
import { ButtonVariant, ButtonSize } from "../components/ui/Button/config";

import { Panel } from "../components/layout";
import { useState, useEffect } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { PiListNumbersDuotone } from "react-icons/pi";
import { FiPackage, FiEdit } from "react-icons/fi";
import { PiPencilLineLight } from "react-icons/pi";
import {
    requestGetProductos,
    requestInsertarInventario,
} from "../services/inventario";
import { toast } from "sonner";
import { set, useForm } from "react-hook-form";

function Inventory() {
    const handleSearch = () => console.log("Search action triggered");
    const { register, handleSubmit, reset } = useForm();

    const [dateDuca, setDateDuca] = useState("");
    const [dateDucaRectificada, setDateDucaRectificada] = useState("");
    const [dateRecepcion, setDateRecepcion] = useState("");
    const [unidadesTotales, setUnidadesTotales] = useState("");
    const [value, setValue] = useState("");

    const [products, setProducts] = useState([
        { value: "0", label: "Cargando..." },
    ]);
    const [productsData, setProductsData] = useState([]);

    const getProducts = async () => {
        try {
            const response = await requestGetProductos();
            const productOptions = response.data.map((product) => ({
                value: product.id,
                label: product.nombre,
            }));
            productOptions.unshift({ value: "", label: "Seleccione un producto" });

            setProducts(productOptions);
            setProductsData(response.data);
            // toast.success("Productos cargados exitosamente");
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const calcularUnidadesTotales = (cantidadFardos, unidadesPorFardo) => {
        const cantidad = parseInt(cantidadFardos, 10);
        const unidades = parseInt(unidadesPorFardo, 10);
        if (isNaN(cantidad) || isNaN(unidades)) {
            return "";
        }
        setUnidadesTotales(cantidad * unidades);
    };

    const ingresarInventario = async (data) => {
        const inventarioData = {
            ...data,
            fecha_ingreso: dateRecepcion,
            fecha: dateDuca,
            fecha_duca_rectificada: dateDucaRectificada,
            unidades_totales: unidadesTotales,
        };

        try {
            const response = await requestInsertarInventario(inventarioData);
            toast.success("Inventario ingresado exitosamente");

            reset({
                producto_id: "",
                cantidad_fardos: "",
                unidades: "",
                unidades_totales: "",
                numero_contendor: "",
                numero_duca: "",
                numero_duca_rectificada: "",
                observaciones: "",
            });
            setDateDuca("");
            setDateDucaRectificada("");
            setDateRecepcion("");
            setUnidadesTotales("");
            setValue("");
        } catch (error) {
            console.error("Error al ingresar inventario:", error);
        }
    };

    return (
        <div className="flex flex-col bg-gray-100 gap-3">
            <Title>Recepción de Mercancía</Title>
            <Panel>
                <form
                    onSubmit={handleSubmit(ingresarInventario)}
                    className="flex flex-col gap-4"
                >
                    <div className="flex gap-3">
                        <SelectInput
                            name="producto_id"
                            label="Producto"
                            options={products}
                            register={register}
                            className={"text-text-base font-semibold"}
                            isRequired={true}
                            icon={CgMenuGridR}
                            onChange={(e) => {
                                const selectedId = parseInt(e.target.value, 10);
                                const selectedProduct = productsData.find(
                                    (p) => p.id === selectedId
                                );
                                if (selectedProduct) {
                                    setValue(
                                        selectedProduct.unidades_por_fardo
                                    );
                                    calcularUnidadesTotales(
                                        document.querySelector(
                                            'input[name="cantidad_fardos"]'
                                        ).value,
                                        selectedProduct.unidades_por_fardo
                                    );
                                }
                            }}
                        />
                        <DatePicker
                            id="fechaRecepcion"
                            name="fecha_ingreso"
                            label="Fecha de Recepción"
                            onDateChange={(date) => setDateRecepcion(date)}
                            position="top"
                            isRequired={true}
                            register={register}
                            setValue={setValue}
                        />
                    </div>
                    <div className="flex gap-3">
                        <InputField
                            name="cantidad_fardos"
                            label="Cantidad en fardos/paquetes"
                            type="number"
                            placeholder="Ingrese cantidad"
                            className={"text-text-base font-semibold"}
                            isRequired={true}
                            register={register}
                            onChange={(e) =>
                                calcularUnidadesTotales(e.target.value, value)
                            }
                            icon={PiListNumbersDuotone}
                        />
                        <InputField
                            name="unidades"
                            label="Unidades por fardo/paquete"
                            placeholder="Ingrese unidades"
                            className={"text-text-base font-semibold"}
                            isRequired={false}
                            defaultValue={value}
                            register={register}
                            icon={FiPackage}
                            readOnly
                        />
                        <InputField
                            name="unidades_totales"
                            label="Unidades Totales"
                            placeholder="Ingrese unidades totales"
                            className={"text-text-base font-semibold"}
                            isRequired={false}
                            defaultValue={unidadesTotales}
                            register={register}
                            icon={PiPencilLineLight}
                            readOnly
                        />
                    </div>
                    <div className="flex gap-3">
                        <InputField
                            name="numero_contendor"
                            label="Número de Contenedor"
                            placeholder="Ingrese número de contenedor"
                            className={"text-text-base font-semibold"}
                            isRequired={true}
                            register={register}
                            icon={FiEdit}
                        />
                    </div>
                    <div className="flex gap-3">
                        <InputField
                            name="numero_duca"
                            label="Número de DUCA"
                            placeholder="Ingrese número de DUCA"
                            className={"text-text-base font-semibold"}
                            isRequired={true}
                            register={register}
                            icon={PiListNumbersDuotone}
                        />
                        <DatePicker
                            label="Fecha de DUCA"
                            name="fecha"
                            isRequired={true}
                            onDateChange={(date) => setDateDuca(date)}
                            register={register}
                            setValue={setValue}
                        />
                        <InputField
                            name="numero_duca_rectificada"
                            label="Número de DUCA rectificada"
                            placeholder="Ingrese número de DUCA rectificada"
                            className={"text-text-base font-semibold"}
                            register={register}
                            icon={FiPackage}
                        />
                        <DatePicker
                            label="Fecha de DUCA rectificada"
                            name="fecha_duca_rectificada"
                            onDateChange={(date) =>
                                setDateDucaRectificada(date)
                            }
                            register={register}
                            setValue={setValue}
                        />
                    </div>
                    <div className="flex justify-end">
                        <TextArea
                            register={register}
                            name="observaciones"
                            label="Observaciones"
                            placeholder="Ingrese observaciones"
                            rows={4}
                            maxLength={500}
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <IconButton
                            type="button"
                            variant={ButtonVariant.SECONDARY}
                            onClick={handleSearch}
                            size={ButtonSize.MD}
                        >
                            Cancelar
                        </IconButton>
                        <IconButton
                            type="submit"
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.MD}
                        >
                            Guardar
                        </IconButton>
                    </div>
                </form>
            </Panel>
        </div>
    );
}

export default Inventory;
