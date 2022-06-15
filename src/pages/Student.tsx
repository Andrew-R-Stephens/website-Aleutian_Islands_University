import React, {Fragment} from 'react';
import logo from "../res/logo.svg";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import Table from "../components/RequestTable";
import HomeNavBanner from "../components/HomeNavBanner";

const queryClient = new QueryClient();

function Home() {
    return (
        <Fragment>
            <body className={'main-content'}>
                <HomeNavBanner urls={["/", "/about", "/login"]}
                               names={["Home", "About", "Login"]}/>

                <div className={'App'}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Please press the button below to test the query script.</p>
                    <QueryClientProvider client={queryClient}>
                        <Table/>
                        <ReactQueryDevtools/>
                    </QueryClientProvider>
                </div>
                <br/><br/><br/>
                <div className={'App'}>
                    <p>iframe video preview streamed from vimeo.com</p>
                    <iframe width="854" height="480"
                            src="https://player.vimeo.com/video/659049579?autoplay=1&amp;loop=1&amp;muted=1"></iframe>
                </div>
            </body>
        </Fragment>
    );
}

export default Home;