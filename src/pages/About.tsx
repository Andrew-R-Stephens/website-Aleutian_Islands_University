import React from 'react';
import '../App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function About() {
    return (
        <header>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/about"}>About</Link></li>
                <li><Link to={"/login"}>Login</Link></li>
            </ul>
            <p>This is the About page.</p>
        </header>
    );
}

export default About;