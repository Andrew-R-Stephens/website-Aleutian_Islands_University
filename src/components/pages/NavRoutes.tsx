import React, {Fragment, useState} from 'react';
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
import Academics from "./home/Academics";
import UserConsole from "../UserConsole";
import DisplayMasterSchedule from "./login/users/administrator/components/DisplayMasterSchedule";
import CourseCatalog from "../CourseCatalog";
import DisplayAllStudents from "./login/users/administrator/components/DisplayAllStudents";
import Settings from "./login/users/Settings";

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

    console.log("User Auth working...", storedUserID)

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
        case AuthRole.Administrator: {
            console.log("Navigating to admin");
            return (
                <Navigate to="/u/administrator/profile" state={{from: location}}/>
            )
        }
        case AuthRole.Researcher: {
            console.log("Navigating to researcher");
            return (
                <Navigate to="/u/researcher/profile" state={{from: location}}/>
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

function NavRoutes() {

    return (
        <Fragment>
            <ImageBanner className={"banner-logo"}/>
            <div className={'main-container'}>
                <div className={'main'}>
                    <div className={'main-body'}>
                        <Routes>
                            <Route path={"/"}>
                                <Route index element={<Home/>}/>
                                <Route path={"/academics"} element={<Academics/>}/>
                                <Route path={"/about"} element={<About/>}/>
                                <Route path={"/login"} element={<Login/>}/>
                                <Route element={<RequireUserAuth/>}>
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
                                    </Route>
                                    <Route path={"faculty"}
                                           element={<RequireRoleAuth allowedRoles={[AuthRole.Faculty]}/>}>
                                        <Route path={"account"} element={<UserConsole child={<Account/>}/>}/>
                                        <Route path={"profile"} element={<UserConsole child={<Profile/>}/>}/>
                                        <Route path={"console"} element={<UserConsole child={<Faculty/>}/>}/>
                                    </Route>
                                    <Route path={"administrator"}
                                           element={<RequireRoleAuth allowedRoles={[AuthRole.Administrator]}/>}>
                                        <Route path={"settings"} element={<UserConsole child={<Settings/>}/>}/>
                                        <Route path={"account"} element={<UserConsole child={<Account/>}/>}/>
                                        <Route path={"profile"} element={<UserConsole child={<Profile/>}/>}/>
                                        <Route path={"console"} element={<UserConsole child={<Administrator/>}/>}/>
                                        <Route path={"manage-master"} element={<UserConsole child={<DisplayMasterSchedule/>}/>}/>
                                        <Route path={"manage-catalog"} element={<UserConsole child={<CourseCatalog/>}/>}/>
                                        <Route path={"manage-users"} element={<UserConsole child={<DisplayAllStudents/>}/>}/>
                                    </Route>
                                    <Route path={"researcher"}
                                           element={<RequireRoleAuth allowedRoles={[AuthRole.Researcher]}/>}>
                                        <Route path={"account"} element={<UserConsole child={<Account/>}/>}/>
                                        <Route path={"profile"} element={<UserConsole child={<Profile/>}/>}/>
                                        <Route path={"console"} element={<UserConsole child={<Researcher/>}/>}/>
                                    </Route>
                                </Route>
                            </Route>
                            <Route path={"/*"} element={<ErrorPage/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
            <HomeFooter/>
        </Fragment>
    );
}

export default NavRoutes;
