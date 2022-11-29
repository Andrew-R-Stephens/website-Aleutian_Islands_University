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
    const [departments, setDepartments] = useState([]);
    const [periods, setPeriods] = useState([]);
    const [days, setDays] = useState([]);

    const [selectedSemesterID, setSelectedSemesterID] = useState<any>();
    const [selectedDepartment, setSelectedDepartment] = useState<any>();
    const [selectedPeriod, setSelectedPeriod] = useState<any[]>([]);
    const [selectedDay, setSelectedDay] = useState<any>();
    const [selectedCourseName, setSelectedCourseName] = useState<string>();
    const [selectedCourseID, setSelectedCourseID] = useState<string>();
    const [selectedRoom, setSelectedRoom] = useState<string>();
    const [selectedInstructorName, setSelectedInstructorName] = useState<string>();


    const [semesterSections, setSemesterSections]= useState<any>([]);

    useEffect(() => {
        requestViewableSemesters().then(r => console.log("Completed Semester Request", semesterIDs));
        requestAllDepartments().then(r => console.log("Completed departments Request", departments));
        requestAllPeriods().then(r => console.log("Completed periods Request", periods));
        requestAllDays().then(r => console.log("Completed days Request", days));
    }, [])

    useEffect(() => {
        semesterIDs.length>0?setSelectedSemesterID(semesterIDs.at(0).SemesterID):<></>;
    }, [semesterIDs])

    useEffect(() => {
        const request = async () => requestMasterSchedule();
        request().then(r=> console.log("Completed MasterSchedule Request", semesterSections));
    }, [selectedSemesterID])

    useEffect(() => {
        console.log(selectedPeriod)
    }, [selectedPeriod])

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

    async function requestAllDepartments() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllDepartments"
            }
        }).then(res => {
            let {error, departments} = res.data;
            setDepartments(departments);
            console.log(departments);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAllPeriods() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllPeriods"
            }
        }).then(res => {
            let {error, periods} = res.data;
            setPeriods(periods);
            console.log(periods);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAllDays() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllDays"
            }
        }).then(res => {
            let {error, days} = res.data;
            setDays(days);
            console.log(days);
        }).catch(function(err) {
            console.log(err.message);
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

    const handleSelectedDepartment = (event:any) => {
        event.preventDefault();
        console.log('Selected key', event.target.value)
        setSelectedDepartment(event.target.value);
    }

    const handleSelectedCourseID = (event:any) => {
        event.preventDefault();
        console.log('Selected key', event.target.value)
        setSelectedCourseID(event.target.value);
    }

    const handleSelectedCourseName = (event:any) => {
        event.preventDefault();
        console.log('Selected key', event.target.value)
        setSelectedCourseName(event.target.value);
    }

    const handleSelectedFacultyName = (event:any) => {
        event.preventDefault();
        console.log('Selected key', event.target.value)
        setSelectedInstructorName(event.target.value);
    }

    const handleSelectedRoom = (event:any) => {
        event.preventDefault();
        console.log('Selected key', event.target.value)
        setSelectedRoom(event.target.value);
    }

    function handleSelectedPeriod(event:any, periodID : string) {
        console.log('Selected key', periodID, event.target.checked)
        setSelectedPeriod(old => old.filter((p:any)=>(p !== periodID)));
        if(event.target.checked)
            setSelectedPeriod(old => [...old, periodID]);
    }

    const handleSelectedDay = (event:any) => {
        console.log('Selected key', event.target.value)
        setSelectedDay(event.target.value);
    }

    function displayFilterSemester() {
        return (
            <div style={{display: "inline-block", margin:"auto", marginBottom: 32, marginTop: 16}}>
                <label style={{display:"flex", marginLeft: 8, marginRight: "auto", width:"fit-content", fontSize:12, fontWeight:"bold"}}>Semester</label>
                <select onChange={handleSelectSemesterID}>
                    {
                        semesterIDs?.map((item:any) => (
                            <option value={item.SemesterID}>{item.Term}{" "}{item.Year}</option>
                        ))
                    }
                </select>
            </div>
        );
    }

    function displayFilterDepartment() {
        return (
            <div style={{display: "inline-block", marginLeft:"auto", marginRight:"auto"}}>
                <label style={{display:"flex", marginLeft: 8, marginRight: "auto", width:"fit-content", fontSize:12, fontWeight:"bold"}}>Department</label>
                <select style={{display:"flex", margin: "auto", width:"fit-content"}} onChange={handleSelectedDepartment}>
                    {
                        departments?.map((department: any) => (
                            <option>{department.DepartmentID}</option>
                        ))
                    }
                </select>
            </div>
        );
    }

    function displayFilterCourseID() {
        return (
            <div style={{display: "inline-block", marginLeft:"auto", marginRight:"auto"}}>
                <label style={{display:"flex", marginLeft: 8, marginRight: "auto", width:"fit-content", fontSize:12, fontWeight:"bold"}}>Course ID</label>
                <input style={{display:"flex", margin: "auto", width:"fit-content"}} type={'text'}
                       autoComplete={'on'}
                       value={selectedCourseID}
                       onChange={handleSelectedCourseID}/>
            </div>
        );
    }

    function displayFilterCourseName() {
        return (
            <div style={{display: "inline-block", marginLeft:"auto", marginRight:"auto"}}>
                <label style={{display:"flex", marginLeft: 8, marginRight: "auto", width:"fit-content", fontSize:12, fontWeight:"bold"}}>Course Name</label>
                <input style={{display:"flex", margin: "auto", width:"fit-content"}} type={'text'}
                       autoComplete={'on'}
                       value={selectedCourseID}
                       onChange={handleSelectedCourseName}/>
            </div>
        );
    }

    function displayFilterFacultyName() {

        return (
            <div style={{display: "inline-block", marginLeft:"auto", marginRight:"auto"}}>
                <label style={{display:"flex", marginLeft: 8, marginRight: "auto", width:"fit-content", fontSize:12, fontWeight:"bold"}}>Instructor Name</label>
                <input style={{display:"flex", margin: "auto", width:"fit-content"}} type={'text'}
                       autoComplete={'on'}
                       value={selectedCourseID}
                       onChange={handleSelectedFacultyName}/>
            </div>
        );
    }

    function displayFilterRoom() {
        return (
            <div style={{display: "inline-block", marginLeft:"auto", marginRight:"auto"}}>
                <label style={{display:"flex", marginLeft: 8, marginRight: "auto", width:"fit-content", fontSize:12, fontWeight:"bold"}}>Room</label>
                <input style={{display:"flex", margin: "auto", width:"fit-content"}} type={'text'}
                       autoComplete={'on'}
                       value={selectedCourseID}
                       onChange={handleSelectedRoom}/>
            </div>
        );
    }

    function displayFilterPeriod() {
        return (
            <div style={{display: "inline-block", marginLeft:"auto", marginRight:"auto"}}>
                <label style={{display:"flex", marginLeft: 8, marginRight: "auto", width:"fit-content", fontSize:12, fontWeight:"bold"}}>Periods</label>
                <form>
                    <fieldset style={{display:"inline-block"}}>
                    {
                        periods?.map((p: any) => (
                            <div style={{textAlign:"left"}}>
                                <input type={'checkbox'}
                                       onChange={(event)=>handleSelectedPeriod(event, p.PeriodID)}/>
                                <label style={{paddingLeft:8}}>{time24to12(p.StartTime)} - {time24to12(p.EndTime)}</label>
                            </div>
                        ))
                    }
                    </fieldset>
                </form>
            </div>
        );
    }

    function displayFilterDay() {
        return (
            <div style={{display: "inline-block", marginLeft:"auto", marginRight:"auto"}}>
                <label style={{display:"flex", marginLeft: 8, marginRight: "auto", width:"fit-content", fontSize:12, fontWeight:"bold"}}>Days</label>
                <form>
                    <fieldset style={{display:"inline-block"}}>
                        {
                            days?.map((d: any) => (
                                <div style={{textAlign:"left"}}>
                                    <input type={'checkbox'}
                                           onChange={handleSelectedDay}
                                    />
                                    <label style={{paddingLeft:8}}>{d.Name}</label>
                                </div>
                            ))
                        }
                    </fieldset>
                </form>
            </div>
        );
    }

    function displayFilterOptions() {
        return(
            <div style={{backgroundColor:"#eeeeee", borderRadius:15, boxShadow: "0 0 15px #333333", padding: 16, display:"flex", maxWidth: 700, margin:"auto"}}>
                <div style={{marginLeft:"auto", marginTop: 16, marginRight:"auto", display:"inline-block"}}>
                    <div style={{marginLeft:"auto", marginRight:"auto"}}>{displayFilterCourseID()}</div>
                    <div style={{marginLeft:"auto", marginTop: 8, marginRight:"auto"}}>{displayFilterCourseName()}</div>
                    <div style={{marginLeft:"auto", marginTop: 8, marginRight:"auto"}}>{displayFilterFacultyName()}</div>
                    <div style={{marginLeft:"auto", marginTop: 8, marginRight:"auto"}}>{displayFilterRoom()}</div>
                </div>
                <div style={{width: "100%", marginLeft:"auto", marginTop: 16, marginRight:"auto", display:"inline-block"}}>
                    <div>{displayFilterDepartment()}</div>
                    <div style={{marginLeft:"auto", marginTop: 16, marginRight:"auto", display:"flex"}}>
                        <div style={{backgroundColor:"#dfdfdf", borderRadius:15, padding:8, marginLeft:"auto", marginRight:"auto", marginTop:0, marginBottom:"auto"}}>{displayFilterDay()}</div>
                        <div style={{backgroundColor:"#dfdfdf", borderRadius:15, padding:8, marginLeft:"auto", marginRight:"auto", marginTop:0, marginBottom:"auto"}}>{displayFilterPeriod()}</div>
                    </div>
                </div>
            </div>
        );
    }

    function time24to12(time:string) {
        const split = time.split(":");
        const zone = parseFloat(split[0]) > 12 ? "PM" : "AM";
        const hour = ((parseFloat(split[0]) % 12) || 12);
        return hour+":"+split[1]+" "+zone;
    }

    function filterSections() {
        const newSem = semesterSections!?.filter((s:any)=> (
            selectedDepartment === "" || s.DepartmentID === selectedDepartment
        ))!.filter((s:any)=> (
            s.PeriodID1 !== "1"
        ))/*!.filter((s:any)=> (
            s.DayID === "" || s.DayID === selectedDay.DayID1 || s.DayID2 === selectedDay.DayID2
        ))*/
        return newSem;
    }

    return <Fragment>

        <h1>Master Schedule</h1>
        <div>
            {displayFilterSemester()}
        </div>
        <div>
            {displayFilterOptions()}
        </div>
        <div style={{overflowX:"auto", marginTop:32}}>
            <div style={{marginLeft: 16, marginTop: 32, marginBottom: 16, textAlign:"left", fontSize:32, fontWeight: "bold"}}>
                {selectedSemesterID?<label>{(semesterIDs?.find((e:any)=>(e.SemesterID===selectedSemesterID)).Term)+" "+(semesterIDs?.find((e:any)=>(e.SemesterID===selectedSemesterID)).Year)}</label>:""}
            </div>
            <div className={'div-table'}>
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
                <div style={{maxHeight:"50vh", overflowY:"auto"}}>
                {
                    filterSections()?.map((s:any) => (
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
                }</div>
            </div>
        </div>
        {/*<div><button>Create Section</button>{" "}<button>Apply Changes</button></div>*/}

    </Fragment>;
}
export default DisplayMasterSchedule;