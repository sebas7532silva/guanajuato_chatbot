import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <header
      style={{
        borderBottom: "6px solid #2b7bf4ff", // línea inferior más gruesa y azul
        padding: "1rem 0", // más altura
        backgroundColor: "#fff",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-white container">
        <a className="navbar-brand fw-bold fs-4" style={{color:"#004dc1ff"}} href="/">
          Gobierno de Guanajuato
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active header__item" href="/">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link header__item" href="#">
                Trámites
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link header__item" href="#">
                Oficinas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link header__item" href="#">
                Ayuda
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
