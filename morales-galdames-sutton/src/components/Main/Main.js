import React, { Component } from "react";

class Main extends Component{
    constructor(){
        super();
        this.state = {
            populares: [],
            cartel: [],
            busqueda: "",
        }
    }

    componentDidMount(){
        fetch('')
        .then( response => response.json() )
        .then( data => this.setState({populares: data.results}) )
        .catch( error => console.log(error))

        fetch('')
        .then( response => response.json() )
        .then( data => this.setState({cartel: data.results}) )
        .catch( error => console.log(error))
    }

    evitarSubmit(e){
        e.preventDefault();
    }

    controlarCambios(e){
        this.setState({busqueda: e.target.value})
    }

    flitrarPelicula(textoAFiltrar){
        return(
            this.state.datos.filter((personaje) => personaje.name.toLowerCase())
        )
    }

    render(){
        const populares = this.state.populares
        const carteles = this.state.cartel
        const peliculasFiltradas = this.filtrarPelicula(this.state.busqueda)

        return(
            <>
            <form onSubmit={(e) => this.evitarSubmit(e)}>
                <input type="text" onChange={(e) => this.controlarCambios(e)} value={this.state.busqueda} placeholder="Buscar películas..."/>
            </form>

            {this.state.busqueda === ""? (
                <>
                    <h2 className="alert alert-primary">Popular movies this week</h2>
                    <section className="row cards" id="movies">
                        {populares.map((number, idx) => (
                        <Popular key={idx} src={a} name={a} description={a} detalle={a} />
                        ))}
                    </section>

                    <h2 className="alert alert-primary">Movies now playing</h2>
                    <section className="row cards" id="now-playing">
                        {carteles.map((number, idx) => (
                        <Cartel key={idx} src={a} name={a} description={a} detalle={a} />
                        ))}
                    </section>
                </>
            ) : (
                <>
                <h2 className="alert alert-primary"> Resultados para: {this.state.busqueda}</h2>
                <section className="row cards" id="now-playing">
                    {carteles.map((number, idx) => (
                    <Cartel key={idx} src={a} name={a} description={a} detalle={a} />
                    ))}
                </section>
                </>
            )}
            </>
        )
    }
}

export default Main