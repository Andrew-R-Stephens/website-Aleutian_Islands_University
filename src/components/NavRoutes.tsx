import React, {Fragment} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Student from "../pages/account/Student";
import About from "../pages/About";
import Login from "../pages/Login";
import Account from "../pages/account/Account";
import Profile from "../pages/account/Profile";
import ErrorPage from "../pages/ErrorPage";
import './NavRoutes.css';
import ImageBanner from "./ImageBanner";
import HomeFooter from "./HomeFooter";

function NavRoutes() {

    return (
        <Fragment>
            <ImageBanner className={"banner-logo"}/>
            <Routes>
                <Route path={"/"} >
                    <Route index element={<Home/>}/>
                    <Route path={"/about"} element={<About/>} />
                    <Route path={"/login"} element={<Login/>} />
                    <Route path={"/account"}>
                        <Route index element={<Account/>}/>
                        <Route path={"profile"} element={<Profile/>} />
                        <Route path={"student"} element={<Student/>} />
                    </Route>
                </Route>
                <Route path={"/*"} element={<ErrorPage/>} />
            </Routes>
            <HomeFooter/>
        </Fragment>
    );
}

export default NavRoutes;
