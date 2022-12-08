import React, {Fragment, useEffect, useState} from "react";
import AttendanceDetails from "./../../../../../../classes/AttendanceDetails";
import axios from "axios";

function DisplayCourseSectionAttendance(props:any) {
    const{targetCRN, godRole} = props;

    const [crn, setCRN] = useState(targetCRN);
    const [dates, setDates] = useState<any[]>();
    const [attendance, setAttendance] = useState<AttendanceDetails>();

    useEffect(() => {
        setCRN(targetCRN);
    }, [targetCRN])

    useEffect(() => {
        getPassedMeetingDates().then(r=>console.log(r))
        requestSectionAttendance().then(r=>console.log(r));
    }, [crn])

    useEffect(()=>(
        attendance?.print()
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
                    attendance?.students.map((sa:any) => (
                        <div className={'div-table-row'} style={{display:"flex"}}>
                            <div className={'div-table-col'}>{sa?.studentID}</div>
                            {
                                sa.attendance.map((a:any)=> (
                                    <div className={'div-table-col'}>
                                        {a?.status===1?<span>&#10003;</span>:<span>&#x2717;</span>}
                                    </div>
                                ))
                            }
                        </div>
                    ))

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
        {
            display()
        }
    </Fragment>
}

export default DisplayCourseSectionAttendance;