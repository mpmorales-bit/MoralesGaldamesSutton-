import { Component } from "react"
import { withRouter} from 'react-router-dom'
import TopRated from "../TopRated/TopRated";

class SeccionTopRated extends Component{
    constructor(){
        super();
        this.state = { movies: '' }
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=0df8d28c1011b391dfb589da529c8b22')
        .then( response => response.json() )
        .then( data => this.setState({movies: ''}) )
        .catch( error => console.log(error))
    }

    render(){
        topRated = this.state.movies

        return(
        <>
        <section className="row cards" id="movies">
            {topRated.filter((movie, idx) => idx < 4).map((movie, idx) => 
            <TopRated key={idx} src={a} name={a} description={a} detalle={a} />
            )}
        </section>
        </>
        )
    }
}

export default withRouter(SeccionTopRated)