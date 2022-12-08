import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {UserAuthStore} from "../../../../../../stores/AuthUserStore";

function DisplayCourseSectionRosterWithGrades(props:any) {

    const{targetCRN, godRole} = props;

    const [crn, setCRN] = useState(targetCRN);
    const [roster, setRoster] = useState<any[]>();
    const [grades, setGrades] = useState<any[]>();
    const [gradeOptions, setGradeOptions] = useState<any[]>();
    const [canSetMidterm, setCanSetMidterm] = useState<boolean>(false);
    const [canSetFinal, setCanSetFinal] = useState<boolean>(false);
    const [canSetAttendance, setCanSetAttendance] = useState<boolean>(false);

    useEffect(() => {
        setCRN(targetCRN);
    }, [targetCRN])

    useEffect(() => {
        requestSectionRoster().then(r=>console.log(r));
        requestSectionGrades().then(r=>console.log(r));
    }, [crn])

    async function requestSectionRoster() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getCourseSectionRosterByCRN",
                crn: crn
            }
        }).then(res => {
            let {error, roster} = res.data;
            console.log(res.data)
            setRoster(roster);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestSectionGrades() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getCourseSectionGradesByCRN",
                crn: crn
            }
        }).then(res => {
            let {error, grades} = res.data;
            console.log(res.data)
            setGrades(grades);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    /*
    async function requestCanSetMidtermGrades() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "canSetMidtermGrades"
            }
        }).then(res => {
            let {error, canSet} = res.data;
            console.log(res.data)
            setCanSetMidterm(canSet);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestCanSetFinalGrades() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "canSetFinalGrades"
            }
        }).then(res => {
            let {error, canSet} = res.data;
            console.log(res.data)
            setCanSetFinal(canSet);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestPossibleGrades() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getPossibleGrades"
            }
        }).then(res => {
            let {error, grades} = res.data;
            console.log(res.data)
            setGrades(grades);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestCanSetAttendance() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getCanSetAttendance",
                crn

            }
        }).then(res => {
            let {error, grades} = res.data;
            console.log(res.data)
            setGrades(grades);
        }).catch(function(err) {
            console.log(err.message);
        })
    }
    */

    function displayGrades(rosterEntity:any) {
        return(
            grades?.map((g:any) => (
                g.StudentID === rosterEntity.StudentID ?
                    <Fragment>
                        <div className={'div-table-col'}>{g.GradeID?g.GradeID:"NA"}</div>
                        <div className={'div-table-col'}>{g.SemPeriod?g.SemPeriod:"NA"}</div>
                        {/*<div className={'div-table-col'}>{g.SemPeriod?g.SemPeriod:"NA"}</div>*/}
                    </Fragment>
                    : <Fragment/>
            ))
        );
    }

    function display() {
        return (
            <Fragment>
                <div style={{marginLeft:32, marginRight:"auto"}}>
                    <div style={{marginLeft:0, width:"100%"}}>
                        <div style={{padding:8, fontWeight:"bold", fontSize: 24, textAlign:"left"}}>Roster</div>
                    </div>
                    <div className={'div-table'}>
                        <div className={'div-table-header'} style={{display:"flex"}}>
                            <div className={'div-table-col'}><label>UID</label></div>
                            <div className={'div-table-col'}><label>First</label></div>
                            <div className={'div-table-col'}><label>Last</label></div>
                            <div className={'div-table-col'}><label>Time</label></div>
                            <div className={'div-table-col'}><label>Grade</label></div>
                            <div className={'div-table-col'}><label>Status</label></div>
                        </div>
                        <div>
                            {
                                roster?.map((r:any) => (
                                    <div className={'div-table-row'} style={{display:"flex"}}>
                                        <div className={'div-table-col'}>{r?.StudentID}</div>
                                        <div className={'div-table-col'}>{r?.FirstName}</div>
                                        <div className={'div-table-col'}>{r?.LastName}</div>
                                        <div className={'div-table-col'}>{r?.Time}</div>
                                        {
                                            displayGrades(r)
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

export default DisplayCourseSectionRosterWithGrades;