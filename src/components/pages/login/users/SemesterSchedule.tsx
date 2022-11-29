import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {RoleAuthStore, UserAuthStore} from "../../../../stores/AuthUserStore";
import "./../../../../css/PeudoTable.css"

function SemesterSchedule(props:any) {

    const {targetUID, targetRole} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(userStoreID);
    const [userRole, setUserRole] = useState(userStoreRole);

    useEffect(() => {
        if(targetRole && targetUID) {
            setUserRole(targetRole+"");
            setID(targetUID);
            console.log(targetUID, targetRole)
        }
    }, [targetUID && targetRole])

    const [semesterIDs, setSemesterIDs] = useState<any []>();

    const [selectedSemesterID, setSelectedSemesterID] = useState<string>();
    const [semesterSchedule, setSemesterSchedule] = useState<any[]>();

    useEffect(() => {
        requestViewableSemesters().then();
    }, [])

    useEffect(() => {
        console.log("Using Ids", semesterIDs)
        setSelectedSemesterID(semesterIDs?.at(0).SemesterID)
    }, [semesterIDs])

    useEffect(() => {
        if(selectedSemesterID && userID) {
            requestScheduleByUIDAndSemesterID().then(r => console.log("Schedule Request Done"));
        }
    }, [selectedSemesterID])

    async function requestViewableSemesters() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getSemesterIDsInRange"
            }
        }).then(res => {
            const {
                SemesterIDs
            } = res.data;

            setSemesterIDs(SemesterIDs);
            console.log(res.data);

        }).catch(function(err) {
            console.log("getSemesterIDsInRange", err.message);
        })
    }

    async function requestScheduleByUIDAndSemesterID() {
        console.log("requesting", userID, selectedSemesterID);
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getScheduleByUIDAndSemesterID",
                id: userID,
                semesterID: selectedSemesterID
            }
        }).then(res => {
            let {error, schedule} = res.data;
            console.log(res.data)
            setSemesterSchedule(schedule);
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
                    <h1>Semester Schedule</h1>
                </div>
                <select onChange={handleSelectSemesterID}>
                    {
                        semesterIDs?.map((item:any) => (
                            <option value={item.SemesterID}>{item.Term}{" "}{item.Year}</option>
                        ))
                    }
                </select>
                <div className={'div-table'}>
                    <div className={'div-table-header'} style={{display:"flex"}}>
                        <div className={'div-table-col'}><label></label></div>
                        <div className={'div-table-col'}><label>CRN</label></div>
                        <div className={'div-table-col'}><label>Course ID</label></div>
                        <div className={'div-table-col'}><label>Section</label></div>
                        <div className={'div-table-col'}><label>Faculty</label></div>
                        <div className={'div-table-col'}><label>Building</label></div>
                        <div className={'div-table-col'}><label>Room</label></div>
                        <div className={'div-table-col'}><label>Day</label></div>
                        <div className={'div-table-col'}><label>Start</label></div>
                        <div className={'div-table-col'}><label>End</label></div>
                    </div>
                    {
                        semesterSchedule?.map((item:any) => (
                            <div className={'div-table-row'} style={{display:"flex"}}>
                                <div className={'div-table-col'} style={{display:"flex"}}>
                                    <div className={'div-table-button-wrapper'}>
                                        <div className={'div-table-button'}>
                                            <div className={'div-table-button-content'}>View</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={'div-table-col'}><label>{item.CRN}</label></div>
                                <div className={'div-table-col'}><label>{item.CourseID}</label></div>
                                <div className={'div-table-col'}><label>{item.SectionID}</label></div>
                                <div className={'div-table-col'}><label>{item.FacultyID}</label></div>
                                <div className={'div-table-col'}><label>{item.BuildingName}</label></div>
                                <div className={'div-table-col'}><label>{item.RoomID}</label></div>
                                <div className={'div-table-col'}>
                                    <div><label>{item.Day1}</label></div>
                                    <div><label>{item.Day2}</label></div>
                                </div>
                                <div className={'div-table-col'}>
                                    <div><label>{item.StartTime1}</label></div>
                                    <div><label>{item.StartTime2}</label></div>
                                </div>
                                <div className={'div-table-col'}>
                                    <div><label>{item.EndTime1}</label></div>
                                    <div><label>{item.EndTime2}</label></div>
                                </div>
                            </div>
                        ))

                    }
                </div>
            </div>
        </Fragment>
    );
}

export default SemesterSchedule;