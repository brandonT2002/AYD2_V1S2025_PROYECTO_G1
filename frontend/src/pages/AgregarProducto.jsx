import { useEffect, useState } from "react";
import axios from "axios";
import { FiPackage, FiBox, FiHash } from "react-icons/fi";
import { MdNumbers, MdOutlineAttachMoney } from "react-icons/md";
import { RiEdit2Fill, RiDeleteBin5Fill } from "react-icons/ri";
import { ImSearch } from "react-icons/im";

export default function AgregarProducto() {
  const [form, setForm] = useState({
    id: null,
    codigo_producto: "",
    nombre: "",
    unidad_medida: "",
    unidades_por_paquete: "",
    precio_unitario: ""
  });

  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const API = "http://localhost:5000/api";

  useEffect(() => {
    axios.get(`${API}/GetAllProductos`)
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`${API}/ActualizarProducto/${form.id}`, {
          nombre: form.nombre,
          unidad_medida: form.unidad_medida,
          unidades_por_fardo: form.unidades_por_paquete,
          precio_unidad: form.precio_unitario,
          codigo: form.codigo_producto
        });
      } else {
        await axios.post(`${API}/InsertarProducto`, {
          nombre: form.nombre,
          unidad_medida: form.unidad_medida,
          unidades_por_fardo: form.unidades_por_paquete,
          precio_unidad: form.precio_unitario,
          codigo: form.codigo_producto
        });
      }

      const res = await axios.get(`${API}/GetAllProductos`);
      setProductos(res.data);

      setForm({
        id: null,
        codigo_producto: "",
        nombre: "",
        unidad_medida: "",
        unidades_por_paquete: "",
        precio_unitario: ""
      });
    } catch (err) {
      console.error("Error al guardar producto:", err);
      alert("No se pudo guardar el producto.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      await axios.delete(`${API}/EliminarProducto/${id}`);
      const res = await axios.get(`${API}/GetAllProductos`);
      setProductos(res.data);
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      alert("No se pudo eliminar el producto.");
    }
  };

  const handleEdit = (producto) => {
    setForm({
      id: producto.id,
      codigo_producto: producto.codigo,
      nombre: producto.nombre,
      unidad_medida: producto.unidad_medida,
      unidades_por_paquete: producto.unidades_por_fardo,
      precio_unitario: producto.precio_unidad
    });
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.codigo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-2">Nuevo Producto</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl border"
      >
        <div>
          <label className="text-sm font-semibold block mb-1">
            Código de Producto *
          </label>
          <div className="flex items-center border rounded-md px-2">
            <FiHash className="text-gray-500 mr-2" />
            <input
              name="codigo_producto"
              value={form.codigo_producto}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full p-2 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">
            Nombre del Producto *
          </label>
          <div className="flex items-center border rounded-md px-2">
            <FiBox className="text-gray-500 mr-2" />
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

        <div>
          <label className="text-sm font-semibold block mb-1">
            Unidad de medida *
          </label>
          <div className="flex items-center border rounded-md px-2">
            <FiPackage className="text-gray-500 mr-2" />
            <select
              name="unidad_medida"
              value={form.unidad_medida}
              onChange={handleChange}
              className="w-full p-2 outline-none"
              required
            >
              <option value="">Opción</option>
              <option value="Unidad">Unidad</option>
              <option value="Paquete">Paquete</option>
              <option value="Fardo">Fardo</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">
            Unidades por fardo/paquete *
          </label>
          <div className="flex items-center border rounded-md px-2">
            <MdNumbers className="text-gray-500 mr-2" />
            <input
              type="number"
              name="unidades_por_paquete"
              value={form.unidades_por_paquete}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full p-2 outline-none"
              required
            />
          </div>
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold block mb-1">
            Precio por unidad *
          </label>
          <div className="flex items-center border rounded-md px-2">
            <MdOutlineAttachMoney className="text-gray-500 mr-2" />
            <input
              type="number"
              name="precio_unitario"
              value={form.precio_unitario}
              onChange={handleChange}
              placeholder="Placeholder"
              className="w-full p-2 outline-none"
              required
              step="0.01"
            />
          </div>
        </div>

        <div className="col-span-2 flex justify-end gap-2 mt-2">
          <button
            type="reset"
            className="px-4 py-2 rounded border"
            onClick={() =>
              setForm({
                id: null,
                codigo_producto: "",
                nombre: "",
                unidad_medida: "",
                unidades_por_paquete: "",
                precio_unitario: ""
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

      <h2 className="text-2xl font-bold">Productos</h2>
      <div className="bg-white p-4 rounded-md border">
        <label className="text-sm font-semibold block mb-1">
          Buscar Producto
        </label>
        <div className="flex items-center border rounded-md px-2 mb-4">
          <ImSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Placeholder"
            className="w-full p-2 outline-none"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {productosFiltrados.map((p) => (
            <div key={p.id} className="bg-white border rounded-md p-4 shadow-sm">
              <h3 className="font-bold text-lg">{p.nombre}</h3>
              <span className="inline-block bg-gray-200 text-xs font-bold px-2 py-1 rounded mt-1 mb-2">
                {p.codigo}
              </span>
              <p className="text-sm"><strong>Unidad de medida:</strong> {p.unidad_medida}</p>
              <p className="text-sm"><strong>Unidades por fardo/paquete:</strong> {p.unidades_por_fardo}</p>
              <p className="text-sm"><strong>Precio por unidad:</strong> Q{p.precio_unidad}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleEdit(p)} className="text-blue-600">
                  <RiEdit2Fill size={18} />
                </button>
                <button onClick={() => handleDelete(p.id)} className="text-red-600">
                  <RiDeleteBin5Fill size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
