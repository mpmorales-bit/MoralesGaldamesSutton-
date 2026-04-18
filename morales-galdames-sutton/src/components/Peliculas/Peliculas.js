import { Link } from "react-router-dom";
import "./Peliculas.css";
import { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Peliculas extends Component{
    constructor(props){
        super(props);
        this.state = {show: false}
    }
    mostrar(){
        this.setState({show: !this.state.show})
    }
    agregarAFavoritos() {
        let favoritosGuardados = localStorage.getItem("favoritos");
        let favoritos = [];
        if (favoritosGuardados !== null) {
            favoritos = JSON.parse(favoritosGuardados);
        }
        let yaExiste = false;
        for (let i = 0; i < favoritos.length; i++) {
            if (favoritos[i].id === this.props.detalle) {
                yaExiste = true;
            }
        }
        if (!yaExiste) {
            let nuevoFavorito = {
                id: this.props.detalle,
                nombre: this.props.name,
                imagen: this.props.src,
                tipo: this.props.tipo
            };
            favoritos.push(nuevoFavorito);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        }
    }
    render(){
        return(
            <>
                <article className="single-card-playing">
                    <img src={this.props.src} className="card-img-top" alt="..." />
                    <div className="cardBody">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className={`card-text ${this.state.show? "": "oculto"}`} >{this.props.description}</p>
                        <button className="btn-ocultar" onClick={() => this.mostrar()}>{!this.state.show? "Mostrar descripcion": "Ocultar descripcion"}</button>
                        <Link to={`/detalles/${this.props.detalle}`} className="btn-detalle btn-primary"> Ir a detalle</Link>
                        {cookies.get("user-auth-cookie") && (
                        <button className="btn-fav alert-primary" onClick={() => this.agregarAFavoritos()}>♡</button>)}
                    </div>
                </article>
            </>
        )
    }
}

export default Peliculas;