import React from "react";

class CoursePrereqs {

    prerequisites: any[] = [];

    master: PrereqMaster;

    constructor(data:any | null) {
        this.parseFullData(data);
        this.master = new PrereqMaster(this.prerequisites);
    }

    parseFullData(data:any) {
        data?.map((row: any, key: number) => {
            const {Course, MasterID, MasterLogic, Master_GroupID, GroupID, GroupLogic, PrereqCourse, MinGrade} = row;
            this.prerequisites.push({Course, MasterID, MasterLogic, Master_GroupID, GroupID, GroupLogic, PrereqCourse, MinGrade})
            console.log("Found", {Course, MasterID, MasterLogic, Master_GroupID, GroupID, GroupLogic, PrereqCourse, MinGrade})
        });

        this.print();
    }

    print() {
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

export class PrereqMaster {

    logic: Logic = Logic.NULL;
    groups: PrereqGroup[] = [];

    constructor(data:any) {
        if(this.groups?.length == 0 && data?.length > 0) {
            console.log("Creating first")
            const {Master_GroupID, GroupLogic, PrereqCourse, MinGrade} = data[0];
            this.groups.push(new PrereqGroup({Master_GroupID, GroupLogic, PrereqCourse, MinGrade}));
            this.logic = checkLogic(data[0].MasterLogic)
            console.log("first", this.groups[0], this.logic)
        }
        for(let i = 1; i < data?.length; i++) {
            const {Master_GroupID, GroupLogic, PrereqCourse, MinGrade} = data[i];
            console.log("using", data[i], this.groups.includes(data[i].Master_GroupID), data[i].Master_GroupID);

            var isFound = false;
            for(let j  = 0; !isFound && j < this.groups?.length; j++) {
                console.log("comparing", this.groups[j]?.master_groupID, data[i]?.Master_GroupID)
                if(this.groups[j]?.master_groupID == data[i]?.Master_GroupID) {
                    console.log("Add to existing")
                    this.groups[j]?.addPrereq({Master_GroupID, GroupLogic, PrereqCourse, MinGrade});
                    isFound = true;
                }
            }
            if(!isFound) {
                console.log("adding")
                this.groups.push(new PrereqGroup({Master_GroupID, GroupLogic, PrereqCourse, MinGrade}));
            }

        }
    }

    print() {
        console.log("ML", this.logic)
        this.groups.map((g:any)=> (
            console.log(g.print())
        ))
    }
}

export class PrereqGroup {

    logic: Logic = Logic.NULL;
    prereqs: Prereq[] = [];
    master_groupID: number = 0;

    constructor(data:any) {
        const {Master_GroupID, GroupLogic, PrereqCourse, MinGrade} = data;
        this.logic = checkLogic(GroupLogic);
        this.master_groupID = Master_GroupID;

        this.prereqs.push(new Prereq({PrereqCourse, MinGrade}))
    }

    addPrereq(data:any) {
        const {PrereqCourse, MinGrade} = data;
        this.prereqs.push(new Prereq({PrereqCourse, MinGrade}));
    }

    print() {
        console.log("MGID", this.master_groupID, "GL", this.logic);
        this.prereqs.map((p:any)=> (
            p.print()
        ))
    }
}

export class Prereq {

    courseID: string[] = [];
    grade: number = 0;

    constructor(data:any) {
        this.courseID = data.PrereqCourse;
        this.grade = data.MinGrade;
    }
    print() {
        console.log("C", this.courseID, "G", this.grade);
    }
}

export enum Logic {
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