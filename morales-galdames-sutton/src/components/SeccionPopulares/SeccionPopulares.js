import React, { Component } from "react"
import Popular from "../Popular/Popular";

class SeccionPopulares extends Component{
    constructor(){
        super();
        this.state = { movies: [] }
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=0df8d28c1011b391dfb589da529c8b22')
        .then( response => response.json() )
        .then( data => this.setState({movies: data.results}) )
        .catch( error => console.log(error))
    }

    render(){
        const populares = this.state.movies

        return(
        <>
        <section className="row cards" id="movies">
            {populares.filter((movie, idx) => idx < 4).map((pelicula, idx) => (
            <Popular key={pelicula + idx} 
                        src={pelicula.poster_path} 
                        name={pelicula.title} 
                        description={pelicula.overview} 
                        detalle={pelicula.id} />
            ))}
        </section>
        </>
        )
    }
}

export default SeccionPopulares