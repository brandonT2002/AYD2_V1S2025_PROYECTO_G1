import { IconButton } from "../components/ui";
import { ButtonVariant, ButtonSize } from "../components/ui/Button/config";
import { MdOutlineMailOutline, MdOutlineLock } from "react-icons/md";
import imagenFondo from "../assets/unnamed.png";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const { register, handleSubmit } = useForm();
    const { login, user, errors: loginErrors } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        login(data);
    });

    useEffect(() => {
        loginErrors.forEach((message) => {
            toast.error(`${message.error}`, { duration: 2000 });
        });
    });

    useEffect(() => {
        if (user.rol_id == 1) navigate("/inventario");
        else if (user.rol_id == 2) navigate("/ventas");
        else if (user.rol_id == 3) navigate("/inventario");
    }, [user]);

    return (
        <div className="w-full flex flex-col lg:flex-row h-auto min-h-[97vh]">
            <div
                className="w-full lg:w-3/5 h-64 lg:h-auto lg:aspect-auto bg-cover bg-center rounded-2xl"
                style={{ backgroundImage: `url(${imagenFondo})` }}
            ></div>

            <div className="w-full lg:w-2/5 flex flex-col items-center justify-center bg-[#eef0f4] px-6 py-10">
                <div className="flex items-center gap-3 mb-8 w-full justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2.1em"
                        viewBox="0 0 256 256"
                    >
                        <path
                            fill="#2E60FA"
                            d="m223.68 66.15l-88-48.15a15.88 15.88 0 0 0-15.36 0l-88 48.17a16 16 0 0 0-8.32 14v95.64a16 16 0 0 0 8.32 14l88 48.17a15.88 15.88 0 0 0 15.36 0l88-48.17a16 16 0 0 0 8.32-14V80.18a16 16 0 0 0-8.32-14.03M128 32l80.35 44l-29.78 16.29l-80.35-44Zm0 88L47.65 76l33.91-18.57l80.35 44Zm88 55.85l-80 43.79v-85.81l32-17.51V152a8 8 0 0 0 16 0v-44.44l32-17.51v85.76Z"
                        />
                    </svg>
                    <span className="text-base font-bold">IMPORCOMGUA</span>
                </div>
                <form
                    className="w-full max-w-sm rounded-xl flex flex-col justify-center"
                    onSubmit={onSubmit}
                >
                    <h2 className="text-2xl font-bold w-full text-center">
                        ¡Bienvenido!
                    </h2>
                    <p className="text-sm text-gray-500 mb-6 text-center">
                        Ingresa a tu cuenta para continuar
                    </p>
                    <div className="mb-4">
                        <label className="text-sm font-semibold block mb-1">
                            Correo
                        </label>
                        <div className="flex items-center border rounded-md px-2 border-gray-400">
                            <MdOutlineMailOutline
                                className="text-gray-500 mr-1"
                                size={22}
                            />
                            <input
                                type="email"
                                name="correo"
                                placeholder="usuario@correo.com"
                                className="w-full p-2 outline-none"
                                {...register("email", {
                                    required: "El correo es obligatorio",
                                })}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="text-sm font-semibold block mb-1">
                            Contraseña
                        </label>
                        <div className="flex items-center border rounded-md px-2 border-gray-400">
                            <MdOutlineLock
                                className="text-gray-500 mr-1"
                                size={22}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="********"
                                className="w-full p-2 outline-none"
                                required
                                {...register("password", {
                                    required: "La contraseña es obligatoria",
                                })}
                            />
                        </div>
                    </div>
                    <IconButton
                        type="submit"
                        variant={ButtonVariant.PRIMARY}
                        size={ButtonSize.FULL}
                    >
                        Iniciar Sesión
                    </IconButton>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
