import React, {Fragment, useEffect, useState} from "react";
import AttendanceDetails from "../../../../classes/AttendanceDetails";
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

    function display() {
        return (
            <Fragment>
                <div style={{margin:32}}>
                    <div>
                        <h1>Attendance</h1>
                    </div>
                    <div className={'div-table'}>
                        <div className={'div-table-header'} style={{display:"flex"}}>
                            <div className={'div-table-col'}><label style={{writingMode:"vertical-rl"}}>Student</label></div>
                            {
                                dates?.map((d:any)=>(
                                    <div className={'div-table-col'}>
                                        <label style={{writingMode:"vertical-rl"}}>
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