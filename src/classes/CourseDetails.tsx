import React from "react";

class CourseDetails {

    course: any;

    constructor(data:any | null) {
        this.parseFullData(data);
    }

    parseFullData(data:any) {
        data?.map((row: any, key: number) => {
            const { CourseID, Name, Credits, DepartmentID, Description} = row;
            this.course = {CourseID, Name, Credits, Description, DepartmentID}
        });
    }

    print() {
        console.log(this.course);
    }

    renderAdvanced():any {
        return (
            <div>
                <div style={{marginTop:32, width:"100%"}}>
                    <label style={{fontWeight:"bold", fontSize:40}}>{this.course.Name}</label>
                </div>
                <div style={{marginLeft:"auto", marginRight:"auto", padding: 16, minWidth: 200, maxWidth: 700}}>
                    <div style={{textAlign:"left"}}>
                        <div style={{marginBottom:32}}>
                            <div style={{marginBottom:2}}>
                                <div style={{textAlign: "left", marginLeft: 16}}>
                                    <div  style={{width: "100%", float:"left", display:"inline-block", marginBottom:16}}>
                                        <div style={{fontSize: 20, width:"100%", display: "flex"}}>
                                            <div style={{fontWeight: "bold", marginRight:8}}>Course ID: </div>
                                            <div style={{fontSize: 16, marginTop:"auto", marginBottom:"auto"}}>{this.course.CourseID}</div>
                                        </div>
                                        <div style={{fontSize: 20, width:"100%", display: "flex"}}>
                                            <div style={{fontWeight: "bold", marginRight:8}}>Department: </div>
                                            <div style={{fontSize: 16, marginTop:"auto", marginBottom:"auto"}}>{this.course.DepartmentID}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p style={{textAlign:"left", fontSize: 14}}>{this.course.Description}</p>
                        </div>
                        <div style={{margin:32}}>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default CourseDetails;