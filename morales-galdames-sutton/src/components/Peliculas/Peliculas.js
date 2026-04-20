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
                titulo: this.props.name,
                poster_path: this.props.src,
                tipo: this.props.tipo
            };
            favoritos.push(nuevoFavorito);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        }
    }

    eliminarDeFavoritos(){
        let favoritosGuardados=localStorage.getItem("favoritos");
        let favoritos=favoritosGuardados!==null?JSON.parse(favoritosGuardados):[];
        let filtrados=favoritos.filter(f=>f.id!==this.props.detalle);
        localStorage.setItem("favoritos",JSON.stringify(filtrados));
    }

    render(){
        return(
            <>
                <article className="single-card-playing">
                    <img src={this.props.src} className="card-img-top" alt="..." />
                    <div className="cardBody">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className={`card-text ${this.state.show?"":"oculto"}`}>{this.props.description}</p>
                        <div className="card-actions">
                            <button className="btn-ocultar" onClick={()=>this.mostrar()}>{!this.state.show?"Mostrar descripcion":"Ocultar descripcion"}</button>
                            <Link to={`/Detalle/${this.props.tipo}/${this.props.detalle}`} className="btn-detalle btn-primary">Ir a detalle</Link>
                            {cookies.get("user-auth-cookie")&&(
                                <>
                                    <button className="btn-fav alert-primary" onClick={()=>this.agregarAFavoritos()}>♡</button>
                                    <button className="btn-eliminar" onClick={()=>this.eliminarDeFavoritos()}>Eliminar</button>
                                </>
                            )}
                        </div>
                    </div>
                </article>
            </>
        )
    }
}

export default Peliculas;