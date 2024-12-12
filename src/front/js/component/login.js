import React, { Component, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleUsuario = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value)
    };

    const fetchLogin = () => {
        actions.actualizador();
        if (username == "" || password == "") {
            alert("Debes rellenar todos los campos")
        } else {
            const usuario = {
                "username": username,
                "password": password,
            }
            fetch(process.env.BACKEND_URL + "/api/login", {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify(usuario)
            })
                .then(response => response.json())
                .then(response => {localStorage.setItem("token", response.token)
                    localStorage.setItem("user", response.user.username)
                })
            navigate("/")
        }
    }



    return (
        <div className="formulario">
            <h1>Acceso</h1>
            <form action="">
                <div>
                    <label className="form-label">Username</label>
                    <input className="form-control" onChange={handleUsuario} type="text" name="usuario" placeholder="Usuario" required />
                </div>
                <div>
                    <label className="form-label">Password</label>
                    <input className="form-control" onChange={handlePassword} type="password" placeholder="Contraseña" name="password" required />
                </div>
                <button type="submit" title="Login" name="Login" onClick={() => {fetchLogin()}}>Login</button>
            </form>
            <Link to="/signup">¿No tienes Cuenta? Registrate</Link>
        </div>
    )
}