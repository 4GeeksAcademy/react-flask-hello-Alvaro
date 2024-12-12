import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    const handleUsuario = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value)
    };
    const handleEmail = (event) => {
        setEmail(event.target.value)
    };

    const fetchRegister = () => {
        const usuario = {
            "username": username,
            "password": password,
            "email": email,
        }
        fetch(process.env.BACKEND_URL + "api/signup", {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(usuario)
        })
            .then(response => response.json())
            .then(response => console.log(response.response))
        navigate("/")
    }

    return (
        <div className="formulario">
            <h1>Registro</h1>
            <h5>Recuerda que una vez registrado deberás iniciar sesión</h5>

            <form action="">
                <div>
                    <label className="form-label">Username</label>
                    <input className="form-control" onChange={handleUsuario} type="text" name="username" placeholder="username" required />
                </div>
                <div>
                    <label className="form-label">Email</label>
                    <input className="form-control" onChange={handleEmail} type="text" name="email" placeholder="email" required />
                </div>
                <div>
                    <label className="form-label">Password</label>
                    <input className="form-control" onChange={handlePassword} type="password" placeholder="password" name="password" required />
                </div>
                <button type="submit" title="Registrarse" name="Registrarse" onClick={() => fetchRegister()}>Registrarse</button>
            </form>
            <Link to="/login">¿Ya tienes cuenta? Inicia sesion</Link>
        </div>
    )
}