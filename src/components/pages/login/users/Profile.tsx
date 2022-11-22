import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import HomeNavBanner from "../../../HomeNavBanner";
import SideBanner from "../../../SideBanner";
import {UserAuthStore} from "../../../../stores/AuthUserStore";
import DisplayPersonalInfo from "./DisplayPersonalInfo";

/**
 * The public, outwards-facing data for a specific user.
 * @param props
 * @constructor
 */
function Profile(props:any) {

    const { sideBanner = <SideBanner/>} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const [userID, setID] = useState(userStoreID);

    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    return (
        <Fragment>
            <div className={'main-body'}>
                {/*{sideBanner}*/}
                <div className={'inner-body'}>
                    <DisplayPersonalInfo uid={userID}/>
                    <div className={'inner-body-constraints'}>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Profile;