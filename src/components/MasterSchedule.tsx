import React, {Fragment, useEffect, useRef, useState} from "react";
import axios from "axios";
import {RoleAuthStore, UserAuthStore} from "../stores/AuthUserStore";
import {Checkbox, TablePagination} from "@mui/material";
import {blue} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";
import {convertTime} from "../Utils";
import DisplayMasterSchedule from "./DisplayMasterSchedule";

function MasterSchedule(props:any) {
    const {targetUID} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userRoleID = RoleAuthStore((state:any) => state.authRole);

    const [UID, setUID] = useState(targetUID?targetUID:userStoreID);
    const userRole = useRef(userRoleID);

    return <Fragment>

        <h1>Master Schedule</h1>
        <DisplayMasterSchedule/>
    </Fragment>;
}
export default MasterSchedule;