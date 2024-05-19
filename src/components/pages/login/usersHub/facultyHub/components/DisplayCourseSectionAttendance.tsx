import React, {Fragment, useEffect, useState} from "react";
import AttendanceDetails, {Attendance, StudentAttendance} from "./../../../../../../classes/AttendanceDetails";
import axios from "axios";
import {AuthRole} from "../../../../../../stores/AuthUserStore";

function DisplayCourseSectionAttendance(props:any) {
    const{targetCRN, godRole} = props;

    const [crn, setCRN] = useState(targetCRN);
    const [dates, setDates] = useState<any[]>();
    const [attendance, setAttendance] = useState<AttendanceDetails>();
    const [canSetAttendance, setCanSetAttendance] = useState<boolean>(false);

    const [, updateState] = useState<any>();


    useEffect(() => {
        setCRN(targetCRN);
    }, [targetCRN])

    useEffect(() => {
        getPassedMeetingDates().then(r=>console.log("Passed Meetings acquired"))
        requestSectionAttendance().then(r=>console.log("Attendance acquired"));
        requestCanSetAttendance().then(r=>console.log("Can Set attendance acquired"));
    }, [crn])

    useEffect(()=>(
        console.log(attendance)
    ), [attendance])

    async function getPassedMeetingDates() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getCourseSectionMeetingDatesByCRN",
                crn: crn
            }
        }).then(res => {
            let {error, dates} = res.data;
            console.log(res.data)
            setDates(dates);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestSectionAttendance() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getCourseSectionAttendanceByCRN",
                crn: crn
            }
        }).then(res => {
            let {error, attendance} = res.data;
            console.log(res.data)
            const attDetails = new AttendanceDetails(attendance);
            setAttendance(attDetails);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestCanSetAttendance() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "checkMeetingNumber_Outer",
                crn

            }
        }).then(res => {
            let {error, status} = res.data;
            console.log("Attendance",res.data, status?.at(0).Status)
            setCanSetAttendance(status?.at(0).Status);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAssignAttendance() {

        const tempAttArr = [{}];
        attendance?.students?.map((s:StudentAttendance, index:number) => (
            tempAttArr[index] = {
                studentID:s.studentID,
                meetNum:s.attendance.length,
                status:parseInt(s.attendance.at(s.attendance.length-1)?.status+"") >= 0 ?
                    parseInt(s.attendance.at(s.attendance.length-1)?.status+"")
                    : 0
            }
        ))

        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "assignAttendance",
                crn: crn,
                attendance: JSON.stringify(tempAttArr)
            }
        }).then(res => {
            console.log(res)
            const {result} = res.data;
            if(result?.record?.length>0)
                switch(result?.record?.at(0)){
                    case 0: {
                        alert("There was a problem updating attendance.");
                        break;
                    }
                    default: alert("Successfully updated attendance.");
                }

        }).catch(function(err) {
            console.log(err.message);
        })
    }

    const handleChangeAttendance = (event:any, sID:number, aIndex:number) => {
        const temp = attendance;
        temp?.updateMeeting(sID, aIndex+1, parseInt(event.target.value));
        setAttendance(temp);
    }

    const handleSubmitAttendance = (event:any) => {
        event.preventDefault();
        requestAssignAttendance().then(r=>"Update Attendance requested");
    }


    function displayAttendanceOptions(sID:number, attendance:Attendance, mNum:number) {
        return  (
            <Fragment>
                <select defaultValue={attendance.status} onChange={(event:any)=>
                        handleChangeAttendance(event, sID, mNum)}
                >
                    <option value={1}><span>&#10003;</span></option>
                    <option value={0}><span>&#x2717;</span></option>
                </select>
            </Fragment>
        );
    }

    function displayStatus() {
        return(
            attendance?.students.map((sa:StudentAttendance, sIndex:number) => (
                <div className={'div-table-row'} style={{display:"flex"}}>
                    <div className={'div-table-col'}>{sa?.studentID}</div>
                    {
                        sa.attendance.map((a:Attendance, mNum:number)=> (
                            mNum==sa.attendance.length-1 && canSetAttendance && godRole !== AuthRole.Administrator ?
                                <div className={'div-table-col'}>
                                    {
                                        displayAttendanceOptions(sa.studentID, a, mNum)
                                    }
                                </div>
                                : <div className={'div-table-col'}>
                                    {
                                        a?.status===1 ?
                                            <span style={{color:"green"}}>&#10003;</span>
                                            :<span style={{color:"red"}}>&#x2717;</span>}
                                </div>
                        ))
                    }
                </div>
            ))
        );
    }


    function displayAttendance() {
        return <div className={'div-table'}>
            <div className={'div-table-header'} style={{display:"flex"}}>
                <div className={'div-table-col'}><label style={{writingMode:"vertical-rl"}}>Student</label></div>
                {
                    dates?.map((d:any)=>(
                        <div className={'div-table-col'}>
                            <label style={{paddingTop: 4, paddingBottom: 4, writingMode:"vertical-rl"}}>
                                {d.Date.replaceAll('-', " ")}
                            </label>
                        </div>
                    ))
                }
            </div>
            <div>
                {
                    displayStatus()
                }
            </div>
        </div>
    }

    function display() {
        return (
            <Fragment>
                <div style={{marginLeft:32, marginRight:"auto"}}>
                    <div style={{marginLeft:0, width:"100%"}}>
                        <div style={{padding:8, fontWeight:"bold", fontSize: 24, textAlign:"left"}}>Attendance</div>
                    </div>
                    {attendance && attendance?.students?.length>0 ?
                        displayAttendance()
                        :<div>
                            <label>Nothing to show.</label>
                        </div>}
                </div>
            </Fragment>
        );
    }

    return <Fragment>
        <form onSubmit={handleSubmitAttendance}>
            {
                display()
            }
            {
                (canSetAttendance)
                    ? <button type={"submit"}>Submit</button>
                    :<Fragment/>
            }
        </form>
    </Fragment>
}

export default DisplayCourseSectionAttendance;