import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Logic} from "../../../../../../classes/CoursePrereqs";

function CreatePrerequisite() {

    return (
        <Fragment>
            <div style={{display:"flex", margin:"auto"}}>
                <div style={{display:"flex", margin:"auto"}}>
                    <CreatePrerequisiteBase/>
                </div>
                {/*<div style={{display:"flex", margin:"auto"}}>
                    <CreatePrerequisiteBase/>
                </div>*/}
            </div>
        </Fragment>
    );
}

export default CreatePrerequisite;

function CreatePrerequisiteMaster() {

    const [prereqOptions, setPrereqOptions] = useState<any[]>()

    const [selectedPrereqs, setSelectedPrereqs] = useState<any[]>();
    const [selectedLogic, setSelectedLogic] = useState<Logic>(Logic.AND);

    return (
        <Fragment>

        </Fragment>
    );
}

function CreatePrerequisiteBase() {

    const [courseOptions, setCourseOptions] = useState<any[]>();
    const [gradeOptions, setGradeOptions] = useState<any[]>();

    const [selectedCourseID, setSelectedCourseID] = useState<string>();
    const [selectedGrade, setSelectedGrade] = useState<any>();

    const navigate = useNavigate();

    useEffect(() => {
        requestAllCourses().then(r=>console.log("Courses loaded"));
        requestAllGrades().then(r=>console.log("Grades loaded"));
    }, [])

    async function requestAllCourses() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllCourseIDs"
            }
        }).then(res => {
            let {error, courses} = res.data;
            setCourseOptions(courses);
            console.log(courses);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAllGrades() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllGrades_Passing"
            }
        }).then(res => {
            let {error, grades} = res.data;
            setGradeOptions(grades);
            console.log(grades);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestCreatePrerequisite() {
        console.log(selectedCourseID, selectedGrade);
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "setNewPrerequisite",
                cid: selectedCourseID,
                minG: selectedGrade
            }
        }).then(res => {
            console.log(res);
            const {status} = res.data;
            if(isNaN(status?.at(0).ERROR)) {
                alert(status?.at(0).ERROR);
            } else {
                alert("Creation successful.");
            }
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    const handleChangeCourse = (event:any) => {
        event.preventDefault();
        console.log(event.target.value);
        setSelectedCourseID(event.target.value);
    };

    const handleChangeGrade = (event:any) => {
        event.preventDefault();
        console.log(event.target.value);
        setSelectedGrade(event.target.value);
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();

        requestCreatePrerequisite().then(r=>console.log());
    }

    function disableSubmit() : boolean {
        return !selectedGrade || !selectedCourseID;
    }

    const handleNavigateBack = (event:any) => {
        event.preventDefault();
        navigate("./../admin-playground");
    }

    return (
        <Fragment>
            <div style={{display:"inline-block"}}>
                <h1>Create a Prerequisite</h1>
                <form onSubmit={handleSubmit} style={{margin:"auto"}}>
                    <fieldset>
                        <div style={{display:"inline-block", textAlign:'left'}}>

                            <div className={'div-table-row'} style={{backgroundColor:"transparent",display:"flex", width:"100%"}}>
                                <div style={{display: "block", marginLeft:0, marginRight: "auto"}}>
                                    <div>
                                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Course</label>
                                        <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                            <select name={"departments"} id={"departments"}
                                                    onChange={handleChangeCourse} defaultValue={selectedCourseID}>
                                                <option key={'-1'} value={""}>-Any-</option>
                                                {
                                                    courseOptions?.map((c: any, key: any) => (
                                                        <option key={key} value={c.CourseID}>{c.CourseID}</option>
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
                                        <label className={'div-table-col'} style={{fontWeight:"bold", color:"black"}}>Minimum Grade</label>
                                        <div className={'div-table-col'} style={{marginLeft:"auto", marginRight:0}}>
                                            <select name={"departments"} id={"departments"}
                                                    onChange={handleChangeGrade} defaultValue={selectedGrade}>
                                                <option key={'-1'} value={""}>-Any-</option>
                                                {
                                                    gradeOptions?.map((g: any, key: any) => (
                                                        <option key={key} value={g.ID}>{g.GradeID}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{marginTop:16}}>
                                <button type={'submit'} disabled={disableSubmit()}>Create</button>
                                <button style={{marginLeft:16}} type={'button'} onClick={handleNavigateBack}>Cancel</button>
                            </div>

                        </div>
                    </fieldset>
                </form>
            </div>
        </Fragment>
    );

}