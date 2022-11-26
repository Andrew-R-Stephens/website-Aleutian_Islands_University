import React, {Fragment, useEffect, useState} from 'react';
import '../../../../../../css/ConsoleHome.css';
import {useNavigate} from "react-router-dom";

function EnrollProgram() {

    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(0);

    return (
        <Fragment>
            Enroll Program
        </Fragment>
    );

}

export default EnrollProgram;