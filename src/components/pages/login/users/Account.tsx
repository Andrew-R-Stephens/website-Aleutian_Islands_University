import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../../../../css/Account.css';
import {UserAuthStore} from "../../../../stores/AuthUserStore";
import DisplayAccountInfo from "./DisplayAccountInfo";

/**
 * The private, inwards-facing data for a specific user.
 * @param props
 * @constructor
 */
function Account(props: any) {

    const userStoreID = UserAuthStore((state:any) => state.userID);

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