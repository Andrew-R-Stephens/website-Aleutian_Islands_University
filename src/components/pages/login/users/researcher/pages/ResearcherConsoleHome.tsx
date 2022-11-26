import React, {Fragment, useEffect, useState} from 'react';
import './../../../../../../css/ConsoleHome.css';

function ResearcherConsoleHome() {

    const [activePage, setActivePage] = useState(0);

    return (
        <Fragment>
            <div>
                <h1>Welcome to the Student Console</h1>
                <div  className={'bubble-container'}>
                    <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                        <div className={'page-bubble'}>
                            <div className={'icon-registration'}/>
                            <label className={'page-bubble-label'}>Registration</label>
                            <div className={'page-bubble-description'}>Allows a Student to control their enrollments,
                                course registration, and view registration status.</div>
                        </div>
                        <div className={'page-bubble'}>
                            <div className={'icon-academics'}/>
                            <label className={'page-bubble-label'}>Academics</label>
                            <div className={'page-bubble-description'}>A student may view their academic transcripts,
                                audit their progress, and view their present and future semester schedules.</div>
                        </div>
                        <div className={'page-bubble'}>
                            <div className={'icon-advisement'}/>
                            <label className={'page-bubble-label'}>Advisement</label>
                            <div className={'page-bubble-description'}>Provides information about Student's Advisor and
                                available advisement hours.</div>
                        </div>
                        <div className={'page-bubble'}>
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

export default ResearcherConsoleHome;