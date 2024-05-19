import React from "react";

class DepartmentDetails {

    department: any;
    schools: any[];
    chair: any;

    constructor(data:any | null) {
        this.schools = [];
        this.parseFullData(data);
    }

    parseFullData(data:any) {
        data?.map((row: any, key: number) => {
            const { DepartmentID, DepartmentDescription, SchoolID, SchoolDescription, PhoneNum,
                Department_BuildingName, Department_RoomNum,
                Chair_FirstName, Chair_LastName, Chair_PhoneNum, Chair_Email, Chair_RoomID} = row;
            this.department = {DepartmentID, DepartmentDescription, PhoneNum,Department_BuildingName, Department_RoomNum};
            this.chair = {Chair_FirstName, Chair_LastName, Chair_PhoneNum, Chair_Email, Chair_RoomID};
            if (!this.schools.includes(SchoolID)) {
                this.schools.push({SchoolID, SchoolDescription});
            }
        });
    }

    print() {
        console.log(this.department);
    }

}

export default DepartmentDetails;