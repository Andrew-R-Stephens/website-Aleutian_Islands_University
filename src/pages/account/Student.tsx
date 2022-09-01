import React, {Fragment, useEffect, useState} from 'react';
import HomeNavBanner from "../../components/HomeNavBanner";
import {useLocation, useNavigate} from "react-router-dom";
import SideBanner from "../../components/SideBanner";
import {useUserAuthStore} from "../../stores/AuthUserStore";
import StudentHistoryComparator from "../../components/StudentHistoryComparator";

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
                            roles={['inactive', 'inactive', 'active', 'inactive']} />
                <div className = {'main-body'}>
                    <div className={'inner-body'}>
                        <div className={'inner-body-constraints'}>
                            <StudentHistoryComparator/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Student;