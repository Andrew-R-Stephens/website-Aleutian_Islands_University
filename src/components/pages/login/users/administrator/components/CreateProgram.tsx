import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";

function CreateProgram() {

    const [programTypes, setProgramTypes] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [selectedProgramType, setSelectedProgramType] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [programName, setProgramName] = useState("");
    const [description, setDescription] = useState("");

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
    }

    function handleReset() {
        setSelectedProgramType('');
        setSelectedDepartment('');
        setProgramName('');
        setDescription('');
    }

    const handleSelectProgramType = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setSelectedProgramType(event.target.value);
    };

    const handleSelectDepartment = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setSelectedDepartment(event.target.value);
    };

    const handleChangeName = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setProgramName(event.target.value);
    };

    const handleChangeDescription = (event:any) => {
        event.preventDefault();
        console.log(event.target.value)
        setDescription(event.target.value);
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(selectedProgramType, selectedDepartment, description.length, programName.length)
        if(!!selectedProgramType.length && !!selectedDepartment.length && !!description.length && !!programName.length)
        requestCreateProgram().then(r=>console.log());
    }


    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div style={{display:"flex"}}>
                        <div style={{display:"inline-block", margin:"auto"}}>
                            <div style={{display: "block", margin: "auto"}}>
                                <div><label style={{
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    whiteSpace: "nowrap",
                                    float: "left",
                                    width: "500"
                                }}>Program Type</label></div>
                                <select name={"programTypes"} id={"programTypes"} onChange={handleSelectProgramType} defaultValue={selectedProgramType}>
                                    <option key={'-1'} value={""}>-Any-</option>
                                    {
                                        programTypes?.map((item: any, key: any) => (
                                            <option key={key} value={item.ProgramTypeID}>{item.Name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div style={{display: "block", margin:"auto"}}>
                            <div><label style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                whiteSpace: "nowrap",
                                float: "left",
                                width: "500"
                            }}>Department</label></div>
                            <select name={"departments"} id={"departments"} onChange={handleSelectDepartment} defaultValue={selectedDepartment}>
                                <option key={'-1'} value={""}>-Any-</option>
                                {
                                    departments?.map((item: any, key: any) => (
                                        <option key={key}>{item.DepartmentID}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div style={{display: "block", margin:"auto"}}>
                            <div><label style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                whiteSpace: "nowrap",
                                float: "left",
                                width: "500"
                            }}>Program Name</label></div>
                            <input type={'text'} onChange={handleChangeName} value={programName}></input>
                        </div>
                        <div style={{display: "block", margin:"auto"}}>
                            <div><label style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                whiteSpace: "nowrap",
                                float: "left",
                                width: "500"
                            }}>Description</label></div>
                            <textarea onChange={handleChangeDescription} value={description}/>
                        </div>
                    </div>
                    <button type={'submit'}>Create</button>
                </fieldset>
            </form>
        </Fragment>
    );

}

export default CreateProgram;