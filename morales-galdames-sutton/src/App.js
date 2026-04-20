import React from "react";
import { Switch, Route } from 'react-router-dom'
import CrearCuenta from "./screens/CrearCuenta/CrearCuenta";
import Resultados from "./screens/Resultados/Resultados";
import Home from "./screens/Home/Home";
import Favoritos from "./screens/Favoritos/Favoritos";
import Login from "./screens/Login/Login";
import Populares from "./screens/Populares/Populares";
import Toprateds from "./screens/TopRateds/TopRateds";
import Detalle from "./screens/Detalle/Detalle";
import "./App.css";
import NotFound from "./screens/NotFound/NotFound";

function App() {
return(
    <>
    <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/Favoritos" component={Favoritos}/>
        <Route path="/Login" component={Login}/>
        <Route path="/CrearCuenta" component={CrearCuenta}/>
        <Route path="/Populares" component={Populares}/>
        <Route path="/Toprated" component={Toprateds}/>
        <Route path="/resultados/:tipo/:busqueda" component={Resultados}/>
        <Route path="/Detalle/:tipo/:id" component={Detalle}/>
        <Route path="" component={NotFound}/>
    </Switch>
    </>
)
}

export default App
