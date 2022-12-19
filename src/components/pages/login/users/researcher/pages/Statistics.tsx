import React, {Fragment, useEffect, useState} from 'react';
import './../../../../../../css/ConsoleHome.css';
import {useNavigate} from "react-router-dom";
import {BarChart, LineChart, PieChart} from "../components/Charts";
import {UserData} from "../components/UserData";
import axios from "axios";


function Statistics() {

    const [activePage, setActivePage] = useState(0);
    const navigate = useNavigate();

    const [studentsInProgramData, setStudentsInProgramData] = useState<any>();
    const [departmentsInSchoolData, setDepartmentsInSchoolData] = useState<any>();
    const [coursesInDepartmentData, setCoursesInDepartmentData] = useState<any>();

    useEffect(() => {
        requestCountStudentsInProgram().then(r=>console.log("Student in Program data requested"));
        requestCountDepartmentsInSchool().then(r=>console.log("Departments in School data requested"));
        requestCountCoursesInDepartment().then(r=>console.log("Courses in Department data requested"));
    }, [])

    async function requestCountStudentsInProgram() {
        await axios.get(process.env['REACT_APP_API_RESEARCH'] as string, {
            params: {
                func: "countStudentsInProgram"
            }
        }).then(res => {
            let {error, data} = res.data;
            const final = {
                labels: data.map((d:any)=>(d.ProgramID)),
                datasets: [{
                    label: "Students Per Department",
                    data: data.map((d:any)=>(d.Students)),
                    backgroundColor: ["#051e35", "#0b2844", "#263e52", "#406e8a"]
                }]
            }
            setStudentsInProgramData(final);
            console.log(res);
        }).catch(function(err) {
            console.log(err.message);
        })
    }


    async function requestCountDepartmentsInSchool() {
        await axios.get(process.env['REACT_APP_API_RESEARCH'] as string, {
            params: {
                func: "countDepartmentsInSchool"
            }
        }).then(res => {
            let {error, data} = res.data;
            const final = {
                labels: data.map((d:any)=>(d.SchoolID)),
                datasets: [{
                    label: "Departments Per School",
                    data: data.map((d:any)=>(d.Departments)),
                    backgroundColor: ["#051e35", "#0b2844", "#263e52", "#406e8a"]
                }]
            }
            setDepartmentsInSchoolData(final);
            console.log(res);
        }).catch(function(err) {
            console.log(err.message);
        })
    }


    async function requestCountCoursesInDepartment() {
        await axios.get(process.env['REACT_APP_API_RESEARCH'] as string, {
            params: {
                func: "countCoursesInDepartment"
            }
        }).then(res => {
            let {error, data} = res.data;
            const final = {
                labels: data.map((d:any)=>(d.DepartmentID)),
                datasets: [{
                    label: "Students Per Department",
                    data: data.map((d:any)=>(d.Courses)),
                    backgroundColor: ["#051e35", "#0b2844", "#263e52", "#406e8a"]
                }]
            }
            setCoursesInDepartmentData(final);
            console.log(res);
        }).catch(function(err) {
            console.log(err.message);
        })
    }


    return (
        <Fragment>
            <div>
                <h1>Research Statistics</h1>
                <div>
                    <div style={{display:"inline-block", margin:"auto", marginTop:32, width:"100%", height:"auto"}}>
                        {
                            coursesInDepartmentData?
                                <div style={{margin: "auto", padding: 8, width: "100%", height: "200px"}}>
                                    <div style={{margin: "auto", width: "fit-content"}}>
                                        <BarChart chartData={coursesInDepartmentData}/>
                                    </div>
                                </div>
                                :<Fragment/>
                        }
                        {
                            studentsInProgramData?
                                <div style={{margin: "auto", padding: 8, width: "100%", height: "20vh"}}>
                                    <div style={{margin: "auto", width: "fit-content"}}>
                                        <LineChart chartData={studentsInProgramData}/>
                                    </div>
                                </div>
                                :<Fragment/>
                        }
                        {
                            departmentsInSchoolData?
                                <div style={{margin: "auto", padding: 8, width: "100%", height: "20vh"}}>
                                    <div style={{margin: "auto", width: "fit-content"}}>
                                        <PieChart chartData={departmentsInSchoolData}/>
                                    </div>
                                </div>
                                :<Fragment/>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    );

}

export default Statistics;
