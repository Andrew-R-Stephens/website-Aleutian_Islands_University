import React, {Fragment, useEffect, useState} from "react";
import {RoleAuthStore, UserAuthStore} from "../../../../../../stores/AuthUserStore";
import axios from "axios";
import UnofficialTranscriptData, {TranscriptTerm} from "../../../../../../classes/UnofficialTranscriptData";

function DisplayUnofficialTranscript(props:any) {

    const {targetUID, targetRole} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);
    const [userRole, setUserRole] = useState(targetRole?targetRole:userStoreRole);

    const [enrollments, setEnrollments] = useState<any[]>();
    const [studentHistory, setStudentHistory] = useState<UnofficialTranscriptData>()

    useEffect(() => {
        requestProgramEnrollmentByStudentID().then(r=>console.log("Enrollments acquired"))
    }, [])

    useEffect(() => {
        requestUnofficialTranscript().then(r=>console.log("Transcript acquired"))
    }, [])

    async function requestProgramEnrollmentByStudentID() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getProgramEnrollmentByStudentID",
                id: userID
            }
        }).then(res => {
            let {error, enrollments} = res.data;
            console.log(res.data, "Enrollments ", enrollments)
            setEnrollments(enrollments);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestUnofficialTranscript() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getUnofficialTranscript",
                id: userID
            }
        }).then(res => {
            let {error, transcript} = res.data;
            console.log(res.data, "Transcript ", transcript)
            setStudentHistory(new UnofficialTranscriptData(transcript));
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    function displayHeader() {

        return (
            <Fragment>
                <div>
                    <label>Current Program:</label>
                    <label>*Program Type Name* (ie Bachelor of Science)</label>
                </div>
                <div>
                    <label>Program name:</label>
                    <label>*Program Name* (ie Computer Science)</label>
                </div>
                <div>
                    <label>Department ID:</label>
                    <label>*Department ID* (ie Computer and Information Science)</label>
                </div>
            </Fragment>
        );

    }

    function displayBody() {
        return (
            <Fragment>
                {
                    studentHistory?.transcript?.terms?.map((term:TranscriptTerm, index:number) => (
                        <div style={{display:"inline-block", borderColor:"#cccccc", borderStyle:"solid", borderRadius:15, marginBottom:32, padding:16}}>
                            <div style={{display:"flex", backgroundColor:"#051e35", borderRadius:15, padding:16, fontSize:24}}>
                                <div style={{fontWeight:"bold", color:"whitesmoke", marginRight:8}}>Term:</div>
                                <div style={{color:"whitesmoke"}}>{term.term} {term.year}</div>
                            </div>
                            <div className={'div-table'}>
                                <div className={'div-table-header'} style={{display:"flex", backgroundColor:"#406e8a"}}>
                                    <div className={'div-table-col'}><label>Course</label></div>
                                    <div className={'div-table-col'}><label>Title</label></div>
                                    <div className={'div-table-col'}><label>Grade</label></div>
                                    <div className={'div-table-col'}><label>Credit Hours</label></div>
                                    <div className={'div-table-col'}><label>Quality Points</label></div>
                                </div>
                                {
                                    term?.courses.map((t:any) => (
                                        <div className={'div-table-row'} style={{display:"flex"}}>
                                            <div className={'div-table-col'}><label>{t.course}</label></div>
                                            <div className={'div-table-col'}><label>{t.title}</label></div>
                                            <div className={'div-table-col'}><label>{t.grade}</label></div>
                                            <div className={'div-table-col'}><label>{t.creditHours}</label></div>
                                            <div className={'div-table-col'}><label>{t.qualityPoints}</label></div>
                                        </div>
                                    ))
                                }
                            </div>
                            <br/>
                            <div>
                                <div className={'div-table'}>
                                    <div className={'div-table-header'} style={{display:"flex", backgroundColor:"#406e8a"}}>
                                        <div className={'div-table-col'}><label>Term Totals</label></div>
                                        <div className={'div-table-col'}><label>Attempt Hours</label></div>
                                        <div className={'div-table-col'}><label>Passed Hours</label></div>
                                        <div className={'div-table-col'}><label>Earned Hours</label></div>
                                        <div className={'div-table-col'}><label>GPA Hours</label></div>
                                        <div className={'div-table-col'}><label>Quality Points</label></div>
                                        <div className={'div-table-col'}><label>GPA</label></div>
                                    </div>
                                    <div className={'div-table-row'} style={{display:"flex"}}>
                                        <div className={'div-table-col'}><label>Current Term</label></div>
                                        <div className={'div-table-col'}><label>{term?.calcAttemptHours()}</label></div>
                                        <div className={'div-table-col'}><label>{term?.calcPassedHours()}</label></div>
                                        <div className={'div-table-col'}><label>{term?.calcEarnedHours()}</label></div>
                                        <div className={'div-table-col'}><label>{term?.calcGPAHours()}</label></div>
                                        <div className={'div-table-col'}><label>{term?.calcQualityHours()}</label></div>
                                        <div className={'div-table-col'}><label>{term?.calcGPA()}</label></div>
                                    </div>
                                    <div className={'div-table-row'} style={{display:"flex"}}>
                                        <div className={'div-table-col'}><label>Cumulative</label></div>
                                        <div className={'div-table-col'}><label>{studentHistory?.transcript?.calcAttemptHours(index)}</label></div>
                                        <div className={'div-table-col'}><label>{studentHistory?.transcript?.calcPassedHours(index)}</label></div>
                                        <div className={'div-table-col'}><label>{studentHistory?.transcript?.calcEarnedHours(index)}</label></div>
                                        <div className={'div-table-col'}><label>{studentHistory?.transcript?.calcGPAHours(index)}</label></div>
                                        <div className={'div-table-col'}><label>{studentHistory?.transcript?.calcQualityHours(index)}</label></div>
                                        <div className={'div-table-col'}><label>{studentHistory?.transcript?.calcGPA(index)}</label></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Fragment>
        );
    }

    function displayTotals() {
        return (
            <Fragment>
                <div style={{display:"inline-block", borderColor:"#cccccc", borderStyle:"solid", borderRadius:15, marginBottom:32, padding:16}}>
                    <div>
                        <div className={'div-table'}>
                            <div className={'div-table-header'} style={{display:"flex", backgroundColor:"#406e8a"}}>
                                <div className={'div-table-col'}><label>Transcript Totals</label></div>
                                <div className={'div-table-col'}><label>Attempt Hours</label></div>
                                <div className={'div-table-col'}><label>Passed Hours</label></div>
                                <div className={'div-table-col'}><label>Earned Hours</label></div>
                                <div className={'div-table-col'}><label>GPA Hours</label></div>
                                <div className={'div-table-col'}><label>Quality Points</label></div>
                                <div className={'div-table-col'}><label>GPA</label></div>
                            </div>
                            <div className={'div-table-row'} style={{display:"flex"}}>
                                <div className={'div-table-col'}><label>Overall</label></div>
                                <div className={'div-table-col'}>
                                    <label>{studentHistory?.transcript?.calcAttemptHours(studentHistory?.transcript?.terms?.length-1)}</label></div>
                                <div className={'div-table-col'}>
                                    <label>{studentHistory?.transcript?.calcPassedHours(studentHistory?.transcript?.terms?.length-1)}</label></div>
                                <div className={'div-table-col'}>
                                    <label>{studentHistory?.transcript?.calcEarnedHours(studentHistory?.transcript?.terms?.length-1)}</label></div>
                                <div className={'div-table-col'}>
                                    <label>{studentHistory?.transcript?.calcGPAHours(studentHistory?.transcript?.terms?.length-1)}</label></div>
                                <div className={'div-table-col'}>
                                    <label>{studentHistory?.transcript?.calcQualityHours(studentHistory?.transcript?.terms?.length-1)}</label></div>
                                <div className={'div-table-col'}>
                                    <label>{studentHistory?.transcript?.calcGPA(studentHistory?.transcript?.terms?.length-1)}</label></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <div>
                <h1>Curriculum Information</h1>
            </div>
            {displayHeader()}
            <div>
                <h1>Institution Credit</h1>
            </div>
            {displayBody()}
            <div>
                <h1>Transcript Totals</h1>
            </div>
            {displayTotals()}
        </Fragment>
    );
}

export default DisplayUnofficialTranscript;