import { Component } from 'react'
import Peliculas from '../Peliculas/Peliculas';

class Toprateds extends Component{
    constructor(){
        super();
        this.state = { 
            movies: [],
            busqueda: ''
        }
    }

    componentDidMount(){
        fetch('')
        .then( response => response.json() )
        .then( data => this.setState({ movies: '' }) )
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
        return this.state.datos.filter(personaje =>
            personaje.name.toLowerCase().includes(textoAFiltrar.toLowerCase())
        )
    }

    render(){
        const peliculas = this.state.movies
        const peliculasFiltradas = this.filtrarPeliculas(this.state.busqueda)

        return(
            <>
            <form onSubmit={(e) => this.evitarSubmit(e)}>
                <label>Buscador</label>
                <input type='text' onChange={(e) => this.controlarCambios(e)} value={this.state.busqueda}/>
            </form>
            <section className='cardContainer'>
                {
                peliculasFiltradas.map((pelicula, idx) => (
                    <Peliculas key={pelicula + idx} 
                        src={pelicula.poster_path} 
                        name={pelicula.title} 
                        description={pelicula.overview} 
                        detalle={pelicula.id} />
                    ))}
            </section>
            <button >Cargar mas</button>
            </>
        )
    }
}

export default Toprateds