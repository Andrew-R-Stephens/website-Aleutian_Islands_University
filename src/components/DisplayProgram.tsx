import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import '../stores/user-store';
import './../css/RequestTable.css';
import ProgramDetails from "./ProgramDetails";
import DisplayProgramDetails from "./DisplayProgramDetails";
import DisplayProgramRequirements from "./DisplayProgramRequirements";

function DisplayProgram(props:any) {

    const [programID, setProgramID] = useState();

    useEffect(() => {
        const {PID} = props;
        setProgramID(PID);
    }, [props.PID])

    return (
        <Fragment>
            {programID ?
                    <div>
                        <DisplayProgramDetails PID={programID}/>
                        <DisplayProgramRequirements PID={programID}/>
                    </div> : ""}
        </Fragment>
    );
}

export default DisplayProgram;