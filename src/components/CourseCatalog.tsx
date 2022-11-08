import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import '../stores/user-store';
import DisplayProgramRequirements from "./DisplayProgramRequirements";
import './../css/RequestTable.css';

function CourseCatalog() {

    return (
        <Fragment>
            <DisplayProgramRequirements/>
        </Fragment>);

}

export default CourseCatalog;
