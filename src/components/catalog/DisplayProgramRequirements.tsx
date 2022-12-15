import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import ProgramRequirements, {Course, Group} from "../../classes/ProgramRequirements";

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
        return(
            programRequirements.groups?.sort((a:Group, b:Group)=>{
                if(a.priority > b.priority)
                    return 1;
                return -1;
            }).map((group: Group, key: number) => (
                <div style={{marginLeft:"auto", marginRight:"auto", padding: 32, marginBottom: 16, backgroundColor: "#DEDEDE", borderStyle: "solid 1", borderRadius: 10, minWidth: 200, maxWidth: 500}}>
                    <div style={{textAlign:"left"}}>
                        <div><label style={{fontSize:18}}><b>{group.gName}</b></label></div>
                    </div>
                    <div>
                        <div style={{ textAlign: "left", marginLeft:0, fontSize:14}}>
                            <div><label><em>{group.minCredits == 0 ? "" : "Minimum Credits: " + group.minCredits}</em></label></div>
                            <div><label><em>{group.minCourses == 0 ? "" : "Minimum Courses: " + group.minCourses}</em></label></div>
                        </div>
                        <div >
                            <div><label><b>Courses</b></label></div>
                            {
                                <div style={{marginLeft: "auto", marginRight: "auto"}}>
                                    {renderGroup(group)}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            ))
        );
    }

    function renderGroup(group:Group) {
        return (<ul  style={{display: "inline-block", marginLeft: "auto", marginRight: "auto"}}>{
                group.courses?.map((course: Course, key: number) => (
                    <li key={key}>
                        <span style={{display: "flex"}}>{course.CID}&nbsp;
                            <sup style={{fontSize:11}}>({course.courseCredits}cr)</sup>&nbsp;{!course.minGrade ? "" :
                                <label>: <b>{course.minGrade}</b></label>}
                            </span>
                    </li>
                ))
            }</ul>
        )
    }

    return (
        <Fragment>
            <div style={{ width: "50vw", marginLeft: "auto", marginRight: "auto"}}>
                {renderRequirements()}
            </div>
        </Fragment>);

}

export default DisplayProgramRequirements;
