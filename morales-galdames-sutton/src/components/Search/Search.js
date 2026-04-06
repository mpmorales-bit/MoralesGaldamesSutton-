import React, { Component } from "react"
import { withRouter } from 'react-router-dom'

class Search extends Component{
    constructor(){
        super();
        this.state = {
            busqueda: ''
        }
    }

    evitarSubmit(e){
        e.preventDefault();
        this.props.history.push("/resultados/" + this.state.busqueda)
    }

    controlarCambios(e){
        this.setState({busqueda: e.target.value})
    }

    return(){
        render(
            <>
                <form onSubmit={(e) => this.evitarSubmit(e)}>
                    <input type="text" onChange={(e) => this.controlarCambios(e)} value={this.state.busqueda} placeholder="Buscar películas..."/>
                </form>
            </>
        )
    }
}
export default withRouter(Search)