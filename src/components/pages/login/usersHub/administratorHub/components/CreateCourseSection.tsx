import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {convertTime} from "../../../../../../Utils";

function CreateCourseSection() {

    const [courseIDs, setCourseIDs] = useState([]);
    const [semester, setSemester] = useState<any>([]);
    const [rooms, setRooms] = useState([]);
    const [timeslots, setTimeslots] = useState<any[]>([]);
    const [faculty, setFaculty] = useState<any[]>([]);

    const [selectedCourseID, setSelectedCourseID] = useState<string>("");
    const [selectedRoomID, setSelectedRoomID] = useState("");
    const [selectedTimeslotIDA, setSelectedTimeslotIDA] = useState<number>(-1);
    const [selectedTimeslotIDB, setSelectedTimeslotIDB] = useState<number>(-1);
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [minSeats, setMinSeats] = useState<number>(5);
    const [maxSeats, setMaxSeats] = useState<number>(15);

    const navigate = useNavigate();

    useEffect(() => {
        requestUpcomingSemester().then(r=>console.log("Semester loaded"));
        requestAllCourseIDs().then(r=>console.log("CourseIDs loaded"));
        requestAllRooms().then(r=>console.log("Classrooms loaded"));
    }, [])

    async function requestUpcomingSemester() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getSemesterWithRegistrationAvailable"
            }
        }).then(res => {
            let {error, SemesterID} = res.data;
            setSemester(SemesterID?.at(0));
            console.log(SemesterID);
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
            let {error, courses} = res.data;
            setCourseIDs(courses);
            console.log(courses);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAllRooms() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllClassrooms"
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
                func: "getAvailableRoomTimeslotsBySemesterIDAndRoomID",
                sid: semester.SemesterID,
                rid: selectedRoomID
            }
        }).then(res => {
            let {error, timeslots} = res.data;
            setTimeslots(timeslots);
            console.log("timeslots", res.data);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAvailableFaculty() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAvailableFacultyByTimeslotIDAndSemesterID",
                sid: semester.SemesterID,
                cid: selectedCourseID,
                ts1: selectedTimeslotIDA,
                ts2: selectedTimeslotIDB
            }
        }).then(res => {
            let {error, faculty} = res.data;
            setFaculty(faculty);
            console.log(res.data);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestCreateCourseSection() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "createNewCourseSection",
                courseID: selectedCourseID,
                roomID: selectedRoomID,
                semesterID: semester.SemesterID,
                timeslot1: selectedTimeslotIDA,
                timeslot2: selectedTimeslotIDB,
                facultyID: selectedFaculty,
                seatMax: maxSeats,
                seatMin: minSeats
            }
        }).then(res => {
            const {status} = res;
            console.log("Res: ", res.data)
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    const handleChangeCourseID = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setSelectedCourseID(event.target.value);
        requestAvailableFaculty().then(r=>console.log("Faculty loaded"))
        setSelectedTimeslotIDA(0)
        setSelectedTimeslotIDB(0)
        setSelectedFaculty('');
    };

    const handleChangeRoomID = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setSelectedRoomID(event.target.value);
        requestAvailableRoomTimeslots().then(r=>console.log("Timeslots loaded"));
        setSelectedFaculty('');
        setSelectedTimeslotIDA(0)
        setSelectedTimeslotIDB(0)
    };

    const handleChangeTimeslotIDA = (event:any) => {
        event.preventDefault();
        console.log(event.target.value);
        setSelectedTimeslotIDA(event.target.value);
        setSelectedFaculty('')
        setSelectedTimeslotIDB(0)
    };

    const handleChangeTimeslotIDB = (event:any) => {
        event.preventDefault();
        console.log(event.target.value);
        setSelectedTimeslotIDB(event.target.value);
        setSelectedFaculty('')
        requestAvailableFaculty().then(r=>console.log("Faculty loaded"));
    };

    const handleChangeFaculty = (event:any) => {
        event.preventDefault();
        console.log(event.target.value);
        setSelectedFaculty(event.target.value);
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
        setMaxSeats(Math.max(event.target.value, minSeats));
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(selectedCourseID, semester.SemesterID, selectedRoomID, selectedTimeslotIDA, selectedTimeslotIDB, minSeats, maxSeats)
        console.log(!!selectedCourseID, !!semester.SemesterID , selectedRoomID.length>0, selectedTimeslotIDA>0, selectedTimeslotIDB>0, minSeats>0, maxSeats>0)
        if(!!selectedCourseID && !!semester.SemesterID && selectedRoomID.length>0 && selectedTimeslotIDA>0 && selectedTimeslotIDB>0 && minSeats>0 && maxSeats>0)
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
                                                disabled={selectedRoomID.length<=0}
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
                                                disabled={selectedTimeslotIDA<=0}
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
                                                disabled={selectedTimeslotIDB<=0}
                                                onChange={handleChangeFaculty} value={selectedFaculty}>
                                            <option key={'-1'} value={-1}>-Any-</option>
                                            {
                                                faculty?.map((f: any, key: any) => (
                                                    <option key={key} value={f.FacultyID}>({f.FacultyID}) {f.FirstName} {f.LastName}</option>
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