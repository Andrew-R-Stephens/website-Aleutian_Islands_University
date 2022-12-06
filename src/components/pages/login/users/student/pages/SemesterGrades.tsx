import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {UserAuthStore} from "../../../../../../stores/AuthUserStore";
import "./../../../../../../css/PeudoTable.css"

function SemesterGrades(props:any) {

    const {targetUID} = props;
    console.log("UID", targetUID)

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);

    const [semesterIDs, setSemesterIDs] = useState<any[]>([]);

    const [selectedSemesterID, setSelectedSemesterID] = useState<string>();
    const [semesterHistory, setSemesterHistory] = useState<any[]>();

    useEffect(() => {
        requestViewableSemesters().then(r=>console.log("Viewable Semesters obtained"));
    }, [userID])

    useEffect(() => {
        console.log("Using Ids", semesterIDs)
        semesterIDs?.length>0?
            setSelectedSemesterID(semesterIDs?.at(0).SemesterID):<></>
    }, [semesterIDs])

    useEffect(() => {
        if(selectedSemesterID && userID) {
            requestScheduleByUIDAndSemesterID().then(r => console.log("Schedule Request Done"));
        }
    }, [selectedSemesterID])

    async function requestViewableSemesters() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getSemesterIDsInHistoryByStudentID",
                id: userID
            }
        }).then(res => {
            const { SemesterIDs } = res.data;

            setSemesterIDs(SemesterIDs);
            console.log(res.data);

        }).catch(function(err) {
            console.log("getSemesterIDsInHistoryByStudentID", err.message);
        })
    }

    async function requestScheduleByUIDAndSemesterID() {
        console.log("requesting", userID, selectedSemesterID);
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getHistoryByStudentIDAndSemesterID",
                id: userID,
                semesterID: selectedSemesterID
            }
        }).then(res => {
            let {error, semesterHistory} = res.data;
            console.log(res.data, "User ", userID)
            setSemesterHistory(semesterHistory);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    const handleSelectSemesterID = (event:any) => {
        event.preventDefault();
        console.log('Selected key', event.target.value)
        setSelectedSemesterID(event.target.value);
    }

    return (
        <Fragment>
            <div style={{margin:32}}>
                <div>
                    <h1>Semester Grades</h1>
                </div>
                <select onChange={handleSelectSemesterID}>
                    {
                        semesterIDs?.map((item:any) => (
                            <option value={item.SemesterID}>{item.Term}{" "}{item.Year}</option>
                        ))
                    }
                </select>
                <div>
                    {semesterIDs?.map((item:any)=>(
                        item.SemesterID===selectedSemesterID?<div style={{fontSize: 25, fontWeight:"bold", textAlign:"left", paddingLeft: 16}}>{item.Term} {item.Year}</div>:<></>)
                    )}
                </div>
                <div className={'div-table'}>
                    <div className={'div-table-header'} style={{display:"flex"}}>
                        <div className={'div-table-col'}><label>CRN</label></div>
                        <div className={'div-table-col'}><label>Course ID</label></div>
                        <div className={'div-table-col'}><label>Section</label></div>
                        <div className={'div-table-col'}><label>Grade</label></div>
                        <div className={'div-table-col'}><label>Status</label></div>
                    </div>
                    {
                        semesterHistory?.map((item:any) => (
                            <div className={'div-table-row'} style={{display:"flex"}}>
                                <div className={'div-table-col'}><label>{item.CRN}</label></div>
                                <div className={'div-table-col'}><label>{item.CourseID}</label></div>
                                <div className={'div-table-col'}><label>{item.SectionID}</label></div>
                                <div className={'div-table-col'}><label>{item.GradeID}</label></div>
                                <div className={'div-table-col'}><label>{item.SemPeriod}</label></div>
                            </div>
                        ))

                    }
                </div>
            </div>
        </Fragment>
    );
}

export default SemesterGrades;