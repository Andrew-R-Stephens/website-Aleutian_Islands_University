import React, {Fragment, useEffect, useRef, useState} from 'react';
import axios from "axios";
import '../stores/user-store';
import DisplayDepartmentDetails from "./DisplayDepartmentDetails";

function DisplayDepartment(props:any) {

    const [departmentID, setDepartmentID] = useState(props.DID);

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
                    <label style={{padding:32}}> {"< "}Go Back to Search Departments</label>
                </div>
            </div>
            {departmentID ?
                    <div>
                        <DisplayDepartmentDetails DID={departmentID}/>
                    </div> : departmentID + "Found?"}
        </Fragment>
    );
}

export default DisplayDepartment;