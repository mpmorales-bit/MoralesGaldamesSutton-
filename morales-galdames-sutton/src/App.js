import React from "react";

import { Switch, Route } from 'react-router-dom'
import Header from "./componentes/Header/Header";
import Footer from "./componentes/Footer/Footer";


function App() {
return(
    <>
    <Header/>
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

