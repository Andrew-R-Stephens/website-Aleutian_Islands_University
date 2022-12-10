import React, {Fragment, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {AuthRole, RoleAuthStore, UserAuthStore} from "../../../../../../stores/AuthUserStore";
import EditEnrollment from "./EditEnrollment";
import DisplayEnrollmentInfo from "../../DisplayEnrollmentInfo";

function StudentEnrollment(props:any) {

    const location = useLocation();
    const {targetUID, targetRole, godRole} =
        (location as any|null)?.state ?  (location as any|null)?.state : props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);
    const [userRole, setUserRole] = useState(targetRole?targetRole:userStoreRole);

    const navigate = useNavigate();

    return <Fragment>
        <h1>Student Registration</h1>
        <div className={'bubble-container'}>
            <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                <div className={'page-bubble'} onClick={()=>navigate('./../register-course', {state:{targetUID:targetUID, godRole:godRole}})}>
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

function FacultyEnrollment(props:any) {
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

function Enrollment(props:any) {

    const {targetUID, targetRole, godRole} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(targetUID?targetUID:userStoreID);
    const [role, setRole] = useState<string>((targetRole?targetRole:userStoreRole)+"");

    function displayEnrollment() {
        return (
            <Fragment>
                {/*<DisplayEnrollmentInfo targetUID={targetUID} targetRole={targetRole} godRole={godRole}/>*/}
                <EditEnrollment targetUID={targetUID} targetRole={targetRole} godRole={godRole}/>
            </Fragment>
        );
    }

    function displayStudentAdvisement(){
        console.log("displaying  student registration", userID, role, godRole)
        return <StudentEnrollment targetUID={userID} targetRole={role} godRole={godRole}/>
    }

    function displayFacultyRegistration(){
        return <FacultyEnrollment targetUID={userID}/>
    }

    return (
        <Fragment>
            <div className={'inner-body-constraints'}>
                {displayEnrollment()}
            </div>
        </Fragment>
    );
}

export default Enrollment;