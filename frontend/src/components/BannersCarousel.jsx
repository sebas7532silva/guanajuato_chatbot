import React, { useEffect, useState } from "react";
import { Modal, Carousel, Button, Spinner } from "react-bootstrap";
import api from "../utils/api";

const BannersCarousel = ({ show, onClose }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (show) {
    // Bootstrap bloquea el scroll del body al abrir modales.
    // Esperamos un poco y volvemos a habilitarlo.
    const timeout = setTimeout(() => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "auto";
    }, 100);

    // Limpieza segura al cerrar o desmontar
    return () => {
      clearTimeout(timeout);
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "auto";
    };
  } else {
    // Si el modal está cerrado, asegúrate de que el scroll esté activo
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "auto";
  }
}, [show]);


  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.getBanners();
        setBanners(res || []);
      } catch (error) {
        console.error("❌ Error al cargar los banners:", error);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    if (show) {
      setLoading(true);
      fetchBanners();
    }
  }, [show]);

  // ✅ Permitir scroll en la página aunque el modal esté abierto
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (show) {
      setTimeout(() => {
        document.body.style.overflow = previousOverflow || "auto";
      }, 0);
    } else {
      document.body.style.overflow = previousOverflow || "";
    }

    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onClose}
      fullscreen
      centered
      backdropClassName="bg-dark bg-opacity-75"
      contentClassName="bg-transparent border-0 shadow-none"
    >
      <Modal.Body className="p-0 position-relative d-flex justify-content-center align-items-center">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <Carousel interval={4000} indicators controls>
            {banners.map((banner, idx) => {
              const key = banner.idFoto || banner.id || idx;
              return (
                <Carousel.Item key={key}>
                  <img
                    src={banner.url}
                    className="d-block mx-auto rounded-4 shadow-lg"
                    alt={banner.titulo || `Banner ${key}`}
                    style={{
                      objectFit: "cover",
                      maxHeight: "85vh",
                      width: "90%",
                      marginTop: "5vh",
                      border: "4px solid rgba(255,255,255,0.2)",
                    }}
                  />
                  {(banner.titulo || banner.descripcion) && (
                    <Carousel.Caption className="d-none d-md-block">
                      {banner.titulo && <h5>{banner.titulo}</h5>}
                      {banner.descripcion && <p>{banner.descripcion}</p>}
                    </Carousel.Caption>
                  )}
                </Carousel.Item>
              );
            })}
          </Carousel>
        )}

        {/* ✅ Botón de cierre — elevado sobre el carrusel */}
        <Button
          variant="light"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="position-absolute end-0 m-4 px-3 py-2 fw-bold rounded-circle"
          style={{
            top: "100px",
            backgroundColor: "rgba(255, 255, 255, 0.55)",
            border: "none",
            backdropFilter: "blur(6px)",
            zIndex: 1055, // 🔹 Más alto que el control del Carousel
            pointerEvents: "auto",
            color: "white"
          }}
        >
          ✕
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default BannersCarousel;

