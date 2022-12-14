import React, {Fragment, useEffect, useState} from "react";
import ProgramRequirements from "../../../../../../classes/ProgramRequirements";
import axios from "axios";
import {RoleAuthStore, UserAuthStore} from "../../../../../../stores/AuthUserStore";

function DegreeAudit(props:any) {

    const {targetUID} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);

    const [programIDOptions, setProgramIDOptions] = useState<any[]>();

    const [chosenProgramID, setChosenProgramID] = useState<number>();
    const [programRequirements, setProgramRequirements] = useState(new ProgramRequirements(null));

    useEffect(() => {
        requestProgramEnrollments().then(r => console.log("Finished enrollment request"));
    }, [userID]);

    useEffect(() => {
        programIDOptions?setChosenProgramID(programIDOptions.at(0).ProgramID):<></>;
    }, [programIDOptions])

    useEffect(()=> {
        requestProgramRequirements().then(r=>console.log("Finished request"));
    }, [chosenProgramID])

    useEffect(() => {
        programRequirements.print();
    }, [programRequirements])

    async function requestProgramEnrollments() {
        console.log("attempting enrollment request");
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getProgramEnrollmentByStudentID",
                id : userID
            }
        }).then(res => {
            const {error, enrollments} = res.data;
            setProgramIDOptions(enrollments);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestProgramRequirements() {
        console.log("attempting requirements request");
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getProgramRequirements",
                id : chosenProgramID
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

    function handleProgramSelect(event:any, p:any)  {
        event.preventDefault();
        setChosenProgramID(p);
    }

    function renderRequirements() {
        return (
            programRequirements.renderAdvanced()
        );
    }

    return (
        <Fragment>
            <div style={{ width: "50vw", marginLeft: "auto", marginRight: "auto"}}>
                <div style={{display:"flex", margin:32, maxWidth: 700}}>
                    {
                        programIDOptions?.map((p:any)=>(
                            <div style={{display:"flex", margin:"auto"}}>
                                <button onClick={(event:any)=>handleProgramSelect(event, p.ProgramID)}>{p.ProgramName}</button>
                            </div>
                        ))
                    }
                </div>
                {renderRequirements()}
            </div>
        </Fragment>);

}

export default DegreeAudit;
