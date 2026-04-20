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
            cargando : true
        };
    }
    componentDidMount(){
        const id = this.props.match.params.id;

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0df8d28c1011b391dfb589da529c8b22`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                informacion: data,
                cargando : false})
            })
            .catch(error => console.log(error))
    }

    agregarFavorito(){
        let favoritos = localStorage.getItem("favoritos");
        (favoritos === null)? favoritos=[] : favoritos=JSON.parse(favoritos);

        let info = this.state.informacion;

        let favorito = {
            id : info.id,
            titulo : info.title,
            tipo : "movie",
            poster_path : info.poster_path
        };
        
        favoritos.push(favorito);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }

    render(){
        if (this.state.informacion === null){
            return <Loader />;
        }

        let info = this.state.informacion;

        return(
            <>
               <Header />
               <img src={`https://image.tmdb.org/t/p/w480/${info.poster_path}`} alt={info.title}/>
               <h1>{info.title}</h1>
               <p>Calificacion: {info.vote_average}</p>
               <p>Fecha de estreno: {info.release_date}</p>
               <p>Duración: {info.runtime} minutos</p>
               <p>Sinopsis: {info.overview}</p>
               <p>Genero:{info.genres ? info.genres.map(genero => genero.name): "No tiene genero"}</p>
               {cookies.get("user-auth-cookie") !== "undefined" ? <button onClick={() => this.agregarFavorito()}>Agregar a favoritos</button> : null}
               <Footer/>
            </>
        )
    }
}

export default Detalle; 
