import React, {Fragment} from 'react';
import '../components/App.css';
import {Link} from "react-router-dom";
import LoginForm from "../components/LoginForm";

function Login() {

    return (
        <Fragment>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/about"}>About</Link></li>
                <li><Link to={"/login"}>Login</Link></li>
            </ul>
            <LoginForm/>
        </Fragment>
    );
}

export default Login;