import React, {Fragment, useEffect, useState} from 'react';
import './../../../../../../css/ConsoleHome.css';
import {useNavigate} from "react-router-dom";

function FacultyConsoleHome() {

    const navigate = useNavigate();

    const [activePage, setActivePage] = useState(0);

    function navigateToPage(link:string){
        navigate(link);
    }

    return (
        <Fragment>
            <div>
                <h1>Welcome to the Faculty Console</h1>
                <div  className={'bubble-container'}>
                    <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                        <div className={'page-bubble'} onClick={()=>navigate('./../educator-console')}>
                            <div className={'icon-console-educator'}/>
                            <label className={'page-bubble-label'}>Educator Console</label>
                            <div className={'page-bubble-description'}>Expands the options for managing your current
                                course sections and viewing future assigned course sections.</div>
                        </div>
                        <div className={'page-bubble'} onClick={()=>navigate('./../advisement')}>
                            <div className={'icon-catalog-courses'}/>
                            <label className={'page-bubble-label'}>Advisement</label>
                            <div className={'page-bubble-description'}>Displays your advisement information alongside
                                information about your advisees, other advisees, and other advisors.</div>
                        </div>
                        <div className={'page-bubble'} onClick={()=>navigate('./../catalog')}>
                            <div className={'icon-catalog-courses'}/>
                            <label className={'page-bubble-label'}>Course Catalog</label>
                            <div className={'page-bubble-description'}>All basic information pertaining to courses,
                                departments, and programs.</div>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );

}

export default FacultyConsoleHome;