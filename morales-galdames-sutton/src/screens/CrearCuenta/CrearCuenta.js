import "./CrearCuenta.css";
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import {useState} from "react";

function CrearCuenta(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState = ("");

    function enviarFormulario(event) {
        event.preventDefault();
        
        if (password.length < 6) {
            setError("La contraseña debe tener mínimo 6 caracteres")
            return;
        }

        let guardarUsuarios = localStorage.getItem("usuarios");
        let usuarios = guardarUsuarios === null ? [] : JSON.parse(guardarUsuarios);
        

        let emails = usuarios.map((usuario) => usuario.email);

        let mailExistente = false;
        for (let i=0; i < emails.length; i++){
            if (emails[i] === email) {
                mailExistente=true;
            }
        }

        if (mailExistente) {
            setError("El email ya está registrado");
            return;
        }

        let usuarioNuevo = {
            email : email,
            password : password
        };
        usuarios.push(usuarioNuevo);

        localStorage.setItem("usuarios",JSON.stringify(usuarios));

        setEmail("");
        setPassword("");
        setError("");

        props.history.push("/login")
    }

    function controlarMail(event){
        setEmail(event.target.value);
        setError("");
    }

    function controlarContraseña(event){
        setPassword(event.target.value);
        setError("");
    }

    return(
        <>
            <Header/>
            <div className="crearcuenta-container">
            <div className="crearcuenta-box">
                <h2 className="crearcuenta-title">Crear cuenta</h2>
                <form className="crearcuenta-form" onSubmit={(event)=> enviarFormulario(event)}>
                    <label>Email:</label>
                    <input 
                      type="email"  
                      value={email} 
                      onChange={(event) => controlarMail(event)}/>
                    <label>Password:</label>
                    <input 
                      type="password" 
                      value={password} 
                      onChange={(event) => controlarContraseña(event)}/>
                    <button type="submit">Crear cuenta</button>
                    {error !== "" ? <p className="mensaje-error">{error}</p> : ""}
                </form>
                </div>
                </div>
                <Footer/>
                </>
    );
}


export default CrearCuenta;

