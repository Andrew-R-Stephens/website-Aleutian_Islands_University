import React, {Fragment} from 'react';
import HomeNavBanner from "../components/HomeNavBanner";
import {QueryClient, QueryClientProvider} from "react-query";
import Table from "../components/RequestTable";
import {ReactQueryDevtools} from "react-query/devtools";
const queryClient = new QueryClient();

function About() {
    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={["/", "/about", "/login"]}
                               names={["Home", "About", "Login"]}/>
                <div className={'main-header'}>
                    <div className={'frame-outer'}>
                        <iframe src="https://player.vimeo.com/video/659049579?h=ce8c0317ac&controls=0&title=0&byline=0&portrait=0&autoplay=1&loop=1&muted=1"
                                allow="autoplay; fullscreen; picture-in-picture;" ></iframe>
                    </div>
                </div>
                <div className={'main-body'}>
                    <div className={'inner-body'}>
                        <div className={'inner-body-constraints'}>
                            <div>
                                <p>This is the About page.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default About;