import React, {Fragment} from 'react';
import HomeNavBanner from "../components/HomeNavBanner";
import {QueryClient, QueryClientProvider} from "react-query";
import Table from "../components/RequestTable";
import {ReactQueryDevtools} from "react-query/devtools";
const queryClient = new QueryClient();

function About() {
    return (
        <Fragment>
            <div className={'main-content'}>
                <HomeNavBanner urls={["/", "/about", "/login"]}
                               names={["Home", "About", "Login"]}/>

                <p>This is the About page.</p>
                <div>
                    <p>Please press the button below to test the query script.</p>
                    <QueryClientProvider client={queryClient}>
                        <Table/>
                        <ReactQueryDevtools/>
                    </QueryClientProvider>
                </div>
            </div>
        </Fragment>
    );
}

export default About;