import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {AuthRole, RoleAuthStore} from "../../../../../../stores/AuthUserStore";

function DisplayCourseSectionRosterWithGrades(props:any) {

    const{targetCRN, godRole} = props;

    const [crn, setCRN] = useState(targetCRN);
    const [roster, setRoster] = useState<any[]>();
    const [grades, setGrades] = useState<any[]>();
    const [oldGrades, setOldGrades] = useState<any[]>();
    const [gradeOptions, setGradeOptions] = useState<any[]>();
    const [canSetMidterm, setCanSetMidterm] = useState<boolean>(false);
    const [canSetFinal, setCanSetFinal] = useState<boolean>(false);

    useEffect(() => {
        setCRN(targetCRN);
    }, [targetCRN])

    useEffect(() => {
        console.log("grades", grades)
    }, [grades])

    useEffect(() => {
        requestSectionRoster().then(r=>console.log("Section Roster requested"));
        requestSectionGrades().then(r=>console.log("Section Grades requested"));
        requestPossibleGrades().then(r=>console.log("Possible grades requested"));
        requestCanSetMidtermGrades().then(r=>console.log("Midterm Grades requested"));
        requestCanSetFinalGrades().then(r=>console.log("Final Grades requested"));
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
            setOldGrades(grades);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestCanSetMidtermGrades() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "checkIfCanSetMidtermGrades",
                crn
            }
        }).then(res => {
            let {error, status} = res.data;
            console.log("MistermGradeCheck", !!(status.at(0).CanGrade))
            setCanSetMidterm(!!(status?.at(0).CanGrade));
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestCanSetFinalGrades() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "checkIfCanSetFinalGrades",
                crn
            }
        }).then(res => {
            let {error, status} = res.data;
            console.log("FinalGradeCheck", !!(status.at(0).CanGrade))
            setCanSetFinal(!!(status?.at(0).CanGrade));
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestPossibleGrades() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAvailableGrades"
            }
        }).then(res => {
            let {error, grades} = res.data;
            console.log("GradeOptions",grades)
            setGradeOptions(grades);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAssignGrades() {
        console.log(JSON.stringify(grades));
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "assignGrades",
                crn,
                grades: JSON.stringify(grades)
            }
        }).then(res => {
            console.log(res.data)
            const {result} = res.data;
            if(result?.record?.length>0)
                switch(result?.record?.at(0)){
                    case 0: {
                        alert("There was a problem updating grades.");
                        break;
                    }
                    default: alert("Successfully updated grades.");
                }

        }).catch(function(err) {
            console.log(err.message);
        })
    }

    const handleChangeGrade = (event:any, index:number) => {
        event.preventDefault();
        const temp = JSON.parse(JSON.stringify(grades));
        if(gradeOptions) {
            temp[index].ID = gradeOptions[parseInt(event.target.value)].ID;
            temp[index].GradeID = gradeOptions[parseInt(event.target.value)].GradeID;
        }
        setGrades(temp);
    }

    const handleSubmitGrade = (event:any) => {
        event.preventDefault();
        requestAssignGrades().then(r=>"Update Grades requested");
    }

    function displayGradeList(grade:any, index:number) {
        return  (
            <Fragment>
                <select value={grade.ID} onChange={(event:any)=>handleChangeGrade(event, index)}>
                    <option value={grade.ID}>{grade.GradeID}</option>
                    {
                        gradeOptions?.map((g:any, i:number)=>(
                            <option value={i}>{g.GradeID}</option>
                        ))
                    }
                </select>
            </Fragment>
        );
    }

    function displayGrades(rosterEntity:any) {
        return(
            grades?.map((g:any, index:number) => (
                g.StudentID === rosterEntity.StudentID ?
                    <Fragment>
                        {
                            (canSetMidterm || canSetFinal) && grades && godRole !== AuthRole.Administrator?
                                <div className={'div-table-col'}>{displayGradeList(g, index)}</div>
                                : <div className={'div-table-col'}>{g.GradeID??"NA"}</div>
                        }
                        <div className={'div-table-col'}>{g.SemPeriod?g.SemPeriod:"NA"}</div>
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
        <form onSubmit={handleSubmitGrade}>
            {
                display()
            }
            {
                (canSetMidterm || canSetFinal) && grades
                    ? <button type={"submit"}>Submit</button>
                    :<Fragment/>
            }
        </form>
    </Fragment>
}

export default DisplayCourseSectionRosterWithGrades;