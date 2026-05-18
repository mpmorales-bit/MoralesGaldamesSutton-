import "./Search.css" ;
import {useState} from "react";
import { withRouter } from "react-router-dom";

function Search (props){
    const [busqueda, setBusqueda] = useState("");
    const [tipo, setTipo] = useState('movie');

    function evitarSubmit(e){
        e.preventDefault();
        props.history.push("/resultados/" + tipo + "/" + busqueda)
    } 

    function controlarCambios(e){
        setBusqueda(e.target.value);
    }

    function controlarTipo(e){
        setTipo(e.target.value);
    }

    return(
            <>
            
                <form className="form" onSubmit={(e) => evitarSubmit(e)}>
                    <select onChange={(e) => controlarTipo(e)} value={tipo}>
                        <option value="movie">Peliculas</option>
                        <option value="tv">Series</option>                    
                    </select>
                    <input type="text" onChange={(e) => controlarCambios(e)} value={busqueda} placeholder="Buscar películas..."/>
                    <button type="submit">Buscar</button>
                </form>
            </>
        )
    }
export default withRouter(Search);