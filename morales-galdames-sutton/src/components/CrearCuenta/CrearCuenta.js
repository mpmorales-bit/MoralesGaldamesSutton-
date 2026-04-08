import {Component} from 'react';

class CrearCuenta extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            mensaje: ""
        };
    }

    enviarFormulario(event) {
        event.preventDefault();

        let guardarUsuarios = localStorage.getItem("usuarios");
        let usuarios = (usuarios === null) ? usuarios = [] : usuarios = JSON.parse(usuarios);
        
        let contraseña = (this.state.password.length < 6) ? 'La contraseña debe tener mínimo 6 caracteres' : "";

        let mailExistente = false;
        usuarios.map((usuario) => {
            (usuarios.email === email) ? mailExistente = true : "";
        });
    }    
}

