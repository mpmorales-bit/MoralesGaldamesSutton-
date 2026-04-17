import {Component} from 'react';
import "./CrearCuenta.css";

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
        
        if (this.state.password.length < 6) {
            this.setState({
                error: "La contraseña debe tener mínimo 6 caracteres"
            });
            return;
        }

        let guardarUsuarios = localStorage.getItem("usuarios");
        let usuarios = guardarUsuarios === null ? [] : JSON.parse(guardarUsuarios);
        

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

        this.props.history.push("/login")
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
                <div className="crearcuenta-container">
                <div className="crearcuenta-box">
                <h2 className="crearcuenta-title">Crear cuenta</h2>
                <form className="crearcuenta-form" onSubmit={(event)=> this.enviarFormulario(event)}>
                    <input type="email" placeholder="Email" value={this.state.email} onChange={(event) => this.controlarMail(event)}/>
                    <input type="password" placeholder="Password" value={this.state.password} onChange={(event) => this.controlarContraseña(event)}/>
                    <button type="submit">Crear cuenta</button>
                    {this.state.error !== "" ? <p className="mensaje-error">{this.state.error}</p> : ""}
                </form>
                </div>
                </div>
            );
        }

    
}    

export default CrearCuenta;

