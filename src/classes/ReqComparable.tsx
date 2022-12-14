import React from "react";
import StudentHistory, {Course} from "./StudentHistory";

class ReqComparable {

    sHistory: StudentHistory;
    requirements: Requirements|undefined;

    used: Course[] = [];

    constructor(history: StudentHistory) {
        this.sHistory = history;
    }

    init(programRequirements: any) {
        if(!this.sHistory) {
            console.log("Empty student History");
            return false;
        }
        this.used = [];

        console.log("History", this.sHistory);
        console.log("Requirements", programRequirements);

        console.log("Proceeding to check");

        this.requirements = new Requirements(programRequirements);
        this.requirements.compare(this.sHistory, this.used);

        this.print();
    }

    print() {
        this.requirements?.print()
    }
}

class Requirements {

    PID: number = 0;
    groups: ReqGroup[];

    constructor(data:any | null) {
        this.groups = [];
        this.parseFullData(data);
    }

    parseFullData(data:any[]) {
        data?.map((row: any, key: number) => {
            this.parseToGroup(row);
        });
    }

    parseToGroup(row:any) {
        if(this.groups.length === 0){
            this.PID = row.PID;
            this.groups.push(new ReqGroup(row));
        } else {
            let isFound = false;
            this.groups.map((item: any, key: any) => {
                if (row.GroupID === item.GID) {
                    item.addCourse(row);
                    isFound = true;
                    return;
                }
            })
            if(!isFound){
                this.groups.push(new ReqGroup(row));
            }
        }
    }

    compare(history:StudentHistory, used:Course[]) {
        this.groups?.sort((a:ReqGroup, b:ReqGroup)=>(
            a.priority > b.priority ? 1 :-1
        )).map((g:ReqGroup) => {
            g.compare(history, used)
        })
    }

    print() {
        console.log(this.PID);
        this.groups.map((g: ReqGroup, key: any) => {
            g.print();
        })
    }

}

export class ReqGroup {
    GID: number= 0;
    gName: string;
    priority: number;
    minCredits: number = 0;
    minCourses: number = 0;
    coursesNeeded: ReqCourse[];

    creditsActual: number = 0;
    coursesActual: number = 0;
    coursesRecorded: ReqCourse[];

    constructor(group:any) {
        const {GroupID, GName, Priority, MinCredits, MinCourses} = group;
        this.GID = GroupID;
        this.gName = GName;
        this.priority = Priority;
        this.minCredits = MinCredits;
        this.minCourses = MinCourses;
        this.coursesNeeded = [];
        this.coursesRecorded = [];
        this.addCourse(group);
    }

    addCourse(course:any) {
        this.coursesNeeded?.push(new ReqCourse(course));
    }

    compare(sh:StudentHistory, used:Course[]) {
        for(let i = 0; i < sh?.history?.length; i++) {
            const courseH = sh.history[i];
            for(let j = 0; j < this.coursesNeeded.length; j++){
                const courseR = this.coursesNeeded[j];
                console.log("Comparing", courseH.CourseID, courseR.CID)
                if(courseH.CourseID === courseR.CID && !used.includes(courseH)) {
                    console.log("Match found!", courseH, courseR)
                    courseR.recordedGrade = courseH.GradeLet+""
                    courseR.recordedSemester = courseH.Term+" "+courseH.Year
                    courseR.recordedGradeVal = courseH.GradeVal;
                    used.push(courseH)
                    if(courseR.isFulFilled()) {
                        this.coursesRecorded.push(courseR);
                        this.creditsActual += parseInt(courseR.courseCredits + "");
                        this.coursesActual++;
                    }
                }
            }

        }
        console.log("Used", used)
    }

    print(){
        console.log(this.GID, this.gName, this.priority, this.minCourses, this.coursesActual, this.minCredits, this.creditsActual);
        this.coursesNeeded.map((c:ReqCourse)=>(
            console.log(c)
        ))
    }

    isComplete():boolean {
        return this.creditsActual >= this.minCredits && (this.minCourses > 0 && this.coursesActual >= this.minCourses)
    }
}

export class ReqCourse {
    CID: string;
    courseName: string;
    courseCredits: number;
    minGrade: number = 0;

    recordedGradeVal: number = 0;
    recordedGrade: string = "";
    recordedSemester: string = '';

    constructor(course:any) {
        const {CourseID, MinGrade, Credits, Name} = course;
        this.CID = CourseID;
        this.minGrade = MinGrade === null ? 0 : MinGrade;
        this.courseName = Name;
        this.courseCredits = Credits;
    }

    isFulFilled() {
        return this.recordedGradeVal >= this.minGrade && this.recordedGradeVal < 13;
    }

    print(){
        console.log(this.CID, this.courseName, this.courseCredits, this.minGrade);
    }
}


export default ReqComparable;