import React from "react";

class DepartmentDetails {

    department: any;
    schools: any[];
    chair: any;

    constructor(data:any | null) {
        this.schools = [];
        this.parseFullData(data);
    }

    parseFullData(data:any) {
        data?.map((row: any, key: number) => {
            const { DepartmentID, DepartmentDescription, SchoolID, SchoolDescription, PhoneNum,
                Department_BuildingName, Department_RoomNum,
                Chair_FirstName, Chair_LastName, Chair_PhoneNum, Chair_Email, Chair_RoomID} = row;
            this.department = {DepartmentID, DepartmentDescription, PhoneNum,Department_BuildingName, Department_RoomNum};
            this.chair = {Chair_FirstName, Chair_LastName, Chair_PhoneNum, Chair_Email, Chair_RoomID};
            if (!this.schools.includes(SchoolID)) {
                this.schools.push({SchoolID, SchoolDescription});
            }
        });
    }

    print() {
        console.log(this.department);
    }

    renderAdvanced():any {
        return (
            <div>
                <div style={{marginTop:32, width:"100%"}}>
                    <label style={{fontWeight:"bold", fontSize:40}}>{this.department.DepartmentID}</label>
                </div>
                <div style={{marginLeft:"auto", marginRight:"auto", padding: 16, minWidth: 200, maxWidth: 700}}>
                    <div style={{textAlign:"left"}}>
                        <div style={{marginBottom:32}}>
                            <p style={{textAlign:"left", fontSize: 14}}>{this.department.DepartmentDescription}</p>
                        </div>
                        <div style={{margin:32}}>
                            <label style={{fontSize:20, fontWeight: "bold"}}>Related Schools</label>
                            {this.schools?.map((school: any, key: number) => (
                                <div key={key} style={{marginBottom:2}}>
                                    <div style={{textAlign: "left", marginLeft: 16}}>
                                        <div style={{display: "flex", marginTop:8}}>
                                            <label style={{fontWeight: "bold", fontSize: 14, minWidth:"20ch"}}>{school.SchoolID}</label>
                                            <label style={{fontSize: 14, width:"100%"}}>{school.SchoolDescription}</label>
                                        </div>
                                        <div style={{width:"100%"}}>{this.schools.length-key>1?<hr/>:""}</div>
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
                                    <label style={{fontWeight: "bold"}}>Building: </label>{this.department.Department_BuildingName}
                                </label>
                                <label style={{fontSize: 14, width:"100%"}}>
                                    <label style={{fontWeight: "bold"}}>Room: </label>{this.department.Department_RoomNum}
                                </label>
                            </div>
                            <div style={{display: "flex", marginTop:8, textAlign: "left", marginLeft: 16}}>
                                <label style={{fontSize: 14, width:"100%"}}>
                                    <label style={{fontWeight: "bold"}}>Phone: </label>{this.department.PhoneNum}
                                </label>
                            </div>
                        </div>
                        <div style={{margin:32}}>
                            <label style={{fontSize:20, fontWeight: "bold"}}>Chairperson Contact</label>
                            <div style={{display: "flex", marginTop:8, textAlign: "left", marginLeft: 16}}>
                                <div style={{width: "100%", float:"left", display:"inline-block"}}>
                                    <div style={{fontSize: 14, width:"100%", float:"left", display: "flex"}}>
                                        <div style={{fontWeight: "bold", marginRight:8}}>Chairperson: </div>
                                        <div>{this.chair.Chair_FirstName} {this.chair.Chair_LastName}</div>
                                    </div>
                                    <div style={{fontSize: 14, width:"100%", display: "flex"}}>
                                        <div style={{fontWeight: "bold", marginRight:8}}>Location:</div>
                                        <div>{this.chair.Chair_RoomID}</div>
                                    </div>
                                    <div style={{fontSize: 14, width:"100%", display: "flex"}}>
                                        <div style={{fontWeight: "bold", marginRight:8}}>Email: </div>
                                        <div>{this.chair.Chair_Email}</div>
                                    </div>
                                    <div style={{fontSize: 14, width:"100%", display: "flex"}}>
                                        <div style={{fontWeight: "bold", marginRight:8}}>Phone: </div>
                                        <div>{this.chair.Chair_PhoneNum}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default DepartmentDetails;