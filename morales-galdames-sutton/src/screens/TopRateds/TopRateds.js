import { useState, useEffect } from 'react'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Peliculas from '../../components/Peliculas/Peliculas';

function TopRateds(){

    const[movies, setMovies] = useState([])
    const[page, setPage] = useState(1)
    const[busqueda, setBusqueda] = useState('')

    useEffect( () => {
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=0df8d28c1011b391dfb589da529c8b22')
        .then( response => response.json() )
        .then( data => setMovies(data.results) )
        .catch( error => console.log(error))
    }, [])

    function evitarSubmit(e){
        e.preventDefault();
    }

    function controlarCambios(e){ 
        setBusqueda(e.target.value)
    }

    function filtrarPeliculas(textoAFiltrar){
        return movies.filter(personaje =>
            personaje.title.toLowerCase().includes(textoAFiltrar.toLowerCase())
        )
    }

    function cargarMas(){
        let nuevaPage = page + 1

        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=0df8d28c1011b391dfb589da529c8b22&page=${nuevaPage}`)
        .then( response => response.json() )
        .then( data => { 
            setPage(nuevaPage)
            setMovies(movies.concat(data.results))  
        })
        .catch( error => console.log(error))
    }

        const peliculasFiltradas = filtrarPeliculas(busqueda)

        return(
            <>
            <Header/>
            <h1>Top rated</h1>
            <form className='form' onSubmit={(e) => evitarSubmit(e)}>
                <input type='text' onChange={(e) => controlarCambios(e)} value={busqueda} placeholder="Buscar películas..."/>
            </form>
            <section className='row cards'>
                {
                peliculasFiltradas.map((pelicula, idx) => (
                    <Peliculas key={pelicula + idx} 
                        src={`https://image.tmdb.org/t/p/w500` + pelicula.poster_path} 
                        name={pelicula.title} 
                        description={pelicula.overview} 
                        detalle={pelicula.id}
                        tipo="movie" 
                        />
                    ))}
            </section>
            <button onClick={() => cargarMas()}>Cargar mas</button>
            <Footer/>
            </>
        )
    }

export default TopRateds