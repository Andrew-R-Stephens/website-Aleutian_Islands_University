import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthRole, RoleAuthStore} from "../../../../../stores/AuthUserStore";
import HomeFooter from "../../../../HomeFooter";
import ImageBanner from "../../../../ImageBanner";

function UserConsole(props:any) {

    const {child} = props

    const lastPage = window.sessionStorage.getItem("lastPage") as any as number;

    const storedAuthRole = RoleAuthStore((state:any) => state.authRole as string);
    const role = useRef(storedAuthRole);
    const [page, setPage] = useState<number>(lastPage ? lastPage : 0);
    const [childPage, setChildPage] = useState<number|undefined>(-1);

    const navigate = useNavigate();

    const handleSelectLink = (event:any, page:number, link:string, cPage:number = -1) => {
        event.preventDefault();
        setPage(page);
        setChildPage(cPage);
        window.sessionStorage.setItem("lastPage", page as any);
        navigate(link);
    }

    const handleSelectLinkPayload = (event:any, page:number, link:string, navPayload:any, cPage:number = -1) => {
        event.preventDefault();
        setPage(page);
        setChildPage(cPage);
        window.sessionStorage.setItem("lastPage", page as any);
        navigate(link, navPayload);
    }

    function generateByRole() {
        switch (role.current) {
            case AuthRole.Administrator:
            case AuthRole.Primary_Administrator: {
                return administratorRoutes();
            }
            case AuthRole.Faculty: {
                return facultyRoutes();
            }
            case AuthRole.Student: {
                return studentRoutes();
            }
            case AuthRole.Researcher: {
                return researcherRoutes();
            }
        }
    }

    function administratorRoutes() {
        return (
            <div>
                <div className={'navLink'} onClick={(event:any) =>
                    handleSelectLink(event,0, './../profile')}
                     role={page===0?'active':'inactive'}>Account</div>
                <div className={'navLink-children'} id={page==0?'active':'inactive'}>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,0, './../account',1)}
                         role={childPage===1?'active':'inactive'}>Account</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,0, './../profile',2)}
                         role={childPage===2?'active':'inactive'}>Profile</div>
                </div>

                <div className={'navLink'} onClick={(event:any) =>
                    handleSelectLink(event,2, './../console')}
                     role={page===2?'active':'inactive'}>Admin</div>
                <div className={'navLink-children'} id={page==2?'active':'inactive'}>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLinkPayload(event,2, './../master-schedule',
                            {state:{adminManagement:true}},20)}
                         role={childPage===20?'active':'inactive'}>Master Schedule</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,2, './../catalog',21)}
                         role={childPage===21?'active':'inactive'}>Course Catalog</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,2, './../manage-users',22)}
                         role={childPage===22?'active':'inactive'}>All Users</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,2, './../advisement',23)}
                         role={childPage===23?'active':'inactive'}>Advisement</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLinkPayload(event,2, './../admin-playground',
                            {state:{adminManagement:true}},24)}
                         role={childPage===24?'active':'inactive'}>Creator Sandbox</div>
                </div>
                <div className={'navLink item-last'} onClick={(event:any) =>
                    handleSelectLink(event,3, '/login')}
                     role={page===3?'active':'inactive'}>Logout</div>
            </div>
        );
    }

    function facultyRoutes() {
        return (
            <div>
                <div className={'navLink'} onClick={(event:any) =>
                    handleSelectLink(event,0, './')}
                     role={page===0?'active':'inactive'}>Account</div>

                <div className={'navLink-children'} id={page==0?'active':'inactive'}>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,0, './../account',1)}
                         role={childPage===1?'active':'inactive'}>Account</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,0, './../profile',2)}
                         role={childPage===2?'active':'inactive'}>Profile</div>
                </div>

                <div className={'navLink'} onClick={(event:any) =>
                    handleSelectLink(event,1, './../console')}
                     role={page===1?'active':'inactive'}>Faculty</div>

                <div className={'navLink-children'} id={page==1?'active':'inactive'}>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,1, './../registration',11)}
                         role={childPage===11?'active':'inactive'}>Educator Console</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,1, './../advisement',12)}
                         role={childPage===12?'active':'inactive'}>Advisement</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,1, './../catalog',13)}
                         role={childPage===13?'active':'inactive'}>Course Catalog</div>

                </div>

                <div className={'navLink item-last'} onClick={(event:any) =>
                    handleSelectLink(event,3, '/login')}
                     role={page===3?'active':'inactive'}>Logout</div>
            </div>
        );
    }

    function studentRoutes() {
        return (
            <div>
                <div className={'navLink'} onClick={(event:any) =>
                    handleSelectLink(event,0, './')}
                     role={page===0?'active':'inactive'}>Account</div>

                <div className={'navLink-children'} id={page==0?'active':'inactive'}>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,0, './../account',1)}
                         role={childPage===1?'active':'inactive'}>Account</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,0, './../profile',2)}
                         role={childPage===2?'active':'inactive'}>Profile</div>
                </div>

                <div className={'navLink'} onClick={(event:any) =>
                    handleSelectLink(event,1, './../console')}
                     role={page===1?'active':'inactive'}>Student</div>

                <div className={'navLink-children'} id={page==1?'active':'inactive'}>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,1, './../registration',11)}
                         role={childPage===11?'active':'inactive'}>Registration</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,1, './../academics',12)}
                         role={childPage===12?'active':'inactive'}>Academics</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,1, './../advisement',13)}
                         role={childPage===13?'active':'inactive'}>Advisement</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,1, './../catalog',14)}
                         role={childPage===14?'active':'inactive'}>Course Catalog</div>
                </div>

                <div className={'navLink item-last'} onClick={(event:any) =>
                    handleSelectLink(event,3, '/login')}
                     role={page===3?'active':'inactive'}>Logout</div>
            </div>
        );
    }

    function researcherRoutes() {
        return (
            <div>
                <div className={'navLink'} onClick={(event:any) =>
                    handleSelectLink(event,0, './')}
                     role={page===0?'active':'inactive'}>Account</div>

                <div className={'navLink-children'} id={page==0?'active':'inactive'}>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,0, './../account',1)}
                         role={childPage===1?'active':'inactive'}>Account</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,0, './../profile',2)}
                         role={childPage===2?'active':'inactive'}>Profile</div>
                </div>

                <div className={'navLink'} onClick={(event:any) =>
                    handleSelectLink(event,1, './../console')}
                     role={page===1?'active':'inactive'}>Researcher</div>

                <div className={'navLink-children'} id={page==1?'active':'inactive'}>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,1, './../master-schedule',11)}
                         role={childPage===11?'active':'inactive'}>Master Schedule</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,1, './../catalog',12)}
                         role={childPage===12?'active':'inactive'}>Course Catalog</div>
                    <div className={'navLink-child'} onClick={(event:any) =>
                        handleSelectLink(event,1, './../statistics',13)}
                         role={childPage===13?'active':'inactive'}>Statistics</div>
                </div>

                <div className={'navLink item-last'} onClick={(event:any) =>
                    handleSelectLink(event,3, '/login')}
                     role={page===3?'active':'inactive'}>Logout</div>
            </div>
        );
    }


    return (
        <div className={'banner-logo-wrapper'}>
            <div className={'banner-logo-top'}/>
            <ImageBanner className={"banner-logo"}/>
            <div className={"banner-logo-after"}/>
            <div className={'main-body'}>
                <div className={'sidenav'}>
                    {generateByRole()}
                </div>
                <div className={'inner-body'}>
                    { child }
                </div>
            </div>
            <HomeFooter/>
        </div>
    );

}

export default UserConsole;