import React, {Fragment, useEffect, useRef, useState} from "react";
import axios from "axios";
import {RoleAuthStore, UserAuthStore} from "../stores/AuthUserStore";
import {Checkbox, TablePagination} from "@mui/material";
import {blue} from "@mui/material/colors";
import {useLocation, useNavigate} from "react-router-dom";
import {convertTime} from "../Utils";
import DisplayMasterSchedule from "./DisplayMasterSchedule";

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