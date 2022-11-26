import React, {Fragment, useEffect, useRef, useState} from 'react';
import '../../stores/user-store';
import "../../css/CourseCatalog.css"
import axios from "axios";
import DisplayProgram from "../DisplayProgram";
import DisplayDepartment from "../DisplayDepartment";

function CatalogDisplayDepartments(props:any) {

    enum Pages {
        MainMenu = 0,
        Details = 1
    }

    const [page, setPage] = useState(Pages.MainMenu);

    const [departmentsExtended, setDepartmentsExtended] = useState<any []>();
    const [schools, setSchools] = useState<any []>([]);
    const [filteredDepartments, setFilteredDepartments] = useState<any []>()

    const [selectedSchool, setSelectedSchool] = useState<string | undefined>();

    const [departmentID, setDepartmentID] = useState();

    let previousSchool = "";

    useEffect(() => {
        filterDepartments();
        filterSchools();
    }, [departmentsExtended]);

    useEffect(() => {
        requestAllDepartments().then();
    }, [])

    async function requestAllDepartments() {
        await axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getAllDepartments"
            }
        }).then(res => {
            let {error, departments} = res.data;

            setDepartmentsExtended(departments.sort((a:any, b:any)=>(
                a.SchoolID < b.SchoolID
            )));
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    function handleSelectDepartment(programID:any) {
        setDepartmentID(programID);
        setPage(Pages.Details);
    }

    function filterSchools() {
        const uniqueValues = Array.from(new Set(departmentsExtended?.map((depSch:any) => depSch.SchoolID)));
        setSchools(uniqueValues);
    }

    function filterDepartments() {
        const reducedExtended: any[] = [];
        console.log(departmentsExtended)
        console.log(selectedSchool)
        departmentsExtended?.filter((department:any)=> (
            !selectedSchool || department.SchoolID === selectedSchool
        )).map((department:any) => (
            reducedExtended.push(department)
        ))

        reducedExtended.sort((a:any, b:any) => (a.SchoolID.localeCompare(b.SchoolID)));

        setFilteredDepartments(
            reducedExtended
        );
    }

    const handleSubmitOptions = (event:any) => {
        event.preventDefault();
        filterDepartments();
    }

    const handleSelectSchool = (event:any) => {
        event.preventDefault();
        setSelectedSchool(event.target.value);
    };

    function goToMainMenu() {
        setPage(Pages.MainMenu);
    }

    function renderDepartmentDetails() {
        return <DisplayDepartment DID={departmentID} onBackPressedHandler={goToMainMenu}/>
    }


    function attemptLabelSchool(SchoolID: any): any {
        console.log(SchoolID)
        return departmentsExtended?.map((item:any) => {
            if(previousSchool === SchoolID)
                return "";
            if(item.SchoolID === SchoolID) {
                previousSchool = SchoolID;
                return <div><h3 style={{textAlign:"left"}}>{item.SchoolID}</h3></div>;
            }
        })
    }


    function renderFilterPage() {
        return (
            <Fragment>
                <div id={"form-wrapper"} style={{display: "flex", marginLeft: "auto", marginRight: "auto"}}>
                    <form onSubmit={handleSubmitOptions}
                          style={{marginBottom: 32, marginTop: 32, marginLeft: "auto", marginRight: "auto"}}>
                        <div style={{display: "flex", marginLeft: "auto", marginRight: "auto"}}>

                            <div style={{display: "block", marginRight: 16}}>
                                <div>
                                    <label style={{
                                        fontWeight: "bold",
                                        fontSize: 18,
                                        whiteSpace: "nowrap",
                                        float: "left",
                                        width: "500"
                                    }}>School</label>
                                </div>
                                <select name={"schools"} id={"schools"} onChange={handleSelectSchool} defaultValue={selectedSchool}>
                                    <option key={'-1'} value={""}>-Any-</option>
                                    {
                                        schools?.map((item: any, key: any) => (
                                            <option key={key}>{item}</option>
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
                {displayAllDepartments()}
            </Fragment>);
    }


    function displayAllDepartments() {
        return filteredDepartments?.map((department: any, key: number) => (
            <div>
                {attemptLabelSchool(department.SchoolID)}
                <div key={key}
                     onClick={() => handleSelectDepartment(department.DepartmentID)}
                     className={'div-list-item'}>
                    <div className={'div-list-item-content'}>{department.DepartmentID}</div>
                    <div style={{marginLeft:"auto", marginRight:0}}>
                        <div className={'img-arrow-select-right'}></div>
                    </div>
                </div>
            </div>
        ));
    }

    function renderPage() {
        switch(page) {
            case Pages.MainMenu: {
                return renderFilterPage();
            }
            case Pages.Details: {
                return renderDepartmentDetails();
            }
        }
    }

    return (
        <Fragment>
            {renderPage()}
        </Fragment>

    );
}

export default CatalogDisplayDepartments;
