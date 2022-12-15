import React, {Fragment, useEffect, useState} from 'react';
import './../../../../../../css/ConsoleHome.css';
import {useNavigate} from "react-router-dom";
import {BarChart, LineChart, PieChart} from "../components/Charts";
import {UserData} from "../components/UserData";


function ResearcherConsoleHome() {

    const [activePage, setActivePage] = useState(0);
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        labels: UserData.map((d:any)=>(d.year)),
        datasets: [{
            label: "Users Gained",
            data: UserData.map((d:any)=>(d.userGain)),
            backgroundColor: ["#051e35", "#0b2844", "#263e52"]
        }]
    });

    return (
        <Fragment>
            <div>
                <h1>Welcome to the Researcher Console</h1>
                <div  className={'bubble-container'}>
                    <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                        <div className={'page-bubble'} onClick={()=>navigate('./../master-schedule')}>
                            <div className={'icon-schedule'}/>
                            <label className={'page-bubble-label'}>Master Schedule</label>
                            <div className={'page-bubble-description'}>Todo.</div>
                        </div>
                        <div  className={'page-bubble'} onClick={()=>navigate('./../catalog')}>
                            <div className={'icon-catalog-courses'}/>
                            <label className={'page-bubble-label'}>Course Catalog</label>
                            <div className={'page-bubble-description'}>All basic information pertaining to courses,
                                departments, and programs.</div>
                        </div>
                    </div>
                    <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                        <div className={'page-bubble'} onClick={()=>navigate('./../catalog')}>
                            <BarChart chartData={userData}/>
                        </div>
                        <div className={'page-bubble'} onClick={()=>navigate('./../catalog')}>
                            <LineChart chartData={userData}/>
                        </div>
                        <div className={'page-bubble'} onClick={()=>navigate('./../catalog')}>
                            <PieChart chartData={userData}/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );

}

export default ResearcherConsoleHome;
