import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {convertTime} from "../../../../../../Utils";

function DisplayCourseSectionDetails(props:any) {
    const{targetCRN, godRole} = props;

    const [crn, setCRN] = useState(targetCRN);
    const [data, setData] = useState<any[]>();

    useEffect(() => {
        setCRN(targetCRN);
    }, [targetCRN])

    useEffect(() => {
        requestSectionDetails().then(r=>console.log(r));
    }, [crn])

    async function requestSectionDetails() {
        axios.get(process.env['REACT_APP_API_CATALOG'] as string, {
            params: {
                func: "getCourseSectionDataByCRN",
                crn: crn
            }
        }).then(res => {
            let {error, data} = res.data;
            console.log(res.data)
            setData(data);
        }).catch(function(err) {
            console.log(err.message);
        })
    }

    function display() {
        return (
            <Fragment>
                <div style={{margin:32, backgroundColor:"#cccccc", borderRadius:15, padding: 16}}>
                    <div style={{marginLeft:32, marginRight:"auto"}}>
                        <div style={{marginLeft:0, width:"100%"}}>
                            <div style={{padding:8, fontWeight:"bold", fontSize: 30, textAlign:"left"}}>Course Section Information</div>
                        </div>
                        {
                            data?.map((d:any)=>(
                                <div style={{color: "#333333"}}>
                                    <div className={'display-right-content'} style={{color: "#333333"}}>
                                        <label style={{fontWeight:"bold", paddingRight:8}}>Semester:</label>
                                        <label>{d.Term} {d.Year}</label>
                                    </div>
                                    <div className={'display-right-content'} style={{color: "#333333"}}>
                                        <label style={{fontWeight:"bold", paddingRight:8}}>CRN:</label>
                                        <label>{d.CRN}</label>
                                    </div>
                                    <div className={'display-right-content'} style={{color: "#333333"}}>
                                        <label style={{fontWeight:"bold", paddingRight:8}}>Course:</label>
                                        <label>{d.CourseID}</label>
                                    </div>
                                    <div className={'display-right-content'} style={{color: "#333333"}}>
                                        <label style={{fontWeight:"bold", paddingRight:8}}>Department:</label>
                                        <label>{d.DepartmentID}</label>
                                    </div>
                                    <div className={'display-right-content'} style={{color: "#333333"}}>
                                        <label style={{fontWeight:"bold", paddingRight:8}}>Professor:</label>
                                        <label>{d.FirstName} {d.LastName}</label>
                                    </div>
                                    <div className={'display-right-content'} style={{color: "#333333"}}>
                                        <label style={{fontWeight:"bold", paddingRight:8}}>Location:</label>
                                        <label>{d.BuildingName}, Room {d.RoomNum}</label>
                                    </div>
                                    <div className={'display-right-content'} style={{display: "flex", textAlign:"left", color: "#333333"}}>
                                        <div style={{display: "inline-block", textAlign:"left"}}>
                                            <div><label style={{fontWeight:"bold", paddingRight:8}}>Time:</label></div>
                                            <div style={{marginLeft: 16}}>
                                                <div><label>{d.DayName1} {convertTime(d.StartTime1)} - {convertTime(d.EndTime1)}</label></div>
                                                <div><label>{d.DayName2} {convertTime(d.StartTime2)} - {convertTime(d.EndTime2)}</label></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'display-right-content'} style={{display: "flex", textAlign:"left", color: "#333333"}}>
                                        <div style={{display: "inline-block", textAlign:"left"}}>
                                            <div><label style={{fontWeight:"bold", paddingRight:8}}>Room Information:</label></div>
                                            <div style={{marginLeft: 16}}>
                                                <div>
                                                    <label style={{paddingRight:8, fontWeight:"bold"}}>Min/Max Seats:</label>
                                                    <label>{d.SeatsMinimum}</label> / <label>{d.SeatsCapacity}</label>
                                                </div>
                                                <div>
                                                    <label style={{paddingRight:8, fontWeight:"bold"}}>Occupied Seats:</label>
                                                    <label>{d.SeatsActual}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Fragment>
        );
    }

    return <Fragment>
        {
            display()
        }
    </Fragment>
}

export default DisplayCourseSectionDetails;