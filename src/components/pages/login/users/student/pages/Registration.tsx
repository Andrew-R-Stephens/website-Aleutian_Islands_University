import React, {Fragment, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthRole, RoleAuthStore, UserAuthStore} from "../../../../../../stores/AuthUserStore";

function StudentRegistration(props:any) {
    const navigate = useNavigate();

    return <Fragment>
        <h1>Student Registration</h1>
        <div  className={'bubble-container'}>
            <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                <div className={'page-bubble'} onClick={()=>navigate('./../register-course')}>
                    <div className={'icon-registration'}/>
                    <label className={'page-bubble-label'}>Course Registration</label>
                    <div className={'page-bubble-description'}>Allows for the management of course registration.</div>
                </div>
                <div className={'page-bubble'} onClick={()=>navigate('./../enroll-program')}>
                    <div className={'icon-academics'}/>
                    <label className={'page-bubble-label'}>Program Enrollment</label>
                    <div className={'page-bubble-description'}>Allows for the management of program enrollments.</div>
                </div>
                <div className={'page-bubble'} onClick={()=>navigate('./../semester-schedule')}>
                    <div className={'icon-semester-schedule'}/>
                    <label className={'page-bubble-label'}>Semester Schedule</label>
                    <div className={'page-bubble-description'}>Displays any registered course section from both the current semester and next semester.</div>
                </div>
                <div className={'page-bubble'} onClick={()=>navigate('./../master-schedule')}>
                    <div className={'icon-schedule'}/>
                    <label className={'page-bubble-label'}>Master Schedule</label>
                    <div className={'page-bubble-description'}>Displays all of the Course Sections that are available for a particular semester.</div>
                </div>
            </div>
            <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                <div className={'page-bubble'} onClick={()=>navigate('./../holds')}>
                    <div className={'icon-holds'}/>
                    <label className={'page-bubble-label'}>Account Holds</label>
                    <div className={'page-bubble-description'}>Provides an overview of active Holds which will prevent further registration.</div>
                </div>
                <div className={'page-bubble'} onClick={()=>navigate('./../catalog')}>
                    <div className={'icon-catalog-courses'}/>
                    <label className={'page-bubble-label'}>Course Catalog</label>
                    <div className={'page-bubble-description'}>Displays basic information pertaining to courses,
                        departments, and programs.</div>
                </div>
            </div>
        </div>
    </Fragment>;
}

function FacultyRegistration(props:any) {
    const navigate = useNavigate();
    return <Fragment>
        <h1>Welcome to the Faculty Console</h1>
        <div  className={'bubble-container'}>
            <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                <div className={'page-bubble'} onClick={()=>navigate('./../semester-schedule')}>
                    <div className={'icon-semester-schedule'}/>
                    <label className={'page-bubble-label'}>Semester Schedule</label>
                    <div className={'page-bubble-description'}>Provides an overview of active Holds which will prevent further registration.</div>
                </div>
                <div className={'page-bubble'} onClick={()=>navigate('./../master-schedule')}>
                    <div className={'icon-schedule'}/>
                    <label className={'page-bubble-label'}>Master Schedule</label>
                    <div className={'page-bubble-description'}>Displays all of the Course Sections that are available for a particular semester.</div>
                </div>
                <div className={'page-bubble'} onClick={()=>navigate('./../catalog')}>
                    <div className={'icon-catalog-courses'}/>
                    <label className={'page-bubble-label'}>Course Catalog</label>
                    <div className={'page-bubble-description'}>Displays basic information pertaining to courses,
                        departments, and programs.</div>
                </div>
            </div>
        </div>
    </Fragment>;
}


function Registration() {

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(userStoreID);

    function displayRegistration() {
        switch(userStoreRole) {
            case AuthRole.Student: {
                return displayStudentAdvisement();
            }
            case AuthRole.Faculty: {
                return displayFacultyRegistration();
            }
            default: return <Fragment/>
        }

    }

    function displayStudentAdvisement(){
        return <StudentRegistration targetStudent={userID}/>
    }

    function displayFacultyRegistration(){
        return <FacultyRegistration targetFaculty={userID}/>
    }


    return (
        <Fragment>
            <div className={'inner-body-constraints'}>
                {displayRegistration()}
            </div>
        </Fragment>
    );
}

export default Registration;