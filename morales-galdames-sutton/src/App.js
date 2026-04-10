import React from "react";

import { Switch, Route } from 'react-router-dom'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CrearCuenta from "./components/CrearCuenta/CrearCuenta";
import Resultados from "./components/Resultados/Resultados";
import Home from "./screens/Home/Home";
import Favoritos from "./screens/Favoritos/Favoritos";
import Login from "./screens/Login/Login";
import Populares from "./components/Populares/Populares";
import Toprateds from "./components/TopRateds/TopRateds";


function App() {
return(
    <>
    <Header/>
    <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/Favoritos" component={Favoritos}/>
        <Route path="/Login" component={Login}/>
        <Route path="/CrearCuenta" component={CrearCuenta}/>
        <Route path="/Populares" component={Populares}/>
        <Route path="/Toprated" component={Toprateds}/>
        <Route path="/Resultados/:busqueda" component={Resultados}/>
    </Switch>
    <Footer/>
    </>
)
}

export default App

//