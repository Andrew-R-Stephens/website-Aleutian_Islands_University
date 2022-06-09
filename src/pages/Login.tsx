import React, {Fragment} from 'react';
import '../App.css';
import SideBar from "../HideBar";
import {Link} from "react-router-dom";
import NavButton from "../NavButton";

function Login() {

    return (
        <Fragment>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/about"}>About</Link></li>
                <li><Link to={"/login"}>Login</Link></li>
            </ul>
            <SideBar/>
            <NavButton title = {"Login to Profile"} url = {"/Profile"}>
                <p>This is the Login page.</p>
            </NavButton>
        </Fragment>
    );
}

export default Login;