
import { useState, useEffect } from "react";
import axios from "axios";
import { FiUser, FiPhone, FiMapPin, FiPercent } from "react-icons/fi";
import { RiEdit2Fill, RiDeleteBin5Fill } from "react-icons/ri";
import { ImSearch } from "react-icons/im";
import { toast } from "sonner";

export default function Vendedores() {
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    comision: ""
  });

  const [vendedores, setVendedores] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetchVendedores();
  }, []);

  const fetchVendedores = async () => {
    try {
      const res = await axios.get("http://3.95.223.10:5000/api/GetAllVendedores");
      const transformados = res.data.map((v) => ({
        ...v,
        comision: v.Comision || "0%"
      }));
      setVendedores(transformados);
    } catch (error) {
      console.error("Error cargando vendedores:", error);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nombre: form.nombre,
      apellido: form.apellido,
      telefono: form.telefono,
      direccion: form.direccion,
      comision: `${form.comision}%`
    };

    try {
      if (form.id) {
        await axios.put(
          `http://3.95.223.10:5000/api/ActualizarVendedor/${form.id}`,
          payload
        );
      } else {
        await axios.post("http://3.95.223.10:5000/api/InsertarVendedor", payload);
      }
      fetchVendedores();
      setForm({ id: null, nombre: "", apellido: "", telefono: "", direccion: "", comision: "" });
      toast.success("Vendedor guardado exitosamente");
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este vendedor?")) return;
    try {
      await axios.delete(`http://3.95.223.10:5000/api/EliminarVendedor/${id}`);
      fetchVendedores();
      toast.success("Vendedor eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleEdit = (vendedor) => {
    setForm({
      id: vendedor.id,
      nombre: vendedor.nombre,
      apellido: vendedor.apellido,
      telefono: vendedor.telefono,
      direccion: vendedor.direccion,
      comision: vendedor.Comision ? vendedor.Comision.replace('%', '') : ""
    });
  };

  const vendedoresFiltrados = vendedores.filter((v) =>
    `${v.nombre} ${v.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-2">Nuevo Vendedor</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-xl border"
      >
        <div className="col-span-1">
          <label className="text-sm font-semibold block mb-1">Nombres *</label>
          <div className="flex items-center border rounded-md px-2">
            <FiUser className="text-gray-500 mr-2" />
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full p-2 outline-none"
              required
            />
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-sm font-semibold block mb-1">Apellidos *</label>
          <div className="flex items-center border rounded-md px-2">
            <FiUser className="text-gray-500 mr-2" />
            <input
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full p-2 outline-none"
              required
            />
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-sm font-semibold block mb-1">Teléfono *</label>
          <div className="flex items-center border rounded-md px-2">
            <FiPhone className="text-gray-500 mr-2" />
            <input
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full p-2 outline-none"
              required
            />
          </div>
        </div>

        <div className="col-span-3">
          <label className="text-sm font-semibold block mb-1">Dirección *</label>
          <textarea
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            placeholder="Placeholder"
            className="w-full p-2 border rounded-md h-24"
            required
          />
        </div>

        <div className="col-span-3">
          <label className="text-sm font-semibold block mb-1">
            Porcentaje de comisión *
          </label>
          <div className="flex items-center border rounded-md px-2">
            <FiPercent className="text-gray-500 mr-2" />
            <input
              name="comision"
              type="number"
              value={form.comision}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full p-2 outline-none"
              required
            />
          </div>
        </div>

        <div className="col-span-3 flex justify-end gap-2 mt-2">
          <button
            type="reset"
            className="px-4 py-2 rounded border"
            onClick={() =>
              setForm({
                id: null,
                nombre: "",
                apellido: "",
                telefono: "",
                direccion: "",
                comision: ""
              })
            }
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded text-white bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-bold">Vendedores</h2>
      <div className="bg-white p-4 rounded-md border">
        <label className="text-sm font-semibold block mb-1">
          Buscar Vendedor
        </label>
        <div className="flex items-center border rounded-md px-2 mb-4">
          <ImSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full p-2 outline-none"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {vendedoresFiltrados.map((v) => (
            <div
              key={v.id}
              className="bg-white border rounded-md p-4 shadow-sm"
            >
              <h3 className="font-bold text-lg">
                {v.nombre} {v.apellido}
              </h3>
              <span className="inline-block bg-gray-200 text-xs font-bold px-2 py-1 rounded mt-1 mb-2">
                {String(v.id).padStart(5, "0")}
              </span>
              <p className="text-sm"><strong>Teléfono:</strong> {v.telefono}</p>
              <p className="text-sm"><strong>Dirección:</strong> {v.direccion}</p>
              <p className="text-sm"><strong>Porcentaje de comisión:</strong> {v.comision}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleEdit(v)} className="text-blue-600"><RiEdit2Fill size={18} /></button>
                <button onClick={() => handleDelete(v.id)} className="text-red-600"><RiDeleteBin5Fill size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
