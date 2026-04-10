import { Link } from "react-router-dom/cjs/react-router-dom.min"

function Peliculas(props){
    return(
        <>
        <article className="single-card-playing">
                <img src={props.src} className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.description}</p>
                    <Link to={`/detalles/${props.detalle}`} className="btn btn-primary">Ir a detalle</Link>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
        </>
    )
}

export default Peliculas