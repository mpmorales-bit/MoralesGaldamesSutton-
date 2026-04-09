import {Component} from 'react';

class CrearCuenta extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    enviarFormulario(event) {
        event.preventDefault();

        let guardarUsuarios = localStorage.getItem("usuarios");
        let usuarios = guardarUsuarios === null ? [] : JSON.parse(guardarUsuarios);
        
        if (this.state.password.length < 6) {
            this.setState({
                error: "La contraseña debe tener mínimo 6 caracteres"
            });
            return;
        }

        let emails = usuarios.map((usuario) => usuario.email);

        let mailExistente = false;
        for (let i=0; i < emails.length; i++){
            if (emails[i] === this.state.email) {
                mailExistente=true;
            }
        }

        if (mailExistente) {
            this.setState ({ 
                error : "El email ya está registrado"
            });
            return;
        }

        let usuarioNuevo = {
            email : this.state.email,
            password : this.state.password
        };
        usuarios.push(usuarioNuevo);

        localStorage.setItem("usuarios",JSON.stringify(usuarios));

        this.setState({
            email : "",
            password:"",
            error : ""
        });

        alert ("La cuenta fue creada correctamente");
    }

        controlarMail(event){
            this.setState({
                email : event.target.value,
                error : ""
            })
        }

        controlarContraseña(event){
            this.setState({
                password : event.target.value,
                error: ""
            })
        }

        render(){
            return(
                <form onSubmit={(event)=> this.enviarFormulario(event)}>
                    <input type="email" placeholder="Email" value={this.state.email} onChange={(event) => this.controlarMail(event)}/>
                    <input type="password" placeholder="Password" value={this.state.password} onChange={(event) => this.controlarContraseña(event)}/>
                    <button type="submit">Crear cuenta</button>
                    {this.state.error !== "" ? <p>{this.state.error}</p> : ""}
                </form>
            );
        }

    
}    

export default CrearCuenta;

