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

    renderAdvanced():any {
        return this.groups?.sort((a:Group, b:Group)=>{
            if(a.priority > b.priority)
                return 1;
            return -1;
        }).map((group: Group, key: number) => (
            <div style={{marginLeft:"auto", marginRight:"auto", padding: 32, marginBottom: 16, backgroundColor: "#DEDEDE", borderStyle: "solid 1", borderRadius: 10, minWidth: 200, maxWidth: 500}}>
                <div style={{textAlign:"left"}}>
                    <div><label style={{fontSize:18}}><b>{group.gName}</b></label></div>
                </div>
                <div>
                    <div style={{ textAlign: "left", marginLeft:0, fontSize:14}}>
                        <div><label><em>{group.minCredits == 0 ? "" : "Minimum Credits: " + group.minCredits}</em></label></div>
                        <div><label><em>{group.minCourses == 0 ? "" : "Minimum Courses: " + group.minCourses}</em></label></div>
                    </div>
                    <div >
                        <div><label><b>Courses</b></label></div>
                        {
                            <div style={{marginLeft: "auto", marginRight: "auto"}}>
                                {group.renderCourses()}
                            </div>
                        }
                    </div>
                </div>
            </div>
        ));
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

    renderCourses() {
        return (<ul  style={{display: "inline-block", marginLeft: "auto", marginRight: "auto"}}>{
                this.courses?.map((course: Course, key: number) => (
                    <li key={key}>
                        <span style={{display: "flex"}}>{course.CID}&nbsp;
                            <sup style={{fontSize:11}}>({course.courseCredits}cr)</sup>&nbsp;{!course.minGrade ? "" :
                                <label>: <b>{course.minGrade}</b></label>}
                            </span>
                    </li>
                ))
            }</ul>
        )
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