import React from "react";

class CoursePrereqs {

    prerequisites: any[] = [];

    constructor(data:any | null) {
        this.parseFullData(data);
    }

    parseFullData(data:any) {
        data?.map((row: any, key: number) => {
            const {Course, MasterID, MasterLogic, Master_GroupID, GroupID, GroupLogic, PrereqCourse, MinGrade} = row;
            this.prerequisites.push({Course, MasterID, MasterLogic, Master_GroupID, GroupID, GroupLogic, PrereqCourse, MinGrade})
        });
    }

    print() {
        console.log(this.prerequisites);
    }

    renderAdvanced():any {
        return (

            this.prerequisites && this.prerequisites.length>0?
                <div>
                    <div style={{marginLeft:"auto", marginRight:"auto", padding: 16, minWidth: 200, maxWidth: 700,backgroundColor: "#cccccc", borderRadius: 15}}>
                        <div style={{textAlign:"left"}}>
                            <div style={{margin:32}}>
                                <label style={{fontSize:20, fontWeight: "bold"}}>Prerequisites</label>
                                <div style={{display: "flex", marginTop:8, textAlign: "left", marginLeft: 16}}>
                                    <div style={{display: "inline-block", float:"left"}}>
                                        {this.prerequisites.map((item:any) => (
                                            <div>{item.PrereqCourse}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :<></>);
    }
}

export default CoursePrereqs;