import React, {Fragment, useEffect, useState} from 'react';
import "../../css/CourseCatalog.css"
import axios from "axios";
import DisplayProgram from "../DisplayProgram";

function CatalogDisplayPrograms(props:any) {

    enum ProgramsPages {
        MainMenu = 0,
        ProgramDetails = 1
    }

    const [programsPage, setProgramsPage] = useState(ProgramsPages.MainMenu);

    const [programTypes, setProgramTypes] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [schools, setSchools] = useState([]);
    const [programsExtended, setProgramsExtended] = useState([]);
    const [programs, setPrograms] = useState([]);

    const [programID, setProgramID] = useState(1);
    const [selectedProgramType, setSelectedProgramType] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");
    const [selectedPrograms, setSelectedPrograms] = useState<any []>([]);

    let previousProgramType = "";

    useEffect(() => {
        console.log("Rendering selected programs")
    }, [selectedPrograms])

    useEffect(() => {
        filterSelectedPrograms();
    }, [programsExtended]);

    useEffect(() => {
        requestAllProgramsExtended().then(r => console.log());
        requestAllProgramTypes().then(r => console.log());
        requestAllDepartments().then(r => console.log());
        requestAllSchools().then(r => console.log());
        requestAllPrograms().then(r => console.log());

        filterSelectedPrograms();
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

    async function requestAllProgramsExtended() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllProgramsExtended"
            }
        }).then(res => {
            let {error, programs} = res.data;
            setProgramsExtended(programs);
            console.log(programs);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    async function requestAllPrograms() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllPrograms"
            }
        }).then(res => {
            let {error, programs} = res.data;
            setPrograms(programs);
            console.log(programs);
        }).catch(function(err) {
            console.log(err.message);
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

    function handleSelectProgram(programID:any) {
        setProgramID(programID);
        setProgramsPage(ProgramsPages.ProgramDetails);
    }

    function attemptLabelProgramType(ProgramTypeID: any): any {
        if(previousProgramType === ProgramTypeID)
            return "";
        return programTypes.map((item:any) => {
            if(item.ProgramTypeID === ProgramTypeID) {
                previousProgramType = ProgramTypeID;
                return <div><h3 style={{textAlign:"left"}}>{item.Name}</h3></div>;
            }
        })
    }

    function displayAllPrograms() {
        return selectedPrograms.map((program: any, key: number) => (
            <div>
                {
                    attemptLabelProgramType(program.ProgramTypeID)
                }
                <div key={key}
                     onClick={() => handleSelectProgram(program.ProgramID)}
                     className={'div-list-item'}>
                    <div><label className={'div-list-item-content'}>{program.ProgramName}, {program.ProgramTypeID}</label></div>
                    <div style={{marginLeft:"auto", marginRight:0}}><div className={'img-arrow-select-right'}></div></div>
                </div>
            </div>
        ));
    }

    function filterSelectedPrograms() {
        const reducedExtendedPrograms: any[] = [];
        programsExtended!.filter((item:any)=> (
            selectedProgramType === "" || item.ProgramTypeID === selectedProgramType
        ))!.filter((item:any)=> (
            selectedDepartment === "" || item.DepartmentID === selectedDepartment
        ))!.filter((item:any)=> (
            selectedSchool === "" || item.SchoolID === selectedSchool
        )).map((item:any) => (
            reducedExtendedPrograms.push(item)
        ));

        const result: any[] = [];
        for(let i = 0; i < reducedExtendedPrograms.length; i++) {
            let isFound = false;
            for(let j = 0; j < result.length; j++) {
                if(reducedExtendedPrograms.at(i).ProgramID === result.at(j).ProgramID) {
                    isFound = true;
                    break;
                }
            }
            if(!isFound)
                result.push(reducedExtendedPrograms.at(i));
        }

        console.log("Reduced ProgramIDs:", reducedExtendedPrograms, "\n",result)
        setSelectedPrograms(result);
    }

    const handleSubmitOptions = (event:any) => {
        event.preventDefault();
        filterSelectedPrograms();
    }

    const handleSelectProgramType = (event:any) => {
        event.preventDefault();
        setSelectedProgramType(event.target.value);
    };

    const handleSelectDepartment = (event:any) => {
        event.preventDefault();
        setSelectedDepartment(event.target.value);
    };

    const handleSelectSchool = (event:any) => {
        event.preventDefault();
        setSelectedSchool(event.target.value);
    };

    function renderPage() {
        switch(programsPage) {
            case ProgramsPages.MainMenu: {
                return renderFilterPage();
            }
            case ProgramsPages.ProgramDetails: {
                return renderProgramDetails();
            }
        }
    }

    function goToMainMenu() {
        setProgramsPage(ProgramsPages.MainMenu);
    }

    function renderProgramDetails() {
        return <DisplayProgram PID={programID} onBackPressedHandler={goToMainMenu}/>
    }

    function renderFilterPage() {
        return (
            <Fragment>
            <div id={"form-wrapper"} style={{display: "flex", marginLeft: "auto", marginRight: "auto"}}>
                <form onSubmit={handleSubmitOptions}
                      style={{marginBottom: 32, marginTop: 32, marginLeft: "auto", marginRight: "auto"}}>
                    <div style={{display: "flex", marginLeft: "auto", marginRight: "auto"}}>
                        <div style={{display: "block", marginRight: 16}}>
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
                                    programTypes.map((item: any, key: any) => (
                                        <option key={key} value={item.ProgramTypeID}>{item.Name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div style={{display: "block", marginRight: 16}}>
                            <div><label style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                whiteSpace: "nowrap",
                                float: "left",
                                width: "500"
                            }}>School</label></div>
                            <select name={"schools"} id={"schools"} onChange={handleSelectSchool} defaultValue={selectedSchool}>
                                <option key={'-1'} value={""}>-Any-</option>
                                {
                                    schools.map((item: any, key: any) => (
                                        <option key={key}>{item.SchoolID}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div style={{display: "block", marginRight: 16}}>
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
                                    departments.map((item: any, key: any) => (
                                        <option key={key}>{item.DepartmentID}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div style={{marginTop: "auto", marginBottom: "0"}}>
                            <button type={"submit"}>Apply</button>
                        </div>

                    </div>
                </form>
            </div>
            {displayAllPrograms()}
        </Fragment>);
    }

    return (
        <Fragment>
            {renderPage()}
        </Fragment>

    );
}

export default CatalogDisplayPrograms;
