import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Tramites = () => {

  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const [tramites, setTramites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTramites = async () => {
      try {
        const data = await api.getTramites(); // suponer que devuelve promesa
        setTramites(data);
        console.log("Trámites cargados:", data);
      } catch (err) {
        console.error("Error cargando trámites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTramites();
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  if (loading) return <p className="text-center py-3">Cargando trámites...</p>;

  return (
    <div className="container py-3">
      <h5 className="fw-bold mb-3 text-primary">
        <i className="bi bi-card-list me-2"></i> Trámites Disponibles
      </h5>

      <div className="row g-3">
        {tramites.map((t) => (
          <div key={t.idTramite} className="col-md-6">
            <div
              className="card shadow-sm border-0 h-100 hover-scale"
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onClick={() =>
                navigate(`/tramite/${t.idTramite}`, { state: t })
                      }
            >
              <div className="card-body">
                <h6 className="fw-semibold mb-2">{t.titulo || t.tramiteNombre}</h6>
                <p className="text-muted small mb-1">{t.descripcion || "Consulta los detalles del trámite."}</p>
                {expanded === t.idTramite && (
                  <div className="mt-2">
                    <p className="small mb-1">
                      <strong>Categoría:</strong> {t.categoriaNombre || "No especificada"}
                    </p>
                    <p className="small mb-1">
                      <strong>Tipo:</strong> {t.tipoTramite || "General"}
                    </p>
                    {t.tramiteIdSAP && (
                      <p className="small mb-0">
                        <strong>ID SAP:</strong> {t.tramiteIdSAP}
                      </p>
                    )}
                    <p className="small mb-0">
                      <strong>Costo:</strong> {t.costo ? `$${t.costo} MXN` : "N/D"}
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

export default Tramites;
