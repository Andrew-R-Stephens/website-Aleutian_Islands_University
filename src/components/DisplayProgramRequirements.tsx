import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import ProgramRequirements from "./ProgramRequirements";

function DisplayProgramRequirements(props:any) {

    const [programID, setProgramID] = useState();
    const [programRequirements, setProgramRequirements] = useState(new ProgramRequirements(null));

    useEffect(() => {
        const {PID} = props;
        setProgramID(PID);
    }, [props])

    useEffect(()=> {
        const reqProgReq = () => requestProgramRequirements();
        reqProgReq();
    }, [programID])

    useEffect(() => {
        programRequirements.print();
    }, [programRequirements])

    async function requestProgramRequirements() {
        console.log("attempting request");
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getProgramRequirements",
                id : programID
            }
        }).then(res => {
            const {error, data} = res.data;
            if(data) {
                const programData = new ProgramRequirements(data);
                setProgramRequirements(programData);
            } else {
                console.log("Error:", error);
            }
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    function renderRequirements() {
        return programRequirements.renderAdvanced();
    }

    return (
        <Fragment>
            <div style={{ width: "50vw", marginLeft: "auto", marginRight: "auto"}}>
                {renderRequirements()}
            </div>
        </Fragment>);

}

export default DisplayProgramRequirements;
