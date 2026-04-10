import react, { Component } from 'react'
import Peliculas from '../Peliculas/Peliculas';

class Resultados extends Component{
  constructor(props){
    super(props);
    this.state = {
      resultados: []
    }
  }

  componentDidMount(){
    const busqueda = this.props.match.params.busqueda;

    fetch(`https://api.themoviedb.org/3/search/movie?query=${busqueda}&api_key=0df8d28c1011b391dfb589da529c8b22`)
      .then(res => res.json())
      .then(data => {
        this.setState({ resultados: data.results })
      })
  }

  render(){
    return (
        <>
            <h1>Resultados:</h1>
            <section className="row cards" id="movies">
                {this.state.resultados.map((pelicula, idx) => 
                <Peliculas key={pelicula + idx} 
                        src={`https://image.tmdb.org/t/p/w500` + pelicula.poster_path} 
                        name={pelicula.title} 
                        description={pelicula.overview} 
                        detalle={pelicula.id} />
                )}
            </section>
        </>
    )
  }
}

export default Resultados