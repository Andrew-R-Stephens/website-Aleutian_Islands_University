import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import ProgramDetails from "../../classes/ProgramDetails";

function DisplayProgramDetails(props:any) {

    const [programID, setProgramID] = useState();
    const [programDetails, setProgramDetails] = useState<ProgramDetails>();

    useEffect(() => {
        const {PID} = props;
        setProgramID(PID);
    }, [props.PID])

    useEffect(()=> {
        const reqProgReq = () => requestProgramDetails();
        reqProgReq();
    }, [programID])

    useEffect(() => {
        programDetails?.print();
    }, [programDetails])

    async function requestProgramDetails() {
        console.log("attempting request", programID);
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getProgramDetails",
                id: programID
            }
        }).then(res => {
            const {error, details} = res.data;
            if(details) {
                const programData = new ProgramDetails(details);
                setProgramDetails(programData);
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
        return programDetails?.renderAdvanced();
    }

    return (
        <Fragment>
            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                {renderDetails()}
            </div>
        </Fragment>);

}

export default DisplayProgramDetails;