import { useState, useEffect } from "react"
import Peliculas from "../Peliculas/Peliculas";
import { Link } from "react-router-dom";

function SeccionPopulares(){

    const[movies,setMovies] = useState([])

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=0df8d28c1011b391dfb589da529c8b22')
        .then( response => response.json() )
        .then( data => setMovies(data.results) )
        .catch( error => console.log(error))
    }, [])
    
        const populares = movies

        return(
        <>
        <section className="row cards" id="movies">
            {populares.filter((pelicula, idx) => idx < 4).map((pelicula, idx) => (
            <Peliculas key={pelicula.id} 
                        src={`https://image.tmdb.org/t/p/w500` + pelicula.poster_path} 
                        name={pelicula.title} 
                        description={pelicula.overview} 
                        detalle={pelicula.id}
                        tipo="movie" />
            ))}
            <Link to="/Populares">Ver todas</Link>
        </section>
        </>
        )
    }

export default SeccionPopulares