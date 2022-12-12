import React, {Fragment, useState} from 'react';
import '../../../../../../css/ConsoleHome.css';
import {useNavigate} from "react-router-dom";
import {AuthRole, RoleAuthStore} from "../../../../../../stores/AuthUserStore";

function AdminConsoleHome() {

    const userStoreRole = RoleAuthStore((state:any) => state.authRole);

    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(0);

    return (
        <Fragment>
            <div style={{margin:"auto"}}>
                <h1>Welcome to the Admin Console</h1>
                <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                    {/*<div className={'page-bubble'} onClick={()=>navigate('./../registration')}>
                        <div className={'icon-registration'}/>
                        <label className={'page-bubble-label'}>Manage Registrations</label>
                        <div className={'page-bubble-description'}>Provides control over both the Enrollment of
                            Students and the Registration of both Students and Faculty.</div>
                    </div>*/}
                    {
                        userStoreRole === AuthRole.Primary_Administrator ?
                            <div className={'page-bubble'} onClick={() => navigate('./../admin-playground')}>
                                <div className={'icon-edit-catalog'}/>
                                <label className={'page-bubble-label'}>Sandbox</label>
                                <div className={'page-bubble-description'}>A place for creating new entities and editing
                                    existing entities.
                                </div>
                            </div>
                            :<Fragment/>
                    }
                    <div className={'page-bubble'} onClick={()=>navigate('./../master-schedule', {state:{adminManagement:true}})}>
                        <div className={'icon-schedule'}/>
                        <label className={'page-bubble-label'}>Master Schedule</label>
                        <div className={'page-bubble-description'}>Provides a dashboard for managing the information
                            that's held within the course catalog.</div>
                    </div>
                    <div className={'page-bubble'} onClick={()=>navigate('./../catalog')}>
                        <div className={'icon-catalog-courses'}/>
                        <label className={'page-bubble-label'}>Catalog</label>
                        <div className={'page-bubble-description'}>Provides a dashboard for managing the information
                            that's held within the course catalog.</div>
                    </div>
                    <div className={'page-bubble'} onClick={()=>navigate('./../advisement')}>
                        <div className={'icon-edit-advisement'}/>
                        <label className={'page-bubble-label'}>Advisement</label>
                        <div className={'page-bubble-description'}>Provides information about all Advisors and Advisees.</div>
                    </div>
                </div>
                {
                    userStoreRole === AuthRole.Primary_Administrator ?
                        <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                            <div className={'page-bubble'} onClick={()=>navigate('./../reset-password')}>
                                <div className={'icon-profile-image'}/>
                                <label className={'page-bubble-label'}>Reset Passwords</label>
                                <div className={'page-bubble-description'}>Provides Administrator access to resetting passwords.</div>
                            </div>
                        </div>
                        :<Fragment/>
                }
            </div>
        </Fragment>
    );

}

export default AdminConsoleHome;