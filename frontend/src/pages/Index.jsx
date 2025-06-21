import {
    Title,
    InputField,
    SelectInput,
    TitlePanel,
    IconButton,
    DatePicker,
} from "../components/ui";
import { SendSelectorProvider } from "../components/ui/SendSelector/context/SendSelectorContext";
//"../context/SendSelectorContext";
import { Panel } from "../components/layout";
import { RiInputMethodFill } from "react-icons/ri";
import { useSelectInput } from "../components/ui/SelectInput";
import { ButtonVariant, ButtonSize } from "../components/ui/Button/config";

import { SendSelectorDemo } from "../components/ui/SendSelector/index";
import { CgMenuGridR } from "react-icons/cg";
import { ImSearch } from "react-icons/im";
import { FiPackage } from "react-icons/fi";

import SimplePicker from "../components/ui/DatePicker/SimplePicker";
import {
    requestBuscarVentas,
    requestRegistrarSalida,
} from "../services/bajaBodega";

import { set, useForm } from "react-hook-form";
import { data } from "react-router-dom";
import { useState } from "react";

function IndexPage() {
    const genero = useSelectInput("");
    const handleSearch = () => console.log("Search action triggered");
    const { register, handleSubmit, reset } = useForm();
    const [date, setDate] = useState("");
    //otro userform para el formulario de registro de salida
    const { register: registerExitForm, handleSubmit: handleSubmitExit } =
        useForm();
    const [sells, setSells] = useState([]);

    const [selectedId, setSelectedId] = useState(null);

    const searchSells = async (searchTerm) => {
        try {
            const response = await requestBuscarVentas(searchTerm);
            console.log("Ventas encontradas:", response.data.data);
            setSells(response.data.data);
        } catch (error) {
            console.error("Error al buscar ventas:", error);
        }
    };

    const registerExit = async (data) => {
        if (!selectedId) {
            console.error("No se ha seleccionado un envío");
            return;
        }

        const exitData = {
            venta_id: selectedId,
            fecha_salida: date,
        };

        try {
            console.log("Datos de salida registrados:", exitData);
            const response = await requestRegistrarSalida(exitData);
            console.log("Respuesta del servidor:", response.data);
            reset();
            setSelectedId(null);
            setDate("");
            setSells([]);
        } catch (error) {
            console.error("Error al registrar la salida:", error);
        }
    };

    return (
        <SendSelectorProvider>
            <div className="flex flex-col bg-gray-100 gap-3">
                <Title>Registrar Salida</Title>
                <Panel>
                    <TitlePanel>Buscar Venta</TitlePanel>
                    <form
                        className="flex gap-3 w-full justify-between"
                        onSubmit={handleSubmit((data) => searchSells(data))}
                    >
                        <SelectInput
                            name="criterio"
                            label="Buscar Por"
                            icon={CgMenuGridR}
                            register={register}
                            className={"text-text-second font-semibold"}
                            options={[
                                { value: "envio", label: "Número de envío" },
                                {
                                    value: "cliente",
                                    label: "Nombre de cliente",
                                },
                            ]}
                            {...genero.bind}
                        />
                        <InputField
                            name="valor"
                            label="Termino de Búsqueda"
                            register={register}
                            placeholder="Ingrese término"
                            className={"text-text-second font-bold"}
                            icon={FiPackage}
                        />

                        <div className="flex items-end mb-1">
                            <IconButton
                                type="submit"
                                icon={ImSearch}
                                variant={ButtonVariant.PRIMARY}
                                onClick={handleSearch}
                                size={ButtonSize.MD}
                            >
                                Buscar
                            </IconButton>
                        </div>
                    </form>
                </Panel>
                <Panel className="overflow-visible">
                    <TitlePanel>Resultados de Búsqueda</TitlePanel>
                    <div>
                        <SendSelectorDemo
                            envios={sells}
                            onSelectChange={(id) => setSelectedId(id)}
                        />
                    </div>
                </Panel>
                <Panel>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmitExit(registerExit)}
                    >
                        <div className="flex flex-col">
                            <DatePicker
                                id="fechaNacimiento"
                                name="fecha_nacimiento"
                                label="Fecha de Salida"
                                register={registerExitForm}
                                onDateChange={(date) => setDate(date)}
                                isRequired={true}
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
                                type="submit"
                                variant={ButtonVariant.PRIMARY}
                                onClick={handleSearch}
                                size={ButtonSize.MD}
                            >
                                Guardar
                            </IconButton>
                        </div>
                    </form>
                </Panel>
            </div>
        </SendSelectorProvider>
    );
}

export default IndexPage;
