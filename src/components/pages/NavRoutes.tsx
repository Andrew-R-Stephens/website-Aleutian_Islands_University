import React, {Fragment} from 'react';
import {Navigate, Outlet, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Home from "./home/Home";
import Student from "./login/users/student/Student";
import About from "./home/About";
import Login from "./home/Login";
import Account from "./login/users/student/Account";
import Profile from "./login/users/student/Profile";
import ErrorPage from "./home/ErrorPage";
import '../../css/NavRoutes.css';
import ImageBanner from "../ImageBanner";
import HomeFooter from "../HomeFooter";
import {AuthRole, RoleAuthStore, UserAuthStore} from "../../stores/AuthUserStore";
import Administrator from "./login/users/administrator/Administrator";
import Faculty from "./login/users/faculty/Faculty";
import Researcher from "./login/users/researcher/Researcher";
import SideBanner from "../SideBanner";

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
                <Navigate to="/u/student/account" state={{from: location}}/>
            )
        }
        case AuthRole.Faculty: {
            console.log("Navigating to faculty");
            return (
                <Navigate to="/u/faculty/account" state={{from: location}}/>
            )
        }
        case AuthRole.Administrator: {
            console.log("Navigating to admin");
            return (
                <Navigate to="/u/administrator/account" state={{from: location}}/>
            )
        }
        case AuthRole.Researcher: {
            console.log("Navigating to researcher");
            return (
                <Navigate to="/u/researcher/account" state={{from: location}}/>
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
                <Routes>
                    <Route path={"/"} >
                        <Route index element={<Home/>}/>
                        <Route path={"/about"} element={<About/>} />
                        <Route path={"/login"} element={<Login/>} />
                            <Route element={<RequireUserAuth/>}>
                                <Route path={"/u"}>
                                <Route index element={<DoRoleAuthRouting/>}/>
                            </Route>
                        </Route>
                        <Route path={"u"} >
                            <Route path={"student"} element={<RequireRoleAuth allowedRoles={[AuthRole.Student]}/>} >
                                <Route path={"account"} element={<Account sideBanner={<SideBanner urls={["./", "./../profile", "./../student", "/login"]}
                                                                                             names={["Account", "Profile", "Student", "Logout"]}
                                                                                             classes={['item', 'item', 'item', 'item-last']}
                                                                                             roles={['active', 'inactive', 'inactive', 'inactive']}/>}/>} />
                                <Route path={"profile"} element={<Profile/>} />
                                <Route path={"student"} element={<Student/>} />
                            </Route>
                            <Route path={"faculty"} element={<RequireRoleAuth allowedRoles={[AuthRole.Faculty]}/>} >
                                <Route path={"account"} element={<Account sideBanner={<SideBanner urls={["./", "./../profile", "./../faculty", "/login"]}
                                                                                                  names={["Account", "Profile", "Faculty", "Logout"]}
                                                                                                  classes={['item', 'item', 'item', 'item-last']}
                                                                                                  roles={['active', 'inactive', 'inactive', 'inactive']}/>}/>} />
                                <Route path={"profile"} element={<Profile/>} />
                                <Route path={"faculty"} element={<Faculty/>} />
                            </Route>
                            <Route path={"administrator"} element={<RequireRoleAuth allowedRoles={[AuthRole.Administrator]}/>} >
                                <Route path={"account"} element={<Account sideBanner={<SideBanner urls={["./", "./../profile", "./../administrator", "/login"]}
                                                                                                  names={["Account", "Profile", "Administrator", "Logout"]}
                                                                                                  classes={['item', 'item', 'item', 'item-last']}
                                                                                                  roles={['active', 'inactive', 'inactive', 'inactive']}/>}/>} />
                                <Route path={"profile"} element={<Profile/>} />
                                <Route path={"administrator"} element={<Administrator/>} />
                            </Route>
                            <Route path={"researcher"} element={<RequireRoleAuth allowedRoles={[AuthRole.Researcher]}/>} >
                                <Route path={"account"} element={<Account sideBanner={<SideBanner urls={["./", "./../profile", "./../researcher", "/login"]}
                                                                                                  names={["Account", "Profile", "Researcher", "Logout"]}
                                                                                                  classes={['item', 'item', 'item', 'item-last']}
                                                                                                  roles={['active', 'inactive', 'inactive', 'inactive']}/>}/>} />
                                <Route path={"profile"} element={<Profile/>} />
                                <Route path={"researcher"} element={<Researcher/>} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path={"/*"} element={<ErrorPage/>} />
                </Routes>
            <HomeFooter/>
        </Fragment>
    );
}

export default NavRoutes;
