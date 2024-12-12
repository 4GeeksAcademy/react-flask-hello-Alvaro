import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import { Single } from "./single";
import { Signup } from "../component/signup";
import { Login } from "../component/login";

export const Formulario = () => {
    const params = useParams();

    if (params.opcion === "login") {
        return (
            <Login />
        )
    } else if (params.opcion === "signup") {
        return (
            <Signup />
        )
    }
};
