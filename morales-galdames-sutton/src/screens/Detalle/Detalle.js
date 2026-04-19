import {Component} from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Detalle extends Component{
    constructor(props){
        super(props);
        this.state = {
            informacion : null
        }  
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        let tipo = this.props.match.params.tipo;

        fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=c20d2da133e58ff4cdd61efde80a09ce`)
            .then(response => response.json())
            .then(data => {this.setState({informacion: data})})
            .catch(error => console.log(error))
    }

    agregarFavorito(){
        let favoritos = localStorage.getItem("favoritos");
        (favoritos === null)? favoritos=[] : favoritos=JSON.parse(favoritos);

        let info = this.state.informacion;
        let tipo = this.props.match.params.tipo;

        let favorito = {
            id : info.id,
            titulo : tipo === "movie" ? info.title : info.name,
            tipo : tipo,
            poster_path : info.poster_path
        }
        
        favoritos.push(favorito);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }

    render(){
        if (this.state.informacion === null){
            return <p>Cargando...</p>
        }

        let info = this.state.informacion;
        let tipo = this.props.match.params.tipo;

        return(
            <>
               <Header />
               <img src={`https://image.tmdb.org/t/p/w480/${info.poster_path}`} alt={tipo === "movie" ? info.title : info.name}/>
               <h1>{tipo === "movie" ? info.title : info.name}</h1>
               <p>Calificacion: {info.vote_average}</p>
               <p>Fecha de estreno: {tipo ==="movie" ? info.release_date : info.first_air_date}</p>
               {tipo === "movie" ? <p>Duración: {info.runtime} minutos</p> : null}
               <p>Sinopsis: {info.overview}</p>
               <p>Genero:{info.genres.map(genero => genero.name + ", ")}</p>
               {cookies.get("user-auth-cookie") !== undefined ? <button onClick={() => this.agregarFavorito()}>Agregar a favoritos</button> : null}
               <Footer/>
            </>
        )
    }
}

export default Detalle; 
