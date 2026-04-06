import React, { Component } from "react"
import Popular from "../Popular/Popular";

class SeccionPopulares extends Component{
    constructor(){
        super();
        this.state = { movies: '' }
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=0df8d28c1011b391dfb589da529c8b22')
        .then( response => response.json() )
        .then( data => this.setState({movies: ''}) )
        .catch( error => console.log(error))
    }

    render(){
        populares = this.state.movies

        return(
        <>
        <section className="row cards" id="movies">
            {populares.filter((movie, idx) => idx < 4).map((movie, idx) => (
            <Popular key={idx} src={a} name={a} description={a} detalle={a} />
            ))}
        </section>
        </>
        )
    }
}

export default SeccionPopulares