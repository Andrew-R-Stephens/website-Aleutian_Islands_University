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
        return (
            <div style={{}}>
                <div style={{marginTop: 32, width: "100%"}}>
                    <label style={{fontWeight: "bold", fontSize: 40}}>{programDetails?.name}, ({programDetails?.programType})</label>
                </div>
                <div style={{marginLeft: "auto", marginRight: "auto", padding: 16, minWidth: 200, maxWidth: 700}}>
                    <div style={{textAlign: "left"}}>
                        <div style={{marginBottom: 8}}>
                            <p style={{textAlign: "left", fontSize: 14}}>{programDetails?.description}</p>
                        </div>
                        <div style={{marginBottom: 8}}>
                            <label style={{textAlign: "left", fontWeight: "bold", fontSize: 16}}>Total Credits: </label>
                            <label style={{textAlign: "left", fontWeight: "normal"}}>{programDetails?.totalCredits}</label>
                        </div>
                        <div style={{marginBottom: 8}}>
                            <label style={{fontSize: 18, fontWeight: "bold"}}>Departments</label>
                            {programDetails?.departments?.map((department: any, key: number) => (
                                <div style={{marginBottom: 2}}>
                                    <div style={{textAlign: "left", marginLeft: 16}}>
                                        <div style={{display: "flex"}}>
                                            <label style={{fontSize: 14}}>{department}</label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{marginBottom: 8}}>
                            <label style={{fontSize: 18, fontWeight: "bold"}}>Schools</label>
                            {programDetails?.schools?.map((school: any, key: number) => (
                                <div key={key} style={{marginBottom: 2}}>
                                    <div style={{textAlign: "left", marginLeft: 16}}>
                                        <div style={{display: "flex"}}>
                                            <label style={{fontSize: 14}}>{school}</label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                {renderDetails()}
            </div>
        </Fragment>);

}

export default DisplayProgramDetails;