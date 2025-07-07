import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

interface Lead {
  id: string;
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
  estado: string;
  fecha: string;
}

const CRM = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:5000/api/leads?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Error al cargar leads");
      }

      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, token]);

  const handleChangeEstado = async (id: string, estado: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado }),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar estado");
      }

      fetchLeads(); // refresca la lista
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads, page]);

  return (
    <div className="p-4 bg-white rounded shadow-md my-auto mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard - CRM</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {loading && <p>Cargando leads...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Correo</th>
            <th className="border p-2">Teléfono</th>
            <th className="border p-2">Mensaje</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="border p-2">{lead.nombre}</td>
              <td className="border p-2">{lead.correo}</td>
              <td className="border p-2">{lead.telefono}</td>
              <td className="border p-2">{lead.mensaje}</td>
              <td className="border p-2">{lead.estado || "nuevo"}</td>
              <td className="border p-2 space-x-1">
                <button
                  onClick={() => handleChangeEstado(lead.id, "nuevo")}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  Nuevo
                </button>
                <button
                  onClick={() => handleChangeEstado(lead.id, "contactado")}
                  className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                >
                  Contactado
                </button>
                <button
                  onClick={() => handleChangeEstado(lead.id, "descartado")}
                  className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
                >
                  Descartado
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4 py-2">Página {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CRM;
