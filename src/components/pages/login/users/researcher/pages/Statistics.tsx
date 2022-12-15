import React, {Fragment, useEffect, useState} from 'react';
import './../../../../../../css/ConsoleHome.css';
import {useNavigate} from "react-router-dom";
import {BarChart, LineChart, PieChart} from "../components/Charts";
import {UserData} from "../components/UserData";


function Statistics() {

    const [activePage, setActivePage] = useState(0);
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        labels: UserData.map((d:any)=>(d.year)),
        datasets: [{
            label: "Users Gained",
            data: UserData.map((d:any)=>(d.userGain)),
            backgroundColor: ["#051e35", "#0b2844", "#263e52", "#406e8a"]
        }]
    });

    return (
        <Fragment>
            <div>
                <h1>Research Statistics</h1>
                <div>
                    <div style={{display:"flex"}}>
                        <div style={{display:"flex", width:"100%",  height:"fit-content"}}>
                            <BarChart chartData={userData}/>
                        </div>
                        <div style={{display:"flex", width:"100%"}}>
                            <LineChart chartData={userData}/>
                        </div>
                        <div style={{display:"flex", width:"100%"}}>
                            <PieChart chartData={userData}/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );

}

export default Statistics;
