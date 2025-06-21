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
import { useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { PiListNumbersDuotone } from "react-icons/pi";
import { FiPackage } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { PiPencilLineLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { requestGetProductos } from "../services/inventario";

import { set, useForm } from "react-hook-form";

function Inventory() {
    const handleSearch = () => console.log("Search action triggered");
    const { register, handleSubmit, reset, setValue } = useForm(); // <--- Get setValue from useForm
    const [dateDuca, setDateDuca] = useState("");
    const [dateDucaRectificada, setDateDucaRectificada] = useState("");
    const [dateRecepcion, setDateRecepcion] = useState("");

    const ingresarInventario = async (data) => {
        //usar los useState para las fechas
        data.fechaDuca = dateDuca;
        data.fechaDucaRectificada = dateDucaRectificada;
        data.fechaRecepcion = dateRecepcion;

        console.log("Datos del inventario:", data);
    };

    const productos = [
        { value: "producto1", label: "Producto 1" },
        { value: "producto2", label: "Producto 2" },
        { value: "producto3", label: "Producto 3" },
        { value: "producto4", label: "Producto 4" },
        { value: "producto5", label: "Producto 5" },
    ];

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
                            name="producto"
                            label="Producto"
                            options={productos}
                            register={register}
                            className={"text-text-base font-semibold"}
                            isRequired={true}
                            icon={CgMenuGridR}
                        />
                        <DatePicker
                            id="fechaRecepcion"
                            name={"fechaRecepcion"}
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
                            name="cantidad"
                            label="Cantidad en fardos/paquetes"
                            type="number"
                            placeholder="Ingrese cantidad"
                            className={"text-text-base font-semibold"}
                            isRequired={true}
                            register={register}
                            icon={PiListNumbersDuotone}
                        />
                        <InputField
                            name="unidades"
                            label="Unidades por fardo/paquete"
                            placeholder="Ingrese unidades"
                            className={"text-text-base font-semibold"}
                            isRequired={true}
                            register={register}
                            icon={FiPackage}
                        />
                        <InputField
                            name="unidadesTotales"
                            label="Unidades Totales"
                            placeholder="Ingrese unidades totales"
                            className={"text-text-base font-semibold"}
                            isRequired={false}
                            register={register}
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
                            register={register}
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
                            register={register}
                        />
                        <DatePicker
                            label="Fecha de DUCA"
                            name="fechaDuca"
                            isRequired={true}
                            onDateChange={(date) => setDateDuca(date)}
                            register={register}
                            setValue={setValue}
                        />
                        <InputField
                            name="noDucaRec"
                            label="Número de DUCA rectificada"
                            placeholder="Ingrese número de DUCA rectificada"
                            className={"text-text-base font-semibold"}
                            register={register}
                            icon={FiPackage}
                        />
                        <DatePicker
                            label="Fecha de DUCA rectificada"
                            name="fechaDucaRectificada"
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
