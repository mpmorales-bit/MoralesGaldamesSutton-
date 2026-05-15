import { Link } from "react-router-dom";
import "./Peliculas.css";
import { Component, useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Peliculas(props){

    const[show,setShow] = useState(false)

    function mostrar(){
        setShow(!show)
    }

    function agregarAFavoritos() {
        let favoritosGuardados = localStorage.getItem("favoritos");
        let favoritos = [];

        if (favoritosGuardados !== null) {
            favoritos = JSON.parse(favoritosGuardados);
        }

        let yaExiste = false;
        for (let i = 0; i < favoritos.length; i++) {
            if (favoritos[i].id === props.detalle) {
                yaExiste = true;
            }
        }

        if (!yaExiste) {
            let nuevoFavorito = {
                id: props.detalle,
                titulo: props.name,
                poster_path: props.src,
                tipo: props.tipo
            };

            favoritos.push(nuevoFavorito);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        }
    }

    function eliminarDeFavoritos(){
        let favoritosGuardados=localStorage.getItem("favoritos");
        let favoritos=favoritosGuardados!==null?JSON.parse(favoritosGuardados):[];
        let filtrados=favoritos.filter(f=>f.id !== props.detalle);
        localStorage.setItem("favoritos",JSON.stringify(filtrados));
    }

        return(
            <>
                <article className="single-card-playing">
                    <img src={props.src} className="card-img-top" alt="..." />
                    <div className="cardBody">
                        <h5 className="card-title">{props.name}</h5>
                        <p className={`card-text ${ show?"":"oculto"}`}>{props.description}</p>
                        <div className="card-actions">
                            <button className="btn-ocultar" onClick={()=>mostrar()}>{!show?"Mostrar descripcion":"Ocultar descripcion"}</button>
                            <Link to={`/Detalle/${props.tipo}/${props.detalle}`} className="btn-detalle btn-primary">Ir a detalle</Link>
                            {cookies.get("user-auth-cookie")&&(
                                <>
                                    <button className="btn-fav alert-primary" onClick={()=>agregarAFavoritos()}>♡</button>
                                    <button className="btn-eliminar" onClick={()=>eliminarDeFavoritos()}>Eliminar</button>
                                </>
                            )}
                        </div>
                    </div>
                </article>
            </>
        )
    }

export default Peliculas;