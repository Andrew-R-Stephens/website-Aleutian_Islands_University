import React, {Fragment, useState} from 'react';
import {useNavigate} from "react-router-dom";
import SideBanner from "../../../../SideBanner";
import {RoleAuthStore, UserAuthStore} from "../../../../../stores/AuthUserStore";
import DisplayPersonalInfo from "./DisplayPersonalInfo";
import EditPersonalInfo from "./EditPersonalInfo";

/**
 * The public, outwards-facing data for a specific user.
 * @param props
 * @constructor
 */
function Profile(props:any) {

    console.log(props)
    const {targetUID, targetRole} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);
    const [userRole, setUserRole] = useState(targetRole?targetRole:userStoreRole);

    const { sideBanner = <SideBanner/>} = props;

    enum Pages {
        View, Edit
    }

    const [page, setPage] = useState(Pages.View);

    const navigate = useNavigate();

    return (
        <Fragment>
            <div className={'main-body'}>
                <div className={'inner-body'}>
                    {
                        page === Pages.View ?
                            <Fragment>
                                <DisplayPersonalInfo targetUID={userID} pageFun={()=>setPage(Pages.Edit)}/>
                            </Fragment>
                            :
                            <Fragment>
                                <div className={'inner-body-constraints'}>
                                    <EditPersonalInfo targetUID={userID} pageFun={()=>setPage(Pages.View)}/>
                                </div>
                            </Fragment>
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default Profile;