import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../utils/api";
import { useParams, useLocation } from "react-router-dom";

const TramiteDetalle = () => {
  const { id } = useParams(); // viene de la URL
  const location = useLocation(); // contiene el "state" enviado desde Home
  const tramiteInicial = location.state || {}; // datos opcionales desde Home

  // Estados
  const [tramite, setTramite] = useState(tramiteInicial);
  const [requisitos, setRequisitos] = useState([]);
  const [oficinas, setOficinas] = useState([]);
  const [loading, setLoading] = useState(!tramiteInicial.id);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tramiteId = tramiteInicial.id || id;
    console.log("Cargando detalles para trámite ID:", tramiteId);
    if (!tramiteId) return;

    const fetchData = async () => {
      try {
        // Si no hay información previa, obtener el trámite
        if (!tramiteInicial.id) {
          const tramiteData = await api.getTramiteById(tramiteId);
          console.log("Datos trámite:", tramiteData);
          setTramite(tramiteData);
        }

        // Obtener los requisitos asociados
        const reqTramData = await api.getRequisitosPorTramite(tramiteId);
        console.log("Datos requisitos-trámite:", reqTramData);
        const reqIds = reqTramData.map((r) => r.reqDocId);

        const allReq = await api.getRequisitos();
        const reqFiltrados = allReq.filter((r) => reqIds.includes(r.reqId));
        setRequisitos(reqFiltrados);

        // Obtener oficinas
        const ofData = await api.getOficinas();
        setOficinas(ofData);
      } catch (err) {
        console.error("Error cargando datos:", err);
        setError("No se pudo cargar la información del trámite.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="text-center p-5">Cargando...</div>;
  if (error) return <div className="text-danger p-5">{error}</div>;

  const titulo = tramite.titulo || tramite.categoriaNombre || "Trámite";
  const descripcion = tramite.descripcion || "Consulta aquí los detalles del trámite.";

  return (
    <div className="container py-4">
      {/* ENCABEZADO */}
      <div
        className="p-4 rounded shadow-sm mb-4 text-white"
        style={{ background: "linear-gradient(90deg, #004dc1, #009e6f)" }}
      >
        <h3 className="fw-bold mb-2">
          <i className="bi bi-card-list me-2"></i> {titulo}
        </h3>
        <p className="mb-0">{descripcion}</p>
      </div>

      <div className="row g-4">
        {/* COLUMNA IZQUIERDA */}
        <div className="col-lg-8">
          {/* INFORMACIÓN DEL TRÁMITE */}
          {tramite && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="fw-bold mb-3 text-primary">
                  <i className="bi bi-info-circle me-2"></i> Información del Trámite
                </h5>
                <p className="mb-2">
                  <strong>Categoría:</strong> {tramite.categoriaNombre || "No especificada"}
                </p>
                <p className="mb-2">
                  <strong>Tipo:</strong> {tramite.tipoTramite || "General"}
                </p>
                {tramite.tramiteIdSAP && (
                  <p className="text-muted small mb-0">
                    ID Interno SAP: {tramite.tramiteIdSAP}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* REQUISITOS */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3 text-primary">
                <i className="bi bi-folder2-open me-2"></i> Documentos Requeridos
              </h5>
              <div
                    style={{
                        maxHeight: "280px",
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                        scrollbarColor: "#004dc1 #f1f1f1",
                        paddingRight: "4px",
                    }}
                    >
                <div className="row g-3">
                    {requisitos.length > 0 ? (
                    requisitos.map((req) => (
                        <div className="col-md-6" key={req.reqId}>
                        <div className="border rounded p-3 bg-light h-100">
                            <h6 className="fw-semibold text-dark">{req.reqNombre}</h6>
                            <p className="text-muted small mb-0">
                            {req.reqDescripcion || "Documento requerido para este trámite."}
                            </p>
                        </div>
                        </div>
                    ))
                    ) : (
                    <p className="text-muted">Cargando requisitos...</p>
                    )}
                </div>
              </div>
              <div className="alert alert-warning mt-3 mb-0">
                <strong>Importante:</strong> Todos los documentos deben estar vigentes y en buen estado.
              </div>
            </div>
          </div>

          {/* COSTO */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3 text-primary">
                <i className="bi bi-cash-stack me-2"></i> Costo del Trámite
              </h5>
              <div className="bg-success text-white rounded p-3 mb-3 d-flex justify-content-between align-items-center">
                <span className="fs-5 fw-bold">$850.00 MXN</span>
                <span className="fw-semibold">Costo fijo de gestión</span>
              </div>
              <ul className="small text-muted mb-0">
                <li>Incluye derechos vehiculares y materiales</li>
                <li>Pago con tarjeta, transferencia o efectivo</li>
              </ul>
            </div>
          </div>

          {/* PASOS A SEGUIR */}
          <div className="card">
            <div className="card-body">
              <h5 className="fw-bold mb-3 text-primary">
                <i className="bi bi-list-ol me-2"></i> Pasos a Seguir
              </h5>
              <ol className="mb-0">
                <li>Reúne los documentos requeridos.</li>
                <li>Agenda una cita o acude sin cita a una oficina autorizada.</li>
                <li>Entrega los documentos y realiza el pago correspondiente.</li>
                <li>Recoge tus nuevas placas o comprobante según el trámite.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA — OFICINAS */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="fw-bold mb-3 text-primary">
                <i className="bi bi-geo-alt me-2"></i> Oficinas Disponibles
              </h5>
              {/* CONTENEDOR CON SCROLL */}
             <div
                    style={{
                    maxHeight: "500px",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#004dc1 #f1f1f1",
                    paddingRight: "4px",
                    }}
                >
              {oficinas.length > 0 ? (
                oficinas.map((o) => (
                  <div key={o.idOficina} className="border rounded p-3 mb-3 bg-light">
                    <h6 className="fw-semibold text-dark">{o.oficina}</h6>
                    <p className="small mb-1 text-muted">{o.domicilio}</p>
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
                ))
              ) : (
                <p className="text-muted">Cargando oficinas...</p>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TramiteDetalle;
