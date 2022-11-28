import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthRole, RoleAuthStore, UserAuthStore} from "../../../../stores/AuthUserStore";
import axios from "axios";

function StudentAcademics(props:any) {

    const navigate = useNavigate();

    return <Fragment>
        <h1>Student Academics</h1>
        <div  className={'bubble-container'}>
            <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                <div className={'page-bubble'} onClick={()=>navigate('./../semester-grades')}>
                    <div className={'icon-semester-grades'}/>
                    <label className={'page-bubble-label'}>Semester Grades</label>
                    <div className={'page-bubble-description'}></div>
                </div>
                <div className={'page-bubble'} onClick={()=>navigate('./../degree-audit')}>
                    <div className={'icon-degree-audit'}/>
                    <label className={'page-bubble-label'}>Degree Audit</label>
                    <div className={'page-bubble-description'}></div>
                </div>
                <div className={'page-bubble'} onClick={()=>navigate('./../unofficial-transcript')}>
                    <div className={'icon-unofficial-transcript'}/>
                    <label className={'page-bubble-label'}>Unofficial Transcript</label>
                    <div className={'page-bubble-description'}></div>
                </div>
            </div>
        </div>
    </Fragment>;
}

function AdministratorAcademics(props:any) {

    const navigate = useNavigate();



    return <Fragment>
        <h1>Administrator Academics Management Console</h1>
        <div  className={'bubble-container'}>
            <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                <div className={'page-bubble'} onClick={()=>navigate('./../semester-schedule')}>
                    <div className={'icon-semester-schedule'}/>
                    <label className={'page-bubble-label'}>Semester Schedule</label>
                    <div className={'page-bubble-description'}></div>
                </div>
                <div className={'page-bubble'} onClick={()=>navigate('./../master-schedule')}>
                    <div className={'icon-schedule'}/>
                    <label className={'page-bubble-label'}>Master Schedule</label>
                    <div className={'page-bubble-description'}></div>
                </div>
                <div className={'page-bubble'} onClick={()=>navigate('./../catalog')}>
                    <div className={'icon-catalog-courses'}/>
                    <label className={'page-bubble-label'}>Course Catalog</label>
                    <div className={'page-bubble-description'}></div>
                </div>
            </div>
        </div>
    </Fragment>;
}


function Academics() {

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(userStoreID);

    function displayAcademics() {
        switch(userStoreRole) {
            case AuthRole.Student: {
                return displayStudentAcademics();
            }
            case AuthRole.Administrator: {
                return displayAdministratorAcademics();
            }
            default: return <Fragment/>
        }

    }

    function displayStudentAcademics(){
        return <StudentAcademics targetStudent={userID}/>
    }

    function displayAdministratorAcademics(){
        return <AdministratorAcademics targetFaculty={userID}/>
    }


    return (
        <Fragment>
            <div className={'inner-body-constraints'}>
                {displayAcademics()}
            </div>
        </Fragment>
    );
}

export default Academics;