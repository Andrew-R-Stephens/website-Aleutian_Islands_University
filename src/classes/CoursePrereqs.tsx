import React from "react";
import StudentHistory from "./StudentHistory";

class CoursePrereqs {

    prerequisites: any[] = [];

    master: PrereqMaster;

    constructor(data:any | null) {
        this.parseFullData(data);
        this.master = new PrereqMaster(this.prerequisites);
    }

    parseFullData(data:any) {
        data?.map((row: any, key: number) => {
            const {Course, MasterID, MasterLogic, Master_GroupID, GroupID, GroupLogic, PrereqCourse, MinGrade,  MinGradeWeight} = row;
            this.prerequisites.push({Course, MasterID, MasterLogic, Master_GroupID, GroupID, GroupLogic, PrereqCourse, MinGrade,  MinGradeWeight})
            console.log("Found", {Course, MasterID, MasterLogic, Master_GroupID, GroupID, GroupLogic, PrereqCourse, MinGrade,  MinGradeWeight})
        });

        //this.print();
    }

    print() {
        console.log(this.master?.print())
    }

}

export class PrereqMaster {

    logic: Logic = Logic.NULL;
    groups: PrereqGroup[] = [];

    constructor(data:any) {
        if(this.groups?.length == 0 && data?.length > 0) {
            //console.log("Creating first")
            const {Master_GroupID, GroupLogic, PrereqCourse, MinGrade,  MinGradeWeight} = data[0];
            this.groups.push(new PrereqGroup({Master_GroupID, GroupLogic, PrereqCourse, MinGrade,  MinGradeWeight}));
            this.logic = checkLogic(data[0].MasterLogic)
            //console.log("first", this.groups[0], this.logic)
        }
        for(let i = 1; i < data?.length; i++) {
            const {Master_GroupID, GroupLogic, PrereqCourse, MinGrade,  MinGradeWeight} = data[i];
            //console.log("using", data[i], this.groups.includes(data[i].Master_GroupID), data[i].Master_GroupID);

            var isFound = false;
            for(let j  = 0; !isFound && j < this.groups?.length; j++) {
                //console.log("comparing", this.groups[j]?.master_groupID, data[i]?.Master_GroupID)
                if(this.groups[j]?.master_groupID == data[i]?.Master_GroupID) {
                    //console.log("Add to existing")
                    this.groups[j]?.addPrereq({Master_GroupID, GroupLogic, PrereqCourse, MinGrade,  MinGradeWeight});
                    isFound = true;
                }
            }
            if(!isFound) {
                //console.log("adding")
                this.groups.push(new PrereqGroup({Master_GroupID, GroupLogic, PrereqCourse, MinGrade,  MinGradeWeight}));
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
        const {Master_GroupID, GroupLogic, PrereqCourse, MinGrade,  MinGradeWeight} = data;
        this.logic = checkLogic(GroupLogic);
        this.master_groupID = Master_GroupID;

        this.prereqs.push(new Prereq({PrereqCourse, MinGrade,  MinGradeWeight}))
    }

    addPrereq(data:any) {
        const {PrereqCourse, MinGrade,  MinGradeWeight} = data;
        this.prereqs.push(new Prereq({PrereqCourse, MinGrade,  MinGradeWeight}));
    }

    print() {
        console.log("MGID", this.master_groupID, "GL", this.logic);
        this.prereqs.map((p:any)=> (
            p.print()
        ))
    }
}

export class Prereq {

    courseID: string = "";
    gradeVal: number = 0;
    gradeLet: number = 0;

    constructor(data:any) {
        this.courseID = data.PrereqCourse;
        this.gradeVal = data.MinGradeWeight;
        this.gradeLet = data.MinGrade;
    }
    print() {
        console.log("C", this.courseID, "G", this.gradeLet);
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