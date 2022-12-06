import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {RoleAuthStore, UserAuthStore} from "../../../../stores/AuthUserStore";
import "./../../../../css/PeudoTable.css"
import DisplayCourseSection from "./DisplayCourseSection";
import {convertTime} from "../../../../Utils";

function DisplaySemesterSchedule(props:any) {

    const {targetUID, targetRole} = props;
    const {enableRegistration, registrableSemesterID, handleNavigateCourseSearch} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);
    const [userRole, setUserRole] = useState(targetRole?targetRole:userStoreRole);

    const [semesterIDs, setSemesterIDs] = useState<any []>();
    const [selectedSemesterID, setSelectedSemesterID] = useState<string>();

    const [semesterSchedule, setSemesterSchedule] = useState<any[]>();
    const [dropStatus, setDropStatus] = useState<boolean[]>([])

    const [selectedCRN, setSelectedCRN] = useState<string>();

    useEffect(() => {
        requestViewableSemesters().then();
    }, [])

    useEffect(() => {
        console.log("Using Ids", semesterIDs)
        setSelectedSemesterID(semesterIDs?.at(0).SemesterID)
    }, [semesterIDs])

    useEffect(() => {
        if(selectedSemesterID && userID) {
            setSelectedCRN("");
            requestScheduleByUIDAndSemesterID().then(r => console.log("Schedule Request Done"));
        }
    }, [selectedSemesterID])

    useEffect(() => {
        const status:boolean[] = [];
        semesterSchedule?.map((index:any)=>(status.push(false)))
        setDropStatus(status);
    }, [semesterSchedule])

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
            console.log("user",  userID)
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestDropCourseSection(crn:string) {
        await axios.post(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                post: "dropCourseSection",
                uid: userID,
                crn
            }
        }).then(res => {
            const{status='Failed'} = res.data;
            console.log("Res: ", res.data)
            requestScheduleByUIDAndSemesterID().then(() => console.log('Init request succeeded.'));
            alert(res.data.status);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    const handleSelectSemesterID = (event:any) => {
        event.preventDefault();
        console.log('Selected key', event.target.value)
        setSelectedSemesterID(event.target.value);
    }

    function handleSelectCRN(event:any, CRN:string){
        event.preventDefault();
        setSelectedCRN(selectedCRN===CRN?"":CRN);
    }

    function displayCourseSection() {
        return (
            <Fragment>
                <DisplayCourseSection targetCRN={selectedCRN} godRole={userStoreRole}/>
            </Fragment>
        );
    }

    const handleChangeDropStatus = (event:any, index:number) => {
        const status:boolean[] = dropStatus;
        const value = parseInt(event.target.value)
        status[index] = !!value;
        setDropStatus(status);
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
        semesterSchedule?.map((section:any, index:number)=>(
            dropStatus[index] ?
            requestDropCourseSection(section.CRN).then(r => console.log()):""
        ))
    }

    return (
        <Fragment>
            <div style={{margin:32}}>
                <select onChange={handleSelectSemesterID}>
                    {
                        semesterIDs?.map((item:any) => (
                            <option value={item.SemesterID}>{item.Term}{" "}{item.Year}</option>
                        ))
                    }
                </select>
                <form onSubmit={handleSubmit}>
                    <div className={'div-table'}>
                        <div className={'div-table-header'} style={{display:"flex"}}>
                            <div className={'div-table-col'}><label></label></div>
                            {
                                enableRegistration ?
                                    <div className={'div-table-col'}><label></label></div>
                                    :<Fragment/>
                            }
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
                            semesterSchedule?.map((item:any, index:number) => (
                                <div className={'div-table-row'} style={{display:"flex"}}>
                                    <div className={'div-table-col'} style={{display:"flex"}}>
                                        <div className={'div-table-button-wrapper'}>
                                            <div className={'div-table-button'}
                                                 onClick={(event)=>handleSelectCRN(event, item.CRN)}>
                                                <div className={'div-table-button-content'}>View</div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        enableRegistration ?
                                            <div className={'div-table-col'} style={{display: "flex"}}>
                                                <select className={'div-table-button-content'}
                                                        onChange={(event) => handleChangeDropStatus(event, index)}>
                                                    <option value={0}>No Action</option>
                                                    <option value={1}>Drop Section</option>
                                                </select>
                                            </div>
                                            : <Fragment/>
                                    }
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
                                        <div><label>{convertTime(item.StartTime1)}</label></div>
                                        <div><label>{convertTime(item.StartTime2)}</label></div>
                                    </div>
                                    <div className={'div-table-col'}>
                                        <div><label>{convertTime(item.EndTime1)}</label></div>
                                        <div><label>{convertTime(item.EndTime2)}</label></div>
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                    {
                        enableRegistration ?
                            <div style={{marginLeft:32, display:"flex"}}>
                                <div>
                                    <button type={'submit'}>Apply Changes</button>
                                </div>

                                <div style={{marginLeft:16}}>
                                    <button disabled={selectedSemesterID!==registrableSemesterID}
                                            type={'button'}
                                            onClick={(event:any)=>handleNavigateCourseSearch(event)}>Course Search</button>
                                </div>
                            </div>
                            :
                            <Fragment/>
                    }
                </form>

                {selectedCRN?displayCourseSection():<></>}
            </div>

        </Fragment>
    );
}

export default DisplaySemesterSchedule;