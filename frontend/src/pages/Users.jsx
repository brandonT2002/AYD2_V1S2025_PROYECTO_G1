import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPackage, FiBox, FiHash } from "react-icons/fi";
import { MdNumbers, MdOutlineAttachMoney } from "react-icons/md";
import { RiEdit2Fill, RiDeleteBin5Fill } from "react-icons/ri";
import { ImSearch } from "react-icons/im";
import { toast } from "sonner";
import {
    requestGetUsuarios,
    requestInsertarUsuario,
    requestActualizarUsuario,
    requestEliminarUsuario,
} from "../services/users";

export default function UsersPage() {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            correo: "",
            id: "",
            nombre: "",
            rol: "",
            rol_id: "",
        },
    });

    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await requestGetUsuarios();
            setUsuarios(res.data.usuarios);
        } catch (err) {
            console.error("Error al cargar productos:", err);
        }
    };

    const onSubmit = async (data) => {
        try {
            const userData = {
                email: data.email,
                id: data.id,
                password: data.password,
                nombre: data.nombre,
                rol: data.rol,
            };

            if (isEditing) {
                await requestActualizarUsuario(editingId, userData);
            } else {
                await requestInsertarUsuario(userData);
            }

            await loadUsers();
            reset();
            setEditingId(null);
            setIsEditing(false);
            toast.success("Usuario guardado exitosamente");
        } catch (err) {
            console.error("Error al guardar Usuario:", err);
            toast.error("No se pudo guardar el usuario. Verifica los datos.");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Estás seguro de eliminar este producto?")) return;
        try {
            await requestEliminarUsuario(id);
            await loadUsers();
            toast.success("Usuario eliminado exitosamente");
        } catch (err) {
            console.error("Error al eliminar usuario:", err);
            toast.error("No se pudo eliminar el usuario. Inténtalo de nuevo.");
        }
    };

    const handleEdit = (user) => {
        setIsEditing(true);
        setEditingId(user.id);
        setValue("email", user.correo);
        setValue("nombre", user.nombre);
        setValue("rol", user.rol_id);
        // setValue("password", user.password);
    };

    const handleCancel = () => {
        reset();
        setIsEditing(false);
        setEditingId(null);
    };

    const usuariosFiltrados = usuarios.filter(
        (p) =>
            p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            p.correo.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-2">
                {editingId ? "Editar Usuario" : "Nuevo Usuario"}
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl border border-border-dark"
            >
                <div className="col-span-1">
                    <label className="text-sm font-semibold block mb-1">
                        Correo
                    </label>
                    <div className="flex items-center border rounded-md px-2 border-border-second">
                        <MdOutlineAttachMoney className="text-gray-500 mr-2" />
                        <input
                            type="email"
                            step="0.01"
                            {...register("email", {
                                required: "El precio unitario es requerido",
                                min: {
                                    value: 0.01,
                                    message: "El precio debe ser mayor a 0",
                                },
                            })}
                            placeholder="Ingrese correo del usuario"
                            className="w-full p-2 outline-none"
                        />
                    </div>
                    {errors.precio_unitario && (
                        <span className="text-red-500 text-xs">
                            {errors.precio_unitario.message}
                        </span>
                    )}
                </div>

                <div>
                    <label className="text-sm font-semibold block mb-1">
                        Nombre
                    </label>
                    <div className="flex items-center border rounded-md px-2 border-border-second">
                        <FiBox className="text-gray-500 mr-2" />
                        <input
                            {...register("nombre", {
                                required: "El nombre del producto es requerido",
                            })}
                            placeholder="Ingrese nombre del usuario"
                            className="w-full p-2 outline-none"
                        />
                    </div>
                    {errors.nombre && (
                        <span className="text-red-500 text-xs">
                            {errors.nombre.message}
                        </span>
                    )}
                </div>

                <div>
                    <label className="text-sm font-semibold block mb-1">
                        Rol
                    </label>
                    <div className="flex items-center border rounded-md px-2 border-border-second">
                        <FiPackage className="text-gray-500 mr-2" />
                        <select
                            {...register("rol", {
                                required: "El rol es requerido",
                            })}
                            className="w-full p-2 outline-none"
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="1">Gerencia General</option>
                            <option value="2">
                                Gerente de Ventas y Finanzas
                            </option>
                            <option value="3">Gerente de Inventario</option>
                        </select>
                    </div>
                    {errors.unidad_medida && (
                        <span className="text-red-500 text-xs">
                            {errors.unidad_medida.message}
                        </span>
                    )}
                </div>

                <div>
                    <label className="text-sm font-semibold block mb-1">
                        Contraseña
                    </label>
                    <div className="flex items-center border rounded-md px-2 border-border-second">
                        <MdNumbers className="text-gray-500 mr-2" />
                        <input
                            type="password"
                            {...register("password", {
                                required: !isEditing
                                    ? "La contraseña es obligatoria"
                                    : false,
                                min: {
                                    value: 1,
                                    message: "Debe ser mayor a 0",
                                },
                            })}
                            placeholder="Ingrese contraseña del usuario"
                            className="w-full p-2 outline-none"
                        />
                    </div>
                    {errors.unidades_por_paquete && (
                        <span className="text-red-500 text-xs">
                            {errors.unidades_por_paquete.message}
                        </span>
                    )}
                </div>

                <div className="col-span-2 flex justify-end gap-2 mt-2">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 rounded border hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
                    >
                        {isEditing ? "Actualizar" : "Guardar"}
                    </button>
                </div>
            </form>

            <h2 className="text-2xl font-bold">Usuarios</h2>
            <div className="bg-white p-4 rounded-md border-2 border-border-dark">
                <label className="text-sm font-semibold block mb-1">
                    Buscar Usuario
                </label>
                <div className="flex items-center border rounded-md px-2 mb-4 border-border-second">
                    <ImSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o correo..."
                        className="w-full p-2 outline-none"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {usuariosFiltrados.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow  hover:bg-gray-50"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6 text-gray-600"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-900">
                                            {p.nombre}
                                        </h3>
                                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded font-bold">
                                            {p.rol || "USER"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(p)}
                                        className="p-2 text-blue-600 bg-blue-200 hover:bg-blue-300 rounded-md transition-colors cursor-pointer"
                                        title="Editar contacto"
                                    >
                                        <RiEdit2Fill size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="p-2 text-red-600 bg-red-200 hover:bg-red-300 rounded-md transition-colors cursor-pointer"
                                        title="Eliminar contacto"
                                    >
                                        <RiDeleteBin5Fill size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex">
                                    <span className="text-sm font-medium text-gray-700 w-24">
                                        Nombre:
                                    </span>
                                    <span className="text-sm text-gray-900">
                                        {p.nombre}
                                    </span>
                                </div>

                                <div className="flex">
                                    <span className="text-sm font-medium text-gray-700 w-24">
                                        Correo:
                                    </span>
                                    <span className="text-sm text-gray-900">
                                        {p.correo}
                                    </span>
                                </div>

                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
