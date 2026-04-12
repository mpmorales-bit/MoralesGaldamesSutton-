import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>
        <Link to="/">Movie App</Link>
      </h1>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/Login">Login</Link>
          </li>

          <li>
            <Link to="/CrearCuenta">Crear Cuenta</Link>
          </li>

          <li>
            <Link to="/Favoritos">Favoritos</Link>
          </li>

          <li>
            <Link to="/Populares">Ver todas Populares</Link>
          </li>

          <li>
            <Link to="/Toprated">Ver todas Top Rated</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;