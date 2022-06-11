import React, {Fragment} from 'react';
import './NavBanner.css';
import {BrowserRouter as Router, Routes, Route, Link, BrowserRouter} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ErrorPage from "../pages/ErrorPage";

function NavBanner() {

    return (
        <Fragment>
                <Routes>
                    <Route path={"/"} element={<Home/>} />
                    <Route path={"/about"} element={<About/>} />
                    <Route path={"/login"} element={<Login/>} />
                    <Route path={"/profile"} element={<Profile/>} />
                    <Route path={"/*"} element={<ErrorPage/>} />
                </Routes>
        </Fragment>
    );
}

export default NavBanner;
