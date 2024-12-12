import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [token, setToken] = useState()
	useEffect(() => {
		setToken(localStorage.getItem("token"))
	}, [store.token])
	
	if (token === null || token === "" || token == "undefined") {
		return (
			<div className="text-center mt-5">
				<h1>Bienvenido a mi pagina Web</h1>
				<p>Para registrase deberá hacer click en el boton de arriba a la derecha que está hecho a tal efecto</p>
				<p>Para logearse si ya tiene usuario deberá hacer click en el boton de arriba a la derecha que está hecho a tal efecto</p>
			</div>
		);
	}else{
		return (
			<div className="text-center mt-5">
				<h1>Bienvenido a mi pagina Web, {localStorage.getItem("user")}</h1>
				<p>Para cerrar sesion deberá hacer click en el boton de arriba a la derecha que está hecho a tal efecto</p>
			</div>
		);
	}
	
};
