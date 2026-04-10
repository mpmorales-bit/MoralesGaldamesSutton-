import { Component } from "react"

class DetalleDePelicula extends Component{
    constructor(props){
        super(props);
        this.state = { value: {}}
    }
    componentDidMount(){
        const id = this.props.match.params.id;

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0df8d28c1011b391dfb589da529c8b22`)
      .then(res => res.json())
      .then(data => {
        this.setState({ value: data })
      })
    }

    render(){
        const info = this.state.value
        return(
            <>
                <article className="single-card-playing">
                    <img src={`https://image.tmdb.org/t/p/w500` + info.poster_path} className="card-img-top"
                        alt="..."/>
                    <div className="cardBody">
                        <h5 className="card-title">{info.title}</h5>
                        <p className="card-text">{info.overview}</p>
                        <a href="" className="btn alert-primary">🩶</a>
                    </div>
                </article>
            </>
        )
    }
}

export default DetalleDePelicula