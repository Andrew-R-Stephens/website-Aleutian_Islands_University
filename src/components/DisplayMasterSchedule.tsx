import React, {Fragment, useEffect, useRef, useState} from "react";
import axios from "axios";
import {AuthRole, RoleAuthStore, UserAuthStore} from "../stores/AuthUserStore";
import {TablePagination} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {convertTime} from "../Utils";

function DisplayMasterSchedule(props:any) {
    const {targetUID} = props;
    const {enableRegistration, registrableSemesterID, handleRegisterCourse, handleBackButton} = props;
    const {adminManagement} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userRoleID = RoleAuthStore((state:any) => state.authRole);

    const [UID, setUID] = useState(targetUID?targetUID:userStoreID);
    const userRole = useRef(userRoleID);

    const [pageNumber, setPageNumber] = useState(0);
    const [maxResults, setMaxResults] = useState(10);

    const [semesterIDs, setSemesterIDs] = useState<any[]>([]);
    const [departments, setDepartments] = useState([]);
    const [periods, setPeriods] = useState([]);
    const [days, setDays] = useState([]);

    const [selectedSemesterID, setSelectedSemesterID] = useState<any>();
    const [selectedDepartment, setSelectedDepartment] = useState<string>("");
    const [selectedPeriod, setSelectedPeriod] = useState<any[]>([]);
    const [selectedDay, setSelectedDay] = useState<any[]>([]);
    const [selectedCRN, setSelectedCRN] = useState<string>("");
    const [selectedCourseName, setSelectedCourseName] = useState<string>("");
    const [selectedCourseID, setSelectedCourseID] = useState<string>("");
    const [selectedRoom, setSelectedRoom] = useState<string>("");
    const [selectedCredits, setSelectedCredits] = useState<string>("");
    const [selectedInstructorName, setSelectedInstructorName] = useState<string>("");

    const [filteredSections, setFilteredSections] = useState<any[]>([]);

    const [semesterSections, setSemesterSections]= useState<any>([]);

    const navigate =  useNavigate();

    useEffect(() => {
        requestViewableSemesters().then(r => console.log("Completed Semester Request", semesterIDs));
        requestAllDepartments().then(r => console.log("Completed departments Request", departments));
        requestAllPeriods().then(r => console.log("Completed periods Request", periods));
        requestAllDays().then(r => console.log("Completed days Request", days));
    }, [])

    useEffect(() => {
        console.log("RegSemesterID", registrableSemesterID)
        semesterIDs?.length > 0 ?
            !registrableSemesterID ?
                setSelectedSemesterID(semesterIDs.at(0).SemesterID)
                :setSelectedSemesterID(registrableSemesterID)
            : <></>;
    }, [semesterIDs])

    useEffect(() => {
        const request = async () => requestMasterSchedule();
        request().then(r=> console.log("Completed MasterSchedule Request", semesterSections));
    }, [selectedSemesterID])

    useEffect(() => {
        console.log(selectedPeriod)
    }, [selectedPeriod])

    useEffect(() => {
        setPageNumber(0)
        filterSections().then(r=>setFilteredSections(r));
    }, [semesterSections, selectedDepartment, selectedPeriod, selectedDay, selectedCourseName, selectedCredits, selectedCourseID,
        selectedRoom, selectedInstructorName, selectedCRN])

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

    async function requestDeleteSection(CRN:string) {
        console.log("CRN is ", CRN);
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "deleteCourseSectionFromSchedule",
                crn: CRN
            }
        }).then(res => {
            const{result} = res.data;
            requestMasterSchedule().then(r=>console.log("Schedule Reloaded"));
            if(result == 0)
                alert(CRN + " has been successfully deleted.")
            else
                alert(CRN + " could not be deleted.")
        }).catch(function(err) {
            console.log("delete section", err.message);
        })
    }

    const handleSelectSemesterID = (event:any) => {
        event.preventDefault();
        setSelectedSemesterID(event.target.value);
    }

    const handleSelectedDepartment = (event:any) => {
        event.preventDefault();
        setSelectedDepartment(event.target.value);
    }

    const handleSelectedCRN = (event:any) => {
        event.preventDefault();
        setSelectedCRN(event.target.value);
    }

    const handleSelectedCourseID = (event:any) => {
        event.preventDefault();
        setSelectedCourseID(event.target.value);
    }

    const handleSelectedCourseName = (event:any) => {
        event.preventDefault();
        setSelectedCourseName(event.target.value);
    }

    const handleSelectedFacultyName = (event:any) => {
        event.preventDefault();
        setSelectedInstructorName(event.target.value);
    }

    const handleSelectedRoom = (event:any) => {
        event.preventDefault();
        setSelectedRoom(event.target.value);
    }

    const handleSelectedCredits = (event:any) => {
        event.preventDefault();
        setSelectedCredits(event.target.value);
    }

    function handleSelectedPeriod(event:any, periodID : string) {
        setSelectedPeriod(old => old.filter((p:any)=>(p !== periodID)));
        if(event.target.checked)
            setSelectedPeriod(old => [...old, periodID]);
    }

    function handleSelectedDay(event:any, dayID : string) {
        setSelectedDay(old => old.filter((d:any)=>(d !== dayID)));
        if(event.target.checked)
            setSelectedDay(old => [...old, dayID]);
    }

    function displayFilterSemester() {
        return (
            <div style={{display: "inline-block", margin:"auto", marginBottom: 32, marginTop: 16}}>
                <label style={{display:"flex", marginLeft: 8, marginRight: "auto", width:"fit-content", fontSize:12, fontWeight:"bold"}}>Semester</label>
                <select onChange={handleSelectSemesterID} value={selectedSemesterID}>
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
                    <option value={''}>-- Any --</option>
                    {
                        departments?.map((department: any) => (
                            <option>{department.DepartmentID}</option>
                        ))
                    }
                </select>
            </div>
        );
    }

    function displayFilterCRN() {
        return (
            <div style={{display: "inline-block", marginLeft:"auto", marginRight:"auto"}}>
                <label style={{display:"flex", marginLeft: 8, marginRight: "auto", width:"fit-content", fontSize:12, fontWeight:"bold"}}>CRN</label>
                <input style={{display:"flex", margin: "auto", width:"fit-content"}} type={'text'}
                       autoComplete={'on'}
                       value={selectedCRN}
                       onChange={handleSelectedCRN}/>
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
                       value={selectedCourseName}
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
                       value={selectedInstructorName}
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
                       value={selectedRoom}
                       onChange={handleSelectedRoom}/>
            </div>
        );
    }

    function displayFilterCredits() {
        return (
            <div style={{display: "inline-block", marginLeft:"auto", marginRight:"auto"}}>
                <label style={{display:"flex", marginLeft: 8, marginRight: "auto", width:"fit-content", fontSize:12, fontWeight:"bold"}}>Credits</label>
                <input style={{display:"flex", margin: "auto", width:"fit-content"}} type={'text'}
                       autoComplete={'on'}
                       value={selectedCredits}
                       onChange={handleSelectedCredits}/>
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
                                <label style={{paddingLeft:8}}>{convertTime(p.StartTime)} - {convertTime(p.EndTime)}</label>
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
                                           onChange={(event)=>handleSelectedDay(event, d.DayID)}
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
                    <div style={{marginLeft:"auto", marginRight:"auto"}}>{displayFilterCRN()}</div>
                    <div style={{marginLeft:"auto", marginTop: 8, marginRight:"auto"}}>{displayFilterCourseID()}</div>
                    <div style={{marginLeft:"auto", marginTop: 8, marginRight:"auto"}}>{displayFilterCourseName()}</div>
                    <div style={{marginLeft:"auto", marginTop: 8, marginRight:"auto"}}>{displayFilterFacultyName()}</div>
                    <div style={{marginLeft:"auto", marginTop: 8, marginRight:"auto"}}>{displayFilterRoom()}</div>
                    <div style={{marginLeft:"auto", marginTop: 8, marginRight:"auto"}}>{displayFilterCredits()}</div>
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

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setMaxResults(parseInt(event.target.value, 10));
        setPageNumber(0);
    };

    function handleSelectCRN(event:any, CRN:string){
        event.preventDefault();
        navigate('./../course-section', {state:{targetCRN:CRN, godRole:userRoleID}});
    }

    function handleRegistration(event:any, CRN:string){
        event.preventDefault();
        handleRegisterCourse(CRN);
        handleBackButton(event);
    }

    function handleSectionDelete(event:any, CRN:string){
        event.preventDefault();
        console.log("handling ", CRN);
        requestDeleteSection(CRN).then(r=>console.log("Delete attempt completed."));
    }

    async function filterSections() {
        return semesterSections!?.filter((s:any)=> (
            selectedDepartment === "" || s.DepartmentID === selectedDepartment
        ))!.filter((s:any)=> (
            !(selectedPeriod?.length>0) || (selectedPeriod?.includes(s.PeriodID1 || s.PeriodID2))
        ))!.filter((s:any)=> (
           !(selectedDay?.length>0) || (selectedDay?.includes(s.DayID1 || s.DayID2))
        ))!.filter((s:any)=> (
            selectedCredits === "" || (s.Credits === selectedCredits)
        ))!.filter((s:any)=> (
            selectedCRN === "" || ((parseInt(s.CRN)+"").includes(selectedCRN))
        ))!.filter((s:any)=> (
            selectedCourseID === "" || (s.CourseID.includes(selectedCourseID))
        ))!.filter((s:any)=> (
            selectedCourseName === "" || (s.Name.includes(selectedCourseName))
        ))!.filter((s:any)=> (
            selectedInstructorName === "" || (s.FirstName.includes(selectedInstructorName.split(' ')[0])
                || (s.LastName.includes(selectedInstructorName.split(' ')[1])))
        ))!.filter((s:any)=> (
            selectedRoom === "" || (s.RoomID.includes(selectedRoom))
        ))
    }

    function displayButtonHCol() {
        return (
            (enableRegistration || (userRole.current === AuthRole.Primary_Administrator && adminManagement)) ?
                <Fragment>
                    <div className={'div-table-col'}><label></label></div>
                </Fragment>
                : <Fragment/>
        );
    }
    function displayButtonDefaultHCol() {
        if(userRoleID != 0) {
            return (
                <div className={'div-table-col'}><label></label></div>
            );
        }
        else {
            return (
                <Fragment/>
            );
        }
    }

    function displayButtonRCol(s:any) {
        if(enableRegistration)
            return (
                <div className={'div-table-col'} style={{display: "inline-flex"}}>
                    <div className={'div-table-button-wrapper'}>
                        <div className={'div-table-button'}
                             onClick={(event)=> handleRegistration(event, s.CRN)}>
                            <div className={'div-table-button-content'}><label>Add</label></div>
                        </div>
                    </div>
                </div>
            );
        else if(userRoleID === AuthRole.Primary_Administrator && adminManagement){
            return (
                <Fragment>
                    <div className={'div-table-col'} style={{display: "inline-flex"}}>
                        <div className={'div-table-button-wrapper'}>
                            <div className={'div-table-button'} style={{margin:"auto"}} defaultValue={''}
                                 onClick={(event:any)=>handleSectionDelete(event, s.CRN)}>
                                <label>Delete</label>
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }

    function displayButtonDefaultRCol(s:any) {
        if(userRoleID != 0) {
            return (
                <div className={'div-table-col'} style={{display: "inline-flex"}}>
                    <div className={'div-table-button-wrapper'} style={{margin: "auto"}}>
                        <div className={'div-table-button'}
                             onClick={(event) => handleSelectCRN(event, s.CRN)}>
                            <div className={'div-table-button-content'}><label>View</label></div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <Fragment/>
            );
        }
    }

    return <Fragment>
        <div>
            {
                !enableRegistration ?
                    displayFilterSemester()
                    : <div style={{display:"flex", marginLeft: 32}}>
                        <button onClick={(event:any)=>handleBackButton(event)}>Back</button>
                    </div>
            }
        </div>
        <div>
            {displayFilterOptions()}
        </div>
        <form>
            <fieldset>
                <div style={{overflowX:"auto"}}>
                    <div style={{marginLeft: 16, marginTop: 32, marginBottom: 16, textAlign:"left", fontSize:32, fontWeight: "bold"}}>
                        {selectedSemesterID?<label>{(semesterIDs?.find((e:any)=>(e.SemesterID===selectedSemesterID)).Term)+" "+(semesterIDs?.find((e:any)=>(e.SemesterID===selectedSemesterID)).Year)}</label>:""}
                    </div>
                    <div style={{width:"100%"}}>
                        <TablePagination
                            style={{float:"left"}}
                            component="div" rowsPerPageOptions={[5, 10, 15, 25, 50]} count={filteredSections?filteredSections?.length:0}
                            page={pageNumber} rowsPerPage={maxResults} onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}/>
                    </div>
                    <div className={'div-table'}>
                        <div className={'div-table-header'} style={{display:"flex"}}>
                            {
                                displayButtonDefaultHCol()
                            }
                            {
                                displayButtonHCol()
                            }
                            <div className={'div-table-col'}><label>CRN</label></div>
                            <div className={'div-table-col'}><label>Course</label></div>
                            <div className={'div-table-col'}><label>Credits</label></div>
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
                            filteredSections?.slice(pageNumber*maxResults, (pageNumber*maxResults+maxResults)).map((s:any, index) => (
                                <div className={'div-table-row'} style={{display:"flex"}}>
                                    {
                                        displayButtonDefaultRCol(s)
                                    }
                                    {
                                        displayButtonRCol(s)
                                    }
                                    <div className={'div-table-col'}><label>{s.CRN}</label></div>
                                    <div className={'div-table-col'}><label>{s.CourseID}</label></div>
                                    <div className={'div-table-col'}><label>{s.Credits}</label></div>
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
                                            <label>{convertTime(s.StartTime1)} - {convertTime(s.EndTime1)}</label>
                                        </div>
                                        <div>
                                            <label>{convertTime(s.StartTime2)} - {convertTime(s.EndTime2)}</label>
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
                <div></div>
            </fieldset>
        </form>
    </Fragment>;
}
export default DisplayMasterSchedule;