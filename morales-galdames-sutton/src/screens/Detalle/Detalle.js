import React, {Component} from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cookies from "universal-cookie";
import Loader from "../../components/Loader/Loader";

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

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c20d2da133e58ff4cdd61efde80a09ce`)
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
            alert("Esta pelicula ya está en favoritos");
            return;
        }

        let favoritos = localStorage.getItem("favoritos");
        favoritos = (favoritos === null)? [] : JSON.parse(favoritos);

        let info = this.state.informacion;
        let favorito = {
            id : info.id,
            titulo : info.title,
            tipo : "movie",
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
        alert("Eliminaste esta pelicula de favoritos");
    }


    render(){
        if (this.state.cargando) return <Loader />;

        let info = this.state.informacion;

        return(
            <>
               <Header />
               <img src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} alt={info.title}/>
               <h1>{info.title}</h1>
               <p>Calificacion: {info.vote_average}</p>
               <p>Fecha de estreno: {info.release_date}</p>
               <p>Duración: {info.runtime} minutos</p>
               <p>Sinopsis: {info.overview}</p>
               <p>Genero:{info.genres ? info.genres.map(genero => genero.name): "No tiene genero"}</p>
               {cookies.get("user-auth-cookie") && (
                    this.state.esFavorito ? (
                        <button onClick={this.eliminarDeFavoritos}>♡ Quitar de favoritos</button>
                    ) : (
                        <button className="btn-fav alert-primary" onClick={() => this.agregarAFavoritos()}>♡</button>))}
               <Footer/>
            </>
        )
    }
}

export default Detalle; 
