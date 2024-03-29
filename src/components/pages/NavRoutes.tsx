import React, {Fragment} from 'react';
import {Navigate, Outlet, Route, Routes, useLocation} from "react-router-dom";
import Home from "./home/Home";
import Student from "./login/users/student/Student";
import About from "./home/About";
import Login from "./home/Login";
import Account from "./login/users/Account";
import Profile from "./login/users/Profile";
import ErrorPage from "./home/ErrorPage";
import '../../css/NavRoutes.css';
import ImageBanner from "../ImageBanner";
import HomeFooter from "../HomeFooter";
import {AuthRole, RoleAuthStore, UserAuthStore} from "../../stores/AuthUserStore";
import Administrator from "./login/users/administrator/Administrator";
import Faculty from "./login/users/faculty/Faculty";
import Researcher from "./login/users/researcher/Researcher";
import GeneralAcademics from "./home/GeneralAcademics";
import UserConsole from "./login/users/UserConsole";
import CourseCatalog from "../catalog/CourseCatalog";
import DisplayAllStudents from "./login/users/administrator/components/DisplayAllUsers";
import Academics from "./login/users/Academics";
import Registration from "./login/users/student/pages/Registration";
import Advisement from "./login/users/Advisement";
import Holds from "./login/users/student/pages/Holds";
import RegisterCourse from "./login/users/student/pages/EditRegistration";
import Enrollment from "./login/users/student/pages/Enrollment";
import SemesterSchedule from "./login/users/SemesterSchedule";
import SemesterGrades from "./login/users/student/pages/SemesterGrades";
import UnofficialTranscript from "./login/users/student/pages/UnofficialTranscript";
import DegreeAudit from "./login/users/student/pages/DegreeAudit";
import EducatorConsole from "./login/users/faculty/components/EducatorConsole";
import AdvisorConsole from "./login/users/faculty/components/AdvisorConsole";
import CourseSection from "./login/users/CourseSection";
import MasterSchedule from "../MasterSchedule";
import AdminPlayground from "./login/users/administrator/pages/AdminPlayground";
import CreateCourse from "./login/users/administrator/components/CreateCourse";
import CreateCourseSection from "./login/users/administrator/components/CreateCourseSection";
import CreateDepartment from "./login/users/administrator/components/CreateDepartment";
import CreateUser from "./login/users/administrator/components/CreateUser";
import CreateProgram from "./login/users/administrator/components/CreateProgram";
import AdminPasswordReset from "../AdminPasswordReset";
import CreatePrerequisite from "./login/users/administrator/components/CreatePrerequisite";
import CreateRequirement from "./login/users/administrator/components/CreateRequirement";
import Statistics from "./login/users/researcher/pages/Statistics";
import DisplayAllUsers from "./login/users/administrator/components/DisplayAllUsers";

import {Link} from "react-router-dom";
import '../../css/TopNavBanner.css';

const RequireRoleAuth = ( props:any ) => {
    const {allowedRoles} = props;

    const storedAuthRole = RoleAuthStore((state:any) => state.authRole as string);
    const location = useLocation();

    console.log("Role Auth working...", allowedRoles, storedAuthRole)

    return (
        (allowedRoles.includes(storedAuthRole)) ?
            <Outlet/> : ( <Navigate to="/login" state={{from: location}} replace/> )
    )
}

const RequireUserAuth = () => {

    const storedUserID = UserAuthStore.getState().userID;
    const location = useLocation();

    console.log("User Auth working...", storedUserID, storedUserID && storedUserID as string > '0')

    return (
        (storedUserID && storedUserID as string > '0') ?
            <Outlet/> : ( <Navigate to="/login" state={{from: location}} replace/> )
    )
}

const DoRoleAuthRouting = () => {

    const storedAuthRole = RoleAuthStore((state: any) => state.authRole as string);
    const location = useLocation();

    switch (storedAuthRole) {
        case AuthRole.Student: {
            console.log("Navigating to student");
            return (
                <Navigate to="/u/student/profile" state={{from: location}}/>
            )
        }
        case AuthRole.Faculty: {
            console.log("Navigating to faculty");
            return (
                <Navigate to="/u/faculty/profile" state={{from: location}}/>
            )
        }
        case AuthRole.Researcher: {
            console.log("Navigating to researcher");
            return (
                <Navigate to="/u/researcher/profile" state={{from: location}}/>
            )
        }
        case AuthRole.Administrator: {
            console.log("Navigating to admin");
            return (
                <Navigate to="/u/administrator/profile" state={{from: location}}/>
            )
        }
        case AuthRole.Primary_Administrator: {
            console.log("Navigating to admin");
            return (
                <Navigate to="/u/administrator/profile" state={{from: location}}/>
            )
        }
        default: {
            console.log("Navigating to default");
            return (
                <Navigate to="/login" state={{from: location}} replace/>
            )
        }
    }
}

function PrimaryPage(props: { child: JSX.Element }) {

    function TopNavBanner(props:any) {

        const {urls, names} = props;

        const listItems = urls.map((elem:any, index:number) =>
            <li key={index}><Link to={urls[index]}>{names[index]}</Link></li>
        );

        return (
            <Fragment>
                <header className={'top-nav-header'}>
                    <div className={'top-nav-header-inner'}>
                        <ul>
                            {listItems}
                        </ul>
                    </div>
                </header>
            </Fragment>
        );
    }

    return (
        <div className={'banner-logo-wrapper'}>
            <div className={'banner-logo-top'}>
                <TopNavBanner urls={["/login"]}
                               names={["Connect AIU"]}/>
            </div>
            <ImageBanner className={"banner-logo"}/>
            <div className={'main-container'}>
                <div className={'main'}>
                    <div className={'main-body'}>
                        {props.child}
                    </div>
                </div>
            </div>
            <HomeFooter/>
        </div>
    );
}

function NavRoutes() {

    return (
        <Fragment>
            <Routes>
                <Route path={"/"}>
                    <Route index element={<PrimaryPage child={<Home/>}/>}/>
                    <Route path={"/academics"} element={<PrimaryPage child={<GeneralAcademics/>}/>}/>
                    <Route path={"/about"} element={<PrimaryPage child={<About/>}/>}/>
                    <Route path={"/login"} element={<PrimaryPage child={<Login/>}/>}/>
                    <Route path={"/course-section"} element={<PrimaryPage child={<CourseSection/>}/>}/>
                    <Route element={<PrimaryPage child={<RequireUserAuth/>}/>}>
                        <Route path={"/u"}>
                            <Route index element={<DoRoleAuthRouting/>}/>
                        </Route>
                    </Route>
                    <Route path={"u"}>
                        <Route path={"student"}
                               element={<RequireRoleAuth allowedRoles={[AuthRole.Student]}/>}>
                            <Route path={"account"} element={<UserConsole child={<Account/>}/>}/>
                            <Route path={"profile"} element={<UserConsole child={<Profile/>}/>}/>
                            <Route path={"console"} element={<UserConsole child={<Student/>}/>}/>
                            <Route path={"academics"} element={<UserConsole child={<Academics/>}/>}/>
                            <Route path={"registration"} element={<UserConsole child={<Registration/>}/>}/>
                            <Route path={"register-course"} element={<UserConsole child={<RegisterCourse/>}/>}/>
                            <Route path={"enroll-program"} element={<UserConsole child={<Enrollment/>}/>}/>
                            <Route path={"master-schedule"} element={<UserConsole child={<MasterSchedule/>}/>}/>
                            <Route path={"catalog"} element={<UserConsole child={<CourseCatalog/>}/>}/>
                            <Route path={"advisement"} element={<UserConsole child={<Advisement/>}/>}/>
                            <Route path={"catalog"} element={<UserConsole child={<CourseCatalog/>}/>}/>
                            <Route path={"holds"} element={<UserConsole child={<Holds/>}/>}/>
                            <Route path={"semester-schedule"} element={<UserConsole child={<SemesterSchedule/>}/>}/>
                            <Route path={"semester-grades"} element={<UserConsole child={<SemesterGrades/>}/>}/>
                            <Route path={"unofficial-transcript"} element={<UserConsole child={<UnofficialTranscript/>}/>}/>
                            <Route path={"degree-audit"} element={<UserConsole child={<DegreeAudit/>}/>}/>
                            <Route path={"course-section"} element={<UserConsole child={<CourseSection/>}/>}/>
                        </Route>
                        <Route path={"faculty"}
                               element={<RequireRoleAuth allowedRoles={[AuthRole.Faculty]}/>}>
                            <Route path={"account"} element={<UserConsole child={<Account/>}/>}/>
                            <Route path={"profile"} element={<UserConsole child={<Profile/>}/>}/>
                            <Route path={"console"} element={<UserConsole child={<Faculty/>}/>}/>
                            <Route path={"academics"} element={<UserConsole child={<Academics/>}/>}/>
                            <Route path={"registration"} element={<UserConsole child={<Registration/>}/>}/>
                            <Route path={"register-course"} element={<UserConsole child={<RegisterCourse/>}/>}/>
                            <Route path={"enroll-program"} element={<UserConsole child={<Enrollment/>}/>}/>
                            <Route path={"master-schedule"} element={<UserConsole child={<MasterSchedule/>}/>}/>
                            <Route path={"catalog"} element={<UserConsole child={<CourseCatalog/>}/>}/>
                            <Route path={"advisement"} element={<UserConsole child={<Advisement/>}/>}/>
                            <Route path={"catalog"} element={<UserConsole child={<CourseCatalog/>}/>}/>
                            <Route path={"holds"} element={<UserConsole child={<Holds/>}/>}/>
                            <Route path={"semester-schedule"} element={<UserConsole child={<SemesterSchedule/>}/>}/>
                            <Route path={"semester-grades"} element={<UserConsole child={<SemesterGrades/>}/>}/>
                            <Route path={"unofficial-transcript"} element={<UserConsole child={<UnofficialTranscript/>}/>}/>
                            <Route path={"degree-audit"} element={<UserConsole child={<DegreeAudit/>}/>}/>
                            <Route path={"educator-console"} element={<UserConsole child={<EducatorConsole/>}/>}/>
                            <Route path={"advisor-console"} element={<UserConsole child={<AdvisorConsole/>}/>}/>
                            <Route path={"course-section"} element={<UserConsole child={<CourseSection/>}/>}/>
                        </Route>
                        <Route path={"administrator"}
                               element={<RequireRoleAuth allowedRoles={[AuthRole.Administrator, AuthRole.Primary_Administrator]}/>}>
                            <Route path={"account"} element={<UserConsole child={<Account/>}/>}/>
                            <Route path={"profile"} element={<UserConsole child={<Profile/>}/>}/>
                            <Route path={"console"} element={<UserConsole child={<Administrator/>}/>}/>
                            <Route path={"master-schedule"} element={<UserConsole child={<MasterSchedule/>}/>}/>
                            <Route path={"manage-users"} element={<UserConsole child={<DisplayAllUsers/>}/>}/>
                            <Route path={"academics"} element={<UserConsole child={<Academics/>}/>}/>
                            <Route path={"registration"} element={<UserConsole child={<Registration/>}/>}/>
                            <Route path={"register-course"} element={<UserConsole child={<RegisterCourse/>}/>}/>
                            <Route path={"advisement"} element={<UserConsole child={<Advisement/>}/>}/>
                            <Route path={"catalog"} element={<UserConsole child={<CourseCatalog/>}/>}/>
                            <Route path={"advisor-console"} element={<UserConsole child={<AdvisorConsole/>}/>}/>
                            <Route path={"course-section"} element={<UserConsole child={<CourseSection/>}/>}/>
                            <Route path={"enroll-program"} element={<UserConsole child={<Enrollment/>}/>}/>
                            <Route path={"semester-schedule"} element={<UserConsole child={<SemesterSchedule/>}/>}/>
                            <Route path={"admin-playground"} element={<UserConsole child={<AdminPlayground/>}/>}/>
                            <Route path={"create-course"} element={<UserConsole child={<CreateCourse/>}/>}/>
                            <Route path={"create-course-section"} element={<UserConsole child={<CreateCourseSection/>}/>}/>
                            <Route path={"create-department"} element={<UserConsole child={<CreateDepartment/>}/>}/>
                            <Route path={"create-user"} element={<UserConsole child={<CreateUser/>}/>}/>
                            <Route path={"create-program"} element={<UserConsole child={<CreateProgram/>}/>}/>
                            <Route path={"create-prerequisite"} element={<UserConsole child={<CreatePrerequisite/>}/>}/>
                            <Route path={"create-requirement"} element={<UserConsole child={<CreateRequirement/>}/>}/>
                            <Route path={"reset-password"} element={<UserConsole child={<AdminPasswordReset/>}/>}/>
                        </Route>
                        <Route path={"researcher"}
                               element={<RequireRoleAuth allowedRoles={[AuthRole.Researcher]}/>}>
                            <Route path={"account"} element={<UserConsole child={<Account/>}/>}/>
                            <Route path={"profile"} element={<UserConsole child={<Profile/>}/>}/>
                            <Route path={"console"} element={<UserConsole child={<Researcher/>}/>}/>
                            <Route path={"master-schedule"} element={<UserConsole child={<MasterSchedule/>}/>}/>
                            <Route path={"catalog"} element={<UserConsole child={<CourseCatalog/>}/>}/>
                            <Route path={"course-section"} element={<UserConsole child={<CourseSection/>}/>}/>
                            <Route path={"statistics"} element={<UserConsole child={<Statistics/>}/>}/>
                        </Route>
                    </Route>
                </Route>
                <Route path={"/*"} element={<ErrorPage/>}/>
            </Routes>
        </Fragment>
    );
}

export default NavRoutes;
