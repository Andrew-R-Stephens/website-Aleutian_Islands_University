import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {convertTime} from "../../../../../../Utils";

function CreateCourseSection() {

    const [courseIDs, setCourseIDs] = useState([]);
    const [semester, setSemester] = useState<any>({SemesterID:'S23', Term:"Spring", Year:"2023"});
    const [rooms, setRooms] = useState([]);
    const [timeslots, setTimeslots] = useState<any[]>([]);
    const [faculty, setFaculty] = useState<any[]>([]);

    const [selectedCourseID, setSelectedCourseID] = useState<string>("");
    const [selectedRoomID, setSelectedRoomID] = useState("");
    const [selectedTimeslotIDA, setSelectedTimeslotIDA] = useState<number>(-1);
    const [selectedTimeslotIDB, setSelectedTimeslotIDB] = useState<number>(-1);
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [minSeats, setMinSeats] = useState<number>(5);
    const [maxSeats, setMaxSeats] = useState<number>(minSeats);

    const navigate = useNavigate();

    useEffect(() => {
        /*requestUpcomingSemesterID().then(r=>console.log("Semester loaded"));
        requestAllCourseIDs().then(r=>console.log("CourseIDs loaded"));
        requestAllRooms().then(r=>console.log("Rooms loaded"));
        requestAvailableRoomTimeslots().then(r=>console.log("Timeslots loaded"));
        requestAvailableFaculty().then(r=>console.log("Timeslots loaded"));*/
        const ts = [
            {TimeslotID:1, Name:"M", StartTime:"2:00:00", EndTime:"3:00:00"},
            {TimeslotID:2, Name:"W", StartTime:"11:00:00", EndTime:"12:00:00"},
            {TimeslotID:3, Name:"F", StartTime:"5:00:00", EndTime:"6:00:00"}
        ]
        console.log(ts);
        setTimeslots(ts);
        console.log(timeslots)
    }, [])

    async function requestUpcomingSemester() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getUpcomingSemester"
            }
        }).then(res => {
            let {error, semesterID} = res.data;
            setSemester(semesterID);
            console.log(semesterID);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAllCourseIDs() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllCourseIDs"
            }
        }).then(res => {
            let {error, courseIDs} = res.data;
            setCourseIDs(courseIDs);
            console.log(courseIDs);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAllRooms() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllRooms"
            }
        }).then(res => {
            let {error, rooms} = res.data;
            setRooms(rooms);
            console.log(rooms);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAvailableRoomTimeslots() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAvailableRoomTimeslotsBySemesterIDAndRoomID"
            }
        }).then(res => {
            let {error, timeslots} = res.data;
            setTimeslots(timeslots);
            console.log(timeslots);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAvailableFaculty() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAvailableFacultyByTimeslotIDAndSemesterID"
            }
        }).then(res => {
            let {error, faculty} = res.data;
            setFaculty(faculty);
            console.log(faculty);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestCreateCourseSection() {
        /*
        await axios.post(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                post: "createCourseSection",
                programName: programName,
                programTypeID: selectedProgramType,
                description,
                departmentID: selectedDepartment
            }
        }).then(res => {
            const {status} = res;
            console.log("Res: ", status)
            if(status == 200) {
                handleReset()
                const typeSel = document.getElementById("programTypes");
                typeSel?.setAttribute('value', '')
            }
        }).catch(function(err) {
            console.log(err.message);
        })
        */
    }

    const handleChangeCourseID = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setSelectedCourseID(event.target.value);
    };

    const handleChangeRoomID = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setSelectedRoomID(event.target.value);
    };

    const handleChangeTimeslotIDA = (event:any) => {
        event.preventDefault();
        console.log(event.target.value);
        setSelectedTimeslotIDA(event.target.value);
        setSelectedTimeslotIDB(0)
    };

    const handleChangeTimeslotIDB = (event:any) => {
        event.preventDefault();
        console.log(event.target.value);
        setSelectedTimeslotIDB(event.target.value);
    };

    const handleSelectMinSeats = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setMinSeats(event.target.value);
        setMaxSeats(Math.max(event.target.value, maxSeats))
    };

    const handleSelectMaxSeats = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setMaxSeats(Math.max(event.target.value, maxSeats));
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(selectedCourseID, semester.SemesterID, selectedRoomID, selectedTimeslotIDA, selectedTimeslotIDB, minSeats, maxSeats)
        console.log(!!selectedCourseID, !!semester.SemesterID , !!selectedRoomID, !!selectedTimeslotIDA, !!selectedTimeslotIDB, minSeats>0, maxSeats>0)
        if(!!selectedCourseID && !!semester.SemesterID && !!selectedRoomID && !!selectedTimeslotIDA && !!selectedTimeslotIDB && minSeats>0 && maxSeats>0)
            requestCreateCourseSection().then(r=>console.log("Creation request complete"));
    }

    function disableSubmit() : boolean {
        return !(!!selectedCourseID && !!semester.SemesterID && !!selectedRoomID && !!selectedTimeslotIDA && !!selectedTimeslotIDB && minSeats>0 && maxSeats>0)
    }

    const handleNavigateBack = (event:any) => {
        event.preventDefault();
        navigate("./../admin-playground");
    }

    return (
        <Fragment>
            <h1>Create a Course Section</h1>
            <div style={{marginBottom:16}}><label>Create a new Course Section for {semester.Term} {semester.Year}</label></div>
            <form onSubmit={handleSubmit} style={{margin:"auto"}}>
                <fieldset>
                    <div style={{display:"inline-block", textAlign:'left'}}>

                        <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                            <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                <div>
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Course ID</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <select name={"departments"} id={"departments"}
                                                onChange={handleChangeCourseID} defaultValue={selectedCourseID}>
                                            <option key={'-1'} value={""}>-Any-</option>
                                            {
                                                courseIDs?.map((item: any, key: any) => (
                                                    <option key={key}>{item.CourseID}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                            <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                <div>
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Room ID</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <select name={"departments"} id={"departments"}
                                                onChange={handleChangeRoomID} defaultValue={selectedRoomID}>
                                            <option key={'-1'} value={""}>-Any-</option>
                                            {
                                                rooms?.map((item: any, key: any) => (
                                                    <option key={key}>{item.RoomID}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                            <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                <div>
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Timeslot 1</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <select name={"departments"} id={"departments"}
                                                onChange={handleChangeTimeslotIDA} value={selectedTimeslotIDA}>
                                            <option key={'-1'} value={-1}>-Any-</option>
                                            {
                                                timeslots?.map((t1: any, key: any) => (
                                                    <option key={key} value={t1.TimeslotID}>{t1.Name} ({convertTime(t1.StartTime)} {convertTime(t1.EndTime)})</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                            <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                <div>
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Timeslot 2</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <select name={"departments"} id={"departments"}
                                                onChange={handleChangeTimeslotIDB} value={selectedTimeslotIDB}>
                                            <option key={'-1'} value={-1}>-Any-</option>
                                            {
                                                timeslots!?.filter((item:any)=>(item.TimeslotID != selectedTimeslotIDA)).map((t2: any, key: any) => (
                                                    <option key={key} value={t2.TimeslotID}>{t2.Name} ({convertTime(t2.StartTime)} {convertTime(t2.EndTime)})</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                            <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                <div>
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Faculty</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <select name={"departments"} id={"departments"}
                                                onChange={handleChangeTimeslotIDB} value={selectedFaculty}>
                                            <option key={'-1'} value={-1}>-Any-</option>
                                            {
                                                faculty?.map((f: any, key: any) => (
                                                    <option key={key} value={f.UID}>({f.UID}) {convertTime(f.FirstN)} {convertTime(f.LastN)}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                            <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                <div>
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Minimum Seats</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <input type={'number'} min={1} max={15}
                                               onChange={handleSelectMinSeats} value={minSeats}></input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                            <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                <div>
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Maximum Seats</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <input type={'number'} min={minSeats} max={15}
                                               onChange={handleSelectMaxSeats} value={maxSeats}></input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button type={'submit'} disabled={disableSubmit()}>Create</button>
                            <button style={{marginLeft:16}} type={'button'} onClick={handleNavigateBack}>Cancel</button>
                        </div>

                    </div>
                </fieldset>
            </form>
        </Fragment>
    );

}

export default CreateCourseSection;