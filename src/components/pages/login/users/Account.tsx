import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import HomeNavBanner from "../../../HomeNavBanner";
import SideBanner from "../../../SideBanner";
import '../../../../css/Account.css';
import HideBar from "../../../HideBar";
import RequestTable from "../../../RequestTable";
import "../../../../css/RequestTable.css";
import {UserAuthStore} from "../../../../stores/AuthUserStore";
import DisplayAccountInfo from "./DisplayAccountInfo";
import DisplayPersonalInfo from "./DisplayPersonalInfo";

/**
 * The private, inwards-facing data for a specific user.
 * @param props
 * @constructor
 */
function Account(props: any) {

    const { sideBanner = <SideBanner/>} = props;
    const userStoreID = UserAuthStore((state:any) => state.userID);

    const pages:any = [<RequestTable/>, <HideBar/>];

    const [userID, setID] = useState(userStoreID);

    const [pageIndex, setPage] = useState(0);
    const navigate = useNavigate();

    return (
        <Fragment>
            <div className={'main-container'}>
                <div className={'main-body'}>
                    <div className = {'inner-body'}>
                        <div className={'inner-body-constraints'}>
                            <DisplayAccountInfo/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Account;