import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../utils/api";

const Oficinas = () => {
  const [expanded, setExpanded] = useState(null);
  const [oficinas, setOficinas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOficinas = async () => {
      try {
        const data = await api.getOficinas(); // suponiendo que devuelve una promesa
        setOficinas(data);
        console.log("Oficinas cargadas:", data);
      } catch (err) {
        console.error("Error cargando oficinas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOficinas();
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  if (loading) return <p className="text-center py-3">Cargando oficinas...</p>;

  return (
    <div className="container py-3">
      <h5 className="fw-bold mb-3 text-primary">
        <i className="bi bi-building me-2"></i> Oficinas Disponibles
      </h5>

      <div className="row g-3">
        {oficinas.map((o) => (
          <div key={o.idOficina} className="col-md-6">
            <div
              className="card shadow-sm border-0 h-100 hover-scale"
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onClick={() => toggleExpand(o.idOficina)}
            >
              <div className="card-body">
                <h6 className="fw-semibold mb-2">{o.oficina}</h6>
                <p className="text-muted small mb-1">{o.domicilio}</p>
                {expanded === o.idOficina && (
                  <div className="mt-2">
                    <p className="small mb-1">
                      <strong>Horario:</strong> {o.horarioAtencion}
                    </p>
                    <p className="small mb-1">
                      <strong>Tel. Asesor:</strong> {o.telefonoAsesor || "N/D"}
                    </p>
                    <p className="small mb-0">
                      <strong>Recepción:</strong> {o.recepcion || "N/D"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .hover-scale:hover {
          transform: scale(1.03);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default Oficinas;
