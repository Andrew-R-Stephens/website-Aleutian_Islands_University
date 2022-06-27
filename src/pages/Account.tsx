import React, {Fragment, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import HomeNavBanner from "../components/HomeNavBanner";
import SideBanner from "../components/SideBanner";
import './Account.css';
import Profile from "./Profile";
import Student from "./Student";
import HideBar from "../components/HideBar";
import RequestTable from "../components/RequestTable";

interface StateType {
    id: string
}

function Account() {

    const useLoc = useLocation() as any;
    const state:StateType = useLoc.state;

    const navigate = useNavigate();
    useEffect(() => {
        if(!state)
        navigate('/login');
    });

    const pages:any = [<RequestTable/>, <HideBar/>];

    const [pageIndex, setPage] = useState(0);

    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={[]} names={[]}/>
                <div className={'main-body'}>
                    <SideBanner
                                urls={["/account", "profile", "student", "/login"]}
                                names={["Account", "Profile", "Student", "Logout"]}
                                classes={['item', 'item', 'item', 'item-last']}
                                roles={['active', 'inactive', 'inactive', 'inactive']}
                                id={state ? state.id : ""}>
                    </SideBanner>
                    <div className = {'inner-body'}>
                        <div className={'inner-body-constraints'}>
                            <button onClick={() => setPage(pageIndex + 1)}>Change content</button>
                            {pages[pageIndex]}
                            <p>Account ID to display information for: {state ? state.id : ""}</p>
                            <br/>
                            <label><b>Todo:</b></label>
                            <ul style={{margin: "auto", maxWidth: 1080, textAlign: 'start'}}>
                                <li>Add welcome message</li>
                                <li>Add profile image on left (simple default profile pic logo with wolf  watermark)</li>
                                <li>Display data about semester</li>
                                <li>Display hyperlinks for registration</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Account;