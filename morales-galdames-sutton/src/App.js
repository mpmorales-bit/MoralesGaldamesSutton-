import React from "react";

import { Switch, Route } from 'react-router-dom'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


function App() {
return(
    <>
    <Header/>
    <h1>Hola</h1>
    <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/Favoritos" component={Favoritos}/>
        <Route path="/Login" component={Login}/>
        <Route path="/CrearCuenta" component={CrearCuenta}/>
        <Route path="/VerTodas" component={VerTodas}/>
    </Switch>
    <Footer/>
    </>
)
}

export default App

//