import React, {Fragment, useState} from 'react';
import '../../../../../../css/ConsoleHome.css';
import {useNavigate} from "react-router-dom";

function RegisterCourse() {

    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(0);

    return (
        <Fragment>
            Register Course
        </Fragment>
    );

}

export default RegisterCourse;