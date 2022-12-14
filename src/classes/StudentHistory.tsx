import React from "react";

class StudentHistory {

    history: any[] = [];

    master: HistoryMaster;

    constructor(data:any | null) {
        this.parseFullData(data);
        this.master = new HistoryMaster(this.history);
        //this.print();
    }

    parseFullData(data:any) {
        data?.map((row: any, key: number) => {
            const {CourseID, GradeVal, GradeLet, SemesterID, Term, Year} = row;
            this.history.push({CourseID, GradeVal, GradeLet, SemesterID, Term, Year})
        });
    }

    print() {
        console.log("History Master:")
        console.log(this.master?.print())
    }
}

export class HistoryMaster {

    courses: Course[] = [];

    constructor(data:any) {
        data?.map((row: any, key: number) => {
            const {CourseID, GradeVal, GradeLet} = row;
            console.log({CourseID, GradeVal, GradeLet})
            this.courses.push(new Course({CourseID, GradeVal, GradeLet}))
        });
    }

    print() {
        this.courses.map((c:Course)=> (
            console.log(c?.print())
        ))
    }
}

export class Course {

    courseID: string = '';
    gradeVal: number = 0;
    gradeLet: string = '';

    constructor(data:any) {
        const {CourseID, GradeVal, GradeLet} = data;
        this.courseID = CourseID;
        this.gradeVal = GradeVal;
        this.gradeLet = GradeLet;
    }
    print() {
        console.log("C", this.courseID, "GL", this.gradeLet, "GV", this.gradeVal);
    }
}

export default StudentHistory;