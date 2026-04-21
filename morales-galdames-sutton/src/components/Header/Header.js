import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Header.css";

const cookies = new Cookies();

function Header() {

  const usuario = cookies.get("user-auth-cookie");

  return (
    <header className="main-header">
      <h1 className="logo">
        <Link to="/">Digital Movies</Link>
      </h1>

      <nav className="header-nav">
        <ul className="header-list">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/Populares">Populares</Link>
          </li>

          <li>
            <Link to="/Toprated">Top Rated</Link>
          </li>

          {!usuario ? (
            <>
              <li>
                <Link to="/Login">Login</Link>
              </li>

              <li>
                <Link to="/CrearCuenta">Crear Cuenta</Link>
              </li>
            </>
          ) : null}

          {usuario ? (
            <li>
              <Link to="/Favoritos">Favoritos</Link>
            </li>
          ) : null}

        </ul>
      </nav>
    </header>
  );
}

export default Header;