import React, {Fragment} from 'react';
import logo from "../res/logo.svg";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import Table from "../components/RequestTable";
import HomeNavBanner from "../components/HomeNavBanner";
import '../components/VideoPlayer.css'
import '../components/HomeBody.css';

const queryClient = new QueryClient();

function Home() {
    return (
        <Fragment>
            <div className={'main-content'}>
                <HomeNavBanner urls={["/", "/about", "/login"]}
                               names={["Home", "About", "Login"]}/>
                <div>
                    <div
                        className={'video-container'}>
                        <iframe src="https://player.vimeo.com/video/659049579?h=ce8c0317ac&controls=0&title=0&byline=0&portrait=0&autoplay=1&loop=1&muted=1"
                                className={'preview'}
                                allow="autoplay; fullscreen; picture-in-picture;" ></iframe>
                        {/*<iframe
                                src="https://www.youtube.com/embed/QvW61K2s0tA?&autoplay=1&start=74&end=239&controls=0&loop=1&rel=0&mute=1"
                                className={'preview'}
                                allow="autoplay; fullscreen; picture-in-picture; modestbranding;" allowFullScreen>
                        </iframe>*/}
                    </div>
                </div>
                <div>
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
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

export default Home;