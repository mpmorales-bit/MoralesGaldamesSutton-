import { Component } from 'react'

class Populares extends Component{
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

    return(){
        const peliculas = this.state.movies
        const peliculasFiltradas = this.filtrarPeliculas(this.state.busqueda)

        render(
            <>
            <form onSubmit={(e) => this.evitarSubmit(e)}>
                <label>Buscador</label>
                <input type='text' onChange={(e) => this.controlarCambios(e)} value={this.state.busqueda}/>
            </form>
            <section className='cardContainer'>
                {
                peliculasFiltradas.map((peliculas, idx) => (
                    <RMcard key={peliculas + idx} 
                        src={peliculas.image} 
                        name={peliculas.name} 
                        status={peliculas.status}
                        species={peliculas.species}
                        origin={peliculas.origin.name}
                        id={peliculas.id}/>
                    ))}
            </section>
            <button >Cargar mas</button>
            </>
        )
    }
}