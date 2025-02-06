import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const token = store.token;

	const handleLogout = () => {
		//Eliminamos el token y el usuario del store y localStorage
		actions.setAuth(null, null);
	};

	//Comprobamos si esxiste el token
	if (!token) {
		//Si no existe:
		return (
			<nav className="d-flex m-3">
				<Link to="/" className="ms-3">
					<h1>Home</h1>
				</Link>
				<div className="pt-3 justify-content-end nav">
					<Link to="/login">
						<span className="navbar-brand mb-0 h1">Login</span>
					</Link>
					<Link to="/signup">
						<span className="navbar-brand mb-0 h1">Register</span>
					</Link>
				</div>
			</nav>
		);
	} else {
		//Si existe
		return (
			<nav className="d-flex m-3">
				<Link to="/" className="col-md-10">
					<h1>Home</h1>
				</Link>
				<div className="pt-3 justify-content-end nav">
					<Link to="/">
						<span className="navbar-brand mb-0 h1" onClick={handleLogout}>
							Cerrar sesión
						</span>
					</Link>
				</div>
			</nav>
		);
	}
};
