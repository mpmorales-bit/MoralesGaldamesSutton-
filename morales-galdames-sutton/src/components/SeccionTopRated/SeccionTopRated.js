import { Component } from "react"
import { withRouter} from 'react-router-dom'
import Peliculas from "../Peliculas/Peliculas";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class SeccionTopRated extends Component{
    constructor(){
        super();
        this.state = { movies: [] }
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=0df8d28c1011b391dfb589da529c8b22')
        .then( response => response.json() )
        .then( data => this.setState({movies: data.results}) )
        .catch( error => console.log(error))
    }
    
    render(){
        const topRated = this.state.movies

        return(
        <>
        <section className="row cards" id="movies">
            {topRated.filter((pelicula, idx) => idx < 4).map((pelicula, idx) => 
            <Peliculas key={pelicula.id} 
                        src={`https://image.tmdb.org/t/p/w500` + pelicula.poster_path} 
                        name={pelicula.title} 
                        description={pelicula.overview} 
                        detalle={pelicula.id} 
                        tipo="movie" />
            )}
            <Link to="/TopRated">Ver todas</Link>
        </section>
        </>
        )
    }
}

export default withRouter(SeccionTopRated)