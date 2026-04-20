import { Component } from "react"
import { withRouter } from 'react-router-dom'

class Search extends Component{
    constructor(){
        super();
        this.state = {
            busqueda: '',
            tipo: 'movie'
        }
    }

    evitarSubmit(e){
        e.preventDefault();
        this.props.history.push("/resultados/" + this.state.tipo + "/" + this.state.busqueda)
    } 

    controlarCambios(e){
        this.setState({busqueda: e.target.value})
    }

    controlarTipo(e){
        this.setState({
            tipo: e.target.value
        })
    }

    render(){
        return(
            <>
            
                <form className="form" onSubmit={(e) => this.evitarSubmit(e)}>
                    <select onChange={(e) => this.controlarTipo(e)} value={this.state.tipo}>
                        <option value="movie">Peliculas</option>
                        <option value="tv">Series</option>                    
                    </select>
                    <input type="text" onChange={(e) => this.controlarCambios(e)} value={this.state.busqueda} placeholder="Buscar películas..."/>
                    <button type="submit">Buscar</button>
                </form>
            </>
        )
    }
}   
export default withRouter(Search)