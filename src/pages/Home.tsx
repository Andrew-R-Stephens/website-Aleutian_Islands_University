import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import logo from "../res/logo.svg";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import Table from "../components/RequestTable";

const queryClient = new QueryClient();

function Home() {
    return (
        <Fragment>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/about"}>About</Link></li>
                <li><Link to={"/login"}>Login</Link></li>
            </ul>

            <div className={'App'}>
                <img src={logo} className="App-logo" alt="logo" />
                <p>Please press the button below to test the query script.</p>
                <QueryClientProvider client={queryClient}>
                    <Table/>
                    <ReactQueryDevtools/>
                </QueryClientProvider>
            </div>
        </Fragment>
    );
}

export default Home;