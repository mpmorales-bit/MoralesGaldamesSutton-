import { Component } from 'react'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Peliculas from '../../components/Peliculas/Peliculas';

class Toprateds extends Component{
    constructor(){
        super();
        this.state = { 
            movies: [],
            busqueda: ''
        }
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=0df8d28c1011b391dfb589da529c8b22')
        .then( response => response.json() )
        .then( data => this.setState({ movies: data.results }) )
        .catch( error => console.log(error))
    }

    evitarSubmit(e){
        e.preventDefault();
    }

    controlarCambios(e){ 
        this.setState({busqueda: e.target.value})
        console.log(this.state)
    }

    filtrarPeliculas(textoAFiltrar){
        return this.state.movies.filter(personaje =>
            personaje.title.toLowerCase().includes(textoAFiltrar.toLowerCase())
        )
    }

    render(){
        const peliculas = this.state.movies
        const peliculasFiltradas = this.filtrarPeliculas(this.state.busqueda)

        return(
            <>
            <Header/>
            <h1>Top rated</h1>
            <form className='form' onSubmit={(e) => this.evitarSubmit(e)}>
                <input type='text' onChange={(e) => this.controlarCambios(e)} value={this.state.busqueda} placeholder="Buscar películas..."/>
            </form>
            <section className='row cards'>
                {
                peliculasFiltradas.map((pelicula, idx) => (
                    <Peliculas key={pelicula + idx} 
                        src={`https://image.tmdb.org/t/p/w500` + pelicula.poster_path} 
                        name={pelicula.title} 
                        description={pelicula.overview} 
                        detalle={pelicula.id} />
                    ))}
            </section>
            <button >Cargar mas</button>
            <Footer/>
            </>
        )
    }
}

export default Toprateds