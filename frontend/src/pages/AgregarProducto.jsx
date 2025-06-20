import { useState } from "react";

export default function AgregarProducto() {
  const [form, setForm] = useState({
    id: null,
    codigo_producto: "",
    nombre: "",
    unidad_medida: "",
    unidades_por_paquete: ""
  });

  const [productos, setProductos] = useState([
    {
      id: 1,
      codigo_producto: "PROD001",
      nombre: "Aceite de Motor",
      unidad_medida: "Unidad",
      unidades_por_paquete: 150
    },
    {
      id: 2,
      codigo_producto: "PROD002",
      nombre: "Filtro de Aire",
      unidad_medida: "Caja",
      unidades_por_paquete: 50
    }
  ]);

  const [busqueda, setBusqueda] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id) {
      // Editar producto existente
      setProductos((prev) =>
        prev.map((p) => (p.id === form.id ? { ...form } : p))
      );
    } else {
      // Agregar nuevo producto
      const nuevo = {
        ...form,
        id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1
      };
      setProductos((prev) => [...prev, nuevo]);
    }

    setForm({
      id: null,
      codigo_producto: "",
      nombre: "",
      unidad_medida: "",
      unidades_por_paquete: ""
    });
  };

  const handleDelete = (id) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (producto) => {
    setForm({ ...producto });
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.codigo_producto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl border">
        <input
          name="codigo_producto"
          value={form.codigo_producto}
          onChange={handleChange}
          placeholder="Código del producto"
          className="col-span-1 border p-2 rounded-md"
          required
        />
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre del producto"
          className="col-span-1 border p-2 rounded-md"
          required
        />
        <select
          name="unidad_medida"
          value={form.unidad_medida}
          onChange={handleChange}
          className="col-span-1 border p-2 rounded-md"
          required
        >
          <option value="">Unidad de medida</option>
          <option value="Unidad">Unidad</option>
          <option value="Caja">Caja</option>
          <option value="Litro">Litro</option>
        </select>
        <input
          name="unidades_por_paquete"
          type="number"
          value={form.unidades_por_paquete}
          onChange={handleChange}
          placeholder="Unidades por fardo/paquete"
          className="col-span-1 border p-2 rounded-md"
          required
        />

        <div className="col-span-2 flex justify-end space-x-4">
          <button
            type="reset"
            className="btn-secondary border p-2 rounded-md"
            onClick={() =>
              setForm({
                id: null,
                codigo_producto: "",
                nombre: "",
                unidad_medida: "",
                unidades_por_paquete: ""
              })
            }
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-primary border p-2 rounded-md bg-blue-600 text-white"
          >
            Guardar
          </button>
        </div>
      </form>

      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-xl font-bold mb-2">Productos</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar producto"
            className="border rounded-md p-2 w-full"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">🔍 Buscar</button>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productosFiltrados.map((p) => (
          <article key={p.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{p.nombre}</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full inline-block mt-1 font-semibold">
                  {p.codigo_producto}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800">✏️</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700">🗑️</button>
              </div>
            </div>
            <p><strong>Unidad de medida:</strong> {p.unidad_medida}</p>
            <p><strong>Unidades por fardo/paquete:</strong> {p.unidades_por_paquete}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
