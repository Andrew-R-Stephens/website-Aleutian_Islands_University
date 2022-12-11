import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {convertTime} from "../../../../../../Utils";

function CreateDepartment() {

    const [schools, setSchools] = useState<any[]>([]);
    const [rooms, setRooms] = useState<any[]>([]);
    const [faculty, setFaculty] = useState<any[]>([]);

    const [selectedSchool, setSelectedSchool] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [room, setRoom] = useState("");
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        requestAllSchools().then(r=>console.log("Schools loaded"));
        requestAvailableOffices().then(r=>console.log("Rooms loaded"));
    }, [])

    useEffect(() => {
        requestNonChairFaculty().then(r=>console.log("Faculty loaded"));
    }, [selectedSchool])

    async function requestAllSchools() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllSchools"
            }
        }).then(res => {
            let {error, schools} = res.data;
            setSchools(schools);
            console.log(schools);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAvailableOffices() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAvailableOffices"
            }
        }).then(res => {
            let {error, rooms} = res.data;
            setRooms(rooms);
            console.log(res.data)
            console.log(rooms);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestNonChairFaculty() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAvailableFacultyForDepartmentHeadBySchoolID",
                sid: selectedSchool
            }
        }).then(res => {
            let {error, faculty} = res.data;
            setFaculty(faculty);
            console.log("Faculty", faculty);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestCreateDepartment() {
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "createNewDepartment",
                sid: selectedSchool,
                rid: room,
                did: name,
                fid: selectedFaculty,
                desc: description,
                phn: phone
            }
        }).then(res => {
            const {status} = res;
            console.log("Res: ", status, res)
            if(status == 200) {
                handleReset()
                const typeSel = document.getElementById("programTypes");
                typeSel?.setAttribute('value', '')
            }
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    function handleReset() {
        setName('');
        setDescription('');
    }

    const handleChangeSchool = (event:any) => {
        event.preventDefault();
        setSelectedSchool(event.target.value);
    };

    const handleChangeName = (event:any) => {
        event.preventDefault();
        setName(event.target.value);
    };

    const handleChangeDescription = (event:any) => {
        event.preventDefault();
        setDescription(event.target.value);
    };

    const handleChangeRoom = (event:any) => {
        event.preventDefault();
        setRoom(event.target.value);
    };

    const handleChangeFaculty = (event:any) => {
        event.preventDefault();
        setSelectedFaculty(event.target.value);
    };

    const handleChangePhone = (event:any) => {
        event.preventDefault();
        setPhone(event.target.value);
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(selectedSchool, name, description, room, selectedFaculty, phone)
        if(!!selectedSchool.length && !!name.length && !!description.length && !!room.length && !!selectedFaculty.length && !!phone.length)
            requestCreateDepartment().then(r=>console.log());
    }

    const handleNavigateBack = (event:any) => {
        event.preventDefault();
        navigate("./../admin-playground");
    }

    return (
        <Fragment>
            <h1>Create a Department</h1>
            <form onSubmit={handleSubmit} style={{margin:"auto"}}>
                <fieldset>
                    <div style={{display:"inline-block", textAlign:'left'}}>{/*
                        <div style={{display:"flex"}}>*/}
                        <div className={'div-table-row'} style={{backgroundColor:"transparent", display:"flex", width:"100%"}}>
                            <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                <div>
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>School</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <select name={"programTypes"} id={"programTypes"} onChange={handleChangeSchool} defaultValue={selectedSchool}>
                                            <option key={'-1'} value={""}>-Any-</option>
                                            {
                                                schools?.map((item: any, key: any) => (
                                                    <option key={key} value={item.SchoolID}>{item.SchoolID}</option>
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
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Department Name / ID</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <input type={'text'} onChange={handleChangeName} value={name}></input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                            <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                <div>
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Department Room</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <select name={"departments"} id={"departments"}
                                                onChange={handleChangeRoom} defaultValue={room}>
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
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Chairperson</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <select name={"departments"} id={"departments"}
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
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Department Phone</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <input className={'div-table-col'} type={'tel'} value={phone} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={handleChangePhone} style={{marginLeft:"auto", marginRight:0}}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                            <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                <div>
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Department Description</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <textarea onChange={handleChangeDescription} value={description}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button type={'submit'}>Create</button>
                            <button style={{marginLeft:16}} type={'button'} onClick={handleNavigateBack}>Cancel</button>
                        </div>

                    </div>
                </fieldset>
            </form>
        </Fragment>
    );
}

export default CreateDepartment;