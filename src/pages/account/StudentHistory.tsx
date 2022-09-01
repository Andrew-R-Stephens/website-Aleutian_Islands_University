import React, {Fragment, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import HomeNavBanner from "../../components/HomeNavBanner";
import SideBanner from "../../components/SideBanner";
import '../../css/Account.css';
import HideBar from "../../components/HideBar";
import RequestTable from "../../components/RequestTable";
import "../../css/RequestTable.css";
import axios from "axios";
import {useUserAuthStore} from "../../stores/AuthUserStore";

function StudentHistory() {

    const userStoreID = useUserAuthStore((state:any) => state.userID);

    const pages:any = [<RequestTable/>, <HideBar/>];

    const [userID, setID] = useState(userStoreID);
    const [firstName, setFName] = useState();
    const [lastName, setLName] = useState();
    const [email, setEmail] = useState();

    const [pageIndex, setPage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        initUserData().then(() => console.log('Axios request succeeded.', userID, userStoreID));
    }, [userID]);

    async function initUserData() {
        await axios.get(process.env["REACT_APP_API_USER"] as string, {
            params: {
                func: "standard",
                id : userID
            }
        }).then(res => {

            const {firstName, lastName, email} = res.data;

            setFName(firstName);
            setLName(lastName);
            setEmail(email);

        }).catch(function(err) {
            console.log(err.message);
        })
    }

    return (
        <Fragment>
            <div className={'main-container'}>
                <HomeNavBanner urls={[]} names={[]}/>
                <div className={'main-body'}>
                    <SideBanner
                        urls={["/account", "profile", "./student", "/login"]}
                        names={["Account", "Profile", "Student", "Logout"]}
                        classes={['item', 'item', 'item', 'item-last']}
                        roles={['inactive', 'inactive', 'inactive', 'inactive']}
                        id={userID}>
                    </SideBanner>
                    <div className = {'inner-body'}>
                        <div className={'inner-body-constraints'}>
                            hi
                            {/*<StudentHistoryComparator/>*/}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default StudentHistory;