import React, {Fragment, useEffect, useState} from 'react';
import HomeNavBanner from "../../components/HomeNavBanner";
import {useLocation, useNavigate} from "react-router-dom";
import SideBanner from "../../components/SideBanner";
import {useUserAuthStore} from "../../facades/AuthUserStore";

function Student() {

    const userStoreID = useUserAuthStore((state:any) => state.userID);
    const [userID, setID] = useState(userStoreID);

    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={[]}
                               names={[]}/>
                <SideBanner urls={["/account", "../profile", "student", "/login"]}
                            names={["Account", "Profile", "Student", "Logout"]}
                            classes={['item', 'item', 'item', 'item-last']}
                            roles={['inactive', 'inactive', 'active', 'inactive']}
                            id={userID}/>
                <div className = {'main-body'}>
                    <div className={'inner-body'}>
                        <div className={'inner-body-constraints'}>
                            <p>Account ID to display information for: {userID}</p>
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
                </div>
            </div>
        </Fragment>
    );
}

export default Student;