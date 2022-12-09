import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function CreateCourse() {

    const [programTypes, setProgramTypes] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [courseIDA, setCourseIDA] = useState<string>("NA");
    const [courseIDB, setCourseIDB] = useState<number>(1000);
    const [courseName, setCourseName] = useState("");
    const [credits, setCredits] = useState<number>(4);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [programName, setProgramName] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        requestAllProgramTypes().then(r=>console.log("ProgramTypes loaded"));
        requestAllDepartments().then(r=>console.log("Departments loaded"));
    }, [])

    async function requestAllProgramTypes() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllProgramTypes"
            }
        }).then(res => {
            let {error, programTypes} = res.data;
            setProgramTypes(programTypes);
            console.log(programTypes);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAllDepartments() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllDepartments_distinct"
            }
        }).then(res => {
            let {error, departments} = res.data;
            setDepartments(departments);
            console.log(departments);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestCreateProgram() {
        /*
        await axios.post(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                post: "createNewProgram",
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

    const handleChangeCourseIDA = (event:any) => {
        event.preventDefault();
        console.log(event.target.value.toUpperCase())
        setCourseIDA(event.target.value.toUpperCase());
    };

    const handleChangeCourseIDB = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setCourseIDB(event.target.value);
    };

    const handleChangeCourseName = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setCourseName(event.target.value);
    };

    const handleChangeCredits = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setCredits(event.target.value);
    };

    const handleSelectDepartment = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setSelectedDepartment(event.target.value);
    };

    const handleChangeDescription = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setDescription(event.target.value);
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(courseIDA, courseIDB, courseName, credits, selectedDepartment, description.length)
        console.log(courseIDA.length>0 , courseIDB>0 , courseName.length>0 , credits>0 , selectedDepartment.length>0, description.length>0)
        if(!!courseIDA.length && !!courseIDB && !!courseName.length && !!credits && !!selectedDepartment.length && !!description.length)
            requestCreateProgram().then(r=>console.log());
    }

    function disableSubmit() : boolean {
        return !(courseIDA.length>0 && courseIDB>0 && courseName.length>0 && credits>0 && selectedDepartment.length>0 && description.length>0)
    }

    const handleNavigateBack = (event:any) => {
        event.preventDefault();
        navigate("./../admin-playground");
    }

    return (
        <Fragment>
            <h1>Create a Course</h1>
            <form onSubmit={handleSubmit} style={{margin:"auto"}}>
                <fieldset>
                    <div style={{display:"inline-block", textAlign:'left'}}>

                        <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                            <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                <div>
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Course ID</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <input type={'text'} maxLength={3} pattern={'[A-Za-z]{2,3}'}
                                            style={{width:"10ch", textTransform:"uppercase"}}
                                            onChange={handleChangeCourseIDA} value={courseIDA}></input>

                                        <input type={'number'} min={1000} max={9999}
                                               pattern={'[1-9]{1}[0-9]{3}'}
                                               onChange={handleChangeCourseIDB} value={courseIDB}></input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                            <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                <div>
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Course Name</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <input type={'text'}
                                               minLength={1} maxLength={30} pattern={'[A-Za-z]{1,30}'}
                                               onChange={handleChangeCourseName} value={courseName}></input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                            <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                <div>
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Credits</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <input type={'number'} min={1} max={12} onChange={handleChangeCredits} value={credits}></input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                            <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                <div>
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Department</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <select name={"departments"} id={"departments"}
                                                onChange={handleSelectDepartment} defaultValue={selectedDepartment}>
                                            <option key={'-1'} value={""}>-Any-</option>
                                            {
                                                departments?.map((item: any, key: any) => (
                                                    <option key={key}>{item.DepartmentID}</option>
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
                                    <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Description</label>
                                    <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                        <textarea
                                            maxLength={100}
                                            onChange={handleChangeDescription} value={description}/>
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

export default CreateCourse;