import React, {Fragment} from 'react';
import logo from "../res/logo.svg";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import Table from "../components/RequestTable";
import HomeNavBanner from "../components/HomeNavBanner";
import {Outlet, useLocation} from "react-router-dom";
import SideBanner from "../components/SideBanner";

interface StateType {
    id: string
}
function Student() {

    const useLoc = useLocation() as any;
    const state:StateType = useLoc.state;

    return (
        <Fragment>
            <div className={'main-content'}>
                <HomeNavBanner urls={[]}
                               names={[]}/>
                <SideBanner urls={["/account", "../profile", "student", "/login"]}
                            names={["Account", "Profile", "Student", "Logout"]}
                            classes={['item', 'item', 'item', 'item-last']}
                            roles={['inactive', 'inactive', 'active', 'inactive']}
                            id={state.id}/>
                <div className = {'main'}>
                    <p>Account ID to display information for: {state.id}</p>
                    <br/>
                    <label><b>Todo:</b></label>
                    <ul style={{margin: "auto", maxWidth: 1080, textAlign: 'start'}}>
                        <li>Add welcome message</li>
                        <li>Add profile image on left (simple default profile pic logo with wolf watermark)</li>
                        <li>Display data about semester</li>
                        <li>Display hyperlinks for registration</li>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}

export default Student;