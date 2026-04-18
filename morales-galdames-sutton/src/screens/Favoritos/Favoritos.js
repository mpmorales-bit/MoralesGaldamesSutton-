import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Favoritos.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const cookies = new Cookies();

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: []
    };
  }

  componentDidMount() {
    let usuario = cookies.get("user-auth-cookie");

    if (!usuario) {
      this.props.history.push("/login");
    }

    let storage = localStorage.getItem("favoritos");

    if (storage !== null) {
      let favoritosParse = JSON.parse(storage);

      this.setState({
        favoritos: favoritosParse
      });
    }
  }

  eliminarFavorito(id) {
    let filtrados = this.state.favoritos.filter(function (elemento) {
      return elemento.id !== id;
    });

    localStorage.setItem("favoritos", JSON.stringify(filtrados));

    this.setState({
      favoritos: filtrados
    });
  }

  render() {
    let peliculas = this.state.favoritos.filter(function (elemento) {
      return elemento.tipo === "pelicula";
    });

    let series = this.state.favoritos.filter(function (elemento) {
      return elemento.tipo === "serie";
    });

    return (
      <>
      <Header/>
      <div className="favoritos">
        <h1>Mis favoritos</h1>
        <h2>Películas favoritas</h2>

        {peliculas.length === 0 ? (
          <p>No hay películas favoritas</p>
        ) : (
          <section className="favoritos-section">
            {peliculas.map((elemento) => (
              <article key={elemento.id}>
                <img src={elemento.imagen} alt={elemento.nombre} />
                <h3>{elemento.nombre}</h3>
                <Link to={`/detalle/${elemento.id}`}>
                  Ver detalle
                </Link>
                <button onClick={() => this.eliminarFavorito(elemento.id)}>Eliminar</button>
              </article>
            ))}
          </section>
        )}

        <h2>Series favoritas</h2>

        {series.length === 0 ? (
          <p>No hay series favoritas</p>
        ) : (
          <section className="favoritos-section">
            {series.map((elemento) => (
              <article key={elemento.id}>
                <img src={elemento.imagen} alt={elemento.nombre} />
                <h3>{elemento.nombre}</h3>
                <Link to={`/detalle/${elemento.id}`}> Ver detalle</Link>
                <button onClick={() => this.eliminarFavorito(elemento.id)}>Eliminar</button>
              </article>
            ))}
          </section>
        )}
      </div>
      <Footer/>
      </>
    );
  }
}

export default Favoritos;