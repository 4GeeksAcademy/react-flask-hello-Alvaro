import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [token, setToken] = useState()
	useEffect(() => {
		setToken(localStorage.getItem("token"))
	}, [store.token])
	const handleLogout = () => {
		localStorage.removeItem("token")
		actions.actualizador()
	}

	if (token === null || token === "" || token == "undefined") {
		return (
			<nav className="d-flex m-3">
				<Link to="/" className="ms-3">
					<h1>Home</h1>
				</Link>
				<div className="pt-3 justify-content-end nav">
					<Link to="/login" >
						<span className="navbar-brand mb-0 h1">Login</span>
					</Link>
					<Link to="/signup">
						<span className="navbar-brand mb-0 h1">Register</span>
					</Link>
				</div>
			</nav>
		);
	} else {
		return (
			<nav className="d-flex m-3">
				<Link to="/" className="col-md-10">
					<h1>Home</h1>
				</Link>
				<div className="pt-3 justify-content-end nav">
					<Link to="/">
						<span className="navbar-brand mb-0 h1" onClick={() => handleLogout()}>Cerrar sesion</span>
					</Link>
				</div>

			</nav>
		)
	}

};
