import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import DepartmentDetails from "../classes/DepartmentDetails";

function DisplayProgramDetails(props:any) {

    const [departmentID, setDepartmentID] = useState(props.DID);
    const [departmentDetails, setDepartmentDetails] = useState<DepartmentDetails>();

    useEffect(()=> {
        requestProgramDetails().then(r=>console.log("done"));
    }, [departmentID])

    useEffect(() => {
        departmentDetails?.print();
    }, [departmentDetails])

    async function requestProgramDetails() {
        console.log("attempting request", departmentID);
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getDepartmentDetails",
                id: departmentID
            }
        }).then(res => {
            const {error, details} = res.data;
            if(details) {
                const departmentData = new DepartmentDetails(details);
                setDepartmentDetails(departmentData);
            } else {
                console.log("Error:", error);
            }
        }).catch(function(err) {
            if(axios.isCancel(err)) {
                console.log("canceled!")
            }
            console.log(err.message);
        })
    }

    function renderDetails():any {
        return departmentDetails?.renderAdvanced();
    }

    return (
        <Fragment>
            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                {renderDetails()}
            </div>
        </Fragment>);

}

export default DisplayProgramDetails;