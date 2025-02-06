import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
    const { store } = useContext(Context);
	//Como se actualiza al instante, nos traemos el token y el user del store
    const token = store.token;
    const user = store.user;

	//Comprobamos si esxiste el token
    if (!token) {
		//Si no existe:
        return (
            <div className="text-center mt-5">
                <h1>Bienvenido a mi página Web</h1>
                <p>Para registrarse, haga clic en el botón de arriba a la derecha.</p>
                <p>Para iniciar sesión, haga clic en el botón de arriba a la derecha.</p>
            </div>
        );
    } else {
		//Si existe
        return (
            <div className="text-center mt-5">
                <h1>Bienvenido a mi página Web, {user}</h1>
                <p>Para cerrar sesión, haga clic en el botón de arriba a la derecha.</p>
            </div>
        );
    }
};
