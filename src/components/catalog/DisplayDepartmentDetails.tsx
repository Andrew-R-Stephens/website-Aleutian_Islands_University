import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import DepartmentDetails from "../../classes/DepartmentDetails";

function DisplayProgramDetails(props:any) {

    const [departmentID, setDepartmentID] = useState(props.DID);
    const [departmentDetails, setDepartmentDetails] = useState<DepartmentDetails>();

    useEffect(()=> {
        requestProgramDetails().then(r=>console.log("done"));
    }, [departmentID])

    useEffect(() => {
        departmentDetails?.print();
    }, [departmentDetails])

    async function requestProgramDetails() {
        console.log("attempting request", departmentID);
        await axios.get(process.env["REACT_APP_API_CATALOG"] as string, {
            params: {
                func: "getDepartmentDetails",
                id: departmentID
            }
        }).then(res => {
            const {error, details} = res.data;
            if(details) {
                const departmentData = new DepartmentDetails(details);
                setDepartmentDetails(departmentData);
            } else {
                console.log("Error:", error);
            }
        }).catch(function(err) {
            if(axios.isCancel(err)) {
                console.log("canceled!")
            }
            console.log(err.message);
        })
    }

    function renderDetails():any {
        return (
            <div>
                <div style={{marginTop:32, width:"100%"}}>
                    <label style={{fontWeight:"bold", fontSize:40}}>{departmentDetails?.department.DepartmentID}</label>
                </div>
                <div style={{marginLeft:"auto", marginRight:"auto", padding: 16, minWidth: 200, maxWidth: 700}}>
                    <div style={{textAlign:"left"}}>
                        <div style={{marginBottom:32}}>
                            <p style={{textAlign:"left", fontSize: 14}}>{departmentDetails?.department.DepartmentDescription}</p>
                        </div>
                        <div style={{margin:32}}>
                            <label style={{fontSize:20, fontWeight: "bold"}}>Related Schools</label>
                            {departmentDetails?.schools?.map((school: any, key: number) => (
                                <div key={key} style={{marginBottom:2}}>
                                    <div style={{textAlign: "left", marginLeft: 16}}>
                                        <div style={{display: "flex", marginTop:8}}>
                                            <label style={{fontWeight: "bold", fontSize: 14, minWidth:"20ch"}}>{school.SchoolID}</label>
                                            <label style={{fontSize: 14, width:"100%"}}>{school.SchoolDescription}</label>
                                        </div>
                                        <div style={{width:"100%"}}>{departmentDetails?.schools.length-key>1?<hr/>:""}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{marginLeft:"auto", marginRight:"auto", padding: 16, minWidth: 200, maxWidth: 700,backgroundColor: "#cccccc", borderRadius: 15}}>
                    <div style={{textAlign:"left"}}>
                        <label style={{marginBottom:32, fontWeight:"bold", fontSize:25}}>Contact Information</label>
                        <div style={{margin:32}}>
                            <label style={{fontSize:20, fontWeight: "bold"}}>On-Campus Contact</label>
                            <div style={{display: "flex", marginTop:8, textAlign: "left", marginLeft: 16}}>
                                <label style={{fontSize: 14, width:"100%"}}>
                                    <label style={{fontWeight: "bold"}}>Building: </label>{departmentDetails?.department.Department_BuildingName}
                                </label>
                                <label style={{fontSize: 14, width:"100%"}}>
                                    <label style={{fontWeight: "bold"}}>Room: </label>{departmentDetails?.department.Department_RoomNum}
                                </label>
                            </div>
                            <div style={{display: "flex", marginTop:8, textAlign: "left", marginLeft: 16}}>
                                <label style={{fontSize: 14, width:"100%"}}>
                                    <label style={{fontWeight: "bold"}}>Phone: </label>{departmentDetails?.department.PhoneNum}
                                </label>
                            </div>
                        </div>
                        <div style={{margin:32}}>
                            <label style={{fontSize:20, fontWeight: "bold"}}>Chairperson Contact</label>
                            <div style={{display: "flex", marginTop:8, textAlign: "left", marginLeft: 16}}>
                                <div style={{width: "100%", float:"left", display:"inline-block"}}>
                                    <div style={{fontSize: 14, width:"100%", float:"left", display: "flex"}}>
                                        <div style={{fontWeight: "bold", marginRight:8}}>Chairperson: </div>
                                        <div>{departmentDetails?.chair.Chair_FirstName} {departmentDetails?.chair.Chair_LastName}</div>
                                    </div>
                                    <div style={{fontSize: 14, width:"100%", display: "flex"}}>
                                        <div style={{fontWeight: "bold", marginRight:8}}>Location:</div>
                                        <div>{departmentDetails?.chair.Chair_RoomID}</div>
                                    </div>
                                    <div style={{fontSize: 14, width:"100%", display: "flex"}}>
                                        <div style={{fontWeight: "bold", marginRight:8}}>Email: </div>
                                        <div>{departmentDetails?.chair.Chair_Email}</div>
                                    </div>
                                    <div style={{fontSize: 14, width:"100%", display: "flex"}}>
                                        <div style={{fontWeight: "bold", marginRight:8}}>Phone: </div>
                                        <div>{departmentDetails?.chair.Chair_PhoneNum}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                {renderDetails()}
            </div>
        </Fragment>);

}

export default DisplayProgramDetails;