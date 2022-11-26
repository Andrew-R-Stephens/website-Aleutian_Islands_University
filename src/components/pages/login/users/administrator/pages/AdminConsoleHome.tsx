import React, {Fragment, useEffect, useState} from 'react';
import '../../../../../../css/ConsoleHome.css';
import {useNavigate} from "react-router-dom";

function AdminConsoleHome() {

    const navigate = useNavigate();
    const [activePage, setActivePage] = useState(0);

    return (
        <Fragment>
            <div style={{margin:"auto"}}>
                <h1>Welcome to the Admin Console</h1>
                <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                    <div className={'page-bubble'} onClick={()=>navigate('./../registration')}>
                        <div className={'icon-registration'}/>
                        <label className={'page-bubble-label'}>Registration</label>
                        <div className={'page-bubble-description'}>Allows a Student to control their enrollments,
                            course registration, and view registration status.</div>
                    </div>
                    <div className={'page-bubble'} onClick={()=>navigate('./../catalog')}>
                        <div className={'icon-edit-catalog'}/>
                        <label className={'page-bubble-label'}>Academics</label>
                        <div className={'page-bubble-description'}>A student may view their academic transcripts,
                            audit their progress, and view their present and future semester schedules.</div>
                    </div>
                    <div className={'page-bubble'} onClick={()=>navigate('./../advisement')}>
                        <div className={'icon-edit-advisement'}/>
                        <label className={'page-bubble-label'}>Advisement</label>
                        <div className={'page-bubble-description'}>Provides information about Student's Advisor and
                            available advisement hours.</div>
                    </div>
                </div>
            </div>
        </Fragment>
    );

}

export default AdminConsoleHome;