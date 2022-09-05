import React, {Fragment} from 'react';
import HomeNavBanner from "../../HomeNavBanner";
import {QueryClient} from "react-query";


const queryClient = new QueryClient();

// const provider = StoreContextProvider;

function About() {
    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={["/", "/about", "/login"]}
                               names={["Home", "About", "Login"]}/>
                <div className={'main-header'}>

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