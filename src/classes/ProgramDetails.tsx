import React from "react";

class ProgramDetails {

    name: any;
    description: any;
    totalCredits: any;
    programType: any;
    departments: any[];
    schools: any[];

    constructor(data:any | null) {
        this.departments = [];
        this.schools = [];
        this.parseFullData(data);
    }

    parseFullData(data:any) {
        data?.map((row: any, key: number) => {
            const { ProgramName, ProgramTypeID, Description, MinCredits, DepartmentID, SchoolID } = row;
            this.name = ProgramName;
            this.totalCredits = MinCredits;
            this.programType = ProgramTypeID;
            this.description = Description;
            if (!this.departments.includes(DepartmentID)) {
                this.departments.push(DepartmentID);
            }
            if (!this.schools.includes(SchoolID)) {
                this.schools.push(SchoolID);
            }
        });
    }

    print() {
        console.log(this.name, this.totalCredits);
        this.departments?.map((item: any, key: any) => {
            console.log(item);
        });
    }

}

export default ProgramDetails;