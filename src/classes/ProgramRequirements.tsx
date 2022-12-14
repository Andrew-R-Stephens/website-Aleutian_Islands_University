import React from "react";

class ProgramRequirements {

    PID: any;
    groups: Group[];

    constructor(data:any | null) {
        this.groups = [];
        this.parseFullData(data);
    }

    parseFullData(data:any) {
        data?.map((row: any, key: number) => {
            this.parseToGroup(row);
        });
    }

    parseToGroup(row:any) {
        if(this.groups.length === 0){
            this.PID = row.PID;
            this.groups.push(new Group(row));
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
                this.groups.push(new Group(row));
            }
        }
    }

    print() {
        this.groups.map((item: Group, key: any) => {
            item.print();
        })
    }

}

export class Group {
    GID: any;
    gName: any;
    priority: any;
    minCredits: any;
    minCourses: any;
    courses: Course[];

    constructor(group:any) {
        const {GroupID, GName, Priority, MinCredits, MinCourses} = group;
        this.GID = GroupID;
        this.gName = GName;
        this.priority = Priority;
        this.minCredits = MinCredits;
        this.minCourses = MinCourses;
        this.courses = [];
        this.addCourse(group);
    }

    addCourse(course:any) {
        this.courses?.push(new Course(course));
    }

    print(){
        console.log(this);
    }

}

export class Course {
    CID: any;
    courseName: any;
    courseCredits: any;
    minGrade: any;

    constructor(course:any) {
        const {CourseID, MinGrade, Credits, Name} = course;
        this.CID = CourseID;
        this.minGrade = MinGrade;
        this.courseName = Name;
        this.courseCredits = Credits;
    }

    print(){
        console.log(this);
    }
}

export default ProgramRequirements;