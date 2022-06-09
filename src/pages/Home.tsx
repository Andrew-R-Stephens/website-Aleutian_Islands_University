import React, {Fragment} from 'react';
import '../App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import logo from "../logo.svg";
import {QueryClient, QueryClientProvider} from "react-query";
import TableRequest from "../TableRequest";
import {ReactQueryDevtools} from "react-query/devtools";
import AppImageBanner from "../AppImageBanner";
import AppNavBanner from "../AppNavBanner";
import About from "./About";
import Login from "./Login";
import Profile from "./Profile";
import ErrorPage from "./ErrorPage";

const queryClient = new QueryClient();

function Home() {
    return (
        <Fragment>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/about"}>About</Link></li>
                <li><Link to={"/login"}>Login</Link></li>
            </ul>

            <header>
                <img src={logo} className="App-logo" alt="logo" />
                <p>Please press the button below to test the query script.</p>
                <QueryClientProvider client={queryClient}>
                    <TableRequest/>
                    <ReactQueryDevtools/>
                </QueryClientProvider>
            </header>
        </Fragment>
    );
}

export default Home;