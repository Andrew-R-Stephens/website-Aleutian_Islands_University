import React, {Fragment, useEffect, useRef, useState} from "react";
import axios from "axios";
import {RoleAuthStore, UserAuthStore} from "../stores/AuthUserStore";
import {Checkbox} from "@mui/material";
import {blue, pink, red} from "@mui/material/colors";
import {Palette} from "@react-buddy/ide-toolbox";

function DisplayMasterSchedule(props:any) {
    const {targetUID} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userRoleID = RoleAuthStore((state:any) => state.authRole);

    const [UID, setUID] = useState(targetUID?targetUID:userStoreID);
    const userRole = useRef(userRoleID);

    const [semesterIDs, setSemesterIDs] = useState<any[]>([]);
    const [selectedSemesterID, setSelectedSemesterID] = useState<any>();
    const [semesterSections, setSemesterSections]= useState([]);

    useEffect(() => {
        const request = async () => requestViewableSemesters();
        request().then(r => console.log("Completed Semester Request", semesterIDs));
    }, [])

    useEffect(() => {
        semesterIDs.length>0?setSelectedSemesterID(semesterIDs.at(0).SemesterID):<></>;
    }, [semesterIDs])

    useEffect(() => {
        const request = async () => requestMasterSchedule();
        request().then(r=> console.log("Completed MasterSchedule Request", semesterSections));
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

    async function requestMasterSchedule() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getMasterScheduleBySemesterID",
                semesterID : selectedSemesterID
            }
        }).then(res => {
            console.log(res.data);
            const {
                Sections
            } = res.data;

            setSemesterSections(Sections);

        }).catch(function(err) {
            console.log("getMasterScheduleByID", err.message);
        })
    }

    const handleSelectSemesterID = (event:any) => {
        event.preventDefault();
        console.log('Selected key', event.target.value)
        setSelectedSemesterID(event.target.value);
    }

    return <Fragment>

        <h3>Display Master Schedule</h3>
        <select onChange={handleSelectSemesterID}>
            {
                semesterIDs?.map((item:any) => (
                    <option value={item.SemesterID}>{item.Term}{" "}{item.Year}</option>
                ))
            }
        </select>
        <div style={{maxHeight:"50vh", overflowY:"auto", overflowX:"auto"}}>
            <div className={'div-table'}>
                <div style={{marginTop: 32, marginBottom: 16, textAlign:"left", fontSize:32, fontWeight: "bold"}}>
                    {selectedSemesterID?<label>{(semesterIDs?.find((e:any)=>(e.SemesterID===selectedSemesterID)).Term)+" "+(semesterIDs?.find((e:any)=>(e.SemesterID===selectedSemesterID)).Year)}</label>:""}
                </div>
                <div className={'div-table-header'} style={{display:"flex"}}>
                    <div className={'div-table-col'}><label></label></div>
                    <div className={'div-table-col'}><label></label></div>
                    <div className={'div-table-col'}><label>CRN</label></div>
                    <div className={'div-table-col'}><label>Course</label></div>
                    <div className={'div-table-col'}><label>Name</label></div>
                    <div className={'div-table-col'}><label>Sec</label></div>
                    <div className={'div-table-col'}><label>Instr</label></div>
                    <div className={'div-table-col'}><label>Room</label></div>
                    <div className={'div-table-col'}><label>Day</label></div>
                    <div className={'div-table-col'}><label>Time</label></div>
                    <div className={'div-table-col'}><label>Min</label></div>
                    <div className={'div-table-col'}><label>Cap</label></div>
                    <div className={'div-table-col'}><label>Act</label></div>
                    <div className={'div-table-col'}><label>Dept</label></div>
                </div>
                {
                    semesterSections?.map((s:any) => (
                        <div className={'div-table-row'} style={{display:"flex"}}>
                            <div className={'div-table-col'} style={{display:"inline-flex"}}>
                                <div className={'div-table-button-wrapper'}>
                                    <div className={'div-table-button'}>
                                        <div className={'div-table-button-content'}>View</div>
                                    </div>
                                </div>
                            </div>
                            {userRole.current==='3'?
                                <div className={'div-table-col'} style={{display: "inline-flex"}}>
                                    <div style={{paddingLeft: 8}} className={'div-table-button-wrapper'}>
                                        <div className={'div-table-button'}>
                                            <div className={'div-table-button-content'}>Edit</div>
                                        </div>
                                    </div>
                                </div> :
                                <div className={'div-table-col'} style={{display: "inline-flex"}}>
                                    <div style={{paddingLeft: 8}} className={'div-table-button-wrapper'}>
                                        <Checkbox sx={{
                                            '&.Mui-checked': {
                                                color: blue[800]
                                            }
                                        }}/>
                                    </div>
                                </div>}
                            <div className={'div-table-col'}><label>{s.CRN}</label></div>
                            <div className={'div-table-col'}><label>{s.CourseID}</label></div>
                            <div className={'div-table-col'}><label>{s.Name}</label></div>
                            <div className={'div-table-col'}><label>{s.SectionID}</label></div>
                            <div className={'div-table-col'}><label>{s.FirstName} {s.LastName}</label></div>
                            <div className={'div-table-col'}><label>{s.RoomID}</label></div>
                            <div className={'div-table-col'}>
                                <div>
                                    <label>{s.DayName1Abbr}</label>
                                </div>
                                <div>
                                    <label>{s.DayName2Abbr}</label>
                                </div>
                            </div>
                            <div className={'div-table-col'}>
                                <div>
                                    <label>{s.StartTime1} - {s.EndTime1}</label>
                                </div>
                                <div>
                                    <label>{s.StartTime2} - {s.EndTime2}</label>
                                </div>
                            </div>
                            <div className={'div-table-col'}><label>{s.SeatsMinimum}</label></div>
                            <div className={'div-table-col'}><label>{s.SeatsCapacity}</label></div>
                            <div className={'div-table-col'}><label>{s.SeatsActual}</label></div>
                            <div className={'div-table-col'}><label>{s.DepartmentID}</label></div>
                        </div>
                    ))
                }
            </div>
        </div>
        <div><button>Create Section</button>{" "}<button>Apply Changes</button></div>

    </Fragment>;
}
export default DisplayMasterSchedule;