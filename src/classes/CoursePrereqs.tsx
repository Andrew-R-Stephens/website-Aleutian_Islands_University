import React from "react";

class CoursePrereqs {

    prerequisites: any[] = [];

    master: PrereqMaster|undefined;

    constructor(data:any | null) {
        this.parseFullData(data);
    }

    parseFullData(data:any) {
        data?.map((row: any, key: number) => {
            const {Course, MasterID, MasterLogic, Master_GroupID, GroupID, GroupLogic, PrereqCourse, MinGrade} = row;
            this.prerequisites.push({Course, MasterID, MasterLogic, Master_GroupID, GroupID, GroupLogic, PrereqCourse, MinGrade})
            console.log("Found", {Course, MasterID, MasterLogic, Master_GroupID, GroupID, GroupLogic, PrereqCourse, MinGrade})
        });

        this.parseToMaster();
        this.print();
    }

    parseToMaster() {
        this.master = new PrereqMaster(this.prerequisites);
    }

    print() {
        /*console.log(this.prerequisites);*/
        console.log(this.master?.print())
    }

    renderAdvanced():any {
        /*
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
        */


    }
}

class PrereqMaster {

    logic: Logic = Logic.NULL;
    groups: PrereqGroup[] = [];

    constructor(data:any) {
        if(this.groups?.length == 0 && data?.length > 0) {
            this.groups.push(data[0])
            this.logic = checkLogic(data.MasterLogic)
        }
        for(let i = 1; i < data?.length; i++) {
            const {Master_GroupID, GroupLogic, PrereqCourse, MinGrade} = data[i];
            for(let j  = 0; j < this.groups?.length; j++) {
                if(this.groups[i]?.groupID === data[j]?.GroupID) {
                    this.groups[i]?.addPrereq({Master_GroupID, GroupLogic, PrereqCourse, MinGrade});
                } else {
                    this.groups.push(new PrereqGroup({Master_GroupID, GroupLogic, PrereqCourse, MinGrade}));
                }
            }
            console.log("Parsing")
        }
    }

    print() {
        this.groups.map((g:any)=> (
            console.log(this.logic, g.print())
            /*console.log(this.logic, g.print())*/
        ))
    }
}

class PrereqGroup {

    logic: Logic = Logic.NULL;
    prereqs: Prereq[] = [];
    groupID: number = 0;

    constructor(data:any) {
        const {PrereqCourse, MinGrade} = data;
        this.logic = checkLogic(data.GroupLogic);
        this.prereqs.push(new Prereq({PrereqCourse, MinGrade}))
    }

    addPrereq(data:any) {
        this.prereqs.push(data)
    }

    print() {
        /*this.prereqs.map((p:any)=> (
            console.log(p.print())
        ))*/
    }
}

class Prereq {

    courseID: string[] = [];
    grade: number = 0;

    constructor(data:any) {
        this.courseID = data.PrereqCourse;
        this.grade = data.MinGrade;
    }
/*
    print() {
        console.log(this.courseID, this.grade);
    }*/
}

enum Logic {
    NULL, AND, OR
}

function checkLogic(l:string) {
    switch(l){
        case 'AND': {
            return Logic.AND
        }
        case 'OR': {
            return Logic.OR
        }
        default: {
            return Logic.NULL
        }
    }
}

export default CoursePrereqs;