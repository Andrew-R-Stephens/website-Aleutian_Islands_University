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
            <div className={'main-content'}>
                <HomeNavBanner urls={[]}
                               names={[]}/>
                <SideBanner urls={["/account", "profile", "../student", "/login"]}
                            names={["Account", "Profile", "Student", "Logout"]}
                            classes={['item', 'item', 'item', 'item-last']}
                            roles={['inactive', 'active', 'inactive', 'inactive']}
                            id={state.id}/>
                <div className = {'main'}>
                    <p>Profile ID to display information for: {state.id}</p>
                </div>
            </div>
        </Fragment>
    );
}

export default Profile;