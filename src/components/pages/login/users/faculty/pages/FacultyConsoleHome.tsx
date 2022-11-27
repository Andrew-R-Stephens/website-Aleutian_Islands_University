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
                <h1>Welcome to the Student Console</h1>
                <div  className={'bubble-container'}>
                    <div style={{display:"flex", marginTop:32, marginBottom:32}}>
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