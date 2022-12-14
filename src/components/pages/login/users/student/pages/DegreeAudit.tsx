import React, {Fragment, useEffect, useState} from "react";
import ProgramRequirements, {Course, Group} from "../../../../../../classes/ProgramRequirements";
import axios from "axios";
import {RoleAuthStore, UserAuthStore} from "../../../../../../stores/AuthUserStore";
import ReqComparable, {ReqCourse, ReqGroup} from "../../../../../../classes/ReqComparable";
import StudentHistory from "../../../../../../classes/StudentHistory";

function DegreeAudit(props:any) {

    const {targetUID} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);

    const [programIDOptions, setProgramIDOptions] = useState<any[]>();

    const [chosenProgramID, setChosenProgramID] = useState<number>(-1);
    const [programRequirements, setProgramRequirements] =  useState<any[]>();

    const [reqComparable, setReqComparable] = useState<ReqComparable>();

    useEffect(() => {
        console.log("Firing request enrollments")
        requestProgramEnrollments().then(r => console.log("Finished enrollment request"));
    }, []);

    useEffect(()=> {
        console.log("Firing Program Reqs")
        requestProgramRequirements().then(r=>console.log("Program Requirements requested"));
    }, [chosenProgramID])

    useEffect(() => {
        console.log("Firing History")
        if(programRequirements)
            requestStudentHistoryFulfilled().then(r => console.log("Finished history request"));
    }, [programRequirements])

    useEffect(() => {
        console.log("Firing init")
        reqComparable?.init(programRequirements);
    }, [reqComparable])

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
            setProgramRequirements(data);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestStudentHistoryFulfilled() {
        console.log("attempting requirements request");
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getStudentHistory_Fulfilled",
                pid : chosenProgramID,
                uid: userID
            }
        }).then(res => {
            const {error, history} = res.data;
            const comparable = new ReqComparable(new StudentHistory(history))
            comparable.init(programRequirements);
            setReqComparable(comparable);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    const handleProgramSelect = (event:any) => {
        event.preventDefault();
        setChosenProgramID(event.target.value);
    }

    function renderRequirements() {
        return(
            reqComparable?.requirements?.groups?.sort((a:ReqGroup, b:ReqGroup)=>{
                if(a.priority > b.priority)
                    return 1;
                return -1;
            }).map((group: ReqGroup, key: number) => (
                <div style={{padding: 32, margin: 32,
                    backgroundColor: "#DEDEDE", borderStyle: "solid 1", borderRadius: 10, minWidth: 200}}>
                    <div style={{textAlign:"left", marginBottom: 16}}>
                        <div style={{display:"flex"}}>
                            <label style={{fontSize:24}}><b>{group.gName}</b></label>
                            {group.isComplete() ?
                                <div style={{fontSize:18, marginLeft:"auto", marginRight:0, color:"darkgreen"}}>(COMPLETE)</div>
                                :<Fragment/>}
                        </div>
                    </div>
                    <div>
                        <div style={{ textAlign: "left", marginLeft:0, marginBottom: 16, fontSize:14}}>
                            <div>
                                <label><em>{group.minCredits == 0 ? "" : "Credits Minimum: " + group.minCredits}</em></label>
                                <label style={{marginLeft:8}}><em>{group.minCredits == 0 ? "" : "Acquired: " + group.creditsActual}</em></label>
                            </div>
                            <div>
                                <label><em>{group.minCourses == 0 ? "" : "Courses Minimum: " + group.minCourses}</em></label>
                                <label style={{marginLeft:8}}><em>{group.minCourses == 0 ? "" : "Acquired: " + group.coursesActual}</em></label>
                            </div>
                        </div>
                        <div>
                            <div style={{display:"flex"}}><label><b>Courses</b></label></div>
                            {
                                <div style={{display:"flex", marginLeft: "0", marginRight: "auto"}}>
                                    {renderGroup(group)}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            ))
        );
    }

    function renderGroup(group:ReqGroup) {
        return (
            <div className={'div-table'}>
                <div className={'div-table-header'} style={{display:"flex", backgroundColor:"#406e8a"}}>
                    <div className={'div-table-col'}></div>
                    <div className={'div-table-col'}><label>Course</label></div>
                    <div className={'div-table-col'}><label>Title</label></div>
                    <div className={'div-table-col'}><label>Grade</label></div>
                    <div className={'div-table-col'}><label>Credits</label></div>
                    <div className={'div-table-col'}><label>Term</label></div>
                </div>
                {
                    group.coursesRecorded?.map((course: ReqCourse) => (
                        <div className={'div-table-row'} style={{display: "flex"}}>
                            <div className={'div-table-col'}><div className={'icon-checkmark'}></div></div>
                            <div className={'div-table-col'}><label>{course.CID}</label></div>
                            <div className={'div-table-col'}><label>{course.courseName}</label></div>
                            <div className={'div-table-col'}><label>{course.recordedGrade}</label></div>
                            <div className={'div-table-col'}><label>{course.courseCredits}</label></div>
                            <div className={'div-table-col'}><label>{course.recordedSemester}</label></div>
                        </div>
                    ))
                }
                {
                    group.coursesNeeded?.filter((c:ReqCourse)=>(
                        !group.coursesRecorded.includes(c)
                    )).map((course: ReqCourse) => (
                        <div className={'div-table-row'} style={{display: "flex"}}>
                            <div className={'div-table-col'}><label></label></div>
                            <div className={'div-table-col'}><label>{course.CID}</label></div>
                            <div className={'div-table-col'}><label>{course.courseName}</label></div>
                            <div className={'div-table-col'}><label>{course.recordedGrade}</label></div>
                            <div className={'div-table-col'}><label>{course.courseCredits}</label></div>
                            <div className={'div-table-col'}><label>{course.recordedSemester}</label></div>
                        </div>
                    ))
                }
            </div>
        );
    }


    return (
        <Fragment>
            <div style={{ marginLeft: "auto", marginRight: "auto"}}>
                <div style={{display:"flex", margin:32}}>
                    <div style={{display:"inline-block", margin:"auto"}}>
                        <div>Choose Program</div>
                        <select value={''} onChange={(event:any)=>handleProgramSelect(event)}>
                            <option value={undefined}>-- Choose --</option>
                            {
                                programIDOptions?.map((p:any)=>(
                                    <option value={p.ProgramID}>{p.ProgramName}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                {renderRequirements()}
            </div>
        </Fragment>);

}

export default DegreeAudit;
