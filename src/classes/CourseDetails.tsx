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
}

export default CourseDetails;