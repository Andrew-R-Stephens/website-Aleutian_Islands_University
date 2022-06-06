import React from 'react';
import './AppNavBanner.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";

function AppNavBanner() {
    return (
        <div>
            <header>
                <Router>
                    <ul>
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/about"}>About</Link></li>
                        <li><Link to={"/login"}>Login</Link></li>
                    </ul>

                    <Routes>
                        <Route path={"/"} element={<Home/>} />
                        <Route path={"/about"} element={<About/>} />
                        <Route path={"/login"} element={<Login/>} />
                        <Route path={"/profile"} element={<Profile/>} />
                        <Route path={"/*"} element={<ErrorPage/>} />
                    </Routes>
                </Router>
            </header>
        </div>
    );
}

export default AppNavBanner;
