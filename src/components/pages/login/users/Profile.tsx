import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import SideBanner from "../../../SideBanner";
import {UserAuthStore} from "../../../../stores/AuthUserStore";
import DisplayPersonalInfo from "./DisplayPersonalInfo";
import EditPersonalInfo from "./EditPersonalInfo";

/**
 * The public, outwards-facing data for a specific user.
 * @param props
 * @constructor
 */
function Profile(props:any) {

    const { sideBanner = <SideBanner/>} = props;

    enum Pages {
        View, Edit
    }

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const [userID, setID] = useState(userStoreID);

    const [page, setPage] = useState(Pages.View);

    const navigate = useNavigate();

    return (
        <Fragment>
            <div className={'main-body'}>
                <div className={'inner-body'}>
                    {
                        page === Pages.View ?
                            <Fragment>
                                <DisplayPersonalInfo uid={userID} backFun={()=>setPage(Pages.Edit)}/>
                            </Fragment>
                            :
                            <Fragment>
                                <div className={'inner-body-constraints'}>
                                    <EditPersonalInfo uid={userID} backFun={()=>setPage(Pages.View)}/>
                                </div>
                            </Fragment>
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default Profile;