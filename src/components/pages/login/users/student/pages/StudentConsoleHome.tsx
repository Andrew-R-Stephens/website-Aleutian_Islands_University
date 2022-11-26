import React, {Fragment, useEffect, useState} from 'react';
import './../../../../../../css/ConsoleHome.css';
import {useNavigate} from "react-router-dom";

function StudentConsoleHome() {

    const navigate = useNavigate();

    const [activePage, setActivePage] = useState(0);

    function navigateToPage(link:string){
        navigate(link);
    }

    return (
        <Fragment>
            <div>
                <h1>Welcome to the Student Console</h1>
                <div  className={'bubble-container'}>
                    <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                        <div className={'page-bubble'} onClick={()=>navigate('./../registration')}>
                            <div className={'icon-registration'}/>
                            <label className={'page-bubble-label'}>Registration</label>
                            <div className={'page-bubble-description'}>Allows a Student to control their enrollments,
                                course registration, and view registration status.</div>
                        </div>
                        <div className={'page-bubble'} onClick={()=>navigate('./../academics')}>
                            <div className={'icon-academics'}/>
                            <label className={'page-bubble-label'}>Academics</label>
                            <div className={'page-bubble-description'}>A student may view their academic transcripts,
                                audit their progress, and view their present and future semester schedules.</div>
                        </div>
                        <div className={'page-bubble'} onClick={()=>navigate('./../advisement')}>
                            <div className={'icon-advisement'}/>
                            <label className={'page-bubble-label'}>Advisement</label>
                            <div className={'page-bubble-description'}>Provides information about Student's Advisor and
                                available advisement hours.</div>
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

export default StudentConsoleHome;