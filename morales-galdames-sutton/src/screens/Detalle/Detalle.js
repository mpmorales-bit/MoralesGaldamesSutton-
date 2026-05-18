import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cookies from "universal-cookie";
import Loader from "../../components/Loader/Loader";
import "./Detalle.css";
import {useState, useEffect} from "react";

const cookies = new Cookies();

function Detalle (props){
    const [informacion, setInformacion] = useState(null);
    const [cargando, setCargando ] = useState(true);
    const [esFavorito, setEsFavorito] = useState(false);

    useEffect(() => {
        const id = props.match.params.id;
        let tipo = props.match.params.tipo;

        fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=c20d2da133e58ff4cdd61efde80a09ce`)
            .then(response => response.json())
            .then(data => {
                let yaEsFavorito = estaEnFavoritos(data.id);
                
                setInformacion(data);
                setCargando(false);
                setEsFavorito(yaEsFavorito);
            })
            .catch(error => console.log(error));    
    }, []);

    function estaEnFavoritos(id) {
        let favoritos = localStorage.getItem("favoritos");
        favoritos = (favoritos === null) ? [] : JSON.parse(favoritos);

        let encontrado = favoritos.filter(fav => fav.id === id);
        return encontrado.length > 0;
    }

    function agregarAFavoritos() {
        if (esFavorito) {
            alert("Ya está en favoritos");
            return;
        }

        let favoritos = localStorage.getItem("favoritos");
        favoritos = (favoritos === null)? [] : JSON.parse(favoritos);

        let tipo = props.match.params.tipo;

        let favorito = {
            id : informacion.id,
            titulo : tipo === "movie" ? informacion.title : informacion.name,
            tipo : tipo,
            poster_path : informacion.poster_path
        };
        
        favoritos.push(favorito);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    
        setEsFavorito(true);
        alert("Lo agregaste a favoritos!");
    };

    function eliminarDeFavoritos() {
        let favoritos = JSON.parse(localStorage.getItem("favoritos"));
        let favoritoNuevo = favoritos.filter(fav => fav.id !== informacion.id);

        localStorage.setItem("favoritos", JSON.stringify(favoritoNuevo));
        
        setEsFavorito(false);
        alert("Lo eliminaste de favoritos");
    }


   
    if (cargando) return <Loader />;

    let info = informacion;
    let tipo = props.match.params.tipo;

        return(
            <>
               <Header />
               <section className="container-detalle">
                    <img className="imagen-detalle" src={`https://image.tmdb.org/t/p/w500${info.poster_path}`} alt= {tipo === "movie" ? info.title : info.name}/>

                    <article className="info-detalle">
                        <h1 className="titulo-detalle">{tipo === "movie" ? info.title : info.name}</h1>
                        <p><strong>Calificacion:</strong> {info.vote_average}</p>
                        <p><strong>Fecha de estreno:</strong> {tipo === "movie" ? info.release_date : info.first_air_date}</p>
                        {tipo === "movie" && (<p><strong>Duración: </strong> {info.runtime} minutos</p>)}
                        <p><strong>Sinopsis:</strong> {info.overview}</p>
                        <p><strong>Genero:</strong>{info.genres ? info.genres.map(genero => genero.name + ", "): "No tiene genero"}</p>
                        {cookies.get("user-auth-cookie") && (
                             esFavorito ? (
                                 <button onClick={eliminarDeFavoritos}>♡ Quitar de favoritos</button>
                             ) : (
                                 <button onClick={() => agregarAFavoritos()}>♡</button>))}
                    </article>
                </section>
                <Footer/>
            </>
        )
    }


export default Detalle; 
