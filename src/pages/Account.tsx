import React, {Fragment, useState} from 'react';
import {useLocation, useRoutes} from "react-router-dom";
import HomeNavBanner from "../components/HomeNavBanner";
import SideBanner from "../components/SideBanner";
import './Account.css';

interface StateType {
    id: string
}

function Account() {

    const useLoc = useLocation() as any;
    const state:StateType = useLoc.state;

    return (
        <Fragment>
            <body className={'main-content'}>
                <HomeNavBanner urls={["/login"]}
                               names={["Logout"]}/>
                <SideBanner urls={["/profile"]}
                            names={["Profile"]}
                            id={state.id}/>
                <div className = {'main'}>
                    <p>Account ID to display information for: {state.id}</p>
                </div>
            </body>
        </Fragment>
    );
}

export default Account;