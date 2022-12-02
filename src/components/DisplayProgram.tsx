import React, {Fragment, useEffect, useState} from 'react';
import '../stores/user-store';
//import './../css/RequestTable.css';
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
            <div style={{display:"flex", margin: "auto", width: 700}}>
                <div style={{
                    marginTop: 32,
                    marginLeft: 0,
                    marginRight:"auto",
                    minWidth: 150, minHeight:25,
                    backgroundColor: "#333353",
                    color: "whitesmoke",
                    borderRadius: 5,
                    display:"inline-block"
                }} onClick={() => props.onBackPressedHandler(0)}>
                    <label style={{padding:32}}> {"< "}Go Back to Search Programs</label>
                </div>
            </div>
            {programID ?
                    <div>
                        <DisplayProgramDetails PID={programID}/>
                        <DisplayProgramRequirements PID={programID}/>
                    </div> : ""}
        </Fragment>
    );
}

export default DisplayProgram;