import React, {Fragment, useRef, useState} from "react";
import {RoleAuthStore, UserAuthStore} from "../../stores/AuthUserStore";
import {useLocation} from "react-router-dom";
import DisplayMasterSchedule from "../catalog/DisplayMasterSchedule";

function MasterSchedule(props:any) {

    const location = useLocation();
    console.log("MS loc", location?.state);

    const {targetUID} = props;
    const {adminManagement} = location?.state ?
        location?.state : props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userRoleID = RoleAuthStore((state:any) => state.authRole);

    const [UID, setUID] = useState(targetUID?targetUID:userStoreID);
    const userRole = useRef(userRoleID);

    return <Fragment>

        <h1>Master Schedule</h1>
        <DisplayMasterSchedule adminManagement={adminManagement}/>
    </Fragment>;
}
export default MasterSchedule;