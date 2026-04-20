import React, {Component} from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cookies from "universal-cookie";
import Loader from "../../components/Loader/Loader";
import "./Detalle.css";

const cookies = new Cookies();

class Detalle extends Component{
    constructor(props){
        super(props);
        this.state = {
            informacion : null,
            cargando : true,
            esFavorito : false
        };
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        let tipo = this.props.match.params.tipo;

        fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=c20d2da133e58ff4cdd61efde80a09ce`)
            .then(response => response.json())
            .then(data => {
                let yaEsFavorito = this.estaEnFavoritos(data.id);
                
                this.setState({
                     informacion: data,
                     cargando : false,
                     esFavorito : yaEsFavorito
                })
            })
            .catch(error => console.log(error))    
    };

    estaEnFavoritos(id) {
        let favoritos = localStorage.getItem("favoritos");
        favoritos = (favoritos === null) ? [] : JSON.parse(favoritos);

        let encontrado = favoritos.filter(fav => fav.id === id);
        return encontrado.length > 0;
    }

    agregarAFavoritos=() => {
        if (this.state.esFavorito) {
            alert("Ya está en favoritos");
            return;
        }

        let favoritos = localStorage.getItem("favoritos");
        favoritos = (favoritos === null)? [] : JSON.parse(favoritos);

        let info = this.state.informacion;
        let tipo = this.props.match.params.tipo;
        let favorito = {
            id : info.id,
            titulo : tipo === "movie" ? info.title : info.name,
            tipo : tipo,
            poster_path : info.poster_path
        };
        
        favoritos.push(favorito);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    
        this.setState({esFavorito:true})
        alert("Lo agregaste a favoritos!");
    };

    eliminarDeFavoritos = () => {
        let favoritos = JSON.parse(localStorage.getItem("favoritos"));
        let favoritoNuevo = favoritos.filter(fav => fav.id !== this.state.informacion.id);

        localStorage.setItem("favoritos", JSON.stringify(favoritoNuevo));
        
        this.setState({esFavorito : false});
        alert("Lo eliminaste de favoritos");
    }


    render(){
        if (this.state.cargando) return <Loader />;

        let info = this.state.informacion;
        let tipo = this.props.match.params.tipo;

        return(
            <>
               <Header />
               <section className="container-detalle">
                    <img className="imagen-detalle" src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} alt= {tipo === "movie" ? info.title : info.name}/>

                    <article className="info-detalle">
                        <h1 className="titulo-detalle">{tipo === "movie" ? info.title : info.name}</h1>
                        <p><strong>Calificacion:</strong> {info.vote_average}</p>
                        <p><strong>Fecha de estreno:</strong> {tipo === "movie" ? info.release_date : info.first_air_date}</p>
                        <p><strong>Duración:</strong> {tipo === "movie" ? info.runtime + " minutos" : null}</p>
                        <p><strong>Sinopsis:</strong> {info.overview}</p>
                        <p><strong>Genero:</strong>{info.genres ? info.genres.map(genero => genero.name + ", "): "No tiene genero"}</p>
                        {cookies.get("user-auth-cookie") && (
                             this.state.esFavorito ? (
                                 <button onClick={this.eliminarDeFavoritos}>♡ Quitar de favoritos</button>
                             ) : (
                                 <button onClick={() => this.agregarAFavoritos()}>♡</button>))}
                    </article>
                </section>
                <Footer/>
            </>
        )
    }
}

export default Detalle; 
