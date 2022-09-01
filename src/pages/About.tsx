import React, {Fragment, useContext} from 'react';
import HomeNavBanner from "../components/HomeNavBanner";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {useStore} from "zustand";
import {
    useLogin, useLogout, getID, getEmail, getFirstName, getLastName, //StoreContextProvider
} from "../stores/user-store";



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
                                <p>This is the About page.
                                    {/*<StoreContextProvider/>*/}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default About;