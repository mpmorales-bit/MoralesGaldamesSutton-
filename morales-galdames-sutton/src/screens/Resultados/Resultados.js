import Peliculas from '../../components/Peliculas/Peliculas';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Loader from "../../components/Loader/Loader";
import './Resultados.css';
import {useState, useEffect} from "react";

function Resultados(props){
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const busqueda = props.match.params.busqueda;
    const tipo = props.match.params.tipo;
    

    fetch(`https://api.themoviedb.org/3/search/${tipo}?query=${busqueda}&api_key=0df8d28c1011b391dfb589da529c8b22`)
      .then(res => res.json())
      .then(data => {
        setResultados(data.results);
      });
  }, []);

  return (
        <>
        <div className="pagina-resultados">
        <Header/>
        <main className="container-resultados">
          <h1 className="titulo-resultados">Resultados de busqueda:</h1>
            <section className="row-cards-peliculas">
                {resultados.length === 0 ? 
                <div className="container-loader">
                <Loader/> 
                </div> :
                    resultados.map((pelicula, idx) => (
                      <Peliculas key={pelicula.id + idx} 
                        src={`https://image.tmdb.org/t/p/w500` + pelicula.poster_path}
                        name= {pelicula.title || pelicula.name}
                        description={pelicula.overview} 
                        detalle={pelicula.id} 
                        tipo={props.match.params.tipo}
                      />
                ))}
            </section>
          </main>
          <Footer/>
        </div>
      </>
    )
  }

export default Resultados
