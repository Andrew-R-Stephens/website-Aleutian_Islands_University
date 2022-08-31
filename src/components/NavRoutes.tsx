import React, {Fragment, useState} from 'react';
import {Route, Router, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Student from "../pages/account/Student";
import About from "../pages/About";
import Login from "../pages/Login";
import Account from "../pages/account/Account";
import Profile from "../pages/account/Profile";
import ErrorPage from "../pages/ErrorPage";
import '../css/NavRoutes.css';
import ImageBanner from "./ImageBanner";
import HomeFooter from "./HomeFooter";
import {AuthContext} from "../contexts/AuthContext";

function NavRoutes() {

    const [id, setID] = useState("-1");

    return (
        <Fragment>
            <ImageBanner className={"banner-logo"}/>
            <AuthContext.Provider value={{id, setID}}>
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
            </AuthContext.Provider>
            <HomeFooter/>
        </Fragment>
    );
}

export default NavRoutes;
