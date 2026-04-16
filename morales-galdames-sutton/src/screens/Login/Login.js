import React, { Component } from "react";
import Cookies from "universal-cookie";
import "./Login.css";

const cookies = new Cookies();

class Login extends Component {

  state = {
    email: "",
    password: "",
    error: ""
  };

  controlarEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  controlarPassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  iniciarSesion(event) {
    event.preventDefault();

    let usuarios = localStorage.getItem("usuarios");

    if (usuarios !== null) {
      usuarios = JSON.parse(usuarios);
    } else {
      usuarios = [];
    }

    let usuarioCorrecto = usuarios.filter(usuario =>
      usuario.email === this.state.email &&
      usuario.password === this.state.password
    );

    if (usuarioCorrecto.length === 0) {
      this.setState({
        error: "Credenciales incorrectas"
      });
      return;
    }

    cookies.set("user-auth-cookie", this.state.email);

    this.setState({
      email: "",
      password: "",
      error: ""
    });

    this.props.history.push("/");
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>

          <form className="login-form" onSubmit={(event) => this.iniciarSesion(event)}>
            <label>Email:</label>
            <input
              type="email"
              value={this.state.email}
              onChange={(event) => this.controlarEmail(event)}/>

            <label>Password:</label>
            <input
              type="password"
              value={this.state.password}
              onChange={(event) => this.controlarPassword(event)}/>

            <button type="submit">Iniciar sesión</button>
          </form>
          {this.state.error !== "" ? (<p className="login-error">{this.state.error}</p>) : null}
        </div>
      </div>
    );
  }
}

export default Login;