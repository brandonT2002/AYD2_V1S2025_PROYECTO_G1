import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
// Departamentos y municipios quemados
const DEPARTAMENTOS = {
  AL: "Alta Verapaz", BA: "Baja Verapaz", CH: "Chimaltenango", CQ: "Chiquimula",
  PR: "El Progreso", ES: "Escuintla", GT: "Guatemala", HU: "Huehuetenango",
  IZ: "Izabal", JL: "Jalapa", JU: "Jutiapa", PE: "Petén", QZ: "Quetzaltenango",
  QC: "Quiché", RE: "Retalhuleu", SC: "Sacatepéquez", SM: "San Marcos",
  SR: "Santa Rosa", SO: "Sololá", SU: "Suchitepéquez", TO: "Totonicapán", ZA: "Zacapa"
};

const MUNICIPIOS = {
    "GT": ["Guatemala", "Mixco", "Villa Nueva", "Villa Canales", "San Miguel Petapa",
           "Santa Catarina Pinula", "Amatitlán", "Palencia", "Chinautla", "San José Pinula",
           "Fraijanes", "San Pedro Ayampuc", "San Pedro Sacatepéquez", "San Juan Sacatepéquez",
           "San Raymundo", "Chuarrancho", "Santa Cruz Chinautla"],
    "AL": ["Cobán", "San Pedro Carchá", "San Juan Chamelco", "Tactic", "Tamahú", "Tucurú", "Panzós", "Senahú", "Chisec", "Raxruhá", "Santa Catalina La Tinta", "Fray Bartolomé de las Casas", "Chahal", "Lanquín", "Santa Cruz Verapaz", "San Cristóbal Verapaz"],
    "BA": ["Salamá", "San Jerónimo", "Purulhá", "Rabinal", "Cubulco", "Granados", "El Chol"],
    "CH": ["Chimaltenango", "El Tejar", "Patzicía", "Patzún", "San Andrés Itzapa", "San Juan Comalapa", "San Martín Jilotepeque", "Santa Apolonia", "Tecpán Guatemala", "Yepocapa", "Zaragoza"],
    "CQ": ["Chiquimula", "Camotán", "Concepción Las Minas", "Esquipulas", "Ipala", "Jocotán", "Olopa", "Quezaltepeque", "San Jacinto", "San José La Arada", "San Juan Ermita"],
    "PR": ["Guastatoya", "El Jícaro", "Sansare", "Sanarate", "San Antonio La Paz", "Morazán"],
    "ES": ["Escuintla", "La Democracia", "Masagua", "Palín", "San José", "San Vicente Pacaya", "Santa Lucía Cotzumalguapa", "Siquinalá", "Tiquisate", "Guanagazapa", "Iztapa", "La Gomera", "Nueva Concepción"],
    "HU": ["Huehuetenango", "Chiantla", "Aguacatán", "San Pedro Soloma", "San Juan Ixcoy", "San Sebastián Coatán", "Santa Eulalia", "Santa Cruz Barillas", "San Mateo Ixtatán", "Nentón", "Cuilco"],
    "IZ": ["Puerto Barrios", "Morales", "Livingston", "El Estor", "Los Amates"],
    "JL": ["Jalapa", "San Pedro Pinula", "San Luis Jilotepeque", "San Manuel Chaparrón", "San Carlos Alzatate", "Monjas", "Mataquescuintla"],
    "JU": ["Jutiapa", "El Progreso", "Santa Catarina Mita", "Agua Blanca", "Asunción Mita", "Atescatempa", "Comapa", "Conguaco", "El Adelanto", "Jerez", "Jalpatagua", "Moyuta", "Pasaco", "Quesada", "San José Acatempa", "Yupiltepeque", "Zapotitlán"],
    "PE": ["Flores", "San Benito", "San Andrés", "San José", "San Luis", "Melchor de Mencos", "La Libertad", "Poptún", "Dolores", "Santa Ana"],
    "QZ": ["Quetzaltenango", "La Esperanza", "Olintepeque", "Salcajá", "San Mateo", "San Miguel Sigüilá", "Cabricán", "San Juan Ostuncalco", "San Martín Sacatepéquez", "Concepción Chiquirichapa"],
    "QC": ["Santa Cruz del Quiché", "Chiché", "Chinique", "Zacualpa", "Joyabaj", "Pachalum", "San Pedro Jocopilas", "Cunén", "Sacapulas", "Nebaj", "Chajul", "Uspantán"],
    "RE": ["Retalhuleu", "San Sebastián", "Santa Cruz Muluá", "San Martín Zapotitlán", "San Felipe", "San Andrés Villa Seca", "Champerico", "Nuevo San Carlos", "El Asintal"],
    "SC": ["Antigua Guatemala", "Ciudad Vieja", "Jocotenango", "Pastores", "Santa Catarina Barahona", "Santa Lucía Milpas Altas", "Santa María de Jesús", "Santiago Sacatepéquez", "Santo Domingo Xenacoj", "Sumpango"],
    "SM": ["San Marcos", "San Pedro Sacatepéquez", "San Antonio Sacatepéquez", "Concepción Tutuapa", "Tacaná", "Sibinal", "Tajumulco", "Tejutla", "Ixchiguán", "San José Ojetenam"],
    "SR": ["Cuilapa", "Barberena", "Santa Rosa de Lima", "Casillas", "San Rafael Las Flores", "Oratorio", "San Juan Tecuaco", "Chiquimulilla", "Taxisco", "Guazacapán"],
    "SO": ["Sololá", "Panajachel", "Santa Catarina Palopó", "San Antonio Palopó", "San José Chacayá", "Santa Clara La Laguna", "San Juan La Laguna", "San Pedro La Laguna", "Santiago Atitlán"],
    "SU": ["Mazatenango", "Cuyotenango", "Samayac", "San Lorenzo", "San Bernardino", "Santo Domingo Suchitepéquez", "San Francisco Zapotitlán", "Chicacao", "Patulul"],
    "TO": ["Totonicapán", "San Cristóbal Totonicapán", "San Francisco El Alto", "San Andrés Xecul", "Momostenango"],
    "ZA": ["Zacapa", "Chiquimula", "La Unión", "Río Hondo", "Teculután", "Usumatlán"]
};

export default function ClientePage() {
  const api = "http://3.95.223.10:5000/api";
  const [form, setForm] = useState({
    id: null,
    nombre_negocio: "",
    nombre_contacto: "",
    departamento: "",
    municipio: "",
    direccion: "",
    nit: "",
    encargado_bodega: "",
    telefono: "",
    tipo_venta: "",
    observaciones: ""
  });

  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    axios.get(`${api}/clientes`).then(r => {
      setClientes(r.data);
    });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`${api}/clientes/${form.id}`, form);
      } else {
        await axios.post(`${api}/clientes`, form);
      }
      const res = await axios.get(`${api}/clientes`);
      setClientes(res.data);
      setForm({
        id: null,
        nombre_negocio: "",
        nombre_contacto: "",
        departamento: "",
        municipio: "",
        direccion: "",
        nit: "",
        encargado_bodega: "",
        telefono: "",
        tipo_venta: "",
        observaciones: ""
      });
      toast.success("Cliente guardado exitosamente");
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar el cliente");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este cliente?")) return;
    try {
      await axios.delete(`${api}/clientes/${id}`);
      const res = await axios.get(`${api}/clientes`);
      setClientes(res.data);
      toast.success("Cliente eliminado exitosamente");
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el cliente");
    }
  };

  const handleEdit = (cliente) => {
    setForm({ ...cliente });
  };

  const municipiosDisponibles = MUNICIPIOS[form.departamento] || [];

  const clientesFiltrados = clientes.filter(c =>
    c.nombre_negocio.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.codigo_cliente.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl border">
        <input name="nombre_contacto" value={form.nombre_contacto} onChange={handleChange} placeholder="Nombre del contacto" className="col-span-1 border p-2 rounded-md" required />
        <input name="nombre_negocio" value={form.nombre_negocio} onChange={handleChange} placeholder="Nombre del negocio" className="col-span-1 border p-2 rounded-md" required />

        <select name="departamento" value={form.departamento} onChange={handleChange} className="col-span-1 border p-2 rounded-md" required>
          <option value="">Departamento</option>
          {Object.entries(DEPARTAMENTOS).map(([codigo, nombre]) => (
            <option key={codigo} value={codigo}>{nombre}</option>
          ))}
        </select>

        <select name="municipio" value={form.municipio} onChange={handleChange} className="col-span-1 border p-2 rounded-md" required>
          <option value="">Municipio</option>
          {municipiosDisponibles.map((m, idx) => (
            <option key={idx} value={m}>{m}</option>
          ))}
        </select>

        <textarea name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" className="col-span-2 border p-2 rounded-md h-24" />
        <input name="nit" value={form.nit} onChange={handleChange} placeholder="NIT" className="col-span-1 border p-2 rounded-md" />
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="col-span-1 border p-2 rounded-md" />
        <input name="encargado_bodega" value={form.encargado_bodega} onChange={handleChange} placeholder="Encargado en bodega" className="col-span-1 border p-2 rounded-md" />

        <select name="tipo_venta" value={form.tipo_venta} onChange={handleChange} className="col-span-1 border p-2 rounded-md" required>
          <option value="">Tipo de venta autorizada</option>
          <option value="Credito">Crédito</option>
          <option value="Contado">Contado</option>
          <option value="Ambas">Ambas</option>
        </select>

        <textarea name="observaciones" value={form.observaciones} onChange={handleChange} placeholder="Observaciones" className="col-span-2 border p-2 rounded-md h-20" />

        <div className="col-span-2 flex justify-end space-x-4">
          <button type="reset" className="btn-secondary border p-2 rounded-md" onClick={() => setForm({ id: null, nombre_negocio: "", nombre_contacto: "", departamento: "", municipio: "", direccion: "", nit: "", encargado_bodega: "", telefono: "", tipo_venta: "", observaciones: "" })}>Cancelar</button>
          <button type="submit" className="btn-primary border p-2 rounded-md bg-blue-600 text-white">Guardar</button>
        </div>
      </form>

      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-xl font-bold mb-2">Clientes</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar Cliente"
            className="border rounded-md p-2 w-full"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">🔍 Buscar</button>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clientesFiltrados.map((c) => (
          <article key={c.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👤</span>
                <h3 className="text-lg font-bold">{c.nombre_negocio}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(c)} className="text-blue-600 hover:text-blue-800">✏️</button>
                <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:text-red-700">🗑️</button>
              </div>
            </div>
            <div className="inline-block bg-gray-100 text-xs font-semibold px-2 py-1 rounded-full w-fit text-gray-700 mt-1">
              {c.codigo_cliente}
            </div>
            <p><strong>Nombre del contacto:</strong> {c.nombre_contacto}</p>
            <p><strong>Departamento:</strong> {c.departamento}</p>
            <p><strong>Municipio:</strong> {c.municipio}</p>
            <p><strong>Dirección:</strong> {c.direccion}</p>
            <p><strong>Nit:</strong> {c.nit}</p>
            <p><strong>Encargado en bodega:</strong> {c.encargado_bodega}</p>
            <p><strong>Teléfono:</strong> {c.telefono}</p>
          </article>
        ))}
      </section>
    </div>
  );
}