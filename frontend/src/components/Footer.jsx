import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer
      className="text-white text-center py-4 mt-5"
      style={{ backgroundColor: "#004dc1ff" }}
    >
      <div className="container">
        <p className="mb-1 fw-semibold">
          Freddy Silva • Isidro Reyes • Fernando Guevara • Lucia Macías
        </p>
        <p className="mb-1 small">
          © 2025 Trámites Vehiculares de Guanajuato — Todos los derechos reservados.
        </p>
        <p className="small mb-0 text-light opacity-75">
          Plataforma desarrollada con fines educativos y de gestión ciudadana.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

