import React, {Fragment} from 'react';
import '../App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import logo from "../logo.svg";
import {QueryClient, QueryClientProvider} from "react-query";
import TableRequest from "../TableRequest";
import {ReactQueryDevtools} from "react-query/devtools";
import AppImageBanner from "../AppImageBanner";

const queryClient = new QueryClient();

function Home() {
    return (
        <Fragment>
            <div className={"App"}>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Please press the button below to test the query script.</p>
                    <QueryClientProvider client={queryClient}>
                        <TableRequest/>
                        <ReactQueryDevtools/>
                    </QueryClientProvider>
                </header>
            </div>
        </Fragment>
    );
}

export default Home;