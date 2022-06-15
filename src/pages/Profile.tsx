import React, {Fragment, useState} from 'react';
import {useLocation} from "react-router-dom";
import HomeNavBanner from "../components/HomeNavBanner";
import SideBanner from "../components/SideBanner";

interface StateType {
    id: string
}

function Profile() {

    const useLoc = useLocation() as any;
    const state:StateType = useLoc.state;

    return (
        <Fragment>
            <body className={'main-content'}>
                <HomeNavBanner urls={["/login"]}
                               names={["Logout"]}/>
                <SideBanner urls={["/account"]}
                            names={["Account"]}
                            id={(state.id)}/>
                <div className = {'main'}>
                    <p>Profile ID to display information for: {state.id}</p>
                </div>
            </body>
        </Fragment>
    );
}

export default Profile;