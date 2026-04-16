import { Link } from "react-router-dom";
import "./Peliculas.css";

function Peliculas(props){

    function agregarAFavoritos() {
        let favoritosGuardados = localStorage.getItem("favoritos");
        let favoritos = [];

        if (favoritosGuardados !== null) {
            favoritos = JSON.parse(favoritosGuardados);
        }

        let nuevoFavorito = {
            id: props.detalle,
            nombre: props.name,
            imagen: props.src,
            tipo: props.tipo
        };

        favoritos.push(nuevoFavorito);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }

    return(
        <>
        <article className="single-card-playing">
                <img src={props.src} className="card-img-top" alt="..." />
                <div className="cardBody">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.description}</p>
                    <Link to={`/detalles/${props.detalle}`} className="btn btn-primary"> Ir a detalle</Link>
                    <button className="btn alert-primary" onClick={agregarAFavoritos}>♡</button>
                </div>
            </article>
        </>
    )
}

export default Peliculas;