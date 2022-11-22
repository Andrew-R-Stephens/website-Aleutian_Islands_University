import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import DisplayMasterSchedule from "../components/DisplayMasterSchedule";
import DisplayAllStudents from "../components/DisplayAllStudents";

function AdminConsoleHome() {

    const [activePage, setActivePage] = useState(0);

    return (
        <Fragment>
            {/*<EditMasterSchedule/>*/}
            {/*<DisplayMasterSchedule/>*/}
            <DisplayAllStudents/>
        </Fragment>
    );

}

export default AdminConsoleHome;