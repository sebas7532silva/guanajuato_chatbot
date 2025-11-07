import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Home = ({ onChatOpen }) => {
    const navigate = useNavigate();
    const tramites = [
    {
      id: "102",
      titulo: "Renovar Placas",
      descripcion: "Información sobre renovación de placas vehiculares",
    },
    {
      id: "CAMBIO-PROPIETARIO",
      titulo: "Cambio de Propietario",
      descripcion: "Transferencia de propiedad vehicular",
    },
    {
      id: "PAGAR-TENENCIA",
      titulo: "Pagar Tenencia",
      descripcion: "Consulta y pago de impuestos vehiculares",
    },
    {
      id: "UBICAR-OFICINAS",
      titulo: "Ubicar Oficinas",
      descripcion: "Encuentra la oficina más cercana",
    },
  ];

  const irADetalle = (tramite) => {
    console.log("Trámite clickeado:", tramite);
    navigate(`/tramite/${tramite.id}`, { state: tramite });
  };

  return (
    <div className="bg-light pb-5">
      {/* Encabezado principal con degradado */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #004dc1 0%, #00a884 100%)",
          borderRadius: "0 0 1rem 1rem",
        }}
      >
        <div
          className="container text-white text-center py-5"
          style={{
            maxWidth: "900px",
          }}
        >
          <h1 className="fw-bold mb-3">
            Asistente Virtual para Trámites Vehiculares
          </h1>
          <p className="lead mb-4">
            Obtén información rápida y confiable sobre renovación de licencias, cambio de placas,
            transferencia de propiedad y más.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button className="btn btn-light fw-semibold px-4 py-2"
            onClick={onChatOpen}>
              💬 Iniciar Chat
            </button>
            <button className="btn btn-outline-light fw-semibold px-4 py-2">
              📍 Ubicar Oficinas
            </button>
          </div>
        </div>
      </section>

      {/* Trámites más solicitados */}
      <section className="container mt-5">
        <h4 className="fw-bold mb-4">Trámites Más Solicitados</h4>
        <div className="row g-4">
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm h-100"
                    style={{
                        border: "none",
                        borderLeft: "5px solid #c12000ff",
                        boxShadow: "0 4px 10px rgba(0, 77, 193, 0.1)",
                        cursor: "pointer"
                        }}
                    onClick={() => irADetalle(tramites[0])}>
              <div className="card-body text-center">
                <div className="mb-2 fs-1 text-primary">📘</div>
                <h5 className="fw-semibold">Renovar Placas</h5>
                <p className="text-muted small">
                  Información sobre renovación de placas vehiculares
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm h-100"
                    style={{
                        border: "none",
                        borderLeft: "5px solid #c1be00ff",
                        boxShadow: "0 4px 10px rgba(0, 77, 193, 0.1)",
                        cursor: "pointer"
                        }}
                    onClick={() => irADetalle(tramites[1])}    >
              <div className="card-body text-center">
                <div className="mb-2 fs-1 text-success">🔄</div>
                <h5 className="fw-semibold">Cambio de Propietario</h5>
                <p className="text-muted small">
                  Transferencia de propiedad vehicular
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div
                className="card h-100 shadow-sm"
                style={{
                border: "none",
                borderLeft: "5px solid #004dc1",
                boxShadow: "0 4px 10px rgba(0, 77, 193, 0.1)",
                cursor: "pointer"
                }}
                onClick={() => irADetalle(tramites[2])}>
              <div className="card-body text-center">
                <div className="mb-2 fs-1 text-warning">💰</div>
                <h5 className="fw-semibold">Pagar Tenencia</h5>
                <p className="text-muted small">
                  Consulta y pago de impuestos vehiculares
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm h-100"
                    style={{
                        border: "none",
                        borderLeft: "5px solid #6e9effff",
                        boxShadow: "0 4px 10px rgba(0, 77, 193, 0.1)",
                        cursor: "pointer",
                        }}
                    onClick={() => irADetalle(tramites[3])}>
              <div className="card-body text-center">
                <div className="mb-2 fs-1 text-info">📍</div>
                <h5 className="fw-semibold">Ubicar Oficinas</h5>
                <p className="text-muted small">
                  Encuentra la oficina más cercana
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="container mt-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-4 h-100">
              <h5 className="fw-bold mb-3">¿Cómo funciona nuestro asistente?</h5>
              <ol className="list-unstyled">
                <li className="mb-3 d-flex align-items-start">
                  <span className="badge bg-primary me-3 fs-6">1</span>
                  <div>
                    <strong>Inicia la conversación</strong>
                    <p className="text-muted mb-0">
                      Haz clic en el botón de chat y describe tu consulta en lenguaje natural
                    </p>
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <span className="badge bg-success me-3 fs-6">2</span>
                  <div>
                    <strong>Recibe información personalizada</strong>
                    <p className="text-muted mb-0">
                      Obtén respuestas específicas sobre requisitos, costos y procedimientos
                    </p>
                  </div>
                </li>
                <li className="d-flex align-items-start">
                  <span className="badge bg-warning text-dark me-3 fs-6">3</span>
                  <div>
                    <strong>Completa tu trámite</strong>
                    <p className="text-muted mb-0">
                      Sigue las instrucciones paso a paso para completar tu procedimiento
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Horarios */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-4 h-100">
              <h5 className="fw-bold mb-3">Horarios de Atención</h5>
              <p className="mb-1">
                <strong>Lunes - Viernes:</strong> 8:00 - 18:00
              </p>
              <p className="mb-1">
                <strong>Sábados:</strong> 9:00 - 14:00
              </p>
              <p className="mb-1">
                <strong>Domingos:</strong> Cerrado
              </p>
              <hr />
              <p className="text-muted mb-0">
                <strong>Asistente Virtual</strong><br />
                Disponible 24/7 para consultas básicas
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
